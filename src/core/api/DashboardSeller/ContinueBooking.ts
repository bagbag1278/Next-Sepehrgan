import axios from "axios";

const ContinueBooking = async (
    bookingId: number
) => {

    const response =
        await axios.post(
            `/api/bookings/${bookingId}/continue`
        );

    return response.data;

};

export default ContinueBooking;