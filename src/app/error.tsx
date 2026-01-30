"use client";

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center flex-col">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Oops!</h1>
      <p className="text-gray-600 mb-6">
        Something went wrong. Please try again later.
      </p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
      >
        Refresh
      </button>
    </div>
  );
}
