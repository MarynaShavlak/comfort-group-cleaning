!function(){var e={699:function(){const e=document.querySelector(".scroll-to-top-btn");window.addEventListener("scroll",(function(){window.scrollY>=50?e.style.display="flex":e.style.display="none"}),{passive:!0}),e.addEventListener("click",(function(){window.scrollTo({top:0,behavior:"smooth"})}))}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var c=t[r]={exports:{}};return e[r](c,c.exports,n),c.exports}!function(){"use strict";function e(e,t){const n=JSON.stringify(t);localStorage.setItem(e,n)}function t(){return{themeToggler:document.querySelector(".theme-toggler-wrap"),themeCircle:document.querySelector(".theme__circle"),sunRays:document.querySelectorAll(".circle__ray"),sunIcon:document.querySelector(".circle__sun"),moonIcon:document.querySelector(".circle__moon")}}const r={LIGHT:"light",DARK:"dark"};let o=function(e){const t=localStorage.getItem("theme");return JSON.parse(t)}()||r.LIGHT;function c(){const{themeToggler:e,themeCircle:n,sunRays:c,sunIcon:a,moonIcon:i}=t(),s=document.querySelector("body");o===r.DARK?(s.classList.add("active-dark-theme"),e.classList.add("theme-toggler-wrap--dark"),e.classList.remove("theme-toggler-wrap--light"),n.classList.add("theme__circle--dark"),n.classList.remove("theme__circle--light"),a.classList.add("circle__sun--hidden"),i.classList.remove("circle__moon--hidden"),c.forEach((e=>e.classList.add("circle__ray--hidden")))):(s.classList.remove("active-dark-theme"),e.classList.remove("theme-toggler-wrap--dark"),e.classList.add("theme-toggler-wrap--light"),n.classList.remove("theme__circle--dark"),n.classList.add("theme__circle--light"),a.classList.remove("circle__sun--hidden"),i.classList.add("circle__moon--hidden"),c.forEach((e=>e.classList.remove("circle__ray--hidden"))))}const a={home:["/comfort-group-cleaning/","/comfort-group-cleaning/index.html"],office:["/comfort-group-cleaning/office.html"],afterRepair:["/comfort-group-cleaning/after-repair.html"],calcOrder:["/comfort-group-cleaning/calc-order.html"],contacts:["/comfort-group-cleaning/contacts.html"],successOr404:["/comfort-group-cleaning/success-order.html","/comfort-group-cleaning/404.html"]},i={home:()=>{l([".nav__link",".nav--aside-menu .nav__link"]),s("index.html#order-cleaning-block")},office:()=>{l([".nav__list .nav__item:nth-child(2) .nav__link",".nav--aside-menu  .nav__list .nav__item:nth-child(2) .nav__link"]),s("office.html#office-calc-block"),d("calc(100% / 3)"),document.querySelectorAll(".element--office-page").forEach((e=>e.classList.remove("isHidden"))),document.querySelector(".element--calculator-page").classList.add("isHidden")},afterRepair:()=>{!function(){const e=document.querySelector(".data-order .data-order__title");document.querySelector(".buildings").style.display="none",e.style.display="none"}(),document.querySelectorAll(".add-services-list__item:nth-child(n+3)").forEach((e=>e.classList.add("isHidden"))),s("after-repair.html#office-calc-block")},calcOrder:()=>{document.querySelector(".footer").classList.add("footer--calc-order"),d("calc(100% / 2)"),document.querySelectorAll(".block").forEach((e=>e.classList.add("block--white"))),document.querySelectorAll(".element--office-page").forEach((e=>e.classList.add("isHidden"))),document.querySelector(".element--calculator-page").classList.remove("isHidden")},contacts:()=>{document.querySelector(".connection").classList.remove("no-padding-top"),document.querySelector(".connection--second-block").classList.add("block-with-image"),u()},successOr404:()=>{u(),window.addEventListener("beforeunload",(function(){localStorage.removeItem("userOrderDataObj")}))}};function s(e){[...document.querySelectorAll(".dynamic-link")].forEach((t=>t.href=e))}function l(e){e.forEach((e=>{const t=document.querySelector(e);t&&t.classList.add("nav__link--current")}))}function u(){document.querySelector("main").classList.add("section--dark-background")}function d(e){document.querySelectorAll(".buildings__element").forEach((t=>t.style.flexBasis=e))}document.addEventListener("DOMContentLoaded",(function(){const n=window.location.pathname,s=document.querySelector("body"),{themeToggler:l}=t();l.addEventListener("click",(()=>{var t;t=s.classList.contains("active-dark-theme")?r.LIGHT:r.DARK,o=t,e("theme",t),c()})),c();const u=Object.keys(i).find((e=>a[e].includes(n)));u&&i[u]()}));var m=!1;if("undefined"!=typeof window){var y={get passive(){m=!0}};window.addEventListener("testPassive",null,y),window.removeEventListener("testPassive",null,y)}var f="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||"MacIntel"===window.navigator.platform&&window.navigator.maxTouchPoints>1),p=[],g=!1,b=-1,v=void 0,q=void 0,h=void 0,_=function(e){return p.some((function(t){return!(!t.options.allowTouchMove||!t.options.allowTouchMove(e))}))},L=function(e){var t=e||window.event;return!!_(t.target)||t.touches.length>1||(t.preventDefault&&t.preventDefault(),!1)},S=function(e,t){if(e){if(!p.some((function(t){return t.targetElement===e}))){var n={targetElement:e,options:t||{}};p=[].concat(function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}(p),[n]),f?window.requestAnimationFrame((function(){if(void 0===q){q={position:document.body.style.position,top:document.body.style.top,left:document.body.style.left};var e=window,t=e.scrollY,n=e.scrollX,r=e.innerHeight;document.body.style.position="fixed",document.body.style.top=-t,document.body.style.left=-n,setTimeout((function(){return window.requestAnimationFrame((function(){var e=r-window.innerHeight;e&&t>=r&&(document.body.style.top=-(t+e))}))}),300)}})):function(e){if(void 0===h){var t=!!e&&!0===e.reserveScrollBarGap,n=window.innerWidth-document.documentElement.clientWidth;if(t&&n>0){var r=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"),10);h=document.body.style.paddingRight,document.body.style.paddingRight=r+n+"px"}}void 0===v&&(v=document.body.style.overflow,document.body.style.overflow="hidden")}(t),f&&(e.ontouchstart=function(e){1===e.targetTouches.length&&(b=e.targetTouches[0].clientY)},e.ontouchmove=function(t){1===t.targetTouches.length&&function(e,t){var n=e.targetTouches[0].clientY-b;!_(e.target)&&(t&&0===t.scrollTop&&n>0||function(e){return!!e&&e.scrollHeight-e.scrollTop<=e.clientHeight}(t)&&n<0?L(e):e.stopPropagation())}(t,e)},g||(document.addEventListener("touchmove",L,m?{passive:!1}:void 0),g=!0))}}else console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.")},w=function(e){e?(p=p.filter((function(t){return t.targetElement!==e})),f&&(e.ontouchstart=null,e.ontouchmove=null,g&&0===p.length&&(document.removeEventListener("touchmove",L,m?{passive:!1}:void 0),g=!1)),f?function(){if(void 0!==q){var e=-parseInt(document.body.style.top,10),t=-parseInt(document.body.style.left,10);document.body.style.position=q.position,document.body.style.top=q.top,document.body.style.left=q.left,window.scrollTo(t,e),q=void 0}}():(void 0!==h&&(document.body.style.paddingRight=h,h=void 0),void 0!==v&&(document.body.style.overflow=v,v=void 0))):console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.")};(()=>{const e=document.querySelector(".aside-menu"),t=document.querySelector(".open-menu-btn"),n=document.querySelector(".close-menu-btn"),r=()=>{const n="true"===t.getAttribute("aria-expanded")||!1;t.setAttribute("aria-expanded",!n),e.classList.toggle("is-open"),(n?w:S)(document.body)};t.addEventListener("click",r),n.addEventListener("click",r),window.matchMedia("(min-width: 768px)").addEventListener("change",(n=>{n.matches&&(e.classList.remove("is-open"),t.setAttribute("aria-expanded",!1),w(document.body))}))})();const E=[{name:"Христофор Кацевич",experience:"10 років",memberID:"member-19",quote:"У царстві чистоти ми мрійники, які перетворюють звичайне на надзвичайне",category:"CEO"},{name:"Марина Миронова",experience:"8 років",memberID:"member-7",quote:"З кожним підмітанням і чищенням ми створюємо історію трансформації та оновлення",category:"CEO"},{name:"Барбара Маліновська",experience:"9 років",memberID:"member-22",quote:"Будуємо світ, де чистота не знає меж",category:"CEO"},{name:"Іван Стефанюк",memberID:"member-1",experience:"3 роки",quote:"Прибирання – це не просто робота, це спосіб зробити світ кращим",category:"windowCleaner"},{name:"Наталя Ковальська",memberID:"member-2",experience:"5 років",quote:"Чистий дім - щасливий дім",category:"windowCleaner"},{name:"Олена Новак",experience:"7 років",memberID:"member-3",quote:"У чистому просторі можна знайти спокій і ясність",category:"windowCleaner"},{name:"Катерина Войчик",experience:"2 роки",memberID:"member-4",quote:"Чистий дім допомагає активізувати продуктивні думки",category:"windowCleaner"},{name:"Роман Пятаковський",experience:"4 роки",memberID:"member-5",quote:"Чистота є найкращим відображенням добре організованого розуму",category:"windowCleaner"},{name:"Міхал Горбач",experience:"4 роки",memberID:"member-6",quote:"Чистота поруч із благочестям",category:"windowCleaner"},{name:"Джоана Охтирська",experience:"6 років",memberID:"member-9",quote:"Дбайливе прибирання створює затишну атмосферу",category:"dryCleaner"},{name:"Агнешка Лисенко",experience:"8 років",memberID:"member-24",quote:"Чисті будинки - щасливі серця",category:"dryCleaner"},{name:"Томаш Дубровський",memberID:"member-12",experience:"5 років",quote:"Чисте сьогодні для світлого завтра",category:"dryCleaner"},{name:"Анна Гопченко",experience:"6 років",memberID:"member-15",quote:"Блискучий простір викликає посмішку на кожному обличчі",category:"dryCleaner"},{name:"Адам Новицький",experience:"1 рік",memberID:"member-28",quote:"Подаруйте нове життя своїм улюбленим меблям",category:"dryCleaner"},{name:"Марк Куцевич",experience:"1 рік",memberID:"member-17",quote:"Чистота - це полотно для красивого життя",category:"dryCleaner"},{name:"Петро Зелінський",experience:"2 роки",memberID:"member-16",quote:"Бруд, сміття та безлад  не матимуть ні шансу",category:"universalCleaner"},{name:"Марк Левандовский",experience:"3 роки",memberID:"member-27",quote:"Прибирання — це процес перетворення хаосу на спокій",category:"universalCleaner"},{name:"Лукаш Камінський",experience:"4 роки",memberID:"member-18",quote:"Чистота – найкраща прикраса",category:"universalCleaner"},{name:"Ніколь Садович",experience:"7 років",memberID:"member-21",quote:"Чистота – головний закон здоров’я",category:"universalCleaner"},{name:"Борис Сизов",experience:"5 років",memberID:"member-20",quote:"Скажіть бруду 'Ні!'",category:"universalCleaner"},{name:"Сара Гнатович",experience:"4 роки",memberID:"member-14",quote:"Прибирання – це мистецтво збереження краси навколо",category:"universalCleaner"},{name:"Магдалена Садовська",experience:"6 років",memberID:"member-23",quote:"Прибирання — це не клопіт, це форма медитації",category:"universalCleaner"},{name:"Ніна Рудаська",experience:"6 років",memberID:"member-25",quote:"Безлад — ворог спокою, а прибирання — це боротьба",category:"universalCleaner"},{name:"Василиса Острозька",experience:"2 роки",memberID:"member-26",quote:"Прибирання — це акт любові до себе та тих, хто поруч",category:"universalCleaner"},{name:"Марія Пятровська",experience:"3 роки",memberID:"member-8",quote:"Клієнти — це серцебиття будь-якого бізнесу, а їхнє задоволення — наша життєва сила",category:"contactManager"},{name:"Моніка Нікольська",experience:"3 роки",memberID:"member-10",quote:"Клієнти — як пазли; кожен унікальний, і вирішення їхніх проблем — це виклик",category:"contactManager"},{name:"Кароліна Сидориш",experience:"3 роки",memberID:"member-11",quote:"Відгуки клієнтів — це компас, який веде нас до вдосконалення",category:"contactManager"},{name:"Ева Мажевська",experience:"3 роки",memberID:"member-13",quote:"Клієнти можуть забути, що ви сказали, але вони ніколи не забудуть, як ви викликали у них почуття",category:"contactManager"}],k=function(){const e=new Set;return E.forEach((({category:t})=>{e.add(t)})),Array.from(e)}(),x=function(e){return Object.values(e.reduce(((e,t)=>{const{category:n,name:r,memberID:o}=t;return e[n]||(e[n]={name:n,members:[]}),e[n].members.push({name:r,memberID:o}),e}),{}))}(E);!function(e,t){const n=document.querySelector(".team__category-list"),r=document.createDocumentFragment();e.forEach((e=>{const n=document.createElement("li");n.className="team__category-item",n.textContent=t[e],r.appendChild(n)})),n.appendChild(r)}(k,{windowCleaner:"Клінери вікон",dryCleaner:"Спеціалісти із хімчистки",universalCleaner:"Універсали",contactManager:"Менеджери",CEO:"CEO"}),function(e){const{category:t}={category:"universalCleaner"};let n=0;const r=function(e){const t=E.filter((t=>t.category===e)).length;let n=[];for(let e=1;e<=t;e++)n.push("slide-"+e);return n}(t);!function(e){const t=document.querySelector(".team__circular-slider");E.filter((t=>t.category===e)).forEach(((n,r)=>{if(n.category===e){const e=document.createElement("li");e.classList.add("team__circular-section",`slide-${r+1}`),1===r?e.classList.add("team__circular-section",`slide-${r+1}`,"team-active-slide"):e.classList.add("team__circular-section",`slide-${r+1}`),e.setAttribute("data-member",n.memberID),e.setAttribute("data-category",n.category);const o=document.createElement("img");o.src=`images/team/${n.memberID}.png`,o.alt="Фото члена команди",e.appendChild(o),t.appendChild(e)}}))}(t);const o=r.map((e=>document.querySelector(`.team__circular-section.${e}`)));(function(e,t){const n=document.querySelector(".team__members-name-list"),r=document.createDocumentFragment();(function(e){if(e.length<2)return e.slice();const t=[...e];[t[0],t[1]]=[t[1],t[0]];for(let n=2,r=e.length-1;n<r;n++,r--)[t[n],t[r]]=[t[r],t[n]];return t})(e.find((e=>e.name===t)).members).forEach((({name:e,memberID:t},n)=>{const o=document.createElement("li");o.className=0===n?"team__name name--active":"team__name",o.textContent=e,o.setAttribute("data-id",t),r.appendChild(o)})),n.appendChild(r)})(x,t),d(o,n+1);const c=document.querySelector(".team__circular-slider"),a=document.querySelector(".team__btn-prev"),i=document.querySelector(".team__btn-next"),s=document.querySelector(".team__members-name-list");function l(e){n=(n+e+r.length)%r.length,u(e)}function l(e){n=(n+e+r.length)%r.length,u(e)}function u(e){const t=r.map((e=>document.querySelector(`.team__circular-section.${e}`)));!function(e){e.forEach((e=>e.classList.remove("team-active-slide")))}(t);const n=1===e?0:2;!function(e,t){const n=r.length;1===t?e.forEach(((e,o)=>{const c=(o+t)%n;e.classList.replace(r[o],r[c])})):-1===t&&e.forEach(((e,o)=>{const c=(o+t+n)%n;e.classList.replace(r[o],r[c])}))}(t,e),function(e,t){e[t].classList.add("team-active-slide")}(t,n),d(t,n),function(e,t){const n=document.querySelectorAll(".team__name"),r=[...n].find((e=>e.classList.contains("name--active")));if(r){r.classList.remove("name--active");let o=([...n].indexOf(r)+e+t)%t;o<0&&(o+=t),n[o].classList.add("name--active")}}(e,t.length)}function d(e,t){const n=document.querySelector(".member-info__title"),r=document.querySelector(".member-info__exp"),o=document.querySelector(".member-info__quote"),{name:c,experience:a,quote:i}=function(e,t){const n=e[t].getAttribute("data-member");return E.find((e=>e.memberID===n))}(e,t);n.innerHTML=c,r.innerHTML=`Досвід роботи: ${a}`,o.innerHTML=`<i class="fa-solid fa-quote-left"></i> ${i} <i class="fa-solid fa-quote-right"></i>`}a.addEventListener("click",(()=>l(-1))),i.addEventListener("click",(()=>l(1))),c.addEventListener("click",(function(e){const t=e.target;if("IMG"!==t.tagName)return;const n=t.closest("li");if(!n||n.classList.contains("team-active-slide"))return;const r=n.classList[1];"slide-3"===r?l(-1):"slide-1"===r&&l(1)})),s.addEventListener("click",(function(e){const t=e.target;if("LI"!==t.tagName)return;if(!t||t.classList.contains("name--active"))return;const n=t.getAttribute("data-id"),c=function(e,t){return[...e].find((e=>e.getAttribute("data-member")===t))}(o,n),a=function(e){const t=[...e.classList].find((e=>e.startsWith("slide-")));return t?parseInt(t.split("-")[1],10):0}(c);!function(e){const t=e<0?-1:1;for(let n=0;n<Math.abs(e);n++)l(t)}(function(e,t){if(6===t){const t=e-2;return t>3?2:t<0?1:3===t?3:-t}if(9===t){const t=e-2;switch(t){case 7:return t+4;case 6:return-t;case 5:return 4;case 4:return 5;case 3:return 6;case 2:return-2;case 1:return-1;default:return t<0?1:0}}}(a,r.length))}))}(),n(699);const C={name:"subscription",openModalBtn:document.querySelector("[data-subscription-modal-open]"),closeModalBtn:document.querySelector("[data-subscription-modal-close]"),modal:document.querySelector("[data-subscription-modal]"),backdrop:document.querySelector(".backdrop--subscr")};fe(C);const D=document.querySelectorAll(".buildings__element"),I=document.querySelector(".control-quantity-btn--plus"),A=document.querySelector(".control-quantity-btn--minus"),T=document.querySelectorAll(".service-element .checkbox"),H=document.querySelector(".table__data"),O=document.querySelector("#take-keys-btn"),M=document.querySelector("#give-keys-btn"),$=document.querySelector(".keys-address-block"),N=document.querySelector(".keys-address-block__take-item"),B=document.querySelector(".keys-address-block__give-item");I?.addEventListener("click",G),A?.addEventListener("click",G),O?.addEventListener("click",V),M?.addEventListener("click",V),D.forEach((e=>{e.addEventListener("click",(e=>{ie(e.target),function(e){const t=e.target;t.classList.contains("buildings__element--current")||[...D].forEach((e=>{e===t?(e.id,e.classList.add("buildings__element--current")):e.classList.remove("buildings__element--current")}))}(e)}))})),T.forEach((e=>{e.addEventListener("change",(e=>{!function(e){const t=e.currentTarget,n=t.closest("label"),r=n.nextElementSibling,o=t.checked;(function(e,t){e.classList.toggle("isHidden",!t)})(r,o),function(e){const t=e.querySelector(".control-quantity-btn--plus"),n=e.querySelector(".control-quantity-btn--minus");t.addEventListener("click",P),n.addEventListener("click",P)}(r);const c=function(e){const t=e.querySelector(".service-element__text").textContent,n=e.querySelector(".service-element__accent").getAttribute("data-value"),r=e.getAttribute("data-id"),o=document.createElement("li");o.id=r,o.className="table__item table__block";const c=J("item__name",`${t}`),a=J("","x"),i=J("name-wrapper"),s=J("quantity-wrapper");X(s,[a,J("item__quantity service-quantity",R[r].quantity)]),X(i,[c,s]);const l=J("service-value",`${n}zł`);return l.setAttribute("data-service",r),X(o,[i,l]),o}(n),a=n.getAttribute("data-id");(function(e,t){const n=t.id,r=function(e){return[...H.querySelectorAll("li")].find((t=>t.id===e))}(n);e&&!r?(function(e){H.insertAdjacentElement("beforeend",e)}(t),z(n)):!e&&r&&(z(n,0),function(e){H.removeChild(e)}(r))})(o,c),K(a),Y(j)}(e)}))}));const R={square:{name:"Площа",quantity:1,price:2},windowsStandard:{name:"Миття вікон (стандартні)",quantity:1,price:35},windowsLarge:{name:"Миття вікон (до підлоги)",quantity:1,price:40},microWave:{name:"Мікрохвильовка",quantity:1,price:15},refrigerator:{name:"Холодильник",quantity:1,price:40},plate:{name:"Плита",quantity:1,price:35},officeChair:{name:"Хімчистка офісних стільців",quantity:1,price:20},sofaDry2x:{name:"Хімчистка дивану 2х",quantity:1,price:109.99},sofaDry3x:{name:"Хімчистка дивану 3х",quantity:1,price:129.99},sofaDry4x:{name:"Хімчистка дивану 4х",quantity:1,price:149.99}},j={square:{name:"Площа",quantity:1,price:2},windowsStandard:{name:"Миття вікон (стандартні)",quantity:0,price:35},windowsLarge:{name:"Миття вікон (до підлоги)",quantity:0,price:40},microWave:{name:"Мікрохвильовка",quantity:0,price:15},refrigerator:{name:"Холодильник",quantity:0,price:40},plate:{name:"Плита",quantity:0,price:35},officeChair:{name:"Хімчистка офісних стільців",quantity:0,price:20},sofaDry2x:{name:"Хімчистка дивану 2х",quantity:0,price:109.99},sofaDry3x:{name:"Хімчистка дивану 3х",quantity:0,price:129.99},sofaDry4x:{name:"Хімчистка дивану 4х",quantity:0,price:149.99}};function F(e){const t=U(e),n=function(e){return e.currentTarget.getAttribute("data-type")}(e);!function(e,t){if("plus"===t)R[e].quantity+=1;else if("minus"===t){if(1===R[e].quantity)return;R[e].quantity-=1}}(t,n),function(e){const t=[...document.querySelectorAll(".service-element")].find((t=>t.getAttribute("data-id")===e)),n=t?.nextElementSibling.querySelector(`[data-name="${e}"]`),r=document.querySelector(".wrap--square").querySelector(`[data-name="${e}"]`);n&&(n.textContent=R[e].quantity),r&&(r.textContent=R[e].quantity,document.querySelector(".square-value-total").textContent=R[e].quantity)}(t),function(e){const t=document.querySelector(`[data-name="${e}"]`).parentNode?.parentNode?.querySelector(".control-quantity-btn--minus .icon--minus");1===R[e].quantity?t.style.fill="rgba(\t77, 18, 153, 0.3)":t.style.fill="#4D1299"}(t)}function P(e){const t=U(e);F(e),K(t),Y(j)}function G(e){F(e),function(){const e=document.querySelector('[data-service="square"]');j.square.quantity=R.square.quantity,e.textContent=j.square.quantity*j.square.price+"zł"}(),Y(j)}function K(e){const t=document.querySelector(`[data-service="${e}"]`),n=document.querySelector(`#${e} .service-quantity`),r=R[e].price;if(t&&n){const o=z(e),c=W(o,r);t.textContent=c,n.textContent=o}else z(e,0)}function W(e,t){return`${(e*t).toFixed(2)}zł`}function z(e,t){const n=void 0!==t?t:R[e].quantity;return j[e].quantity=n,n}function Y(e){const t=(n=e,Object.keys(n).reduce(((e,t)=>{const r=n[t];return e+r.quantity*r.price}),0).toFixed(2));var n;document.querySelector(".total-order-value").textContent=`${t}zł`}function J(e,t){const n=document.createElement("span");return e&&(n.className=e),t&&(n.textContent=t),n}function X(e,t){t.forEach((t=>{e.appendChild(t)}))}function U(e){const t=e.currentTarget?.closest(".wrap--service")?.parentNode.querySelector("label")?.getAttribute("data-id"),n=e.currentTarget?.closest(".wrap--square")?.getAttribute("data-id");return t||n}function V(e){const t=e.currentTarget;t.classList.toggle("active"),"take-keys-btn"===t.id?N.classList.toggle("isHidden"):B.classList.toggle("isHidden"),function(){const e=N.classList.contains("isHidden"),t=B.classList.contains("isHidden");e&&t?$.classList.add("isHidden"):$.classList.remove("isHidden")}()}const Q=document.querySelector(".subscr__form"),Z=document.querySelectorAll(".payment__btn"),ee=document.querySelector(".form__payment-error-text"),te=document.querySelectorAll(".form__input"),ne=document.querySelector(".calc-btn"),re=document.querySelector('[name="studio-policy-check"]');let oe;re&&(oe=new MutationObserver(((e,t)=>{e.forEach((e=>{"attributes"===e.type&&"data-checked"===e.attributeName&&(re.getAttribute("data-checked"),me())}))})),oe.observe(re,{attributes:!0,attributeFilter:["data-checked"]}),re.addEventListener("change",(()=>{re.setAttribute("data-checked",re.checked)}))),Q?.addEventListener("submit",ye),ne?.addEventListener("click",(e=>{e.preventDefault(),ye(e)})),Z.forEach((e=>{e.addEventListener("click",(e=>{!function(e){const t=e.target.closest("button");ie(t),t.classList.contains("active")||[...Z].forEach((e=>{e===t?e.classList.add("active"):e.classList.remove("active")}))}(e),de()}))})),te.forEach((e=>{e.addEventListener("focus",(()=>{e.classList.remove("error")}))}));const ce=["userName","userSurname","userTel","userEmail","userLocation","userDate","userTime"],ae={userPaymentType:"",userBuildingType:"",userTakeKeyAddress:"",userGiveKeyAddress:"",userSquare:{quantity:"",cost:""},userServices:{}};function ie(e){const t=e.getAttribute("data-type"),n=e.getAttribute("data-id")??"";ae[t]=n}function se(e){[...e].forEach((e=>{e.classList.remove("error")}))}function le(){return document.querySelector('[name="studio-policy-check"]').checked}function ue(){document.querySelector(".form__payment-error-text").classList.toggle("isHidden")}function de(){!ee.classList.contains("isHidden")&&ue()}function me(){document.querySelector(".form__policy-error-text").classList.add("isHidden")}function ye(t){t.preventDefault();const n="BUTTON"===t.currentTarget.tagName,r=n?Q.elements:t.currentTarget.elements,o=function(e,t){return t.filter((t=>""===e[t].value.trim())).map((t=>e[t]))}(r,ce);se(r),function(e){e.forEach((e=>{e.classList.add("error")}))}(o);const c=[...Z].some((e=>e.classList.contains("active"))),a=o.length>0;c||ue(),function(){const e=document.querySelector(".form__policy-error-text");e.classList.add("isHidden"),le()||e.classList.remove("isHidden")}();const i=le();if(!c||a||!i)return;const s=n?Q:t.target;var l,u,d;n&&(function(){const e=document.querySelector('[data-type="userTakeKeyAddress"]'),t=document.querySelector('[data-type="userGiveKeyAddress"]');ie(e),ie(t)}(),l=ae,u=j.square.quantity,d=j.square.price,l.userSquare={quantity:`${u}`,cost:W(u,d)},function(e){const t=(n=j,Object.keys(n).filter((e=>n[e].quantity>0)).reduce(((e,t)=>(e[t]={...n[t]},delete e[t].square,e)),{}));var n;e.userServices=Object.keys(t).filter((e=>"square"!==e)).map((e=>{const{name:n,quantity:r,price:o}=t[e];return{name:n,quantity:r,cost:W(r,o)}}))}(ae)),function(e){new FormData(e).forEach(((e,t)=>{t.startsWith("user")&&(ae[t]=e)}))}(s),e("userOrderDataObj",ae),function(e){[...e].forEach((e=>{"text"===e.type||"email"===e.type||"tel"===e.type||"TEXTAREA"===e.tagName?e.value="":"checkbox"===e.type&&(e.checked=!0)}))}(r),[...Z].forEach((e=>{e.classList.remove("active")})),oe.disconnect(),n||pe(C),window.location.href=window.location.href="https://marynashavlak.github.io/comfort-group-cleaning/success-order.html"}function fe(e){e.openModalBtn?.addEventListener("click",(()=>pe(e))),e.closeModalBtn?.addEventListener("click",(t=>{t.stopPropagation(),pe(e)})),e.backdrop?.addEventListener("click",(t=>{t.target===e.backdrop&&pe(e)}))}function pe(e){document.body.classList.toggle(`${e.name}-modal-open`),e.modal?.classList.toggle("backdrop--hidden"),"subscription"===e.name&&(se(Q?.elements),de(),me())}fe({name:"location",openModalBtn:document.querySelector("[data-location-modal-open]"),closeModalBtn:document.querySelector("[data-location-modal-close]"),modal:document.querySelector("[data-location-modal]"),backdrop:document.querySelector(".backdrop--location")})}()}();