import axios from "axios";

export interface IBooking {

    id: number;

    user_id: number;

    houseId: number;

    reservedDates: string[];

    traveler_details: {
        gender: string;
        lastName: string;
        birthDate: string;
        firstName: string;
        nationalId: string;
    }[];

    status: string;

    sharedEmail: string;

    sharedMobile: string;

    createdAt: string;

    house: {
        title: string;
        price: string;

    };

}

interface IResponse {

    bookings: IBooking[];

    totalCount: number;

}



interface GetBookingsParams {
    page?: number;
    limit?: number;
    order?: string;
    houseId?: number;
    status?: string;
}

const GetBookings = async ({
    page,
    limit,
    
}: GetBookingsParams) => {

    const params =new URLSearchParams();

    params.set("page",String(page));
    params.set( "limit", String(limit));

  


    const url = `/api/bookings/customers?${params.toString()}`

    console.log(url);

    const response =
        await axios.get(url);

    return response.data;

};

export default GetBookings;