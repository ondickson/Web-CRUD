"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
// backend/src/prisma.ts
const client_1 = require("@prisma/client");
const url = process.env.DATABASE_URL || '';
try {
    const u = new URL(url);
    console.log('Prisma connecting →', {
        host: u.host,
        db: u.pathname.slice(1),
        user: u.username,
    });
}
catch {
    console.warn('Invalid DATABASE_URL:', url ? '(set but unparsable)' : '(missing)');
}
exports.prisma = new client_1.PrismaClient();
// Optional: prove the connection target on boot
exports.prisma.$queryRawUnsafe(`
  SELECT current_database() AS db, current_user AS usr,
         inet_server_addr() AS host, inet_server_port() AS port
`)
    .then(() => console.log('DB session checked'))
    .catch(console.error);
