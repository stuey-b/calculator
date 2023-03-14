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
let calculatedResult = null;
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
    const clickedOperatorButton = e.target.textContent;
    // exits function if there are no numbers before the operator
    if (!displayNumbers) {
      console.log(`no numbers to calculate!`);
      return;
    } else {
      hasDecimalPoint = false;
      chosenOperator += clickedOperatorButton;
      console.log(`you clicked the ${chosenOperator} key`);
      if (displayNumbers && temporaryResult && chosenOperator) {
        console.log(calculate());
      } else {
        calculatedResult = parseFloat(displayNumbers)
        console.log(calculatedResult);
      }
    storeTempResult(chosenOperator)
    console.log(calculatedResult);

    }
  });
});

const calculate = () => {
  if (chosenOperator === "x") {
    calculatedResult = parseFloat(calculatedResult) * parseFloat(displayNumbers);
  } else if (chosenOperator === "+") {
    calculatedResult = parseFloat(calculatedResult) + parseFloat(displayNumbers);
  } else if (chosenOperator === "-") {
    calculatedResult = parseFloat(calculatedResult) - parseFloat(displayNumbers);
  } else if (chosenOperator === "÷") {
    calculatedResult = parseFloat(calculatedResult) / parseFloat(displayNumbers);
  }
}

const clearAll = () => {
  allClearButton.addEventListener("click", () => {
    calculatorDisplay.textContent = "";
    displayNumbers = "";
    temporaryResult = "";
    calculatedResult = "";
  });
};

clearAll();

const backspaceDelete = () => {
  backspaceButton.addEventListener(`click`, () => {
    const clearedDisplay = (calculatorDisplay.textContent =
      calculatorDisplay.textContent.slice(0, -1));
    displayNumbers = clearedDisplay;
    console.log(displayNumbers);
  });
};
backspaceDelete();

const limitInputLength = () => {
  if (displayNumbers.length >= 13) {
    displayNumbers = displayNumbers.slice(0, 12);
    // console.log(`number limit reached!`);
  } else {
    calculatorDisplay.textContent = displayNumbers;
    console.log(displayNumbers);
  }
};

const storeTempResult = (chosenOperator) => {
  temporaryResult += displayNumbers + " " + chosenOperator + " ";
  //clear the display
  displayNumbers = "";
}

