"use strict"

/**
 * Rules for determining the rental charges:
 * - basic car rental is $29.99 per day
 * - there is a 30% surcharge on the basic car rental for drivers under 25
 */


window.onload = function()
{
    // const estimateButton = document.getElementById("estimateButton");
    // estimateButton.onclick = estimateButtonClicked;

    //to prevent the form from being submitted and reloading the page, use onsubmit event and add the event.preventDefault()
    const theForm = document.getElementById("theForm");
    theForm.onsubmit = estimateButtonClicked;

}

function estimateButtonClicked(event)
{
    event.preventDefault(); //add this when .onsubmit event was done
    const rental = {};

    //input
    rental.pickupDate = document.getElementById("pickupDateInput").value;
    rental.numOfDays = document.getElementById("numOfDaysInput").value;

    //car rental cost
    rental.carRentalCost = calculateCarRentalPerDay(rental);

    //checkboxes for options
    rental.optionsCost = calculateCheckedRentalOptions(rental);

    //under 25 radio button
    rental.under25SurchargeCost = calculateCheckedSurcharge(rental);

    //total cost
    rental.totalCost = +(rental.carRentalCost + rental.optionsCost + rental.under25SurchargeCost).toFixed(2);


    displayOutput(rental);
}

function calculateCarRentalPerDay(rental)
{
    const carRentalPerDay = 29.99;
    return +(carRentalPerDay * rental.numOfDays).toFixed(2);
}

function calculateCheckedRentalOptions(rental)
{
    const tollTag = document.getElementById("tollTag");
    const gps = document.getElementById("gps");
    const roadsideAssistance = document.getElementById("roadsideAssistance");

    rental.optionsCost = 0.00;
    if (tollTag.checked) rental.optionsCost += rental.numOfDays * 3.95;
    if (gps.checked) rental.optionsCost += rental.numOfDays * 2.95;
    if (roadsideAssistance.checked) rental.optionsCost += rental.numOfDays * 2.95;

    return +(rental.optionsCost).toFixed(2);
}

function calculateCheckedSurcharge(rental)
{
    const under25 = document.getElementById("under25");

    rental.under25SurchargeCost = 0.00;
    if (under25.checked) rental.under25SurchargeCost = rental.carRentalCost * .30; //30% surcharged based on the instructions

    return +(rental.under25SurchargeCost).toFixed(2);
}

function displayOutput(rental)
{
    document.getElementById("carRentalCost").innerText = rental.carRentalCost;
    
    //if else so that the output is not just "0" but "0.00"
    if (rental.optionsCost == 0) document.getElementById("optionsCost").innerText = "0.00";
    else document.getElementById("optionsCost").innerText = rental.optionsCost;

    if (rental.under25SurchargeCost == 0) document.getElementById("under25SurchargeCost").innerText = "0.00";
    else document.getElementById("under25SurchargeCost").innerText = rental.under25SurchargeCost;

    document.getElementById("totalCost").innerText = rental.totalCost;
}