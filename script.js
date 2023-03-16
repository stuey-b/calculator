const calculatorDisplay = document.getElementById(`display`);
const subDisplay = document.getElementById(`sub-display`);
const clearLastButton = document.getElementById(`clear-last`);
const allClearButton = document.getElementById(`all-clear`);
const decimalButton = document.getElementById(`decimal`);
const backspaceButton = document.getElementById(`backspace`);
const equalsButton = document.getElementById(`equals`);
const numberButtons = document.querySelectorAll(`.number-btns`);
const operatorButtons = document.querySelectorAll(`.operator-btns`);

let storedNumbers = "";
let temporaryNumbers = "";
let chosenOperator = "";
let calculatedResult = "";
let hasDecimalPoint = false;

numberButtons.forEach((numberButton) => {
  numberButton.addEventListener(`click`, (e) => {
    const clickedNumberKey = e.target.textContent;
    if (clickedNumberKey === `.` && !hasDecimalPoint) {
      hasDecimalPoint = true;
    } else if (clickedNumberKey === `.` && hasDecimalPoint) {
      return;
    }
    storedNumbers += clickedNumberKey;
    limitInputLength();
  });
});

operatorButtons.forEach((operatorButton) => {
  operatorButton.addEventListener(`click`, (e) => {
    //allow a decimal to be added if a number exists
    if (storedNumbers) {
      hasDecimalPoint = false;
      const clickedOperatorButton = e.target.textContent;
      if (storedNumbers && chosenOperator && temporaryNumbers) {
        calculateAnswer();
      } else {
        calculatedResult = parseFloat(storedNumbers);
      }
      storeTempNumber(clickedOperatorButton);
      chosenOperator = clickedOperatorButton;
    } else {
      return;
    }
  });
});

const calculateAnswer = () => {
  switch (chosenOperator) {
    case `+`:
      calculatedResult = parseFloat(calculatedResult) + parseFloat(storedNumbers);
      break;
    case `-`:
      calculatedResult = parseFloat(calculatedResult) - parseFloat(storedNumbers);
      break;
    case `x`:
      calculatedResult = parseFloat(calculatedResult) * parseFloat(storedNumbers);
      break;
    case `÷`:
      calculatedResult = parseFloat(calculatedResult) / parseFloat(storedNumbers);
      break;
  }
};

const storeTempNumber = (clickedOperatorButton) => {
  temporaryNumbers += storedNumbers + "  " + clickedOperatorButton + " ";
  subDisplay.textContent = temporaryNumbers;
  calculatorDisplay.textContent = "";
  storedNumbers = "";
};

equalsButton.addEventListener(`click`, () => {
  if (storedNumbers) {
    calculateAnswer();
    storeTempNumber();
    calculatorDisplay.textContent = calculatedResult;
    subDisplay.textContent = "";
    storedNumbers = calculatedResult;
    temporaryNumbers = "";
  } else {
    return;
  }
});

const clearLast = () => {
  clearLastButton.addEventListener(`click`, () => {
    calculatorDisplay.textContent = "0";
    storedNumbers = "";
  });
};

const clearAll = () => {
  allClearButton.addEventListener(`click`, () => {
    calculatorDisplay.textContent = "0";
    subDisplay.textContent = "";
    storedNumbers = "";
    temporaryNumbers = "";
    calculatedResult = "";
    console.clear();
  });
};

const backspaceDelete = () => {
  backspaceButton.addEventListener(`click`, () => {
    const clearedDisplay = (calculatorDisplay.textContent =calculatorDisplay.textContent.slice(0, -1));
    storedNumbers = clearedDisplay;
  });
};

const limitInputLength = () => {
  if (storedNumbers.length >= 13) {
    storedNumbers = storedNumbers.slice(0, 12);
  } else {
    calculatorDisplay.textContent = storedNumbers;
  }
};


clearAll();
clearLast();
backspaceDelete();