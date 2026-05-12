// components/FilterBar.tsx
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
    <div className="w-full">
        <div className="w-312 mx-auto ">

      <div className=" border-t border-slate-200 mb-5" />

      <div className="flex bg-white">
        {items.map((it, idx) => (
          <div
            key={idx}
            className={[
              "flex-1",
              "px-6 py-4",
              "flex items-center justify-center",
            //   idx !== 0 ? "border-l border-slate-200" : "", //just first
             idx === items.length - 1 ? "" : "border-l border-slate-200" //just last
            //  idx !== 0 && idx !== items.length - 1 ? "border-r border-slate-200" : "", first and last
            ].join(" ")}
          >
            <div className="w-full">
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-900 text-sm">
                  {it.title}
                </span>
                {/* Chevron down */}
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

     
      <div className="border-b border-slate-200 mt-5" />
        </div>
      
    </div>
  );
}
