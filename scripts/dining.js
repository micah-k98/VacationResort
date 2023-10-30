"use strict"



window.onload = function ()
{
    document.getElementById("payAsYouGoRadio").onclick = diningOptionSelected;
    document.getElementById("allInclusiveRadio").onclick = diningOptionSelected;
    // const theForm = document.getElementById("theForm");
    // theForm.onsubmit = estimateButtonClicked;    
}

function diningOptionSelected()
{
    const selected = {};

    selected.payAsYouGo = document.getElementById("payAsYouGoRadio");
    selected.allInclusive = document.getElementById("allInclusiveRadio");

    if (selected.payAsYouGo.checked) document.getElementById("availableRestaurants").hidden = false;
    else document.getElementById("availableRestaurants").hidden = true;
}

// function estimateButtonClicked(event)
// {
//     event.preventDefault();
    
// }