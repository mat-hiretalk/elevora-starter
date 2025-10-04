import { httpBatchLink } from '@trpc/client';
import { appRouter } from './routers/_app';
import { createContext } from './context';

export async function createCaller() {
  return appRouter.createCaller(await createContext());
}

export function getUrl() {
  const base = (() => {
    if (typeof window !== 'undefined') return '';
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return 'http://localhost:3888';
  })();
  return `${base}/api/trpc`;
}

export const trpc = {
  links: [httpBatchLink({ url: getUrl() })],
};
