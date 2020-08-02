import './css/foundry.css';
import './css/dnd5e.css';
import './css/style.css';


import sheetTemplate from "./handlebars/character-sheet.handlebars";

Hooks.emit("start");

// when document is loaded, add sheet
document.addEventListener("DOMContentLoaded", async function () {
    if (window.location.href.split(/\?(.+)/)[1] == undefined) {
        notFoundError("No Link Entered");
        return;
    }

    let loadElement = $(`<div class="errorDiv"><div><p>Retrieving Data</p></div></div>`);
    $("body").append(loadElement);

    const windowData = window.location.href.split(/\?(.+)/)[1];

    $(document.body).find("form#siteUrlForm input#siteUrl").val(windowData);


    let [dataUrl, , actorId] = windowData.split(/(\.json)(.+)/);
    dataUrl += ".json";

    try {
    const dataJSON = await getJSON(dataUrl);

    if (dataJSON[actorId] === undefined) {
        notFoundError("Actor Not Found");
        return;
    }


    const baseUrl = dataUrl.replace(/(\/)(?!.*\1).*\b\.json\b/, "").replace("actorAPI", "");

    document.body.style.setProperty("--parchment", `url('${baseUrl}systems/dnd5e/ui/parchment.jpg')`);
    document.body.style.setProperty("--denim", `url('${baseUrl}ui/denim.png')`);
    document.body.style.setProperty("--d20-grey", `url('${baseUrl}icons/svg/d20-grey.svg')`);
    document.body.style.setProperty("--d20-black", `url('${baseUrl}icons/svg/d20-black.svg')`);

    let actorData = dataJSON[actorId];


    Hooks.emit("showSheet", sheetTemplate, actorData, baseUrl);

    } catch {
        notFoundError("URL not found");
    }

    loadElement.remove();

});

// onsubmit
$(document.body).find("form#siteUrlForm").on("submit", function (e) {
    window.location = window.location.origin + window.location.pathname + "?" + $(e.target).find("input#siteUrl").val();
});

function getJSON(url) {
    return new Promise((resolve, reject) => {
        $.ajax({
            dataType: "json",
            url: 'https://cors-anywhere.herokuapp.com/' + url,
            success: data => resolve(data),
            error: () => reject()
        });
    });
}

function notFoundError(textContent) {
    let divElement = document.createElement("div");
    divElement.className = "errorDiv";
    $("body").append(`<div class="errorDiv"><div><p>${textContent}</p></div></div>`);
}


