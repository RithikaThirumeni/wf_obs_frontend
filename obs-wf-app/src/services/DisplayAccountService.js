import axios from "axios";

const headers = {
    "Content-Type":"application/json"
}
export function displayAccounts() {
    var cid = sessionStorage.getItem("customerID");
    var backend_url = "http://localhost:8080/display/";
    
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