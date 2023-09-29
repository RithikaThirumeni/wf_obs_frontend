import axios from "axios";

const backend_url = "http://localhost:8080/deposit/";

const headers = {
    "Content-Type":"application/json"
}

export const deposit = (data) => {
    console.log(data);
    const cid = sessionStorage.getItem("customerID");
    return axios
        .post(backend_url+cid, data, {headers})
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
}