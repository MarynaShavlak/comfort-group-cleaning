export function getImageName(image) {
  return image.split('.')[0];
}

export function canUseWebP() {
  const elem = document.createElement('canvas');
  return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}
export function splitContent(inputString) {
  const sentences = inputString.match(/[^.!?]+[.!?]+/g);

  if (sentences && sentences.length >= 1) {
    return sentences;
  } else {
    return [inputString];
  }
}
export function copyToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);

  }