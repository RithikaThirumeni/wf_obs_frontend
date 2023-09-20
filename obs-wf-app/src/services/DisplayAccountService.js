import axios from "axios";

const headers = {
    "Content-Type":"application/json"
}
export function displayAccounts() {
    var cid = sessionStorage.getItem("customerID");
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
export function displayAccountBalance(accountNumber) {
    
    var backend_url = "http://localhost:8080/displaybalance/";
    
    return axios
        .get(backend_url+accountNumber)
        .then((res) => {
            console.log(res)
            return res;
        })
        .catch((err) => {
            return err.response;
        });
}