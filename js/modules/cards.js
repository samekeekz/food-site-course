

function cards() {
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

}


module.exports = cards;