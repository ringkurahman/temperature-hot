window.addEventListener('load', () => {
  let long;
  let lat;
  const temperatureDescription = document.querySelector(
    '.temperature-description'
  );
  const temperatureDegree = document.querySelector('.temperature-degree');
  const locationTimezone = document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.temperature span');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
      fetch(api)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;
          // Set Dom elements from API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;

          // Formula for Celsius
          let celsius = (temperature - 32) * (5 / 9);

          // Set Icon
          setIcon(icon, document.querySelector('.icon'));

          // Change temperature to celsius/farenheit
          temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === 'F') {
              temperatureSpan.textContent = 'C';
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = 'F';
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
    function setIcon(icon, iconId) {
      const skycons = new Skycons({ color: 'white' });
      const currentIcon = icon.replace(/-/g, '_').toUpperCase();
      skycons.play();
      return skycons.set(iconId, Skycons[currentIcon]);
    }
  }
});
