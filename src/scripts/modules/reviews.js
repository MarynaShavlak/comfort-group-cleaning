const reviews = [
  {
    name: "Міколай Ковальчук",
    text: "Дуже хороший сервіс! Клінер Анна приємна та працьовита дівчина. Приїхала без запізнень, швидко і якісно прибрала в моїй квартирі.",
    rating: 5,
  },
  {
    name: "Марія Кравчук",
    text: "Замовляла прибирання в квартиру після косметичного ремонту. Дівчата з Comfort Group мене просто врятували! Прибрали дуже швидко та ретельно. Без їх допомоги я б ще не один день витрачала свій час на це прибирання!",
    rating: 5,
  },
  {
    name: "Алекс Кашпор",
    text: "Оформлюю у Comfort Group вже другу місячну підписку. З моїм графіком роботи це ідеальний варіант. Вдома завжди чисто та свіжо! Дякую за вашу роботу!",
    rating: 5,
  },
  {
    name: "Бронислав Левандовський",
    text: "Чудові клінери та сервіс. Не шкодую що обрав саме вас: прибрали ретельно та швидко.",
    rating: 5,
  },
  {
    name: "Ян Кравчик",
    text: "Дякую за гарну роботу! Ви чудово прибрали наш офіс після новорічного корпоративу.",
    rating: 5,
  },
  {
    name: "Юлія Возняк",
    text: "Замовляла місячну підписку на прибирання для своєї бабусі. Тетяна з Comfort Group була дуже милою та ретельно все прибрала.",
    rating: 5,
  },
  {
    name: "Андрій Корчак",
    text: "Comfort Group - це не лише якість прибирання, але й своєчасність. Їхні клінери завжди приходять у встановлені строки, що для мене дуже важливо. Дякую за вашу надійність!",
    rating: 5,
  },
  {
    name: "Тетяна Біленька",
    text: "Замовила прибирання на вечірку у мене вдома. Comfort Group приїхали вчасно і буквально за кілька годин після того, як вечірка закінчилася. Вони швидко прибрались, і я була приємно здивована своєю чистою квартирою.",
    rating: 5,
  },
  {
    name: "Ігор Бабенко",
    text: "Я завжди можу розраховувати на Comfort Group. Вони не лише роблять чудову роботу, але й завжди приходять у вказаний час. Моя квартира завжди готова до прийому гостей завдяки їхній своєчасності.",
    rating: 5,
  },
  {
    name: "Ольга Ткаченко",
    text: "Я вже декілька років користуюся послугами Comfort Group і завжди вражена тим, наскільки їхні клінери своєчасні. Це зекономило мені безліч годин, які я витрачала б на прибирання.",
    rating: 5,
  },
  {
    name: "Оксана Шевченко",
    text: "Завжди можна розраховувати на якість послуг Comfort Group. Надзвичайно задоволена роботою їхнього персоналу. Моєму будинку завжди потрібне таке чудове прибирання!",
    rating: 5,
  },
  {
    name: "Сергій Гончаренко",
    text: "Команда Comfort Group - це справжні професіонали. Вони відмивають кожну пляму і залишають квартиру дбайливо прибраною. Дякую, що даруєте мені час і спокій.",
    rating: 5,
  },
  {
    name: "Лідія Павлів",
    text: "Мені завжди страшно було замовляти послуги прибирання, але Comfort Group змінили моє уявлення. Вони завжди на висоті та приносять радість чистоти в мій дім.",
    rating: 5,
  },
  {
    name: "Олександра Данилко",
    text: "Клінерка Катя - наша улюблена! Вона завжди залишає нашу квартиру бездоганною. Рекомендую Comfort Group кожному, хто цінує чистоту.",
    rating: 5,
  },
  {
    name: "Павло Мельник",
    text: "Після ремонту моя квартира виглядає як нова завдяки відмінному прибиранню. Кожний куточок був ретельно вимитий, і відчуття чистоти, коли ти входиш в це житло, просто неймовірне.",
    rating: 5,
  },
  {
    name: "Тетяна Гринь",
    text: "Співпраця з Comfort Group - це завжди радість. Вони завжди працюють із захопленням і приносять нам гармонію у нашому будинку.",
    rating: 5,
  },
  {
    name: "Ігор Коваль",
    text: "Моя квартира ніколи не була такою чистою! Comfort Group - найкращі в цьому ділі. Рекомендую їх усім своїм друзям.",
    rating: 5,
  },
  {
    name: "Наталя Шевченко",
    text: "Відмінний сервіс, прекрасні клінери. Вони завжди піклуються про мою квартиру, навіть там, де я не бачу. Дуже вдячна!",
    rating: 5,
  },
  {
    name: "Іван Литвиненко",
    text: "Comfort Group - це найкращий вибір для вашого будинку. Вони завжди прибираються докладно та швидко. Рекомендую їх кожному.",
    rating: 5,
  },
  {
    name: "Олег Яремчук",
    text: "Після дитячої вечірки Comfort Group вразили нас своєю бездоганною роботою! Вони не пропустили жодного кутка і прибрали аж до останньої крихти.  Рекомендуємо їх послуги всім, хто шукає відмінне прибирання після будь-яких святкувань!",
    rating: 5,
  },
  {
    name: "Марина Дорошенко",
    text: "Дуже задоволена послугами Comfort Group. Нічого не зникло після прибирання - все блищить чистотою. Дякую вам!",
    rating: 5,
  },
 

  {
    name: "Артур Полянський",
    text: "Це був мій перший раз, коли я замовляв послуги клінінгу, і я був приємно здивований, отримавши 10% знижки. Ця знижка зробила вибір Comfort Group ще більш привабливим, і я залишився задоволений якістю послуг і економією.",
    rating: 5,
  },
  {
    name: "Юлія Сидоренко",
    text: "Замовлення клінінгу на вашому сайті - це легко і зручно. Я можу обрати час, який мені підходить, і бути впевненою, що ваші клінери прийдуть у встановлені строки.",
    rating: 5,
  },
  {
    name: "Юлія Карпенко",
    text: "Клінери зробили чудову роботу, відчищаючи мій холодильник та плиту на кухні. Тепер вони сяють чистотою, наче нові, і я дуже задоволена результатом їхньої роботи. Дякую за професійне обслуговування!",
    rating: 5,
  },
   {
    name: "Ірина Чередниченко",
    text: "З Comfort Group завжди можна розраховувати на найкращий результат. Вони докладають всіх зусиль, щоб моєму будинку було зручно та затишно.",
    rating: 5,
  },
  {
    name: "Максим Григорчук",
    text: "Comfort Group - це гарантія чистоти та порядку. Вони завжди прибираються докладно та швидко. Рекомендую їх кожному.",
    rating: 5,
  },
  {
    name: "Анна Лисенко",
    text: "Це найкраща команда клінерів у місті. Вони завжди ретельно прибирають та залишають мій будинок свіжим і чистим.",
    rating: 5,
  },
  {
    name: "Олесь Лещенко",
    text: "Comfort Group - це моє спасіння. Вони завжди приходять на допомогу, коли я не встигаю прибрати. Дякую вам за вашу працю!",
    rating: 5,
  },
  {
    name: "Людмила Мельничук",
    text: "Моя бабуся завжди задоволена прибиранням від Comfort Group. Тетяна завжди турбується про неї та приносить радість в наш дім.",
    rating: 5,
  },
  {
    name: "Роман Дубенко",
    text: "Comfort Group - це завжди якість та надійність. Вони докладають зусиль, щоб мій будинок був чистим та охайним.",
    rating: 5,
  },
  {
    name: "Оксана Лук'яненко",
    text: "Comfort Group завжди надає послуги прибирання, завчасно забираючи та привозячи ключі від офісу, без будь-яких запізнень.",
    rating: 5,
  },
  {
    name: "Галина Михайленко",
    text: "Завдяки Comfort Group, моя квартира завжди виглядає, як нова. Вони знають, як робити свою роботу і роблять це найкраще.",
    rating: 5,
  },
  {
    name: "Володимир Петренко",
    text: "Команда Comfort Group завжди відзначається високою якістю прибирання та професіоналізмом. Це дійсно надійний вибір.",
    rating: 5,
  },






  {
    name: "Ніна Громова",
    text: "Це найкращий сервіс прибирання у місті. Comfort Group завжди готові прийти на допомогу та прибрати в будь-який момент.",
    rating: 5,
  },
  {
    name: "Денис Бойко",
    text: "Comfort Group - це найкраще, що може статися з вашим будинком. Вони завжди приносять чистоту та порядок, і я ціную це.",
    rating: 5,
  },
  {
    name: "Ангеліна Стеценко",
    text: "Дуже задоволена роботою Comfort Group. Вони завжди приходять у вказаний час і прибираються на вищому рівні.",
    rating: 5,
  },
  {
    name: "Григорій Попов",
    text: "Моя квартира ніколи не була такою чистою та охайною. Comfort Group - це мій секрет для чистого та затишного життя.",
    rating: 5,
  },
  {
    name: "Світлана Ковальчук",
    text: "Це найкращий сервіс прибирання, який я коли-небудь замовляла. Comfort Group завжди на висоті та приносять мені спокій.",
    rating: 5,
  },
  {
    name: "Олексій Гнатюк",
    text: "Comfort Group завжди приносять порядок і чистоту в мій будинок. Я не можу бути вдячніший за їхню роботу.",
    rating: 5,
  },
  {
    name: "Наталія Савченко",
    text: "Для мене надзвичайно важливою є якість миючих засобів, і я ціную той факт, що Comfort Group завжди використовує ефективні та екологічно безпечні засоби під час прибирання.",
    rating: 5,
  },
  {
    name: "Ольга Петрова",
    text: "Система обрання дати і часу на вашому сайті дуже зручна. Я можу легко вибрати підходящий час для прибирання, що дуже зекономило моїй родині час і зусилля.",
    rating: 5,
  },
  {
    name: "Тетяна Лисенко",
    text: "Я хотіла б висловити подяку контакт-центру Comfort Group, персонал завжди готовий відповісти на всі запити та запитання з великою увагою та терпимістю",
    rating: 5,
    },
];

