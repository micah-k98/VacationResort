"use strict"

window.onload = function()
{
    const theForm = document.getElementById("theForm");
    theForm.onsubmit = estimateButtonClicked;
}

function estimateButtonClicked(event)
{
    event.preventDefault();
    const order = {};

    order.roomRate = getRoomRate(order);
    
    order.discounts = getDiscounts(order);
    order.discountedRoomCost = getDiscountedRoomCost(order);
    order.tax = getTax(order);
    order.totalCost = getTotalCost(order);

    getMessageAlert(order);
    displayOutput(order);
}

function getRoomRate(order)
{
    order.checkInDate = new Date(document.getElementById("checkInDateInput").value);
    order.checkInMonth = order.checkInDate.getMonth()+1;

    order.queenRadio = document.getElementById("queenRadio");
    order.kingRadio = document.getElementById("kingRadio");
    order.bedroomSuiteRadio = document.getElementById("bedroomSuiteRadio");
    
    if (order.checkInMonth >= 6 && order.checkInMonth <= 8) 
    {
        if (order.queenRadio.checked || order.kingRadio.checked) order.roomRate = 250.00;
        else order.roomRate = 350.00;
    }
    else 
    {
        if (order.queenRadio.checked || order.kingRadio.checked) order.roomRate = 150.00;
        else order.roomRate = 210.00;
    }

    return order.roomRate;
}

function getDiscounts(order)
{
    order.aaaOrSenior = document.getElementById("aaaOrSeniorRadio");
    order.military = document.getElementById("militaryRadio");

    order.discounts = 0;
    if (order.aaaOrSenior.checked) order.discounts = order.roomRate * .10;
    else if (order.military.checked) order.discounts = order.roomRate * .20;

    return parseFloat((order.discounts).toFixed(2));
}

function getDiscountedRoomCost(order)
{
    order.numOfDays = +(document.getElementById("numOfNightsInput").value);
    return parseFloat(((order.roomRate - order.discounts) * order.numOfDays).toFixed(2));
}

function getTax(order)
{
    return parseFloat((order.discountedRoomCost * .12).toFixed(2));
}

function getTotalCost(order)
{
    return parseFloat((order.discountedRoomCost - order.tax).toFixed(2));
}

function displayOutput(order)
{
    console.log("original room cost: " + order.roomRate);
    console.log("discount: " + order.discounts);
    console.log("discounted room cost : " + order.discountedRoomCost);
    console.log("tax: " + order.tax);
    console.log("total cost: " + order.totalCost);


}

function getMessageAlert(order)
{
    order.numOfAdults = +document.getElementById("numOfAdultsInput").value;
    order.numOfChildren = +document.getElementById("numOfChildrenInput").value;
    order.totalNumOfOccupants = order.numOfAdults + order.numOfChildren;
    order.messageAlert = document.getElementById("messageAlert");

    if (order.queenRadio.checked) 
    {
        if (order.totalNumOfOccupants > 5) document.getElementById("messageAlert").hidden = false;
        else document.getElementById("messageAlert").hidden = true;
    }
    else if (order.kingRadio.checked) 
    {
        if (order.totalNumOfOccupants > 2 ) document.getElementById("messageAlert").hidden = false;
        else document.getElementById("messageAlert").hidden = true;
    }
    else if (order.bedroomSuiteRadio.checked) 
    {
        if (order.totalNumOfOccupants > 6 ) document.getElementById("messageAlert").hidden = false;
        else document.getElementById("messageAlert").hidden = true;
    }
}