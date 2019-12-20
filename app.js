//once page loads the function will run
window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');



    // if the place exist in the broswer, we can find the exact place.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            // act as a proxy that allows to request if you are in localhost.
            const proxy = 'http://cors-anywhere.herokuapp.com/';

            const api = `${proxy}https://api.darksky.net/forecast/b6ab47245bd009cbb23f58a51784c1f4/${lat},${long}`;

            fetch(api)
                //once receive api, format to json
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temperature, summary, icon } = data.currently;
                    //set DOM elements from the api
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //set icon
                    setIcons(icon, document.querySelector(".icon"));

                    //changing to celsius/farenheit
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                        } else {
                            temperatureSpan.textContent = "F";
                        }
                    })


                });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        //look for every line and replace it with _
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        //this will add the id and skycons and the current icon.
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});