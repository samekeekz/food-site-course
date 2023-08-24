


console.log('Запрос данных...');

const req = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Подготовка данных...');

        const product = {
            name: 'Buds Pro 2',
            price: 22000,
        };

        resolve(product);

    }, 2000);
});


req.then((product) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            product.color = 'Black';
            resolve(product);
        }, 2000);
    });
}).then(data => {
    console.log(data);
})