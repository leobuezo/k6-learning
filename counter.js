import http from "k6/http";
import { Counter } from "k6/metrics";

export const options = {
    vus: 10,
    duration: "20s",
}

const productsCounter = new Counter("called_products");
const categoriesCounter = new Counter("called_categories");
const usersCounter = new Counter("called_users");

export default function() {
    randomCall(Math.floor(Math.random() * 3 + 1));
}

function randomCall(call) {
    if(call == 1) {
        let products = http.get("https://api.escuelajs.co/api/v1/products");
        productsCounter.add(1);    
    }
    else if(call == 2) {
        let categories = http.get("https://api.escuelajs.co/api/v1/categories");
        categoriesCounter.add(1);    
    }
    else if(call == 3) {
        let users = http.get("https://api.escuelajs.co/api/v1/users");
        usersCounter.add(1);
    }
}