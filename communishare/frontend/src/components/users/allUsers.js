//get all usera

fetch('http://localhost:8000/users/api/user/?format=json')
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    console.log(myJson);
  });