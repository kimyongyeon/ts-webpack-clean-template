import "./css/style.css";

export class Main {
    constructor() {
        console.log("Main() start");
    }
}

window.onload = () => {
    new Main();
}