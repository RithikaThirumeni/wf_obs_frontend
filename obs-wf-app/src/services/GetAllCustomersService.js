import axios from "axios";

const headers = {
    "Content-Type":"application/json"
}
export function displayAllUsers(cid) {
    var backend_url = "http://localhost:8080/getAllCustomers/?id=";
    
    return axios
        .get(backend_url+cid)
        .then((res) => {
            console.log(res)
            return res;
        })
        .catch((err) => {
            return err.response;
        });
}