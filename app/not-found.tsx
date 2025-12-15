import { SearchX, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 text-gray-900">
      {/* Icon */}
      <SearchX className="w-24 h-24 text-blue-600 mb-6" />

      {/* Title */}
      <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>

      {/* Description */}
      <p className="text-gray-600 max-w-md text-center mb-6">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      {/* Button */}
      <a
        href="/"
        className="flex items-center gap-2 bg-blue-600 text-white p-2 rounded-sm hover:bg-blue-700 transition"
      >
        <Home className="w-5 h-5" />
        Back to Home
      </a>
    </div>
  );
}
