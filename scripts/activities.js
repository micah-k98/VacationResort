"use strict"

window.onload = function()
{
    //this allows the function showActivities to be called everytime a different option under select is selected
    document.getElementById("availableActivites").onchange = showActivities;
}

function showActivities()
{
    //returns values 1-3 depending on the selected category
    const selectedCategory = document.getElementById("availableActivites").value; 
    
    let artsCrafts = document.getElementById("artsCraftsActivities");
    let adventure = document.getElementById("adventureActivities");
    let museumsCulture = document.getElementById("museumsCultureActivities");

    switch(selectedCategory)
    {
        case "1":
            artsCrafts.hidden = false;
            adventure.hidden = true;
            museumsCulture.hidden = true;
            break;

        case "2":
            artsCrafts.hidden = true;
            adventure.hidden = false;
            museumsCulture.hidden = true;
            break;
        
        case "3":
            artsCrafts.hidden = true;
            adventure.hidden = true;
            museumsCulture.hidden = false;
            break;
    }
}