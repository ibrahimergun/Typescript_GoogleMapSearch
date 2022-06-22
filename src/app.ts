// Code goes here!
import axios from 'axios';

const form = document.querySelector('form')!;
const input = document.getElementById('adress') as HTMLInputElement;
const API_KEY = 'Api_key';

function eventHandler(event: Event) {
  event.preventDefault();
  const enteredText = input.value;
  if (!enteredText) {
    alert('Please enter an address');
    return;
  }
  // send request google api with axios and get the data
  axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredText,
      )}&key=${API_KEY}`,
    )
    .then((res) => {
      // res is the response from the server
      if (res.data.status !== 'OK') {
        throw new Error('No results found');
      }
      const location = res.data.results[0]?.geometry.location;

      const map = new google.maps.Map(
        document.getElementById('map') as HTMLInputElement,
        {
          center: location,
          zoom: 16,
        },
      );
      new google.maps.Marker({ position: location, map: map });
      console.log(location);
    })
    .catch((err) => {
      console.log(err);
    });
}
form.addEventListener('submit', eventHandler);


