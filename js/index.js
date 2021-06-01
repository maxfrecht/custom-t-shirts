var previewCardElement = document.querySelector(".product__preview");
var imgPreviewElement = document.querySelector(".product__preview img");
var productColorsElements = document.querySelectorAll(".product__colors img");
var formElement = document.querySelector("form");
var buttonAlignElements = document.querySelectorAll(".product__aligns button");
var buttonPositionElements = document.querySelectorAll(".product__positions button");
var placeHolderElement = document.createElement("div");
var limitElement = document.createElement("div");
limitElement.classList.add("limit");
limitElement.style.width =
    imgPreviewElement.scrollWidth - imgPreviewElement.scrollWidth / 1.7 + "px";
limitElement.style.height =
    imgPreviewElement.scrollHeight - imgPreviewElement.scrollHeight / 3 + "px";
previewCardElement.appendChild(limitElement);
var pErrorElement = document.querySelector(".error");
var buttonFontSizeLessElement = document.querySelector(".product__font-size button:nth-of-type(1)");
var buttonFontSizeMoreElement = document.querySelector(".product__font-size button:nth-of-type(2)");
var topValue = 50;
var leftValue = 50;
var fontSize = 1.6;
placeHolderElement.style.fontSize = fontSize + "rem";
placeHolderElement.style.top = topValue + "%";
placeHolderElement.style.left = leftValue + "%";
createPlaceholderText();
getFontSize();
getTshirtColor();
var placeHolderOffsetTop = placeHolderElement.offsetTop;
var placeHolderOffsetLeft = placeHolderElement.offsetLeft;
formElement.addEventListener("input", function (e) {
    getText();
    getColor();
    getFont();
});
getAlignment();
getPosition();
function getTshirtColor() {
    productColorsElements.forEach(function (productColor) {
        productColor.addEventListener("click", function () {
            imgPreviewElement.src = productColor.src;
        });
    });
}
function getPosition() {
    buttonPositionElements.forEach(function (buttonPosition) {
        var spanElement = buttonPosition.querySelector("span");
        buttonPosition.addEventListener("click", function (e) {
            pErrorElement.innerHTML = "";
            if (spanElement.innerHTML.search(/up/) !== -1) {
                topValue--;
                placeHolderElement.style.top = topValue + "%";
            }
            else if (spanElement.innerHTML.search(/down/) !== -1) {
                topValue++;
                placeHolderElement.style.top = topValue + "%";
            }
            else if (spanElement.innerHTML.search(/left/) !== -1) {
                leftValue--;
                placeHolderElement.style.left = leftValue + "%";
            }
            else if (spanElement.innerHTML.search(/right/) !== -1) {
                leftValue++;
                placeHolderElement.style.left = leftValue + "%";
            }
            getError();
        });
    });
}
function getAlignment() {
    buttonAlignElements.forEach(function (buttonAlign) {
        buttonAlign.addEventListener("click", function (e) {
            placeHolderElement.style.textAlign = buttonAlign.dataset.align;
        });
    });
}
function createPlaceholderText() {
    placeHolderElement.classList.add("preview__text");
    placeHolderElement.style.maxWidth =
        imgPreviewElement.scrollWidth - imgPreviewElement.scrollWidth / 1.5 + "px";
    limitElement.appendChild(placeHolderElement);
}
function getText() {
    var firstLineInputElement = document.querySelector("#ligne1");
    var secondLineInputElement = document.querySelector("#ligne2");
    var thirdineInputElement = document.querySelector("#ligne3");
    if (formElement.ligne1.value !== "") {
        formElement.ligne2.disabled = false;
    }
    else {
        if (formElement.ligne2.value !== '') {
            formElement.ligne1.value = formElement.ligne2.value;
            formElement.ligne2.value = "";
        }
        else {
            formElement.ligne2.disabled = true;
        }
    }
    if (formElement.ligne2.value !== "") {
        formElement.ligne3.disabled = false;
    }
    else {
        if (formElement.ligne3.value !== '') {
            formElement.ligne2.value = formElement.ligne3.value;
            formElement.ligne3.value = "";
        }
        else {
            formElement.ligne3.disabled = true;
        }
    }
    placeHolderElement.innerHTML = "" + firstLineInputElement.value + (secondLineInputElement.value !== "" ? "<br>" : "") + secondLineInputElement.value + (thirdineInputElement.value !== "" ? "<br>" : "") + thirdineInputElement.value;
    getError();
}
function getError() {
    pErrorElement.innerHTML = "";
    placeHolderOffsetTop = placeHolderElement.offsetTop;
    placeHolderOffsetLeft = placeHolderElement.offsetLeft;
    var limitWidth = parseInt(limitElement.style.width.split("p")[0]);
    var limitHeight = parseInt(limitElement.style.height.split("p")[0]);
    if (placeHolderOffsetTop - placeHolderElement.scrollHeight / 2 < 0) {
        pErrorElement.innerHTML =
            "Votre texte ne peut pas dépasser de la zone imprimable du T-shirt";
        topValue++;
        placeHolderElement.style.top = topValue + "%";
    }
    if (placeHolderOffsetTop + placeHolderElement.scrollHeight / 2 >
        limitHeight) {
        pErrorElement.innerHTML =
            "Votre texte ne peut pas dépasser de la zone imprimable du T-shirt";
        topValue--;
        placeHolderElement.style.top = topValue + "%";
    }
    if (placeHolderOffsetLeft - placeHolderElement.scrollWidth / 2 < 0) {
        pErrorElement.innerHTML =
            "Votre texte ne peut pas dépasser de la zone imprimable du T-shirt";
        leftValue++;
        placeHolderElement.style.left = leftValue + "%";
    }
    if (placeHolderOffsetLeft + placeHolderElement.scrollWidth / 2 >
        limitWidth) {
        pErrorElement.innerHTML =
            "Votre texte ne peut pas dépasser de la zone imprimable du T-shirt";
        leftValue--;
        placeHolderElement.style.left = leftValue + "%";
    }
}
function getColor() {
    var colorInputElement = document.querySelector("#color");
    placeHolderElement.style.color = colorInputElement.value;
}
function getFont() {
    var fontSelectElement = document.querySelector("select");
    placeHolderElement.style.fontFamily =
        fontSelectElement.selectedOptions[0].value;
}
function getFontSize() {
    buttonFontSizeLessElement.addEventListener("click", function () {
        getError();
        fontSize -= 0.1;
        placeHolderElement.style.fontSize = fontSize + "rem";
    });
    buttonFontSizeMoreElement.addEventListener("click", function () {
        getError();
        fontSize += 0.1;
        placeHolderElement.style.fontSize = fontSize + "rem";
    });
}
