const outputDiv = document.querySelector(".outputDiv")
const numbersButton = document.querySelectorAll(".number");
const operatorButton = document.querySelectorAll(".operator")
const countButton = document.querySelector(".count");
const clearButton = document.querySelector(".clear");
const output = document.querySelector(".operand1");
const outputOp = document.querySelector(".operator");
const output2 = document.querySelector(".operand2");

let waitSecondNumber, firstNum, secondNum, operatorNum, finalResult;

function inputNumber(number) {
  if (!waitSecondNumber) {
    output.textContent += number.value;
    firstNum += number.value;
  } else {
    if (!operatorNum) {
      clearState();
      output.textContent += number.value;
      firstNum += number.value;
    } else {
      output2.textContent += number.value;
      secondNum += number.value;
    }
  }
}

function computeResult(operator) {
  if (secondNum) {
    finalResult = countResult(parseFloat(firstNum), parseFloat(secondNum), operatorNum);
    output.textContent = finalResult;
    firstNum = finalResult;
    output2.textContent = ""
    secondNum = "";
  } else {
    waitSecondNumber = true;
  }
  outputOp.textContent = operator;
  operatorNum = operator;
}

function countResult(num1, num2, op) {
  switch (op) {
    case "+":
      return num1 + num2;

    case "-":
      return num1 - num2;

    case "*":
      return num1 * num2;

    case "/":
      return num2 === 0 ? "Error" : num1 / num2;
  }
}

function clearState() {
  waitSecondNumber = false;
  firstNum = ""
  secondNum = ""
  operatorNum = ""
  output.textContent = ""
  outputOp.textContent = ""
  output2.textContent = ""
}

numbersButton.forEach((number) => {
  number.addEventListener('click', () => inputNumber(number));
});

operatorButton.forEach((operator) => {
  operator.addEventListener('click', () => computeResult(operator.textContent))
})

countButton.addEventListener('click', () => {
    computeResult(operatorNum);
    outputOp.textContent = "";
    operatorNum = "";
})

clearButton.addEventListener('click', clearState)

clearState(); 

// function computeResult(operator) {
//   if (secondNum) {
//     finalResult = countResult(parseFloat(firstNum), parseFloat(secondNum), operatorNum);
//     output.textContent = finalResult;
//     firstNum = finalResult;
//     output2.textContent = ""
//     secondNum = "";
//   } else {
//     waitSecondNumber = true;
//   }
//   outputOp.textContent = operator;
//   operatorNum = operator;
// }