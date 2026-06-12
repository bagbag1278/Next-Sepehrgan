import axios from "axios";

const DeleteHouse = async (
    id: number
) => {

    const response =
        await axios.delete(
            `/api/houses/${id}`
        );

    return response.data;

};

export default DeleteHouse;