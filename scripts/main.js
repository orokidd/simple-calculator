const outputDiv = document.querySelector(".outputDiv")
const numbersButton = document.querySelectorAll(".number");
const operatorButton = document.querySelectorAll(".operator")
const countButton = document.querySelector(".count");
const clearButton = document.querySelector(".clear");
const output = document.querySelector(".operand1");
const outputOp = document.querySelector(".operator");
const output2 = document.querySelector(".operand2");

let waitSecondNumber, firstNum, secondNum, operatorNum, finalResult;

function inputFirstNumber(number) {
  output.textContent += number.value;
  firstNum += number.value;
}

function inputSecondNumber(number) {
  if (!operatorNum) {
    clearState();
    inputFirstNumber(number);
  } else {
    output2.textContent += number.value;
    secondNum += number.value;
  }
}

operatorButton.forEach((operator) => {
  operator.addEventListener('click', () => computeResult(operator.textContent))
})

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
  number.addEventListener('click', () => {
    if (!waitSecondNumber) {
      inputFirstNumber(number)
    } else {
      inputSecondNumber(number)
    }
  })
})

countButton.addEventListener('click', () => {
  if (!secondNum) {
    return;
  }
  else {
    computeResult(operatorNum);
    outputOp.textContent = "";
  }
})

clearButton.addEventListener('click', clearState)

clearState(); 