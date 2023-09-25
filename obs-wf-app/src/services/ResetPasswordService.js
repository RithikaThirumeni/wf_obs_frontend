import axios from "axios";

const backend_url = "http://localhost:8080/resetPassword";

const headers = {
    "Content-Type":"application/json"
}

export const resetPassword = async (data) => {
    console.log("resetting password...");
    console.log(data);
    return await axios
        .post(backend_url, data, {headers})
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
}