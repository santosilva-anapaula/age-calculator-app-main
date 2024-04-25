const form = document.getElementById("formDate");
const dayInput = document.getElementById("inputDay");
const monthInput = document.getElementById("inputMonth");
const yearInput = document.getElementById("inputYear");

let outputDay = document.getElementById("outputDay");
let outputMonth = document.getElementById("outputMonth");
let outputYear = document.getElementById("outputYear");

const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth() + 1;
const currentDay = date.getDate();

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    if(validateDate()) {
        outputDay.textContent = Math.abs(currentDay - inputDay.value);
        outputMonth.textContent = Math.abs(currentMonth - inputMonth.value);
        outputYear.textContent = Math.abs(currentYear - inputYear.value); 
    }else{
        outputDay.textContent = "--";
        outputMonth.textContent = "--";
        outputYear.textContent = "--"; 
    }
}

function validateDate() {
    const dayInputValue = parseInt(dayInput.value);
    const monthInputValue = parseInt(monthInput.value);
    const yearInputValue = parseInt(yearInput.value);

    const dayOfMonths = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if(!dayInputValue) {
        showErrorMessage(dayInput, "This fiels is required");
        return false
    }else {
        removeErrorMessage(dayInput);
    }

    if(!monthInputValue) {
        showErrorMessage(monthInput, "This fiels is required");
        return false
    }else {
        removeErrorMessage(monthInput);
    }

    if (!yearInputValue) {
        showErrorMessage(yearInput, "This fiels is required");
        return  false
    }else {
        removeErrorMessage(yearInput);
    }

    if (yearInputValue % 400 === 0 || yearInputValue % 4 === 0 && yearInputValue % 100 !== 0) {
        dayOfMonths[2] = 29;
    }

    if (dayInputValue < 1 || dayInputValue > dayOfMonths[monthInputValue]){
        showErrorMessage(dayInput, "Must be a valid day");
        return false
    }else {
        removeErrorMessage(dayInput);
    }

    if (monthInputValue < 1 || monthInputValue > 12){
        showErrorMessage(monthInput, "Must be a valid month");
        return false
    }else {
        removeErrorMessage(monthInput);
    }

    if (yearInputValue > currentYear) {
        showErrorMessage(yearInput, "Must be in the past");
        return  false
    }else {
        removeErrorMessage(monthInput);
    }
    return true

}

function showErrorMessage(input, errorMessage) {
    const container = input.parentNode;
    container.classList.add("error");
    const spanError = container.querySelector('span');
    spanError.innerText = errorMessage;
}

function removeErrorMessage(input) {
    const container = input.parentNode;
    container.classList.remove("error");
    const spanError = container.querySelector('span');
    spanError.innerText = "";
}