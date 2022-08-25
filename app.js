// importing other stuff, utility functions for:
// working with supabase:
import { checkAuth, signOutUser, getGroceryList } from './fetch-utils.js';
import { renderDemGroceries } from './render-utils.js';


// pure rendering (data --> DOM):

/*  "boiler plate" auth code */
// checking if we have a user! (will redirect to auth if not):
checkAuth();
// can optionally return the user:
// const user = checkAuth();

// sign out link:
const signOutLink = document.getElementById('sign-out-link');
signOutLink.addEventListener('click', signOutUser);
/* end "boiler plate auth code" */

// grab needed DOM elements on page:

const groceryListEl = document.querySelector('.groceries');
// const groceryForm = document.querySelector('.grocery-form');

// local state:

// display functions:

async function displayGroceries() {
    groceryListEl.innerHTML = '';
    const grabGroceryList = await getGroceryList();
    const list = renderDemGroceries(grabGroceryList);
    groceryListEl.append(list);
}

async function loadPage() {
    const response = await getGroceryList();
    if (response.error) {
        console.log(response.error.message);
    } else {
        displayGroceries();
    }
}

loadPage();
// events:
