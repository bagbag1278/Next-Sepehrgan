import axios from "axios";

interface GetPaymentsParams {
    page?: number;
    status?: string;
    sort?: string;
    order?: string;
}

const GetPayments = async ({ page = 1, status, sort = "createdAt", order = "DESC", }: GetPaymentsParams) => {

    const params = new URLSearchParams();

    params.set("page", String(page));

    params.set("limit", "3");

    if (status) {
        params.set("status", status);
    }
    params.set("sort", sort);
    params.set("order", order);

    // console.log(`/api/payments/seller-houses?${params.toString()}`);

    const response = await axios.get(`/api/payments/seller-houses?${params.toString()}`);
    return response.data;
};

export default GetPayments;