const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "=", "Enter", "Backspace", "sqrt", "^", "(", ")", "M+", "M-", "MR", "MC"];
let output = "";
let memory = 0;

const calculate = (btnValue) => {
    if ((btnValue === "=" || btnValue === "Enter") && output !== "") {
        output = output.replace(/√/g, "Math.sqrt");
        output = output.replace(/\^/g, "**");
        try {
            output = eval(output);
        } catch {
            output = "Error";
        }
    } else if (btnValue === "AC") {
        output = "";
    } else if (btnValue === "DEL" || btnValue === "Backspace") {
        output = output.toString().slice(0, -1);
    } else if (btnValue === "M+") {
        memory += parseFloat(output) || 0;
        output = "";
    } else if (btnValue === "M-") {
        memory -= parseFloat(output) || 0;
        output = "";
    } else if (btnValue === "MR") {
        output = memory.toString();
    } else if (btnValue === "MC") {
        memory = 0;
        output = "";
    } else {
        if (output === "" && specialChars.includes(btnValue)) return;
        output += btnValue;
    }
    display.value = output;
};

buttons.forEach((button) => {
    button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});

document.addEventListener("keydown", (e) => {
    const key = e.key;
    if (specialChars.includes(key) || /^\d$/.test(key)) {
        e.preventDefault();
        calculate(key);
    }
});
