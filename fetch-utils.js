const SUPABASE_URL = 'https://xnwqsbmekrohmjrqulao.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhud3FzYm1la3JvaG1qcnF1bGFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTk2MzkyNTgsImV4cCI6MTk3NTIxNTI1OH0.A9jwVzQJOXoOYRe3CtCtSj6B30yywT0bXU8EkVXZq4k';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export function checkAuth() {
    const user = getUser();
    // do we have a user?
    if (!user) {
        // path is different if we are at home page versus any other page
        const authUrl = location.pathname === '/' ? './auth/' : '../auth/';
        // include the current url as a "redirectUrl" search param so user can come
        // back to this page after they sign in...
        location.replace(`${authUrl}?redirectUrl=${encodeURIComponent(location)}`);
    }

    // return the user so can be used in the page if needed
    return user;
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */

// gimme those groceries
export async function getGroceryList() {
    // debugger
    const response = await client.from('groceries').select('*').order('id');
    return checkError(response);

}

export async function addGroceryItem(item) {
    const response = await client.from('groceries').insert(item).single();
    return checkError(response);
}

/* check error function from marty */

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
