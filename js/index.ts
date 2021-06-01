const previewCardElement:HTMLDivElement = document.querySelector(".product__preview");
const imgPreviewElement:HTMLImageElement = document.querySelector(".product__preview img");
const productColorsElements:NodeListOf<HTMLImageElement> = document.querySelectorAll(".product__colors img");
const formElement:HTMLFormElement = document.querySelector("form");
const buttonAlignElements:NodeListOf<HTMLButtonElement> = document.querySelectorAll(
  ".product__aligns button"
);
const buttonPositionElements:NodeListOf<HTMLButtonElement> = document.querySelectorAll(
  ".product__positions button"
);
const placeHolderElement:HTMLDivElement = document.createElement("div");
const limitElement:HTMLDivElement = document.createElement("div");

limitElement.classList.add("limit");
limitElement.style.width =
  imgPreviewElement.scrollWidth - imgPreviewElement.scrollWidth / 1.7 + "px";
limitElement.style.height =
  imgPreviewElement.scrollHeight - imgPreviewElement.scrollHeight / 3 + "px";
previewCardElement.appendChild(limitElement);

const pErrorElement:HTMLParagraphElement = document.querySelector(".error");
const buttonFontSizeLessElement:HTMLButtonElement = document.querySelector(
  ".product__font-size button:nth-of-type(1)"
);
const buttonFontSizeMoreElement:HTMLButtonElement = document.querySelector(
  ".product__font-size button:nth-of-type(2)"
);

let topValue:number = 50;
let leftValue:number = 50;
let fontSize:number = 1.6;

placeHolderElement.style.fontSize = fontSize + "rem";
placeHolderElement.style.top = topValue + "%";
placeHolderElement.style.left = leftValue + "%";

createPlaceholderText();
getFontSize();
getTshirtColor();

let placeHolderOffsetTop:number = placeHolderElement.offsetTop;
let placeHolderOffsetLeft:number = placeHolderElement.offsetLeft;

formElement.addEventListener("input", (e:Event):void => {
  getText();

  getColor();
  getFont();
});

getAlignment();
getPosition();

function getTshirtColor():void {
  productColorsElements.forEach((productColor) => {
    productColor.addEventListener("click", () => {
      imgPreviewElement.src = productColor.src;
    });
  });
}

function getPosition():void {
  buttonPositionElements.forEach((buttonPosition) => {
    const spanElement = buttonPosition.querySelector("span");

    buttonPosition.addEventListener("click", (e) => {
      pErrorElement.innerHTML = "";

      if (spanElement.innerHTML.search(/up/) !== -1) {
        topValue--;
        placeHolderElement.style.top = topValue + "%";
      } else if (spanElement.innerHTML.search(/down/) !== -1) {
        topValue++;
        placeHolderElement.style.top = topValue + "%";
      } else if (spanElement.innerHTML.search(/left/) !== -1) {
        leftValue--;
        placeHolderElement.style.left = leftValue + "%";
      } else if (spanElement.innerHTML.search(/right/) !== -1) {
        leftValue++;
        placeHolderElement.style.left = leftValue + "%";
      }

      getError();
    });
  });
}

function getAlignment():void {
  buttonAlignElements.forEach((buttonAlign:HTMLButtonElement):void => {
    buttonAlign.addEventListener("click", (e) => {
      placeHolderElement.style.textAlign = buttonAlign.dataset.align;
    });
  });
}

function createPlaceholderText():void {
  placeHolderElement.classList.add("preview__text");
  placeHolderElement.style.maxWidth =
    imgPreviewElement.scrollWidth - imgPreviewElement.scrollWidth / 1.5 + "px";
  limitElement.appendChild(placeHolderElement);
}

function getText():void {
  const firstLineInputElement:HTMLInputElement = document.querySelector("#ligne1");
  const secondLineInputElement:HTMLInputElement = document.querySelector("#ligne2");
  const thirdineInputElement:HTMLInputElement = document.querySelector("#ligne3");

  if (formElement.ligne1.value !== "") {

    formElement.ligne2.disabled = false;

  } else {

    if(formElement.ligne2.value !== '') {
      formElement.ligne1.value = formElement.ligne2.value;
      formElement.ligne2.value = "";
    } else {

      formElement.ligne2.disabled = true;
    }

  }
  if (formElement.ligne2.value !== "") {
    formElement.ligne3.disabled = false;
  } else {
    if(formElement.ligne3.value !== '') {
      formElement.ligne2.value = formElement.ligne3.value;
      formElement.ligne3.value = "";
    } else {

      formElement.ligne3.disabled = true;
    }
  }

  placeHolderElement.innerHTML = `${firstLineInputElement.value}${
    secondLineInputElement.value !== "" ? "<br>" : ""
  }${secondLineInputElement.value}${
    thirdineInputElement.value !== "" ? "<br>" : ""
  }${thirdineInputElement.value}`;

  getError();
}

function getError():void {
  pErrorElement.innerHTML = "";
  placeHolderOffsetTop = placeHolderElement.offsetTop;
  placeHolderOffsetLeft = placeHolderElement.offsetLeft;
  const limitWidth:number = parseInt(limitElement.style.width.split("p")[0]);
  const limitHeight:number = parseInt(limitElement.style.height.split("p")[0])

  if (placeHolderOffsetTop - placeHolderElement.scrollHeight / 2 < 0) {
    pErrorElement.innerHTML =
      "Votre texte ne peut pas dépasser de la zone imprimable du T-shirt";
    topValue++;
    placeHolderElement.style.top = topValue + "%";
  }

  if (
    placeHolderOffsetTop + placeHolderElement.scrollHeight / 2 >
    limitHeight
  ) {
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

  if (
    placeHolderOffsetLeft + placeHolderElement.scrollWidth / 2 >
    limitWidth
  ) {
    pErrorElement.innerHTML =
      "Votre texte ne peut pas dépasser de la zone imprimable du T-shirt";
    leftValue--;
    placeHolderElement.style.left = leftValue + "%";
  }
}

function getColor():void {
  const colorInputElement:HTMLInputElement = document.querySelector("#color");
  placeHolderElement.style.color = colorInputElement.value;
}

function getFont():void {
  const fontSelectElement:HTMLSelectElement = document.querySelector("select");
  placeHolderElement.style.fontFamily =
    fontSelectElement.selectedOptions[0].value;
}

function getFontSize():void {
  buttonFontSizeLessElement.addEventListener("click", ():void => {
    getError();
    fontSize -= 0.1;
    placeHolderElement.style.fontSize = fontSize + "rem";
  });
  buttonFontSizeMoreElement.addEventListener("click", ():void => {
    getError();
    fontSize += 0.1;
    placeHolderElement.style.fontSize = fontSize + "rem";
  });
}
