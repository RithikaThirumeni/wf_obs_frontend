import axios from "axios";

const headers = {
    "Content-Type":"application/json"
}
export function displayCustomers() {
    var backend_url = "http://localhost:8080/getAllCustomers";
    
    return axios
        .get(backend_url)
        .then((res) => {
            console.log(res)
            return res;
        })
        .catch((err) => {
            return err.response;
        });
}