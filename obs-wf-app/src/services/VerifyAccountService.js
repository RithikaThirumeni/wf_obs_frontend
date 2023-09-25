import axios from "axios";

const backend_url = "http://localhost:8080/admin/verifyCustomerAccount/";

const headers = {
    "Content-Type":"application/json"
}

export const verifyAccount = (ano) => {
    const data={"accountNumber":ano};
    return axios
        .post(backend_url, data, headers)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
}