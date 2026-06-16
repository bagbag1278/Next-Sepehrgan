const SkeletonDetail = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 mt-20 space-y-6">
      {/* دکمه بازگشت */}
      <div className="w-24 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>

      {/* هدر */}
      <div className="space-y-3">
        <div className="w-3/4 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
        <div className="flex items-center gap-4">
          <div className="w-32 h-5 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          <div className="w-24 h-5 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
        </div>
      </div>

      {/* تصویر */}
      <div className="w-full aspect-video bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"></div>

      {/* گالری تصاویر کوچک */}
      <div className="flex gap-3">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
        ))}
      </div>

      {/* محتوای اصلی */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ستون اصلی */}
        <div className="lg:col-span-2 space-y-6">
          {/* توضیحات */}
          <div className="space-y-2">
            <div className="w-32 h-6 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          </div>

          {/* امکانات */}
          <div className="space-y-3">
            <div className="w-40 h-6 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                  <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* سایدبار */}
        <div className="space-y-4">
          {/* کارت قیمت */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="w-24 h-5 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            <div className="w-40 h-9 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            <div className="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            <div className="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          </div>

          {/* اطلاعات جانبی */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 space-y-3 shadow-sm">
            <div className="w-32 h-5 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex justify-between">
                <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonDetail