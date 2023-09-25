import axios from "axios";

const backend_url = "http://localhost:8080/updateCustomer/";

const headers = {
    "Content-Type":"application/json"
}

export const updateCustomer = (data) => {
    const cid=sessionStorage.getItem("customerID");
    return axios
        .put(backend_url+cid, data, {headers})
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
}