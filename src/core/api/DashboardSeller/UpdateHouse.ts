import axios from "axios";

const UpdateHouse = async (
    id: number,
    data: any
) => {

    const response =
        await axios.put(
            `/api/houses/${id}`,
            data
        );

    return response.data;

};

export default UpdateHouse;