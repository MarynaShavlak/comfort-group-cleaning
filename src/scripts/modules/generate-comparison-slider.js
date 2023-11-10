export function createComparisonSliderItem({beforeName, afterName, desc, categories}) {
  const listItem = document.createElement('li');
  listItem.classList.add('comparison-slider');
  const categoriesString = categories.join(', ');
  listItem.setAttribute("data-categories", categoriesString);

  const beforeImage = createComparisonImage(beforeName, desc, 'До прибирання');
  const afterImage = createComparisonImage(afterName, desc, 'Після прибирання');
  
  const beforeLabel = createLabel('До', 'label--before');
  const afterLabel = createLabel('Після', 'label--after');
  const handle = createHandle();
  
  listItem.appendChild(beforeImage);
  const wrapper = createComparisonWrapper(afterImage);
  listItem.appendChild(wrapper);
  listItem.appendChild(beforeLabel);
  listItem.appendChild(afterLabel);
  listItem.appendChild(handle);
  
  return listItem;
}

function createComparisonWrapper(afterImage) {
const wrapper = document.createElement('div');
wrapper.classList.add('comparison-slider__wrapper');
wrapper.appendChild(afterImage);

return wrapper;
}

 function createComparisonImage(imageName, altText) {
const webpSrcset = `images/before-after/${imageName}.webp`;
const jpgSrcset =`images/before-after/${imageName}.jpg`;
const picture = document.createElement('picture');
picture.className = 'comparison-slider__image'
const webpSource = document.createElement('source');
webpSource.setAttribute('srcset', webpSrcset);
webpSource.setAttribute('type', 'image/webp');
const jpgSource = document.createElement('source');
jpgSource.setAttribute('srcset', jpgSrcset);
jpgSource.setAttribute('type', 'image/jpg');
const img = document.createElement('img');
img.setAttribute('src', jpgSrcset);
img.setAttribute('alt', altText);
img.setAttribute('width', '350');
img.setAttribute('height', '375');

picture.appendChild(webpSource);
picture.appendChild(jpgSource);
picture.appendChild(img);

return picture;
}

function createLabel(text, className) {
const label = document.createElement('span');
label.textContent = text;
label.classList.add('comparison-slider__label', className);
return label;
}

function createHandle() {
const handle = document.createElement('div');
handle.classList.add('comparison-slider__handle');
const line1 = document.createElement('div');
line1.classList.add('handle__line');
const circle = document.createElement('div');
circle.classList.add('handle__circle');
const chevronLeft = document.createElement('i');
chevronLeft.classList.add('fas', 'fa-chevron-left');
const chevronRight = document.createElement('i');
chevronRight.classList.add('fas', 'fa-chevron-right');
const line2 = document.createElement('div');
line2.classList.add('handle__line');
circle.appendChild(chevronLeft);
circle.appendChild(chevronRight);
handle.appendChild(line1);
handle.appendChild(circle);
handle.appendChild(line2);

return handle;
}