const ToEnglishNumber = (
  value: string
): string => {

  return value.replace(
    /[۰-۹]/g,
    (d) =>
      "۰۱۲۳۴۵۶۷۸۹"
        .indexOf(d)
        .toString()
  );

};

export default ToEnglishNumber;