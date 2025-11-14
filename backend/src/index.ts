// backend/src/index.ts
import express from 'express';
import cors from 'cors';
import { ENV } from './env';
import { prisma } from './prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { auth } from './auth';
import type { User as PrismaUser } from '@prisma/client';


const app = express();
// app.use(cors());
app.use(cors({ origin: ENV.CORS_ORIGIN }));
app.use(express.json());

console.log('DB_URL:', process.env.DATABASE_URL);
const creds = z.object({ email: z.string().email(), password: z.string().min(6) });

app.post('/auth/social-login', async (req, res) => {
  try {
    const { email, name, image, provider, providerAccountId } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Tell TS exactly what type this is
    let user: PrismaUser | null = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      const randomPassword = await bcrypt.hash(
        jwt.sign({ email, ts: Date.now() }, ENV.JWT_SECRET),
        10
      );

      user = await prisma.user.create({
        data: {
          email,
          password: randomPassword,
          name,
          image,
          provider,
          providerAccountId,
        },
      });
    } else {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          name: name ?? user.name,
          image: image ?? user.image,
          provider: provider ?? user.provider,
          providerAccountId: providerAccountId ?? user.providerAccountId,
        },
      });
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      ENV.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        provider: user.provider,
      },
      token,
    });
  } catch (err) {
    console.error('social-login error', err);
    return res.status(500).json({ error: 'Server error' });
  }
});


app.post('/auth/register', async (req, res) => {
  const parsed = creds.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid email or password. Please try again.' });
  const { email, password } = parsed.data;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ error: 'Email taken' });
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password: hash } });
  const token = jwt.sign({ sub: user.id, email: user.email }, ENV.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});

app.post('/auth/login', async (req, res) => {
  const parsed = creds.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid email or password. Please try again.' });
  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ sub: user.id, email: user.email }, ENV.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});

// Simple CRUD for Items (owned by user)
app.get('/public/items', async (_req, res) => {
  const items = await prisma.item.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20,
  });
  res.json(items);
});

app.post('/items', auth, async (req, res) => {
  const userId = Number((req as any).user.sub);

  const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
  const description =
    typeof req.body?.description === 'string' ? req.body.description.trim() : null;

  if (!name) return res.status(400).json({ error: 'name is required' });

  const item = await prisma.item.create({
    data: { name, description, userId },
  });

  res.status(201).json(item);
});

app.put('/items/:id', auth, async (req, res) => {
  const userId = Number((req as any).user.sub);
  const id = Number(req.params.id);

  const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
  const description =
    typeof req.body?.description === 'string' ? req.body.description.trim() : null;

  if (!name) return res.status(400).json({ error: 'name is required' });

  const exists = await prisma.item.findFirst({ where: { id, userId } });
  if (!exists) return res.status(404).json({ error: 'Not found' });

  const item = await prisma.item.update({
    where: { id },
    data: { name, description },
  });

  res.json(item);
});


app.delete('/items/:id', auth, async (req, res) => {
  const userId = Number((req as any).user.sub);
  const id = Number(req.params.id);

  const exists = await prisma.item.findFirst({ where: { id, userId } });
  if (!exists) return res.status(404).json({ error: 'Not found' });

  await prisma.item.delete({ where: { id } });
  res.status(204).send();
});



// Authentication test route
app.get('/auth/me', auth, async (req, res) => {
  const userId = Number((req as any).user.sub);
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true, createdAt: true, updatedAt: true },
  });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ user });
});



app.get('/', (_req, res) => res.json({ ok: true }));

app.listen(ENV.PORT, () => console.log(`API on :${ENV.PORT}`));
