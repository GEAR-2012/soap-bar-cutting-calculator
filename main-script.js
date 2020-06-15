// initial data object with basic parameters
// inp1: length in millimeters
// inp2: weight in grams
// inp3: required weight in grams
let soapData = {
    data__1: 250,
    data__2: 1000,
    data__3: 100,
};

onload = function () {
    const allDataInputs = document.querySelectorAll(".data__input");

    // read data from local storage
    if (localStorage.getItem("soapData_1")) {
        soapData.data__1 = parseFloat(localStorage.getItem("soapData_1"));
    }
    if (localStorage.getItem("soapData_2")) {
        soapData.data__2 = parseFloat(localStorage.getItem("soapData_2"));
    }
    if (localStorage.getItem("soapData_3")) {
        soapData.data__3 = parseFloat(localStorage.getItem("soapData_3"));
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
        localStorage.setItem("soapData_1", soapData.data__1);
        localStorage.setItem("soapData_2", soapData.data__2);
        localStorage.setItem("soapData_3", soapData.data__3);
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
    f__a = parseInt(obj.data__2 / obj.data__3, 10);
    c__l = parseFloat((obj.data__1 / f__a).toFixed(1), 10);
    f__w = parseFloat((obj.data__2 / f__a).toFixed(1), 10);
    return [c__l, f__w, f__a];
}

function displayOutput(arr) {
    const allDataOutputs = document.querySelectorAll(".data__output");
    allDataOutputs.forEach((output, i) => {
        output.innerText = arr[i];
    });
}
