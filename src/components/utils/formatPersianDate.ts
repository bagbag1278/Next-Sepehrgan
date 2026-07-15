export const formatPersianDate = (
  dateString: string
) => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat(
    "fa-IR-u-ca-persian",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  ).format(date);
};