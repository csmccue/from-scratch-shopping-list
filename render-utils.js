export function renderDemGroceries(groceries) {
    const div = document.createElement('div');
    for (let food of groceries) {
        const li = document.createElement('li');
        li.textContent = food.quantity + ' ' + food.item;
        if (food.bought === false) {
            // console.log('we in the if loop');
            li.addEventListener('click', async () => {
                food.bought = true;
                li.classList.add('purchased');
                // console.log('you purchased ' + food.quantity + ' ' + food.item);
            });
        } else {
            li.classList.add('purchased');
        }
        div.append(li);
    }
    return div;
}