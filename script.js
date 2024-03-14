let currentDisplay = "";
let newValue = document.querySelector(".resultContent");
let calculation = document.querySelector(".calculation");
newValue.value = "0";
let val1, val2;
let valuesToClear = [];

newValue.onselect = function (event) {
  event.preventDefault();
};

function appendValue(value) {
  valuesToClear.push(value)
  if (currentDisplay === "") {
    currentDisplay = value;
  } else {
    if (currentDisplay.slice(0, 1) > 0) {
      currentDisplay = valuesToClear.join('');
    } else {
      currentDisplay = value;
    }
  }

  displayUpdate();
  console.log(valuesToClear)
}

function displayUpdate() {
  newValue.value = currentDisplay;
}

function displayCal(cal) {
  currentDisplay = "";
  valuesToClear = [];
  calculation.innerHTML = newValue.value + cal;
  val1 = newValue.value;
  console.log(val1);
  console.log(calculation.innerHTML);
}

const calculateResult = function () {
  val2 = valuesToClear.join('');
  console.log(val2);
  let operands = calculation.innerHTML.slice(-2);
  console.log(operands);
  calculation.innerHTML += val2 + " " + "=";
  math(val1, val2, operands);
};

const math = function (a, b, cal) {
  currentDisplay = `${Number(a) + cal + Number(b)}`;
  if (currentDisplay.includes("+")) {
    currentDisplay = Number(a) + Number(b);
  } else if (currentDisplay.includes("-")) {
    currentDisplay = Number(a) - Number(b);
  } else if (currentDisplay.includes("/")) {
    currentDisplay = Number(a) / Number(b);
  } else if (currentDisplay.includes("*")) {
    currentDisplay = Number(a) * Number(b);
  }
  displayUpdate();
  console.log(currentDisplay); 
}

document.querySelector('.backspace').addEventListener('click', function() {
  if (calculation.innerHTML.slice(-1) ==='=') {
    calculation.innerHTML = '';
  } else {
    if (valuesToClear.length  === 1) {
      newValue.value = '0'
      valuesToClear = []
    } else {
      valuesToClear.pop()
      newValue.value = valuesToClear.join('');
    }
  }
  console.log(calculation.innerHTML.slice(-2))
  console.log(valuesToClear)
})