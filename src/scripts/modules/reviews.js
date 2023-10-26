import { reviews } from "./reviews-data";
import Masonry from "masonry-layout";

const reviewsList = document.querySelector('.reviews__swiper');
const chunkedReviews = chunkArray(reviews, 6);
chunkedReviews.forEach(chunk => {
  const listItem = createReviewElement(chunk);
  reviewsList.appendChild(listItem);
});
document.addEventListener("DOMContentLoaded", createMasonry);

const mobileReviewsList = document.querySelector('.mobile__reviews-list');
chunkedReviews.forEach(chunk => {
  const listItem = createMobileReviewElement(chunk);
  mobileReviewsList.appendChild(listItem);
});

const showMoreReviewsBtn = document.querySelector('.mobile__show-more-btn');
showMoreReviewsBtn.addEventListener('click', showMoreReviews)
let currentReviewBlock = 1;

function showMoreReviews() {
  const reviewsBlockList = document.querySelectorAll('.mobile__swiper-slide');
  console.log('reviewsBlockList: ', reviewsBlockList);
  for (let i = currentReviewBlock; i < currentReviewBlock +1; i++) {
    reviewsBlockList[i].style.display = 'list-item';
  }
  currentReviewBlock+=1;
  if(currentReviewBlock >= reviewsBlockList.length)   {
    showMoreReviewsBtn.style.display = 'none';
  }
}

function createMobileReviewElement(review) {
  const listItem = document.createElement('li');
  listItem.className = 'mobile__swiper-slide';
  const ul = document.createElement('ul');
  ul.className = 'mobile__reviews';
 

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
  loop: true,
  speed: 2000,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },

  navigation: {
    nextEl: '.gallery__next-btn',
    prevEl: '.gallery__prev-btn',
  },
  pagination: {
    el: '.gallery__swiper-pagination',
    clickable: true,
    type: 'progressbar',
  },

}); 


const reviewsSlider = document.querySelector('.gallery');
reviewsSlider.addEventListener('mouseleave', function(e) {
  gallery.params.autoplay.disableOnInteraction =  false;
  gallery.params.autoplay.delay = 2000;
  gallery.autoplay.start();
});
reviewsSlider.addEventListener('mouseenter', function(e) {
  gallery.autoplay.stop();
})


function createMasonry() {
  const grids = document.querySelectorAll('.reviews__list');
  grids.forEach(grid => {
    const masonry   = new Masonry(grid, {
      itemSelector: '.reviews__item',
      gutter: 30,
      
    });
  })
}