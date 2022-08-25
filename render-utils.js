export function renderDemGroceries(groceries) {
    const div = document.createElement('div');
    for (let food of groceries) {
        const li = document.createElement('li');
        li.textContent = food.quantity + ' ' + food.item;
        if (food.bought === false) {
            li.addEventListener('click', async () => {
                food.bought = true;
            });
        } else {
            li.classList.add('purchased');
        }
        div.append(li);
    }
    return div;
}