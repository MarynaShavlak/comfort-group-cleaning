import { reviews } from "./reviews-data";
import Masonry from "masonry-layout";
import { chunkArray, createPicture} from "./utils";

let currentReviewBlock = 1;
document.addEventListener("DOMContentLoaded", initializeReviewSwiper);


function initializeReviewSwiper() {
  const reviewsList = document.querySelector('.reviews__swiper');
  const mobileReviewsList = document.querySelector('.mobile__reviews-list');
  const showMoreReviewsBtn = document.querySelector('.mobile__show-more-btn');
  const chunkSize = 6;
  const chunkedReviews = chunkArray(reviews, chunkSize);

  initializeReviews(reviewsList, mobileReviewsList, chunkedReviews);
  initializeMasonry('.reviews__list');
  const gallery = initializeGallery('.gallery');
  reviewsSliderEventHandlers(gallery);
  showMoreReviewsBtn.addEventListener('click', () => showMoreReviews(mobileReviewsList, showMoreReviewsBtn));
  const slideList = document.querySelectorAll('.swiper-slide');
  [...slideList].forEach(item => item.setAttribute('role', 'Слайд'));


}

function initializeReviews(reviewsList, mobileReviewsList, chunkedReviews) {
  chunkedReviews.forEach(chunk => {
    reviewsList.appendChild(createReviewElement('swiper-slide', 'reviews__list', chunk));
    mobileReviewsList.appendChild(createReviewElement('mobile__swiper-slide', 'mobile__reviews', chunk));
  });
}

function initializeMasonry(selector) {
  const grids = document.querySelectorAll(selector);
  grids.forEach(grid => {
    const masonry   = new Masonry(grid, {
      itemSelector: '.reviews__item',
      gutter: 30,
      
    });
  })
}

function initializeGallery(selector) {
  const gallery = new Swiper(selector, {
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
  return gallery;
}

function reviewsSliderEventHandlers(gallery) {
  const reviewsSlider = document.querySelector('.gallery');
  reviewsSlider.addEventListener('mouseleave', () => {
    gallery.params.autoplay.disableOnInteraction = false;
    gallery.params.autoplay.delay = 2000;
    gallery.autoplay.start();
  });

  reviewsSlider.addEventListener('mouseenter', () => {
    gallery.autoplay.stop();
  });
}

function showMoreReviews(mobileReviewsList, showMoreReviewsBtn) {
  const reviewsBlockList = mobileReviewsList.querySelectorAll('.mobile__swiper-slide');
  reviewsBlockList[currentReviewBlock].style.display = 'list-item';
  currentReviewBlock++;
  if (currentReviewBlock >= reviewsBlockList.length) {
    showMoreReviewsBtn.style.display = 'none';
  }
}

function createReviewElement(itemClassName, listClassName, reviews) {
  const listItem = document.createElement('li');
  listItem.className = itemClassName;
  const ul = document.createElement('ul');
  ul.className = listClassName;

  reviews.forEach((reviewData, index) => {
    ul.appendChild(createReviewItem(index + 1, reviewData));
  });

  listItem.appendChild(ul);
  return listItem;
}

function createReviewItem(index, reviewData) {
  const li = document.createElement('li');
  li.className = `reviews__item item-${index}`;
  const title = createTitle(reviewData.name);
  const ratingStars = createRatingStars(reviewData.rating);
  const text = createText(reviewData.text);
  li.appendChild(title);
  li.appendChild(ratingStars);
  li.appendChild(text);
  return li;
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
  const pictureParams =     {
    width: 20,
    srcPrefix: 'images/reviews/tablet/star', 
    media: '(max-width: 1439px)', 
    alt: 'Жовта зірка',
    className: 'rating__icon'
  }
  
  const picture = createPicture(pictureParams);
  ratingItem.appendChild(picture);
  return ratingItem;
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



