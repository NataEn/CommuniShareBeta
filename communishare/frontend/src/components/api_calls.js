// const proxyurl = "https://cors-anywhere.herokuapp.com/";
const allItems = 'localhost:8000/api/'
// in the brouser: http://localhost:8000/
fetch(allItems)
    .then((response) => {
        return response.json();
    })
    .then((myJson) => {
        console.log(myJson);
    }).catch(error => console.log('Authorization failed : ' + error.message));
;