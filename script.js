const screen = document.querySelector("#screen");
const buttons = document.querySelector("#buttons");
screen.innerText = 0;

let num1;
let operator;
let num2;
let opPressed = false;

buttons.addEventListener("click", (e) => {
    let target = e.target;
    console.log(target.id);
    console.log(target.value);

    let classList = target.classList;
    console.log(target.classList);

    if (classList.contains("num")){
        console.log("Number pressed");
        if (opPressed === false) {
            console.log("Not opPressed.")
            if (screen.innerText == 0) {
                screen.innerText = target.value;
                num1 = Number(screen.innerText);
            }
            else {
                screen.innerText += target.value;
                num1 = Number(screen.innerText);
            }
        }
        else {
            console.log("Not opPressed.")
            if (screen.innerText == 0) {
                screen.innerText = target.value;
                num2 = Number(screen.innerText);
            }
            else {
                screen.innerText += target.value;
                num2 = Number(screen.innerText);
            }
        }
    }
    else if (classList.contains("operator")){
        console.log("Operator pressed");
        console.log(target.value);

        opPressed = true;
        operator = target.value;
        screen.innerText = 0;
        
    }
    else if (classList.contains("equal")){
        console.log("Equal pressed");
        console.log(target.value);
        console.log(`${num1} ${operator} ${num2}`);

        screen.innerText = operate(num1, num2, operator);
        num1 = screen.innerText;
    }
    else {
        console.log(`${target.id} pressed`);
    }

});

function add(num1, num2) {
    return Number(num1) + Number(num2);
}
function subtract(num1, num2) {
    return Number(num1) - Number(num2);
}
function multiply(num1, num2) {
    return Number(num1) * Number(num2);
}
function divide(num1, num2) {
    return Number(num1) / Number(num2);
}

//When User presses `=` button
function operate(num1, num2, operator) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
    }
}
