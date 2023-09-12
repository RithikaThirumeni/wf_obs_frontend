import axios from "axios";

const backend_url = "http://localhost:8080/account/createacc";

const headers = {
    "Content-Type": "application/json"
}

export const accountCreation = (data) => {
    return axios
        .post(backend_url, data, { headers })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
}