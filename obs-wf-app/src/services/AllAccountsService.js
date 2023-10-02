import axios from "axios";

const headers = {
    "Content-Type":"application/json"
}
export function displayAccountSummary(cid) {
    
    var backend_url = "http://localhost:8080/customeraccounts/";
    
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