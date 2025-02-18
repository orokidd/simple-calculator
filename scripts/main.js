const btnNumbers = document.querySelectorAll(".number");
const btnOperator = document.querySelectorAll(".operator");
const btnCount = document.querySelector(".count");
const btnClear = document.querySelector(".clear");
const btnCe = document.querySelector(".ce");
const btnPlusMinus = document.querySelector(".plus-min");
const [output, outputOp, output2] = document.querySelectorAll(
  ".operand1, .operator, .operand2"
);

let waitSecondNumber, firstNum, secondNum, operatorNum, finalResult;

function inputNumber(number) {
  // if (!waitSecondNumber) {
  //   output.textContent += number.value;
  //   firstNum += number.value;
  //   return;
  // }

  if (!operatorNum) {
    // clearState();
    // waitSecondNumber = false;
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
    output.textContent = finalResult.toString();
    firstNum = finalResult.toString();
    output2.textContent = "";
    secondNum = "";
  } 
  // else {
  //   waitSecondNumber = true;
  // }

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
  firstNum = "";
  secondNum = "";
  operatorNum = "";
  output.textContent = "";
  outputOp.textContent = "";
  output2.textContent = "";
}

btnNumbers.forEach((number) => {
  number.addEventListener("click", () => inputNumber(number));
});

btnOperator.forEach((operator) => {
  operator.addEventListener("click", () => computeResult(operator.textContent));
});

btnCe.addEventListener("click", deleteCharacter);

function deleteCharacter() {
  if (secondNum) {
    output2.textContent = output2.textContent.slice(0, -1);
    secondNum = secondNum.slice(0, -1);
    console.log(secondNum)
    return;
  }

  if (operatorNum) {
    outputOp.textContent = outputOp.textContent.slice(0, -1);
    operatorNum = operatorNum.slice(0, -1);
    // waitSecondNumber = false;
    return;
  }

  if (firstNum) {
    output.textContent = output.textContent.slice(0, -1);
    firstNum = firstNum.slice(0, -1);
    console.log(firstNum)
    return;
  }
}

btnPlusMinus.addEventListener("click", plusMinusButton);

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

btnCount.addEventListener("click", () => {
  if (!secondNum) return;
  computeResult(operatorNum);
  outputOp.textContent = "";
  operatorNum = "";
});

btnClear.addEventListener("click", clearState);

clearState();
