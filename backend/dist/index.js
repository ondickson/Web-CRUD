"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/index.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_1 = require("./env");
const prisma_1 = require("./prisma");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const auth_1 = require("./auth");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const creds = zod_1.z.object({ email: zod_1.z.string().email(), password: zod_1.z.string().min(6) });
app.post('/auth/register', async (req, res) => {
    const parsed = creds.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json({ error: 'Invalid payload' });
    const { email, password } = parsed.data;
    const existing = await prisma_1.prisma.user.findUnique({ where: { email } });
    if (existing)
        return res.status(409).json({ error: 'Email taken' });
    const hash = await bcrypt_1.default.hash(password, 10);
    const user = await prisma_1.prisma.user.create({ data: { email, password: hash } });
    const token = jsonwebtoken_1.default.sign({ sub: user.id, email: user.email }, env_1.ENV.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
});
app.post('/auth/login', async (req, res) => {
    const parsed = creds.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json({ error: 'Invalid payload' });
    const { email, password } = parsed.data;
    const user = await prisma_1.prisma.user.findUnique({ where: { email } });
    if (!user)
        return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt_1.default.compare(password, user.password);
    if (!ok)
        return res.status(401).json({ error: 'Invalid credentials' });
    const token = jsonwebtoken_1.default.sign({ sub: user.id, email: user.email }, env_1.ENV.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
});
// Simple CRUD for Items (owned by user)
app.get('/items', auth_1.auth, async (req, res) => {
    const userId = Number(req.user.sub); // userId is Int
    const items = await prisma_1.prisma.item.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
    });
    res.json(items);
});
app.post('/items', auth_1.auth, async (req, res) => {
    const userId = Number(req.user.sub);
    const name = String(req.body?.name || '').trim();
    if (!name)
        return res.status(400).json({ error: 'name is required' });
    const item = await prisma_1.prisma.item.create({ data: { name, userId } });
    res.status(201).json(item);
});
app.put('/items/:id', auth_1.auth, async (req, res) => {
    const userId = Number(req.user.sub);
    const id = Number(req.params.id);
    const name = String(req.body?.name || '').trim();
    const exists = await prisma_1.prisma.item.findFirst({ where: { id, userId } });
    if (!exists)
        return res.status(404).json({ error: 'Not found' });
    const item = await prisma_1.prisma.item.update({
        where: { id },
        data: { name },
    });
    res.json(item);
});
app.delete('/items/:id', auth_1.auth, async (req, res) => {
    const userId = Number(req.user.sub);
    const id = Number(req.params.id);
    const exists = await prisma_1.prisma.item.findFirst({ where: { id, userId } });
    if (!exists)
        return res.status(404).json({ error: 'Not found' });
    await prisma_1.prisma.item.delete({ where: { id } });
    res.status(204).send();
});
app.get('/', (_req, res) => res.json({ ok: true }));
app.listen(env_1.ENV.PORT, () => console.log(`API on :${env_1.ENV.PORT}`));
