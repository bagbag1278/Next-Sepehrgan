export function toPersianNum(num: unknown): string {
  if (num === undefined || num === null || num === "") return "";
  return String(num).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}
