import { teamMembersData, teamCategoryNames } from "./team-data";
import { makeArrayReverse } from "./utils";
const teamCategories = getUniqueCategories();
const membersByCategory = groupTeamMembersByCategory(teamMembersData);
createCategoryList(teamCategories, teamCategoryNames);

// createCircularSlider({
//     category: 'windowCleaner',
// });
// createCircularSlider({
//     category: 'dryCleaner',
// });
createCircularSlider({
    category: 'universalCleaner',
});





        function createCircularSlider(config) {
            const { category } = config;
            let currentIndex = 0;
            const slideClasses = createSlideClassesList(category) ;
            createCircularSliderMarkup(category);
            const slides = slideClasses.map(className => document.querySelector(`.team__circular-section.${className}`));
            createMembersNameList(membersByCategory, category);
            updateMemberTablo(slides, currentIndex + 1);
            const slider = document.querySelector('.team__circular-slider');
            const prevButton = document.querySelector('.team__btn-prev');
            const nextButton = document.querySelector('.team__btn-next');
            const membersList  = document.querySelector('.team__members-name-list');
        
            prevButton.addEventListener('click', () => changeSlide(-1));
            nextButton.addEventListener('click', () => changeSlide(1));
            slider.addEventListener('click', handleSlideClick);
            membersList.addEventListener('click', handleNameClick);

            function handleSlideClick(e) {
                const clickedItem = e.target;
                if (clickedItem.tagName !== 'IMG') return;
                const slide = clickedItem.closest('li');
                if (!slide || slide.classList.contains('team-active-slide')) return;
                const slideClass = slide.classList[1];
                    if (slideClass === 'slide-3') {
                    changeSlide(-1);
                } else if (slideClass === 'slide-1') {
                    changeSlide(1);
                }
            }

            function handleNameClick(e) {
                const nameEl = e.target;
                if (nameEl.tagName !== 'LI') return;
                    if (!nameEl  || nameEl.classList.contains('name--active')) return;
                    const memberID = nameEl.getAttribute('data-id');
                    const chosenMember = findChosenMember(slides, memberID);
                    const chosenMemberSlideIndex = getChosenMemberSlideIndex(chosenMember);
                    const swipeCount = calculateSwipeCount(chosenMemberSlideIndex, slideClasses.length);
                    changeSlides(swipeCount);
            }

            function changeSlides(moves) {
                const direction = moves < 0 ? -1 : 1;
                for (let i = 0; i < Math.abs(moves); i++) {
                    changeSlide(direction);
                }
            }
            
            function changeSlide(direction) {
                currentIndex = (currentIndex + direction + slideClasses.length) % slideClasses.length;
                updateSlider(direction);
            }

            function getChosenMemberSlideIndex(chosenMember) {
                const classList = chosenMember.classList;
                const slideIndexClass = [...classList].find(cls => cls.startsWith('slide-'));
                return slideIndexClass ? parseInt(slideIndexClass.split('-')[1], 10) : 0;
            }
            

            function findChosenMember(slides, memberID) {
                return[...slides].find(slide => slide.getAttribute('data-member') === memberID);
            }

            function calculateSwipeCount(chosenMemberSlideIndex, quantity) {
                const visibleItems  = 3;
                const activeItemSlideIndex = 2;
                if (quantity === 6 ) {
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
                } else if (quantity === 9) {
                    const diff = chosenMemberSlideIndex - activeItemSlideIndex;
            
                    switch (diff) {
                        case 7: return diff + 4;
                        case 6: return -diff;
                        case 5: return 4;
                        case 4: return 5;
                        case visibleItems: return 6;
                        case 2: return -2;
                        case 1: return -1;
                        default: return diff < 0 ? 1 : 0;
                    }
                    
                   
                }
                
         
            }

            function changeSlide(direction) {
                currentIndex = (currentIndex + direction + slideClasses.length) % slideClasses.length;
                updateSlider(direction);
            }
            
            function updateSlider(direction) {
                const slides = slideClasses.map(className => document.querySelector(`.team__circular-section.${className}`));
                removeActiveClassFromSlides(slides);
                const activeClassIndex = direction === 1 ? 0 : 2;
                moveSlides(slides, direction );
                addActiveClassToSlide(slides, activeClassIndex);
                updateMemberTablo(slides, activeClassIndex);
                updateMembersListMenu(direction,slides.length );
            }
                
            function moveSlides(slides, direction ) {
                const slideCount = slideClasses.length;
                if (direction === 1) {
                    slides.forEach((slide, index) => {
                        const newIndex = (index + direction) % slideCount;
                        slide.classList.replace(slideClasses[index], slideClasses[newIndex]);
                    });
                } else if (direction === -1) {
                    slides.forEach((slide, index) => {
                        const newIndex = (index + direction + slideCount) % slideCount;
                        slide.classList.replace(slideClasses[index], slideClasses[newIndex]);
                    });
                }
            }
            
            function removeActiveClassFromSlides(slides) {
                slides.forEach(slide => slide.classList.remove('team-active-slide'));
            }
            
            function addActiveClassToSlide(slides,index) {
                slides[index].classList.add('team-active-slide');
            }
            
            function getActiveSlideData(slides, index ) {
                const memberID = slides[index].getAttribute('data-member');
                const memberData= teamMembersData.find(member => member.memberID === memberID);
                return memberData;
            }
            
            function updateMemberTablo(slides, index) {
                const titleEl = document.querySelector('.member-info__title');
                const expEl = document.querySelector('.member-info__exp');
                const quoteEl = document.querySelector('.member-info__quote');
                const {name,  experience, quote} = getActiveSlideData(slides, index );
                titleEl.innerHTML = name;
                expEl.innerHTML = `Досвід роботи: ${experience}`;
                quoteEl.innerHTML = `<i class="fa-solid fa-quote-left"></i> ${quote} <i class="fa-solid fa-quote-right"></i>`
            }
        }

        function getUniqueCategories() {
            const uniqueCategories = new Set();
            teamMembersData.forEach(({ category }) => {
                uniqueCategories.add(category);
            }
            )  
            return Array.from(uniqueCategories);
        }

        function groupTeamMembersByCategory(teamMembersData) {
        return Object.values(
        teamMembersData.reduce((categoryData, member) => {
            const { category, name, memberID } = member;
            if (!categoryData[category]) {
            categoryData[category] = { name: category, members: [] };
            }
            categoryData[category].members.push({name, memberID});
            return categoryData;
        }, {})
        );
        }

        function createCategoryList(categories,teamObj) {
            const list = document.querySelector('.team__category-list');
            const fragment = document.createDocumentFragment();
            categories.forEach(category => {
            const listItem = document.createElement('li');
            listItem.className = 'team__category-item';
            listItem.textContent = teamObj[category];
            fragment.appendChild(listItem);
            });
            list .appendChild(fragment);
        }

        function createMembersNameList(membersByCategory, category) {
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

        function createCircularSliderMarkup(categoryName) {
            const sliderElement = document.querySelector('.team__circular-slider');
            const filteredArray = teamMembersData.filter(item => item.category === categoryName);
            filteredArray.forEach((member, index) => {
            if (member.category === categoryName) {
                const liElement = document.createElement('li');
                liElement.classList.add('team__circular-section', `slide-${index + 1}`);
                if (index === 1 ) {
                    liElement.classList.add('team__circular-section', `slide-${index + 1}`, 'team-active-slide');  
                } else {
                    liElement.classList.add('team__circular-section', `slide-${index + 1}`);  
                }
                liElement.setAttribute('data-member', member.memberID);
                liElement.setAttribute('data-category', member.category);
        
                const imgElement = document.createElement('img');
                imgElement.src = `images/team/${member.memberID}.png`;
                imgElement.alt = 'Фото члена команди';
                // imgElement.width = 'auto';
                // imgElement.height = 'auto';
        
                liElement.appendChild(imgElement);
                sliderElement.appendChild(liElement);
            }
            });
        
            return sliderElement;
        }

        function createSlideClassesList(category) {
            const membersQuantity = teamMembersData.filter(item => item.category === category).length;
            let slideClasses = [];
            for (let i = 1; i <= membersQuantity; i++) {
                slideClasses.push('slide-' + i);
            }
            return slideClasses;
        }

        function updateMembersListMenu(direction, membersQuantity) {
            const teamNamesList = document.querySelectorAll('.team__name');
            const activeName = [...teamNamesList].find(name => name.classList.contains('name--active'));
        
            if (activeName) {
            activeName.classList.remove('name--active');
            const activeNameIndex = [...teamNamesList].indexOf(activeName);
        
            let newActiveNameIndex = (activeNameIndex + direction + membersQuantity) % membersQuantity;
            if (newActiveNameIndex < 0) {
                newActiveNameIndex += membersQuantity;
            }
        
            teamNamesList[newActiveNameIndex].classList.add('name--active');
            }
        }   