import { Loader2 } from "lucide-react";

const PageLoader = () => (
  <div
    className="flex min-h-screen flex-col items-center justify-center gap-3 bg-white"
    role="status"
    aria-live="polite"
  >
    <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
    <p className="text-sm font-medium text-gray-500">Loading...</p>
  </div>
);

export default PageLoader