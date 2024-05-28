import http from "k6/http";
import { Rate } from "k6/metrics";

export const options = {
    vus: 10,
    duration: "20s",
}

const myRate = new Rate('called_products')

export default function() {
    randomCall(Math.floor(Math.random() * (55 - 45 + 1) + 45));
}

function randomCall(id) {
    let request = http.get(`https://api.escuelajs.co/api/v1/products/${id}`);
    myRate.add(request.status == 200 ? 1 : 0);
}