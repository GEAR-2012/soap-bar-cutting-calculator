// get DOM elements
const allInputs = document.querySelectorAll(".accordion__input");
// allInputs.forEach((item) => {
//     item.disabled = true;
// });

// Step 1, get the input datas
let length = 315; // in millimeter
// let height = 120; // in millimeter
// let width = 80; // in millimeter
let weight = 1949; // in gram
let reqWeight = 100; // in gram
// define other variables
let cuttingLength;

// Step 2, calculate the cutting length
cuttingLength = parseFloat((300 / (weight / reqWeight)).toFixed(1), 10);
console.log(cuttingLength);

let acc1 = document.querySelector("#section1");

// acc1.checked = true;
