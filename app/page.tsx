import Link from 'next/link';

export default function Home() {
  const hasBlobStorage = !!process.env.BLOB_READ_WRITE_TOKEN;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Starter Template</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          Next.js 15 + tRPC + Prisma + Inngest + BetterAuth
        </p>

        {hasBlobStorage && (
          <Link
            href="/blob-test"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Test Blob Storage
          </Link>
        )}
      </div>
    </div>
  );
}
