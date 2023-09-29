import axios from "axios";

const backend_url = "http://localhost:8080/admin/createaccountforuser/";

const config = {
    headers:{
    "Content-Type":"application/json",
    "Access-Control-Allow-Origin":"*",
    "Access-Control-Allow-Methods":"POST, PUT, GET, OPTIONS, DELETE"
    }
}

export const createAccountForUser = (data, cid) => {
    console.log("creating account by admin...");
    return axios
        .post(backend_url+cid, data, config)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
}