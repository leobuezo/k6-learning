import http from "k6/http";
import { Rate } from "k6/metrics";
import { check } from "k6";

export const options = {
    vus: 10,
    duration: '20s',
    thresholds: {
        http_req_failed: ["rate < 0.1"],
        http_req_duration: [{
            threshold: "p(90) < 184",
            abortonFail: true,
            delayAbortEval: "10s",
        }],

    }
}

export default function() {
    let id = Math.floor(Math.random() * (502 - 470 + 1) + 470);
    let myUrl = `https://api.escuelajs.co/api/v1/products/${id}`;
    let res = http.get(myUrl);

    check(res, {
        "statusCode is 200:": (r) => r.status === 200,
        "Response time duration should be less than 500ms:": (r) => r.timings.duration < 500,
    });
}