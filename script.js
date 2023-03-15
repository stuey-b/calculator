const calculatorDisplay = document.getElementById(`display`);
const clearLastButton = document.getElementById(`clear-last`);
const allClearButton = document.getElementById(`all-clear`);
const decimalButton = document.getElementById(`decimal`);
const backspaceButton = document.getElementById(`backspace`);
const equalsButton = document.getElementById(`equals`);
const numberButtons = document.querySelectorAll(`.number-btns`);
const operatorButtons = document.querySelectorAll(`.operator-btns`);

let displayNumbers = "";
let chosenOperator = "";
let temporaryResult = "";
let calculatedResult = "";
let hasDecimalPoint = false;

const displayNumbersOnScreen = () => {
  numberButtons.forEach((numberButton) => {
    numberButton.addEventListener(`click`, (e) => {
      const clickedNumberKey = e.target.textContent;
      //checks if there is a decimal point
      if (clickedNumberKey === `.` && !hasDecimalPoint) {
        hasDecimalPoint = true;
        //terminate the function if a decimal exists
      } else if (clickedNumberKey === `.` && hasDecimalPoint) {
        return;
      }
      displayNumbers += clickedNumberKey;
      limitInputLength();
    });
  });
};
displayNumbersOnScreen();

operatorButtons.forEach((operatorButton) => {
  operatorButton.addEventListener(`click`, (e) => {
    
    if (displayNumbers) {
      hasDecimalPoint = false;
      const clickedOperatorButton = e.target.textContent;
    //check if we have 
      if (displayNumbers && temporaryResult && chosenOperator) {
      calculate();
      } else {
        calculatedResult = parseFloat(displayNumbers);
      }
      clearScreenForNextNumber(clickedOperatorButton);
      chosenOperator = clickedOperatorButton;
      console.log(calculatedResult);
    } else {
      // exit function if there are no numbers before the operator
      return
    }
    // allow a decimal to be added for the next number
    // hasDecimalPoint = false;
    // const clickedOperatorButton = e.target.textContent;
    // //check if we have 
    //   if (displayNumbers && temporaryResult && chosenOperator) {
    //   calculate();
    //   } else {
    //     calculatedResult = parseFloat(displayNumbers);
    //   }
    //   clearScreenForNextNumber(clickedOperatorButton);
    //   chosenOperator = clickedOperatorButton;
    //   console.log(calculatedResult);

  });
});

const calculate = () => {
  switch (chosenOperator) {
    case `+`:
      calculatedResult = parseFloat(calculatedResult) + parseFloat(displayNumbers);
      break
    case `-`:
      calculatedResult = parseFloat(calculatedResult) - parseFloat(displayNumbers);
      break
    case `x`:
      calculatedResult = parseFloat(calculatedResult) * parseFloat(displayNumbers);
      break
    case `÷`:
      calculatedResult = parseFloat(calculatedResult) / parseFloat(displayNumbers);
      break
  }
};

const clearLast = () => {
  clearLastButton.addEventListener(`click`, () => {
    calculatorDisplay.textContent = "0";
    displayNumbers = "";
  });
};
clearLast();

const clearAll = () => {
  allClearButton.addEventListener(`click`, () => {
    calculatorDisplay.textContent = "0";
    displayNumbers = "";
    temporaryResult = "";
    calculatedResult = "";
  });
};

clearAll();

const backspaceDelete = () => {
  backspaceButton.addEventListener(`click`, () => {
    const clearedDisplay = (calculatorDisplay.textContent = calculatorDisplay.textContent.slice(0, -1));
    displayNumbers = clearedDisplay;
  });
};
backspaceDelete();

const limitInputLength = () => {
  if (displayNumbers.length >= 13) {
    displayNumbers = displayNumbers.slice(0, 12);
  } else {
    calculatorDisplay.textContent = displayNumbers;
  }
};



function clearScreenForNextNumber() {
  temporaryResult += displayNumbers
  calculatorDisplay.textContent = "0";
  displayNumbers = "";
}
