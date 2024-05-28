import http from "k6/http";
import { Trend } from "k6/metrics";

export const options = {
    vus: 10,
    duration: "20s",
}

const usersTrend = new Trend('users_duration_time')
const categoriesTrend = new Trend('categories_duration_time')

export default function() {
    let usersRequest = http.get(`https://api.escuelajs.co/api/v1/users`);
    usersTrend.add(usersRequest.timings.duration);

    let catRequest = http.get(`https://api.escuelajs.co/api/v1/categories`);
    categoriesTrend.add(catRequest.timings.duration);
}

