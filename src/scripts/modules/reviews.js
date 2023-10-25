import { reviews } from "./reviews-data";

const reviewsList = document.querySelector('.reviews__swiper');
const chunkedReviews = chunkArray(reviews, 6);
chunkedReviews.forEach(chunk => {
  const listItem = createReviewElement(chunk);
  reviewsList.appendChild(listItem);
});
document.addEventListener("DOMContentLoaded", adjustMargins);
window.addEventListener("resize", adjustMargins);

function createReviewElement(review) {
  const listItem = document.createElement('li');
  listItem.className = 'swiper-slide';
  const ul = document.createElement('ul');
  ul.className = 'reviews__list';

  review.forEach((reviewData, index) => {
    const li = document.createElement('li');
    li.className = `reviews__item item-${index + 1}`;
    
    li.appendChild(createTitle(reviewData.name));
    li.appendChild(createRatingStars(reviewData.rating));
    li.appendChild(createText(reviewData.text));
    ul.appendChild(li);
  });

    listItem.appendChild(ul);
    
  return listItem;
}

function createRatingStars(rating) {
  const ratingList = document.createElement('ul');
  ratingList.className = 'review__rating';
  for (let i = 0; i < rating; i++) {
    ratingList.appendChild(createRatingItem());
  }
  return ratingList;
}

function createRatingItem() {
  const ratingItem = document.createElement('li');
  ratingItem.className = 'rating__item';

  const picture = document.createElement('picture');
  picture.className = 'rating__icon';

  picture.appendChild(createSource(20, 'images/reviews/tablet/star', 2, '(max-width: 1439px)'));
  picture.appendChild(createSource(26, 'images/reviews/desktop/star', 2, '(min-width: 1440px)'));
  picture.appendChild(createImage(26, 26, 'images/reviews/desktop/star@1x.png', 'Жовта зірка'));

  ratingItem.appendChild(picture);
  return ratingItem;
}

function createSource(width, srcPrefix, scaleFactor, media) {
  const source = document.createElement('source');
  source.width = width;
  source.height = width;
  source.srcset = `${srcPrefix}@1x.png 1x, ${srcPrefix}@2x.png ${scaleFactor}x`;
  source.media = media;
  return source;
}

function createImage(width, height, src, alt) {
  const img = document.createElement('img');
  img.className = 'rating__icon';
  img.width = width;
  img.height = height;
  img.src = src;
  img.alt = alt;
  return img;
}

function createTitle(name) {
  const title = document.createElement('h3');
  title.className = 'review__title';
  title.textContent = name;
  return title;
}

function createText(textContent) {
  const text = document.createElement('p');
  text.className = 'review__text';
  text.innerHTML = textContent;
  return text;
}


function chunkArray(array, chunkSize) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

function adjustMargins() {
  if (window.innerWidth >= 1440) {const lists = document.querySelectorAll('.reviews__list');
  lists.forEach(grid => {
    const items = grid.querySelectorAll('.item-4, .item-5, .item-6');
    const itemsUpper = grid.querySelectorAll('.item-1, .item-2, .item-3');
    const maxHeight = Math.max(...Array.from(itemsUpper, item => item.getBoundingClientRect().height));
    items.forEach(item => {
      const className = `.item-${parseInt(item.classList[1].split('-')[1]) - 3}`;
      const upperNeighborHeight = grid.querySelector(className).getBoundingClientRect().height;
      const difference = maxHeight - upperNeighborHeight;
      item.style.marginTop = `-${difference}px`;
    });
  }); }
  
}



const gallery= new Swiper('.gallery', {
  direction: 'horizontal',
  effect: 'slider',
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  mousewheel: {
    invert: true,
  },
  // loop: true,
  // speed: 1000,
  // autoHeight: false,
  // slidesPerView: '3', // Set this to 'auto' to fit the slides in the grid
  // grid: {
  //   rows: 2, // Number of rows
  //   fill: 'column', // 'row' or 'column' to fill the rows or columns first
  // },
  // autoplay: {
  //   delay: 1500
  // },

  navigation: {
    nextEl: '.gallery__next-btn',
    prevEl: '.gallery__prev-btn',
  },
  pagination: {
    el: '.gallery__swiper-pagination',
    clickable: true,
    type: 'progressbar'
    // dynamicBullets: true,
    // dynamicMainBullets: 1,
  }
  // breakpoints: {
  //   1440: {
  //     slidesPerView: 3,
  //     spaceBetween: 36
  //   },
  //  768: {
  //     slidesPerView: 2,
  //     spaceBetween: 30
  //   },
  //   0: {
  //     slidesPerView:1,
  //   }
  // }
  //   },
  // }
 

 
});