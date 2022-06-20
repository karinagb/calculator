let runningTotal = 0;
let buffer = "0";
let previousOperator;
const screen = document.querySelector('.screen');

document
  .querySelector('.calc-buttons')
  .addEventListener("click", function(event) {
  buttonClick(event.target.innerText);
})

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);

  } else {
    handleNumber(value);
  } 
  rerender();
}

function handleNumber(value) {
  if (buffer === "0") {
      buffer = value;
  } else {
      buffer += value
  }
}

function handleSymbol(value) {
  switch (value) {
    case "C":
      buffer = "0";
      runningTotal= 0;
      previousOperator = null;
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = "" + runningTotal;
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    default:
      handleMath(value);
      break;
  }
}

// null is absense of anything 
//The substring() method extracts characters, between two indices (positions), from a string, and returns the substring.

function handleMath(value) {
    const intBuffer = parseInt(buffer)
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
      flushOperation(intBuffer);
    }
    previousOperator = value;

    buffer = "0";
}


// calculator's function, for the calc stuff actually could work//

function flushOperation(intBuffer) {
  if (previousOperator === "+") {
      runningTotal += intBuffer;

  } else if (previousOperator === "-") {
      runningTotal -= intBuffer;

  } else if (previousOperator === "x") {
    runningTotal *= intBuffer;

  } else if (previousOperator === "÷") {
    runningTotal /= intBuffer;
  }

}


function rerender() {
  screen.innerText = buffer;
}