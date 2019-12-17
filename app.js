//once page loads the function will run
window.addEventListener('load', () => {
    let long;
    let lat;

    // if the place exist in the broswer, we can find the exact place.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'http://cors-anywhere.herokuapp.com/';

            const api = `${proxy}https://api.darksky.net/forecast/b6ab47245bd009cbb23f58a51784c1f4/${lat},${long}`;

            fetch(api)
                //once receive api, format to json
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                });
        });




    }

});