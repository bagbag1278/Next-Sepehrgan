export default function DropDownFil() {
  const items = [
    { title: "حداکثر اجاره", value: "۵۰ میلیون تومان" },
    { title: "حداقل اجاره", value: "۵۰ میلیون تومان" },
    { title: "حداکثر قیمت", value: "۵۰ میلیون تومان" },
    { title: "حداقل قیمت", value: "۵۰ میلیون تومان" },
    { title: "حداقل متراژ", value: "۱۰۰۰۰۰۰ متر" },
    { title: "حداقل متراژ", value: "۰ متر" },
  ];

  return (
    <div className="w-full px-4">
      <div className="max-w-7xl mx-auto ">

        <div className="w-full border-t border-slate-200 mb-5" />

        {/* ✅ Responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex">

          {items.map((it, idx) => (
            <div
              key={idx}
              className={[
                "p-4",
                "flex items-center justify-center",
                "border-b border-slate-200",
                "lg:border-b-0",
                "lg:flex-1",
                // ✅ فقط در حالت lg بین آیتم‌ها border-left
                idx === items.length - 1
                  ? ""
                  : "lg:border-l lg:border-slate-200",
              ].join(" ")}
            >
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-900 text-sm">
                    {it.title}
                  </span>

                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-slate-700"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="mt-2 text-right">
                  <span className="font-normal text-slate-500 text-sm">
                    {it.value}
                  </span>
                </div>
              </div>
            </div>
          ))}

        </div>

        <div className="w-full border-b border-slate-200 mt-5" />
      </div>
    </div>
  );
}
