import axios from "axios";

const headers = {
    "Content-Type":"application/json"
}
export function displayAccountSummary(sourceAccountNumber) {
    
    var backend_url = "http://localhost:8080/accountsummary/";
    var cid = sessionStorage.getItem("customerID");
    return axios
        .get(backend_url+sourceAccountNumber+"/"+cid)
        .then((res) => {
            console.log(res)
            return res;
        })
        .catch((err) => {
            return err.response;
        });
}