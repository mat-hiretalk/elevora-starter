import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { headers } from 'next/headers';

export async function createContext() {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  return {
    db,
    session,
    userId: session?.user?.id,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