const reviewsList = document.querySelector('.reviews__swiper');
const chunkedReviews = chunkArray(reviews, 6);

chunkedReviews.forEach(chunk => {
  const listItem = createReviewElement(chunk);
  reviewsList.appendChild(listItem);
});


document.addEventListener("DOMContentLoaded", function () {
const lists = document.querySelectorAll('.reviews__list')
console.log('lists: ', lists);

// lists.forEach(grid => {
//   console.log('grid: ', grid.getBoundingClientRect().height);
//   [...grid.children].forEach(item => {
//     const gap = 36;
//     const thisItemHeight = item.getBoundingClientRect().height

//     if(item.classList.contains('item-4')) {
//       const item1= grid.querySelector('.item-1');
//       const totalHeight  = grid.getBoundingClientRect().height
//       const upperNeightBorheight = item1.getBoundingClientRect().height
//       const marginTopValue  = totalHeight - thisItemHeight - upperNeightBorheight - gap;
//       if (marginTopValue < gap) {
//         return;
//       }
//       item.style.marginTop = `-${marginTopValue}px`
//     }
//     if(item.classList.contains('item-5')) {
//       // const thisItemHeight = item.getBoundingClientRect().height;
//       const item2= grid.querySelector('.item-2');
//       const totalHeight  = grid.getBoundingClientRect().height;
//       const upperNeightBorheight = item2.getBoundingClientRect().height;
//       const marginTopValue  = totalHeight - thisItemHeight - upperNeightBorheight - gap;
//       if (marginTopValue < gap) {
//         return;
//       }
//       item.style.marginTop = `-${marginTopValue}px`
//     }
//     if(item.classList.contains('item-6')) {
//       // const thisItemHeight = item.getBoundingClientRect().height
//       const item3= grid.querySelector('.item-3');
//       const totalHeight  = grid.getBoundingClientRect().height
//       const upperNeightBorheight = item3.getBoundingClientRect().height
//       const marginTopValue  = totalHeight - thisItemHeight - upperNeightBorheight - gap;
//       if (marginTopValue < gap) {
//         return;
//       }
//       item.style.marginTop = `-${marginTopValue}px`
//     }
//   })
// })

lists.forEach(grid => {
  const items = grid.querySelectorAll('.item-4, .item-5, .item-6');
  // const totalHeight = grid.getBoundingClientRect().height;
  const totalHeight = grid.clientHeight;
  
  const gap = 36;

  items.forEach(item => {
    console.log('totalHeight: ', totalHeight);
    const thisItemHeight = item.getBoundingClientRect().height;
    console.log('thisItemHeight: ', thisItemHeight);
    const className   = `.item-${parseInt(item.classList[1].split('-')[1]) - 3}`;
    const upperNeighborHeight = grid.querySelector(`${className}`).getBoundingClientRect().height;
    console.log('upperNeighborHeight: ', upperNeighborHeight);
    const sum = upperNeighborHeight + thisItemHeight;
    console.log('sum: ', sum);
    const sumPlusGap = sum + gap;
    const difference = totalHeight - sumPlusGap;
    console.log('difference: ', difference);
    // if (difference > gap) {
    //   item.style.marginTop = `-${difference}px`;
    // }
    console.log('sumPlusGap: ', sumPlusGap);
    // const marginTopValue = totalHeight - thisItemHeight - upperNeighborHeight - gap - gap;
    // const marginTopValue = totalHeight - thisItemHeight - upperNeighborHeight;
    // console.log('marginTopValue: ', marginTopValue);
    console.log('____________________________ ');

    // if (marginTopValue >= gap) {
    //   item.style.marginTop = `-${marginTopValue}px`;
    // }
  });
});


});






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
    nextEl: '.next-btn',
    prevEl: '.prev-btn',
  },
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