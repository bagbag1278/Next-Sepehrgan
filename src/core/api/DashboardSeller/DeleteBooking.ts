import axios from "axios";

const DeleteBooking = async (
    bookingId: number
) => {

    const response =
        await axios.delete(
            `/api/bookings/${bookingId}`
        );

    return response.data;

};

export default DeleteBooking;