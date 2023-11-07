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
    if (originalArray.length < 2) {
      return originalArray.slice();
    }
      const customReorderedArray = [...originalArray];
     [customReorderedArray[0], customReorderedArray[1]] = [customReorderedArray[1], customReorderedArray[0]];

    for (let i = 2, j = originalArray.length - 1; i < j; i++, j--) {
      [customReorderedArray[i], customReorderedArray[j]] = [customReorderedArray[j], customReorderedArray[i]];
    }
  
    return customReorderedArray;
  }

  export function calculateSwipeCount(chosenMemberSlideIndex, quantity) {
    const visibleItems = 3;
    const activeItemSlideIndex = 2;

    if (quantity === 6) {
    return calculateSwipeCountFor6(quantity);
    } else if (quantity === 9) {
        return calculateSwipeCountFor9(quantity);
    } else if (quantity === 3) {
        return calculateSwipeCountFor3(quantity);
    } else if (quantity === 4) {
      return calculateSwipeCountFor4(quantity);
  }



    function calculateSwipeCountFor6(quantity) {
        const diff = chosenMemberSlideIndex - activeItemSlideIndex;

        if (diff > visibleItems) {
            return 2;
        } else if (diff < 0) {
            return 1;
        } else if (diff === visibleItems) {
            return 3;
        } else {
            return -diff;
        }
    }

    function calculateSwipeCountFor9(quantity) {
        const diff = chosenMemberSlideIndex - activeItemSlideIndex;

        switch (diff) {
            case 7:
                return diff + 4;
            case 6:
                return -diff;
            case 5:
                return 4;
            case 4:
                return 5;
            case visibleItems:
                return 6;
            case 2:
                return -2;
            case 1:
                return -1;
            default:
                return diff < 0 ? 1 : 0;
        }
    }

    function calculateSwipeCountFor3(quantity) {
        const diff = chosenMemberSlideIndex - activeItemSlideIndex;

        if (diff === -1) {
            return 1;
        } else if (diff === 1) {
            return -1;
        }
    }

    function calculateSwipeCountFor4(quantity) {
      const diff = chosenMemberSlideIndex - activeItemSlideIndex;

      if (diff === -1) {
          return 1;
      } else if (diff === 1) {
          return -1;
      } else if (diff === 2) {
        return 2;
      }
  }

    
}

export  function getUniqueCategories(data) {
  const uniqueCategories = new Set();
  data.forEach(({ category }) => {
      uniqueCategories.add(category);
  }
  )  
  return Array.from(uniqueCategories);
}


export function groupTeamMembersByCategory(data) {
  return Object.values(
  data.reduce((categoryData, member) => {
      const { category, name, memberID } = member;
      if (!categoryData[category]) {
      categoryData[category] = { name: category, members: [] };
      }
      categoryData[category].members.push({name, memberID});
      return categoryData;
  }, {})
  );
  }

  export function createSlideClassesList(category, data) {
    const membersQuantity = data.filter(item => item.category === category).length;
    let slideClasses = [];
    for (let i = 1; i <= membersQuantity; i++) {
        slideClasses.push('slide-' + i);
    }
    return slideClasses;
}
