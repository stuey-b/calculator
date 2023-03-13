const add = (num1, num2) => {
  return num1 + num2;
};

const subtract = (num1, num2) => {
  return num1 - num2;
};

const multiply = (num1, num2) => {
  return num1 * num2;
};

const divide = (num1, num2) => {
  return num1 / num2;
};

const operate = (inputNumber, operator, num2) => {
  switch (operator) {
    case `+`:
      return add(num1, num2);
    case `-`:
      return subtract(num1, num2);
    case `*`:
      return multiply(num1, num2);
    case `/`:
      return divide(num1, num2);
  }
};
// console.log(operate(2, `+`, 3));


//Create the functions that populate the display when you
//click the number buttons. store the ‘display value’
//in a variable somewhere for use in the next step.

const calculatorDisplay = document.getElementById(`display`);
const clearButton = document.getElementById(`clear`);
const decimalButton = document.getElementById(`decimal`);
const equalsButton = document.getElementById(`equals`);
const numberButtons = document.querySelectorAll(`.number-btns`)
const operatorButtons = document.querySelectorAll(`.operator-btns`)

const displayNumbers = () => {

   let displayNum = ""
  
     numberButtons.forEach((numberButton) => {
      numberButton.addEventListener(`click`, (e) => {
        pressedNumberKey = e.target.textContent;
        console.log(`you pressed the ${pressedNumberKey} key`);
        displayNum += pressedNumberKey;
        calculatorDisplay.textContent = displayNum;
     })
  });
  
}
displayNumbers();
