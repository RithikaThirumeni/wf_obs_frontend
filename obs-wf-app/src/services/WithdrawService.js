import axios from "axios";

const backend_url = "http://localhost:8080/withdraw/";

const headers = {
    "Content-Type":"application/json"
}

export const withdraw = (data) => {
    const cid = sessionStorage.getItem("customerID");
    console.log(data);
    return axios
        .post(backend_url+cid, data, {headers})
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
}