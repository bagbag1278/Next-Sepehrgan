
export const NotificationsLoading = () => {
  return (
    <div className="text-center py-16 text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-800 rounded-2xl">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0887CAB2] mx-auto mb-3"></div>
      <p>در حال بارگذاری...</p>
    </div>
  );
};