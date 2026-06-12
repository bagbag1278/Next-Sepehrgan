const formatDate = (
date: string
) => {

return new Intl.DateTimeFormat(
"fa-IR",
{
year: "numeric",
month: "long",
day: "numeric",
}
).format(new Date(date));

};

export default formatDate;
