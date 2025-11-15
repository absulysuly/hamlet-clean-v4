import cors, { CorsOptions } from 'cors';

const explicitOrigins = [
  'https://hamlet-clean-v4-vpnz.vercel.app',
  'https://hamlet-clean-v4-vpnz-git-main-absulysulys-projects.vercel.app',
  'https://hamlet-clean-v4-vpnz-e655kq3oc-absulysulys-projects.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173',
];

const originPatterns = [/^https:\/\/hamlet-clean-v4-vpnz-[^.]+\.vercel\.app$/];

const normalizeOrigin = (origin: string) => origin.replace(/\/$/, '');

export const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    const normalizedOrigin = normalizeOrigin(origin);
    const isExplicitlyAllowed = explicitOrigins.includes(normalizedOrigin);
    const matchesPattern = originPatterns.some((pattern) => pattern.test(normalizedOrigin));

    if (isExplicitlyAllowed || matchesPattern) {
      return callback(null, true);
    }

    console.warn(`⚠️  CORS blocked origin: ${origin}`);
    return callback(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

export const corsMiddleware = cors(corsOptions);
