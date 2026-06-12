import axios from "axios";

export interface GetBookingsCustomersParams {
    bookingId: number;
    page?: number;
    limit?: number;
    sort?: string;
    order?: string;
    houseId?: number;
    status?: string;
}

const GetBookingsCustomers = async ({
    bookingId,
    page = 1,
    limit = 10,
    sort = "created_at",
    order = "DESC",
    houseId,
    status,
}: GetBookingsCustomersParams) => {

    const params = new URLSearchParams();

    params.set("page", String(page));
    params.set("limit", String(limit));
    params.set("sort", sort);
    params.set("order", order);

    if (houseId) {
        params.set("houseId", String(houseId));
    }

    if (status) {
        params.set("status", status);
    }

    const url =
        `/api/bookings/${bookingId}/customers?${params.toString()}`;

    console.log(url);

    try {

        const response = await axios.get(url);

            console.log("RESPONSE:", response.data);

        return response.data;

    } catch (error) {

        console.log(
            "GetBookingsCustomers Error",
            error
        );

        throw error;
    }
};

export default GetBookingsCustomers;