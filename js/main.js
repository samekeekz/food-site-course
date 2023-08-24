

import { tabs } from './modules/tabs.js';

window.addEventListener('DOMContentLoaded', () => {

    tabs();

    // TABS
    // const tabs = document.querySelectorAll('.tabheader__item'),
    //       tabsContent = document.querySelectorAll('.tabcontent'),
    //       tabsParent = document.querySelector('.tabheader__items');


    // function hideTabContent() {
    //     tabsContent.forEach(item => {
    //         item.style.display = 'none';
    //     });

    //     tabs.forEach(item => {
    //         item.classList.remove('tabheader__item_active');
    //     })
    // };


    // function showTabContent(i = 0) {
    //     tabsContent[i].style.display = 'block';
    //     tabs[i].classList.add('tabheader__item_active');
    // }


    // hideTabContent();
    // showTabContent();
    // tabsParent.addEventListener('click', (event) => {
    //     const target = event.target;


    //     if(target && target.classList.contains('tabheader__item')){

    //         tabs.forEach((item, i) => {
    //             if(target == item){
    //                 hideTabContent();
    //                 showTabContent(i);
    //             }
    //         })
    //     }

    // });


    // TIMER

    const deadline = '2023-09-02';

    function getRemainingTime(endTime){
        const t = Date.parse(endTime) - Date.parse(new Date()),
              days = Math.floor(t / 1000 / 60 / 60 / 24),
              hours = Math.floor((t / 1000 / 60 / 60) % 24),
              minutes = Math.floor((t / 1000 / 60) % 60) ,
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if(num >= 0 && num < 10){
            return `0${num}`;
        }
        else{
            return num;
        }
    };


    function setClock(selector, endTime){

        const timer = document.querySelector(selector),
              days = document.getElementById('days'),
              hours = document.getElementById('hours'),
              minutes = document.getElementById('minutes'),
              seconds = document.getElementById('seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock(){
            const t = getRemainingTime(endTime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if(t.total <= 0){
                clearInterval(timeInterval);
            }

        }
    }

    setClock('.timer', deadline);

    // Modal windows

    let userOpenedModal = false;

    const modalWindow = document.querySelector('.modal'),
          modalTrigger = document.querySelectorAll('[data-modal]');


    function openModal() {
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        userOpenedModal = true;
        clearInterval(modalTimerId);
    }

    function closeModal() {
        modalWindow.classList.add('hide');
        modalWindow.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalTrigger.forEach(item => {
        item.addEventListener('click', openModal);
    });

    modalWindow.addEventListener('click', (e) => {
        if(e.target === modalWindow || e.target.getAttribute('data-close') == ''){
            closeModal();
        }
    })

    document.addEventListener('keydown', (e) => {
        if(e.code === "Escape" && modalWindow.classList.contains('show')){
            closeModal();

        }
    })

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight && !userOpenedModal){
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);


    // Using Classes

    class MenuCard{
        constructor(src, alt, title, descr, price, parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.transfer = 440;
            this.changeToKZT();
        }

        changeToKZT() {
            this.price *= this.transfer;
        }


        render() {
            const elem = document.createElement('div');
            if(this.classes.length === 0){
                this.element = 'menu__item';
                elem.classList.add(this.element);
            }
            else{
                this.classes.forEach(className => elem.classList.add(className));
            }

            elem.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">Меню ${this.title}</h3>
                    <div class="menu__item-descr">Меню ${this.title} - ${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> тг/день</div>
                    </div>
                </div>
            `;
            this.parent.append(elem);
        }
    }

    const getResource = async (url) =>{
        const res = await fetch(url);

        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status:${res.status}`);
        }

        return await res.json();
    }

    getResource('http://localhost:3000/menu')
    .then((data) => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        })
    })

    // axios.get('http://localhost:3000/menu')
    //     .then(data => {
    //         data.data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         })
    //     });

    // new MenuCard(
    //     './img/tabs/vegy.jpg',
    //     'vegy',
    //     'Фитнес',
    //     'это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     4,
    //     '.menu .container'
    // ).render();


    // new MenuCard(
    //     './img/tabs/elite.jpg',
    //     'elite',
    //     '“Премиум”',
    //     'мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     10,
    //     '.menu .container'
    // ).render();


    // new MenuCard(
    //     './img/tabs/post.jpg',
    //     'post',
    //     '“Постное”',
    //     'это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //     10,
    //     '.menu .container',
    // ).render();



    //Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо, Мы с вами потом свяжемся',
        failure: 'Попробуйте позже'
    };


    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    }

    function bindPostData(form){

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);


            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data)
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            })


        })
    }


    forms.forEach(item => {
        bindPostData(item);
    })


    function showThanksModal(message){
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');

        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>x</div>
                <div class=""modal__title>${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
            prevModalDialog.classList.add('show');
            closeModal();

        }, 4000);
    }


    // fetch('http://localhost:3000/menu')
    //     .then(response => response.json())
    //     .then(data => console.log(data));




    // Slider

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.getElementById('total'),
        current = document.getElementById('current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;

        prev.style.userSelect = 'none';
        next.style.userSelect = 'none';

        let slideIndex = 1;
        let offset = 0;

        slidesField.style.width = 100 * slides.length + '%';
        slidesField.style.display = 'flex';
        slidesField.style.transition = '0.5s all';
        slidesWrapper.style.overflow = 'hidden';


        slider.style.position = 'relative';

        const indicators = document.createElement('ol'),
              dots = [];
        // dots.classList.add('carousel-dots');
        indicators.style.cssText = `
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 15;
            display: flex;
            justify-content: center;
            margin-right: 15%;
            margin-left: 15%;
            list-style: none;
        `;

        slider.append(indicators);

        for(let i=0; i<slides.length; i++){
            const dot = document.createElement('li');
            dot.setAttribute('data-slide-to', i + 1);

            dot.style.cssText = `
                box-sizing: content-box;
                flex: 0 1 auto;
                width: 30px;
                height: 6px;
                margin-right: 3px;
                margin-left: 3px;
                cursor: pointer;
                background-color: #fff;
                background-clip: padding-box;
                border-top: 10px solid transparent;
                border-bottom: 10px solid transparent;
                opacity: 0.5;
                transition: opacity 0.6s ease;
            `;

            if(i == 0){
                dot.style.opacity = '1';
            }

            indicators.append(dot);
            dots.push(dot);
        }

        slides.forEach(slide => {
            slide.style.width = width;
        })

        if(slides.length < 10){
            total.textContent = `0${slides.length}`;
        } else{
            total.textContent = slides.length;
        }


        prev.addEventListener('click', () => {
            if(offset == 0){
                offset = +width.slice(0, width.length - 2) * (slides.length - 1);
            }
            else{
                offset -= +width.slice(0, width.length - 2);
            }
            slidesField.style.transform = `translateX(-${offset}px)`;
            showCurrentIndex(offset);

        })

        next.addEventListener('click', () => {
            if(offset == +width.slice(0, width.length - 2) * (slides.length - 1)){
                offset = 0;
            }
            else{
                offset += +width.slice(0, width.length - 2);
            }
            slidesField.style.transform = `translateX(-${offset}px)`;
            showCurrentIndex(offset);

        })


        function showCurrentIndex(offset){
            slideIndex = (offset / (+width.slice(0, width.length - 2))) + 1;
            if(slideIndex < 10){
                current.textContent = `0${slideIndex}`;
            } else{
                current.textContent = slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = '0.5');
            dots[slideIndex-1].style.opacity = '1';
        }


        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideTo = e.target.getAttribute('data-slide-to');

                slideIndex = slideTo;
                offset = +width.slice(0, width.length - 2) * (slideTo - 1);
                console.log(offset);
                slidesField.style.transform = `translateX(-${offset}px)`;

                showCurrentIndex(offset);
            })
        })

    // showSlides(slideIndex);

    // if(slides.length < 10){
    //     total.textContent = `0${slides.length}`;
    // } else{
    //     total.textContent = slides.length;
    // }

    // function showSlides(n){
    //     if(n > slides.length){
    //         slideIndex = 1;
    //     }
    //     if(n < 1){
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => item.style.display = 'none');

    //     slides[slideIndex-1].style.display = 'block';

        // if(slideIndex < 10){
        //     current.textContent = `0${slideIndex}`;
        // } else{
        //     current.textContent = slideIndex;
        // }
    // }

    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // });




// Calculator

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    if(localStorage.getItem('sex')){
        sex = localStorage.getItem('sex');
    }
    else{
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if(localStorage.getItem('ratio')){
        ratio = +localStorage.getItem('ratio');
    }
    else{
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }


    function initLocalSettings(selector, activeClass){
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);

            if(elem.getAttribute('id') === localStorage.getItem('sex')){
                elem.classList.add(activeClass);
            }

            if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                elem.classList.add(activeClass);
            }
        })
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');


    function calcTotal() {
        if(!sex || !height || !weight || !age || !ratio){
            result.textContent = '____';
            return
        }
        if(sex === 'female'){
            result.textContent = Math.floor((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        }
        else{
            result.textContent = Math.floor((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);


        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if(elem.getAttribute('data-ratio')){
                    ratio = +elem.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                }
                else{
                    sex = elem.getAttribute('id');
                    localStorage.setItem('sex', sex);
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                })

                elem.classList.add(activeClass);
                calcTotal();
            })
        })


    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');


    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if(input.value.match(/\D/g)){
                input.style.border = '1px solid red';
            }
            else{
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
                }
                calcTotal();
        })

    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

});



