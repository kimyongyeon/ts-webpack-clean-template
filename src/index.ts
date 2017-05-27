import "./css/style.css";
import "./img/5.png";

export class Main {
    constructor() {
        console.log("Main() start");
    }
}

window.onload = () => {
    new Main();
}