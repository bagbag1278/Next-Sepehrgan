import axios from "axios";

const DeleteComment = async (id: number) => {
    const res = await axios.delete(`/api/comments/${id}`);
    return res.data;
};

export default DeleteComment;