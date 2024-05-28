import http from "k6/http";

// Soak test: validates concurrent VUs for a prolonged amount of time 
export const options = {
    stages:[
        {
            duration: '2m', 
            target: 100,
        },
        {
            duration: '5h30m', 
            target: 100
        },
        {
            duration: '2m', 
            target: 0
        },
    ]
}

export default function() {
    const endpoint = 'https://qa.cuddly.com/api/get-some-campaigns/60';
    let response = http.get(endpoint);
}
