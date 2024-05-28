import http from "k6/http";
import { Rate } from "k6/metrics";
import { check } from "k6";

export const options = {
    vus: 10,
    duration: '20s',
    thresholds: {
        http_req_failed: ["rate < 0.1"]
    }
}

const myRate = new Rate('called_products')

export default function() {
    let id = Math.floor(Math.random() * (109 - 86 + 1) + 86);
    let myUrl = `https://api.escuelajs.co/api/v1/products/${id}`;
    //console.log(myUrl);
    let response = http.get(myUrl);
    let myStatusCode = response.status;
    //console.log(myStatusCode);
    myRate.add(myStatusCode >= 200 ? 1 : 0);
    check(response, {
        "Status Code equal or greater than 400 (Error rate must be less than 10%):": (r) => r.status === 400,
    });
}

