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
    order.messageAlert = getMessageAlert(order);
    order.discounts = getDiscounts(order);
    order.discountedRoomCost = getDiscountedRoomCost(order);
    order.tax = getTax(order);
    order.totalCost = getTotalCost(order);
    order.confirmationNumber = getConfirmationNumber(order);

    displayOutput(order);
}

function getRoomRate(order)
{
    order.checkInDate = new Date(document.getElementById("checkInDateInput").value);
    order.checkInDate = new Date(order.checkInDate.getFullYear(), order.checkInDate.getUTCMonth(), order.checkInDate.getUTCDate());
    order.checkInMonth = order.checkInDate.getUTCMonth() + 1;
    order.numOfDays = +(document.getElementById("numOfNightsInput").value);

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

    return +((order.roomRate * order.numOfDays).toFixed(2));
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

    return document.getElementById("messageAlert").hidden;
}

function getDiscounts(order)
{
    order.aaaOrSenior = document.getElementById("aaaOrSeniorRadio");
    order.military = document.getElementById("militaryRadio");

    order.discounts = 0;
    if (order.aaaOrSenior.checked) order.discounts = order.roomRate * .10;
    else if (order.military.checked) order.discounts = order.roomRate * .20;

    return +((order.discounts).toFixed(2));
}

function getDiscountedRoomCost(order)
{
    return +((order.roomRate - order.discounts).toFixed(2));
}

function getTax(order)
{
    return +((order.discountedRoomCost * .12).toFixed(2));
}

function getTotalCost(order)
{
    return +((order.discountedRoomCost + order.tax).toFixed(2));
}

function getConfirmationNumber(order)
{
    const firstThree = (document.getElementById("fullNameInput").value).substring(0, 3).toUpperCase();
    if (order.checkInMonth < 10)  order.checkInMonth = order.checkInMonth.toString().padStart(2,'0');
    const checkInYear = order.checkInDate.getFullYear();

    return `${firstThree}-${order.checkInMonth}${checkInYear}-${order.numOfDays}:${order.numOfAdults}:${order.numOfChildren}`
}

function displayOutput(order)
{
    document.getElementById("roomRate").innerText = (order.roomRate).toFixed(2);
    document.getElementById("discounts").innerText = (order.discounts).toFixed(2);
    document.getElementById("discountedRoomCost").innerText = (order.discountedRoomCost).toFixed(2);
    document.getElementById("tax").innerText = (order.tax).toFixed(2);
    document.getElementById("totalCost").innerText = (order.totalCost).toFixed(2);
    document.getElementById("confirmationNumber").innerText = order.confirmationNumber;
    
    if (order.messageAlert == true)
    {
        document.getElementById("estimatedCostTable").hidden = false;  //this will show the output
    }
    else document.getElementById("estimatedCostTable").hidden = true; //if the message alert is shown, the output will be kept hidden
}

