let currentDisplay = "0";
let newValue = document.querySelector(".resultContent");
let calculation = document.querySelector(".calculation");
let val1, val2, operands;
let values = [];
let resultDisplay = false;
calculation.innerHTML = '';
displayUpdate();

//Disable cursor movement
newValue.onselect = function (event) {
  event.preventDefault();
};

//Display current numbers
function appendValue(value) {
  // Check if calculation results are displayed and if their index equals a certain value.
  if (resultDisplay && calculation.innerHTML.slice(-1) === '=') {
    calculation.innerHTML = '';
  }
  //each number clicked enter the value array
  values.push(value)
  // If the first character of the current display is '0', update values and currentDisplay with the new value
  if (currentDisplay.slice(0, 1) === '0') {
    values = [value];
    currentDisplay = value;} 
  // otherwise, update currentDisplay
  else {
    currentDisplay = values.join(''); }
  displayUpdate();
}

//Update's Input content
function displayUpdate() {
  newValue.value = currentDisplay;
}

//Display the value1 with the operator clicked
function displayCal(cal) {
  if (calculation.innerHTML === '') {
    calculation.innerHTML = newValue.value + cal;
  } else {
    calculation.innerHTML += cal
  }
    val1 = newValue.value;
    currentDisplay = "0";
    values = [];
}

//Updates calculation result
const calculateResult = function () {
  if (calculation.innerHTML.slice(-1) === ' ') {
    val2 = newValue.value;
    operands = calculation.innerHTML.split(' ').at(1);
    console.log(operands);
    calculation.innerHTML += val2 + " " + "=";
    math(val1, val2, operands);
    console.log(val1,val2, calculation.innerHTML)
  } else {
    val1 = newValue.value
    val2 = calculation.innerHTML.split(' ').at(-2);
    operands = calculation.innerHTML.split(' ').at(1);
    let upadatedCalculation = calculation.innerHTML.split(' ')
    upadatedCalculation[0] = val1;
    calculation.innerHTML = upadatedCalculation.join(' ')
    math(val1, val2, operands);
  }
};

//Perform the calculation
const math = function (a, b, cal) {
  if (cal === '+') {
    currentDisplay = `${Number(a) + Number(b)}`;
  } else if (cal === '-') {
      currentDisplay = `${Number(a) - Number(b)}`;
    } else if (cal === '/') {
      currentDisplay = `${Number(a) / Number(b)}`;
    } else if (cal === '*') {
      currentDisplay = `${Number(a) * Number(b)}`;
    }
  values = []
  displayUpdate();
  resultDisplay = true;
  console.log(currentDisplay)
}

document.querySelector('.backspace').addEventListener('click', function() {
  if (calculation.innerHTML.slice(-1) ==='=') {
    calculation.innerHTML = '';
  } else {
    if (values.length === 1) {
      newValue.value = '0'
      values = []
    } else {
      values.pop()
      newValue.value = values.join('');
    }
  }
})

//Clear the most recent entry
function clearEntry() {
  if (calculation.innerHTML.slice(-1) === '=') {
    currentDisplay = "";
    values = [];
    calculation.innerHTML = '';
    newValue.value = "0";
  } else{
    newValue.value = "0";
    values = [];
  }
}

//Clear all the input
function Clear() {
  currentDisplay = "";
  values = [];
  calculation.innerHTML = '';
  newValue.value = "0";
}

function bigMath (func) {
  if(func === '%') {
    newValue.value =  newValue.value * (1/100)
  } else if (func === 'reciprocal') {
    calculation.innerHTML = `1/(${newValue.value})`
    newValue.value = 1/newValue.value
  }
  else if (func === 'square') { 
    calculation.innerHTML = `sqr(${newValue.value})`
    newValue.value = newValue.value * newValue.value;
  }
  else if (func === 'squareRoot') {
    calculation.innerHTML = `√(${newValue.value})`
    newValue.value = Math.sqrt(newValue.value)
  }
  values = []
}

const changeSignBtn = document.getElementById("changeSignBtn");
const changeSignInput = document.getElementById("changeSignInput");

changeSignBtn.addEventListener("click", function() {
  if (changeSignInput.checked) {
    if (calculation.innerHTML.slice(-1) === '=') {
      calculation.innerHTML = calculation.innerHTML.includes('negate') ? `negate(${calculation.innerHTML})` : `negate(${newValue.value})` 
      newValue.value = newValue.value.replace('-', '');
    } else {
      newValue.value = newValue.value.replace('-', '');
    }
    changeSignInput.checked = false; // Uncheck the checkbox
  } else {
    if (calculation.innerHTML.slice(-1) === '=') {
      calculation.innerHTML = `negate(${newValue.value})`
      newValue.value = `-${newValue.value}`;
    }  else if (calculation.innerHTML.includes('negate')) {
      calculation.innerHTML = `negate(${calculation.innerHTML})`
      newValue.value = `-${newValue.value}`;
    }
    else {
      newValue.value = `-${newValue.value}`;
    }
    changeSignInput.checked = true; // Check the checkbox
  }
});