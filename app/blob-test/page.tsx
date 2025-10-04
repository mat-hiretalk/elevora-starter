import { put, list } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';

async function uploadFile(formData: FormData) {
  'use server';

  const file = formData.get('file') as File;

  if (!file) {
    return { error: 'No file provided' };
  }

  try {
    const blob = await put(file.name, file, {
      access: 'public',
      addRandomSuffix: true,
    });

    revalidatePath('/blob-test');
    return { success: true, blob };
  } catch (error) {
    console.error('Upload error:', error);
    return { error: 'Failed to upload file' };
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function isImage(url: string): boolean {
  return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);
}

export default async function BlobTestPage() {
  const { blobs } = await list();

  return (
    <div className="container mx-auto p-8 max-w-6xl">
      <h1 className="text-4xl font-bold mb-8">Vercel Blob Storage Test</h1>

      {/* Upload Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Upload File</h2>
        <form action={uploadFile} className="space-y-4">
          <div>
            <input
              type="file"
              name="file"
              required
              className="block w-full text-sm text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 focus:outline-none p-2"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Upload
          </button>
        </form>
      </div>

      {/* Blobs List */}
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-4">
          Uploaded Files ({blobs.length})
        </h2>
      </div>

      {blobs.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">No files uploaded yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blobs.map((blob) => (
            <div
              key={blob.pathname}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              {isImage(blob.url) ? (
                <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-700">
                  <Image
                    src={blob.url}
                    alt={blob.pathname}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="mt-2 text-sm text-gray-500">File</p>
                  </div>
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-sm mb-2 truncate" title={blob.pathname}>
                  {blob.pathname}
                </h3>
                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <p>Size: {formatBytes(blob.size)}</p>
                  <p>Uploaded: {new Date(blob.uploadedAt).toLocaleDateString()}</p>
                  <a
                    href={blob.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline block truncate"
                  >
                    View file
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
