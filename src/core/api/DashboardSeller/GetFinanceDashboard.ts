import axios from "axios";

import { FinanceDashboardResponse, } from "@/core/types/DashboardSeller/Finance";


const GetFinanceDashboard = async (): Promise<FinanceDashboardResponse> => {

    // console.log("get finance")

    const response =
        await axios.get<FinanceDashboardResponse>(
            "/api/Finance"
        );
    return response.data;

};

export default GetFinanceDashboard;