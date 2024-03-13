let currentDisplay = "";
let resultDisplay = false;
let newValue = document.querySelector('.resultContent');
let calculation = document.querySelector('.calculation');
newValue.value = '0';

newValue.onselect = function(event) {
  event.preventDefault();
};

function appendValue (value) {
  if (currentDisplay === '' || resultDisplay) {
    currentDisplay = value;
  } else {
    if (currentDisplay.slice(0,1) > 0) {
      currentDisplay += value;
    } else {
      currentDisplay = value;
    }
  }

  resultDisplay = false;

  displayUpdate() 
  displaycal(value)
}

function displayUpdate () {
newValue.value = currentDisplay;
}



const calculateResult = function () {
  calculation.innerHTML += currentDisplay + ' = ';
  let valueToBeCalculated = calculation.innerHTML.slice().replace(' = ', '')
  console.log(valueToBeCalculated)
  let result = eval(valueToBeCalculated)
  currentDisplay = result;
  displayUpdate()
  resultDisplay = true;
}

function displaycal(cal) {
  if (cal === ' * ' || cal === ' / ' || cal === ' + ' || cal === ' - ') {
    const newCurrentDisplay = currentDisplay.slice()
    newValue.value = newCurrentDisplay.replace(cal, '');
    calculation.innerHTML = newValue.value + cal;
    console.log(calculation.innerHTML)
    resultDisplay = true;
  }
}