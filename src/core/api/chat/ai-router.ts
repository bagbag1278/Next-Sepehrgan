export function detectIntent(message: string) {
  const text = message.toLowerCase();

  const searchKeywords = [
    // انواع ملک
    "خونه", "خانه", "ملک", "آپارتمان", "ویلا", "سوئیت", "پنت‌هاوس", "پنتهاوس",
    // فعل جستجو
    "پیدا کن", "پیدا کنید", "دنبال", "می‌خوام", "میخوام", "نشون بده", "بگرد",
    "بده", "اجاره", "خرید", "بخرم", "رهن",
    // فیلتر قیمت
    "میلیون", "میلیارد", "تومان", "قیمت", "بودجه", "تا",
    // فیلتر اتاق
    "خوابه", "اتاق",
    // فیلتر شهر - شهرهای رایج
    "تهران", "مشهد", "اصفهان", "شیراز", "تبریز", "اهواز", "کرج",
  ];

  const detailKeywords = ["جزئیات", "اطلاعات بیشتر", "بیشتر بگو", "درباره این"];

  if (detailKeywords.some((kw) => text.includes(kw))) {
    return "get_house_details";
  }

  if (searchKeywords.some((kw) => text.includes(kw))) {
    return "search_houses";
  }

  return "chat";
}