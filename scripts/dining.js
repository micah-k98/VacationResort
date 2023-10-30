"use strict"

window.onload = function ()
{
    document.getElementById("payAsYouGoRadio").onclick = diningOptionSelected;
    document.getElementById("allInclusiveRadio").onclick = diningOptionSelected;

    const theForm = document.getElementById("theForm");
    theForm.onsubmit = estimateButtonClicked;    
}

function diningOptionSelected()
{
    const payAsYouGo = document.getElementById("payAsYouGoRadio");
    const allInclusive = document.getElementById("allInclusiveRadio");

    if (payAsYouGo.checked) 
    {
        document.getElementById("availableRestaurants").hidden = false;
        document.getElementById("diningPriceChart").hidden = true;
    }
    else 
    {
        document.getElementById("availableRestaurants").hidden = true;
        document.getElementById("diningPriceChart").hidden = false;
    }
}

function estimateButtonClicked(event)
{
    event.preventDefault();
    
    const selected = {};

    selected.childRate = 49.99;
    selected.adultRate = getAdultRate(selected);
    selected.adjustedPrice = getAdjustedPrice(selected);

    //if statement for errors
    if (selected.adjustedPrice == "NaN" || selected.adjustedPrice == undefined) 
    {
        document.getElementById("alertMessage").hidden = false;
        document.getElementById("displayMessage").hidden = true;
    }
    else 
    {
        document.getElementById("adjustedPrice").innerText = selected.adjustedPrice;
        document.getElementById("displayMessage").hidden = false;
        document.getElementById("alertMessage").hidden = true;
    }
}

function getAdultRate(selected)
{
    selected.adultRate = 0;
    
    const basic = document.getElementById("basicRadio");
    const premium = document.getElementById("premiumRadio");

    if (basic.checked) selected.adultRate = 62.50;
    else selected.adultRate = 80.00;

    return selected.adultRate;
}

function getAdjustedPrice(selected)
{
    const confirmationNumber = document.getElementById("confirmationNumberInput").value;
    const dash = confirmationNumber.lastIndexOf("-");
    const colon = confirmationNumber.indexOf(":");
    const colon2 = confirmationNumber.lastIndexOf(":");
    selected.numOfDays = +confirmationNumber.substring(dash + 1, colon);
    selected.numOfAdults = +confirmationNumber.substring(colon + 1, colon2);
    selected.numOfChildren = +confirmationNumber.substring(colon2 + 1);

    selected.adjustedPrice = selected.numOfDays * ((selected.numOfAdults * selected.adultRate) + (selected.numOfChildren * selected.childRate));
    return selected.adjustedPrice.toFixed(2);
}