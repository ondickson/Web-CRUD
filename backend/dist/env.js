"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
// backend/src/env.ts
require("dotenv/config");
exports.ENV = {
    PORT: Number(process.env.PORT || 4000),
    JWT_SECRET: process.env.JWT_SECRET || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    DATABASE_URL: process.env.DATABASE_URL,
    REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
    CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
};
