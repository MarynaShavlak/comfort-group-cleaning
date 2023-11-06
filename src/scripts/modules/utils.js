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

  export function chunkArray(array, chunkSize) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }


  export function getImageUrl(directory, imageName) {
    const supportsWebP = canUseWebP();
    return supportsWebP
      ? `url(images/${directory}/${imageName}.webp)`
      : `url('images/${directory}/${image}')`;
  }
  export function createPicture({width, srcPrefix, media, alt, className}) {
    const picture = document.createElement('picture');
    picture.className = className;
    picture.appendChild(createSource(width, srcPrefix,  media));
    const params = {
      width: 26, 
      height: 26, 
      src: `${srcPrefix}@1x.png`, 
      alt: alt, 
      className:className,
     }
    
    picture.appendChild(createImage(params));
    return picture;
  }
  
  export function createSource(width, srcPrefix, media) {
    const source = document.createElement('source');
    source.width = width;
    source.height = width;
    source.srcset = `${srcPrefix}@1x.png 1x, ${srcPrefix}@2x.png 2x`;
    source.media = media;
    return source;
  }
  
  export function createImage({width, height, src, alt, className}) {
    const img = document.createElement('img');
    img.className = className;
    img.width = width;
    img.height = height;
    img.src = src;
    img.alt = alt;
    return img;
  }

  export function makeArrayReverse(originalArray) {
    const customReorderedArray = [
      originalArray[1], 
      originalArray[0],  
      originalArray[5],  
      originalArray[4],  
      originalArray[3],  
      originalArray[2]   
    ];
    return customReorderedArray;
  }