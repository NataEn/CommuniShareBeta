// const proxyurl = "https://cors-anywhere.herokuapp.com/";
const allItems = 'http://localhost:8000/api/all_items/'
const current_user = 'http://localhost:8000/accounts/current_user'

// in the brouser: http://localhost:8000/
export function get_all_items() {
    fetch(allItems)
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            console.log(myJson);
        }).catch(error => console.log('Authorization failed : ' + error.message));

}

export function get_current_user() {
    fetch(current_user)
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((myJson) => {
            console.log('user is', myJson);
        }).catch(error => console.log('Authorization failed : ' + error.message));

}

