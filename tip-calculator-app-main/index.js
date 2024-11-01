"use strict";


const inputBill = document.getElementById("bill-amount");
const inputPeople = document.getElementById("people-count");
const inputCustom = document.getElementById("custom-tip");
const tipButtons = document.querySelectorAll(".tip-btn");
const resetButton = document.getElementById("reset");
const showTipAmount = document.getElementById("tip-amount");
const showTotalAmount = document.getElementById("total");
const warningMessage = document.querySelector(".warning");

let billAmount = 0;
let numberOfPeople = 1;
let tipPercentage = 0;




function resetCalculator() {
  inputBill.value = "";
  inputPeople.value = "";
  inputCustom.value = "";
  tipPercentage = 0;
  
  tipButtons.forEach((btn) => btn.classList.remove("active"));
  showTipAmount.textContent = "$0.00";
  showTotalAmount.textContent = "$0.00";
  warningMessage.style.display = "none";
  resetButton.setAttribute("disabled", true);
}

function calculateTip() {
  billAmount = parseFloat(inputBill.value);
  numberOfPeople = parseInt(inputPeople.value);

  if (numberOfPeople === 0 || isNaN(numberOfPeople)) {
    warningMessage.style.display = "block";
    inputPeople.classList.add("input-error");
  } else {
    warningMessage.style.display = "none";
    inputPeople.classList.remove("input-error");
  }

  if (billAmount > 0 && numberOfPeople > 0 && tipPercentage >= 0) {
    const tipAmountPerPerson = (billAmount * (tipPercentage / 100)) / numberOfPeople;
    const totalAmountPerPerson = (billAmount / numberOfPeople) + tipAmountPerPerson;

    showTipAmount.textContent = `$${tipAmountPerPerson.toFixed(2)}`;
    showTotalAmount.textContent = `$${totalAmountPerPerson.toFixed(2)}`;
  } else {
    showTipAmount.textContent = "$0.00";
    showTotalAmount.textContent = "$0.00";
  }
}


function activateResetButton() {
  if (inputBill.value || inputPeople.value || inputCustom.value) {
    resetButton.removeAttribute("disabled");
  }
}

tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tipButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    tipPercentage = parseFloat(button.getAttribute("data-tip"));
    inputCustom.value = "";
    calculateTip();
    activateResetButton();
  });
});


inputCustom.addEventListener("input", () => {
  tipPercentage = parseFloat(inputCustom.value) || 0;
  tipButtons.forEach((btn) => btn.classList.remove("active"));
  calculateTip();
  activateResetButton();
});


inputBill.addEventListener("input", () => {
  calculateTip();
  activateResetButton();
});

inputPeople.addEventListener("input", () => {
  calculateTip();
  activateResetButton();
});


resetButton.addEventListener("click", resetCalculator);
