// const proxyurl = "https://cors-anywhere.herokuapp.com/";
const allItems = 'http://localhost:8000/api/all_items/'
const current_user = 'http://localhost:8000/accounts/current_user'
const signout = 'http://localhost:8000/accounts/signout'
const last_10_items = 'http://localhost:8000/api/last_10/'
const item = 'http://localhost:8000/api/item/'

// in the brouser: http://localhost:8000/
export function get_all_items() {
    return fetch(allItems)
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            console.log(myJson);
            return myJson
        }).catch(error => console.log('all items failed : ' + error.message));

}

export function get_item_schedual(item, start, end) {
    debugger;
    return fetch(`http://localhost:8000/api/get_item_schedual/?q=${item}&start=${start}&end=${end}`).then(response => response.json()).then(myJson => {
        console.log(myJson);
        return myJson
    }).catch(error => console.log('Failed to find query: ' + error.message));
}

export function set_item_schedual(data) {
    return fetch(`http://localhost:8000/api/post_item_schedual/`, {
        method: 'POST',
        body: data,
    })
        .then(resp => resp.json())
        .then(resp => {
            console.log('in fetch', resp);
        })
        .catch(error => {
            console.error(error);
        })

}

export function get_item(search_param) {
    " this function fetches an item according to request"
    return fetch(`http://localhost:8000/api/item/?q=${search_param}`).then((response) => {
        return response.json();
    })
        .then((myJson) => {
            return myJson
        }).catch(error => console.log('Failed to find query: ' + error.message));

}

export function get_last_10_items() {
    return fetch(last_10_items)
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            return myJson
        }).catch(error => console.log('last 10 failed : ' + error.message));

}

export function find_items(search_param, ordering = 'date') {
    " this function performs a search according to object passed in search_param"
    return fetch(`http://localhost:8000/api/search/?q=${search_param}&ordering=${ordering}`).then((response) => {
        return response.json();
    })
        .then((myJson) => {
            return myJson
        }).catch(error => console.log('Failed to find query: ' + error.message));

}

export function get_current_user() {
    return fetch(current_user)
        .then((response) => {
            return response.json()
        }).then((myJson) => {
            return myJson
        }).catch(error => console.log('Authorization failed : ' + error.message));
}

export function logoutUser() {
    return fetch(signout).then(response => response.json()).then(myJson => myJson).catch(error => console.log('Sigout failed : ' + error.message));
}

