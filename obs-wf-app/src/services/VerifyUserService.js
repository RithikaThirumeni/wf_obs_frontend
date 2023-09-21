import axios from "axios";

const backend_url = "http://localhost:8080/admin/verifyCustomer/";

const headers = {
    "Content-Type":"application/json"
}

export const verifyUser = (cid) => {
    const data={"customerID":cid};
    return axios
        .post(backend_url, data, headers)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
}