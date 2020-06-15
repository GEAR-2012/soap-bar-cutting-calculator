// initial data object with basic parameters
// blockLength: length of the soap block in millimeters
// blockWeight: weight of the soap block in grams
// barWeight: required weight in grams
let soapData = {
    blockLength: 250,
    blockWeight: 1000,
    barWeight: 100,
};

onload = function () {
    const allDataInputs = document.querySelectorAll(".data__input");
    // read data from local storage
    if (localStorage.getItem("blockLength")) {
        soapData.blockLength = parseFloat(localStorage.getItem("blockLength"));
    }
    if (localStorage.getItem("blockWeight")) {
        soapData.blockWeight = parseFloat(localStorage.getItem("blockWeight"));
    }
    if (localStorage.getItem("barWeight")) {
        soapData.barWeight = parseFloat(localStorage.getItem("barWeight"));
    }
    // set up input elements
    allDataInputs.forEach((item, i) => {
        item.addEventListener("change", getInput);
        let dataArray = Object.values(soapData);
        item.value = dataArray[i];
    });
    displayOutput(calculateSoap(soapData));
};

// get inputs from input elements
function getInput() {
    let id = this.id;
    let min = parseInt(this.min);
    let max = parseInt(this.max);
    let value = parseFloat(this.value, 10);
    // 'optimist' validation
    if (!isNaN(value) && value >= min && value <= max) {
        // store new data
        soapData[id] = value;
        // write parameters into local storage
        localStorage.setItem("blockLength", soapData.blockLength);
        localStorage.setItem("blockWeight", soapData.blockWeight);
        localStorage.setItem("barWeight", soapData.barWeight);
        // call the display output function
        displayOutput(calculateSoap(soapData));
    } else {
        let msg = "";
        if (isNaN(value)) {
            msg += "Enter a valid number, pls.";
        }
        if (value < min) {
            msg += "The entered value probalby too small.";
        }
        if (value > max) {
            msg += "The entered value probalby too big.";
        }
        alert(msg);
        this.value = soapData[id];
        this.focus();
        return;
    }
}

function calculateSoap(obj) {
    let f__w; // final weight in gram
    let c__l; // cutting length in millimeter
    let f__a; // final amount of soap bars
    // after cutting each bar should be same or more than the required weight
    f__a = parseInt(obj.blockWeight / obj.barWeight, 10);
    c__l = parseFloat((obj.blockLength / f__a).toFixed(1), 10);
    f__w = parseFloat((obj.blockWeight / f__a).toFixed(1), 10);
    return [c__l, f__w, f__a];
}

function displayOutput(arr) {
    const allDataOutputs = document.querySelectorAll(".data__output");
    allDataOutputs.forEach((output, i) => {
        output.innerText = arr[i];
    });
}
