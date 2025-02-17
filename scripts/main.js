const outputDiv = document.querySelector(".outputDiv");
const numbersButton = document.querySelectorAll(".number");
const operatorButton = document.querySelectorAll(".operator");
const countButton = document.querySelector(".count");
const clearButton = document.querySelector(".clear");
const ceButton = document.querySelector(".ce");
const plusMinus = document.querySelector(".plus-min");
const [output, outputOp, output2] = document.querySelectorAll(
  ".operand1, .operator, .operand2"
);

let waitSecondNumber, firstNum, secondNum, operatorNum, finalResult;

function inputNumber(number) {
  if (!waitSecondNumber) {
    output.textContent += number.value;
    firstNum += number.value;
    return;
  }

  if (!operatorNum) {
    clearState();
    output.textContent += number.value;
    firstNum += number.value;
  } else {
    output2.textContent += number.value;
    secondNum += number.value;
  }
}

function computeResult(operator) {
  if (secondNum) {
    finalResult = countResult(
      parseFloat(firstNum),
      parseFloat(secondNum),
      operatorNum
    );
    output.textContent = finalResult;
    firstNum = finalResult;
    output2.textContent = "";
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
    default:
      return "Invalid Operation";
  }
}

function clearState() {
  waitSecondNumber = false;
  firstNum = 0;
  secondNum = 0;
  operatorNum = "";
  output.textContent = "";
  outputOp.textContent = "";
  output2.textContent = "";
}

numbersButton.forEach((number) => {
  number.addEventListener("click", () => inputNumber(number));
});

operatorButton.forEach((operator) => {
  operator.addEventListener("click", () => computeResult(operator.textContent));
});

ceButton.addEventListener("click", deleteCharacter);

function deleteCharacter() {
  if (!waitSecondNumber) {
    output.textContent = output.textContent.slice(0, -1);
    firstNum = firstNum.slice(0, -1);
  } else {
    output2.textContent = output2.textContent.slice(0, -1);
    secondNum = secondNum.slice(0, -1);
  }
}

plusMinus.addEventListener("click", plusMinusButton);

function plusMinusButton() {
  if (!waitSecondNumber) {
    const isMinusNumber = output.textContent.includes("-");
    if (isMinusNumber) {
      output.textContent = output.textContent.slice(1);
      firstNum = firstNum.slice(1);
      return;
    }
    output.textContent = "-" + output.textContent;
    firstNum = "-" + firstNum;
    return;
  }

  const isMinusNumber = output2.textContent.includes("-");
  if (isMinusNumber) {
    output2.textContent = output2.textContent.slice(1);
    secondNum = secondNum.slice(1);
    return;
  }
  output2.textContent = "-" + output2.textContent;
  secondNum = "-" + secondNum;
}

countButton.addEventListener("click", () => {
  if (!secondNum) return;
  computeResult(operatorNum);
  outputOp.textContent = "";
  operatorNum = "";
});

clearButton.addEventListener("click", clearState);

clearState();
