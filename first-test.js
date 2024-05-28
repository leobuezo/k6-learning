import http from "k6/http";
import { sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
    stages:[
        {
            duration: '10s', target: 10
        },
        {
            duration: '20s', target: 10
        },
        {
            duration: '10s', target: 0
        },
    ]
}

export default function() {
    const endpoint = 'https://qa.cuddly.com/api/get-some-campaigns/60';
    let response = http.get(endpoint);
    sleep(randomIntBetween(2, 6));
}
