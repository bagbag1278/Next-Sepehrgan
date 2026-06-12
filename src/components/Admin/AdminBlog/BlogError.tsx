import { FileText } from "lucide-react";

interface BlogErrorProps {
  error: string;
  onRetry: () => void;
}

export const BlogError = ({ error, onRetry }: BlogErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <FileText size={48} className="mx-auto text-red-500 mb-4" />
        <p className="text-red-500 mb-4">{error}</p>
        <button onClick={onRetry} className="px-4 py-2 bg-[#0887CAB2] text-white rounded-xl">
          تلاش مجدد
        </button>
      </div>
    </div>
  );
};