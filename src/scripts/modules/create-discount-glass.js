import {  splitContent } from "./utils";
export function createGlass(description, terms, promo) {
  const glass = document.createElement('div');
  glass.className = 'swiper-slide__glass';
  const descriptionElem = createGlassDescriptions(description, 'glass__descr');
  const termsElem = createGlassTerms(terms, 'glass__terms');
  const promoElem = createGlassPromo(promo);

  glass.appendChild(descriptionElem);
  glass.appendChild(termsElem);
  glass.appendChild(promoElem);

  return glass;
}

function createGlassTerms(content, className) {
  const elem = document.createElement('p');
  elem.className = className;
  elem.innerHTML = highlightTermsInString(content);
  return elem;
}

function createGlassDescriptions(content, className) {
  const container = document.createElement('div');
  container.className = className;
  const sentences = splitContent(content);

  sentences.forEach(sentence => {
    const elem = document.createElement('p');
    elem.innerHTML = highlightDiscountInString(sentence);
    container.appendChild(elem);
  });

  return container;
}
 function createGlassPromo(promo) {
  const wrap = document.createElement('div');
  wrap.className = "promo";
  const leftBlock = createPromoBlock("glass__promo promo__wrapper promo__wrapper--left", "ПРОМОКОД");
  const rightBlock = createPromoBlock("promo__wrapper promo__wrapper--right");
  const text  = document.createElement('span');
  text.innerHTML = promo;
  text.className = 'promo__text'
  rightBlock.appendChild(text);
  rightBlock.appendChild(createCopyIcon());
  wrap.appendChild(leftBlock);
  wrap.appendChild(rightBlock);
  return wrap;
 }

 function createPromoBlock(className, innerHTML = "") {
  const block = document.createElement('div');
  block.className = className;
  block.innerHTML = innerHTML;
  return block;
}

function highlightDiscountInString(sentence) {
  const regex = /(\d+%)/g;
  const modifiedSentence = sentence.replace(
    regex,
    '<span class="glass__accent">$1</span>'
  );

  return modifiedSentence;
}

function highlightTermsInString(inputString) {
  const regex = /з (.*?) по (.*?) (\d{4} року)/g;
  const highlightedString = inputString.replace(
    regex,
    function (match, term1, term2, year) {
      return `з <span class="glass__accent--term">${term1}</span> по <span class="glass__accent--term">${term2} ${year}</span> `;
    }
  );

  return highlightedString;
}

function createCopyIcon() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "promo__copy-icon");
  svg.setAttribute("width", "30");
  svg.setAttribute("height", "30");

  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", "images/sprite.svg#icon-copy");
  svg.appendChild(use);

  return svg;
}