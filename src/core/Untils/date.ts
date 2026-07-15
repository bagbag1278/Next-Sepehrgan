import moment from "moment-jalaali";

moment.loadPersian({
    dialect: "persian-modern",
    usePersianDigits: true,
});

export const formatReservationDate = (
    date?: string
) => {

    if (!date)
        return "بدون تاریخ";

    try {

        const m = moment(date);

        if (
            !m ||
            !m.isValid()
        ) {

            return "بدون تاریخ";

        }

        return m.format(
            "jD jMMMM jYYYY"
        );

    } catch {

        return "بدون تاریخ";

    }

};