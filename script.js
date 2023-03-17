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
    //allow a decimal to be added to next input number if 1st has been stored.
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
    subDisplay.textContent = "";
    storedNumbers = calculatedResult;
    temporaryNumbers = "";
  } else {
    return;
  }
});

const calculateAnswer = () => {
  switch (storedOperator) {
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
      if (storedNumbers == 0) {
        console.log(`Stop that NERDDDD`);
      } else {
        calculatedResult = parseFloat(calculatedResult) / parseFloat(storedNumbers);
        break;
      }
        
      }    
  }

const storeTempNumber = (clickedOperatorButton) => {
  // pass in clicked operator string and add to sub display
  temporaryNumbers += storedNumbers + "  " + clickedOperatorButton + " ";
  subDisplay.textContent = temporaryNumbers;
  //clear the main display for the next input
  calculatorDisplay.textContent = "";
  storedNumbers = "";
};

const clearLast = () => {
  clearLastButton.addEventListener(`click`, () => {
    calculatorDisplay.textContent = "0";
    storedNumbers = "";
  });
};
clearLast();

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
clearAll();

const backspaceDelete = () => {
  backspaceButton.addEventListener(`click`, () => {
    const clearedDisplay = (calculatorDisplay.textContent = calculatorDisplay.textContent.slice(0, -1));
    storedNumbers = clearedDisplay;
  });
};

backspaceDelete();

const limitInputLength = () => {
  if (storedNumbers.length >= 13) {
    storedNumbers = storedNumbers.slice(0, 12);
  } else {
    calculatorDisplay.textContent = storedNumbers;
  }
};
