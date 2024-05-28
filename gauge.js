import http from "k6/http";
import { Gauge } from "k6/metrics";

export const options = {
    vus: 10,
    duration: "20s",
}

//const waitingTime = new Gauge("waiting_time");
//const sendingTime = new Gauge("sending_time");
const waitingAndSendingTime = new Gauge("was_time");
export default function() {
    let request = http.get("https://api.escuelajs.co/api/v1/users");
    let was = request.timings.waiting + request.timings.sending;
    waitingAndSendingTime.add(was);
    //waitingTime.add(request.timings.waiting);
    //sendingTime.add(request.timings.sending);
    //console.log("waiting time: ", request.timings.waiting);
}

