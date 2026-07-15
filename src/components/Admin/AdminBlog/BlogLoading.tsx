
export const BlogLoading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#0887CAB2] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">در حال بارگذاری...</p>
      </div>
    </div>
  );
};