const calculatorDisplay = document.getElementById(`display`);
const subDisplay = document.getElementById(`sub-display`);
const clearLastButton = document.getElementById(`clear-last`);
const allClearButton = document.getElementById(`all-clear`);
const backspaceButton = document.getElementById(`backspace`);
const equalsButton = document.getElementById(`equals`);
const numberButtons = document.querySelectorAll(`.number-btns`);
const operatorButtons = document.querySelectorAll(`.operator-btns`);

let storedNumbers = "";
let temporaryNumbers = "";
let storedOperator = "";
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
    const clickedOperatorButton = e.target.textContent;
    if (storedNumbers) {
      hasDecimalPoint = false;
      if (storedNumbers && storedOperator && temporaryNumbers) {
        calculateAnswer();
      } else {
        calculatedResult = parseFloat(storedNumbers);
      }
      storeTempNumber(clickedOperatorButton);
      storedOperator = clickedOperatorButton;
    } else {
      return;
    }
  });
});

equalsButton.addEventListener(`click`, () => {
  if (storedNumbers) {
    calculateAnswer();
    storeTempNumber();
    calculatorDisplay.textContent = calculatedResult;
    subDisplay.textContent = ``;
    storedNumbers = calculatedResult;
    temporaryNumbers = ``;
  } else {
    return;
  }
});

const calculateAnswer = () => {
  switch (storedOperator) {
    case `+`:
      result = parseFloat(calculatedResult) + parseFloat(storedNumbers);
      break;
    case `-`:
      result = parseFloat(calculatedResult) - parseFloat(storedNumbers);
      break;
    case `x`:
      result = parseFloat(calculatedResult) * parseFloat(storedNumbers);
      break;
    case `÷`:
      result = parseFloat(calculatedResult) / parseFloat(storedNumbers);
      break;
  }
  calculatedResult = Math.round(result * 100) / 100;
};

const storeTempNumber = (clickedOperatorButton) => {
  temporaryNumbers += storedNumbers + "  " + clickedOperatorButton + " ";
  subDisplay.textContent = temporaryNumbers;
  calculatorDisplay.textContent = ``;
  storedNumbers = ``;
};

const clearLast = () => {
  clearLastButton.addEventListener(`click`, () => {
    hasDecimalPoint = false;
    calculatorDisplay.textContent = `0`;
    storedNumbers = ``;
  });
};

clearLast();

const clearAll = () => {
  allClearButton.addEventListener(`click`, () => {
    hasDecimalPoint = false;
    calculatorDisplay.textContent = `0`;
    subDisplay.textContent = ``;
    storedNumbers = ``;
    temporaryNumbers = ``;
    calculatedResult = ``;
  });
};

clearAll();

const backspaceDelete = () => {
  backspaceButton.addEventListener(`click`, () => {
    storedNumbers = calculatorDisplay.textContent =
      calculatorDisplay.textContent.slice(0, -1);
  });
};

backspaceDelete();

const limitInputLength = () => {
  if (storedNumbers.length >= 11) {
    storedNumbers = storedNumbers.slice(0, 11);
  } else {
    calculatorDisplay.textContent = storedNumbers;
  }
};
