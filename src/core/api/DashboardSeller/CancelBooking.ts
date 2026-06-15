import axios from "axios";

const CancelBooking = async (
    bookingId: number
) => {

    const response =
        await axios.post(
            `/api/bookings/${bookingId}/cancel`
        );

    return response.data;

};

export default CancelBooking;