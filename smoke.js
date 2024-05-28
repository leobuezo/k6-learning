import http from "k6/http";

// Smoke test: minimum amount of VUs
export const options = {
    vus: 1,
    duration: "20s",
}

export default function() {
    const endpoint = 'https://qa.cuddly.com/api/get-some-campaigns/60';
    let response = http.get(endpoint);
}
