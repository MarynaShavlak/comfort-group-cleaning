import { makeArrayReverse} from "./utils";
export function createCategoryList(categories,teamObj) {
  const list = document.querySelector('.team__category-list');
  const fragment = document.createDocumentFragment();
  categories.forEach((category,index) => {
      const listItem = document.createElement('li');
      if (index === 0) {
          listItem.className = 'team__category-item category--active';
      } else {
          listItem.className = 'team__category-item';
      }
  
 
  listItem.textContent = teamObj[category];
  listItem.setAttribute('data-category', category)
  fragment.appendChild(listItem);
  });
  list .appendChild(fragment);
}

export function createMembersNameList(membersByCategory, category) {
  const membersList  = document.querySelector('.team__members-name-list');
  const fragment = document.createDocumentFragment();
  const nameList = membersByCategory.find(member => member.name === category).members;

  makeArrayReverse(nameList).forEach(({name, memberID},index) => {
      
          const listItem = document.createElement('li');
          if (index === 0) {
              listItem.className = 'team__name name--active';
          } else {
              listItem.className = 'team__name';
          }
          
          listItem.textContent = name;
          listItem.setAttribute('data-id',memberID )
          fragment.appendChild(listItem);
      });
          membersList.appendChild(fragment);
}

export function createCircularSliderMarkup(categoryName,  data) {
  const sliderElement = document.querySelector('.team__circular-slider');
  const filteredArray = data.filter(item => item.category === categoryName);
  const fragment = document.createDocumentFragment();
  filteredArray.forEach((member, index) => {

      const liElement = document.createElement('li');
      const slideUniqueClass  = `slide-${index + 1}`
      if (index === 1 ) {
          liElement.classList.add('team__circular-section', slideUniqueClass , 'team-active-slide');  
      } else {
          liElement.classList.add('team__circular-section', slideUniqueClass );  
      }
      liElement.setAttribute('data-member', member.memberID);
      liElement.setAttribute('data-category', member.category);

      const imgElement = document.createElement('img');
      imgElement.src = `images/team/${member.memberID}.png`;
      imgElement.alt = 'Фото члена команди';
      // imgElement.width = 'auto';
      // imgElement.height = 'auto';

      liElement.appendChild(imgElement);
      fragment.appendChild(liElement);
     
  
  });
  sliderElement.appendChild(fragment);
  return sliderElement;
}