import axios from "axios";

const backend_url = "http://localhost:8080/accountsummary/";

export const customerRegister = (accno) => {
    return axios
        .get(backend_url+accno)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
}