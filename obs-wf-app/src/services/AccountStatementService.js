import axios from "axios";

const headers = {
    "Content-Type":"application/json"
}
export function displayAccountStatement(accno, sdate, edate) {
    
    var backend_url = "http://localhost:8080/accountstatement/"+accno+"/"+sdate+"/"+edate;
    console.log(sdate, edate);
    console.log(backend_url+accno+"/"+sdate+"/"+edate);
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