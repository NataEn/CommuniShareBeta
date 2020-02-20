// const proxyurl = "https://cors-anywhere.herokuapp.com/";
const allItems = 'http://localhost:8000/api/all_items/'
const current_user = 'http://localhost:8000/accounts/current_user'
const last_10_items = 'http://localhost:8000/api/last_10/'

// in the brouser: http://localhost:8000/
export function get_all_items() {
    fetch(allItems)
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            console.log(myJson);
            return myJson
        }).catch(error => console.log('Authorization failed : ' + error.message));

}

export function get_last_10_items() {
    fetch(last_10_items)
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            console.log(myJson);
            return myJson
        }).catch(error => console.log('Authorization failed : ' + error.message));
}

export function find_items(search_param) {
    " this function performs a search according to object passed in search_param"
    fetch(`http://localhost:8000/api/search/?q=${search_param}`).then((response) => {
        return response.json();
    })
        .then((myJson) => {
            console.log(myJson);
            return myJson
        }).catch(error => console.log('Failed to find query: ' + error.message));

}

export function get_current_user() {
    fetch(current_user)
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((myJson) => {
            console.log('user is', myJson);
            return myJson
        }).catch(error => console.log('Authorization failed : ' + error.message));

}

