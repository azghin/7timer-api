const city_coor = 'js/city_coordinates.json';
let city_data;

fetch(city_coor)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    city_data = data;
    const select = document.getElementById('cities');

    // console.log(city_data[0].city); // Log the data to the console for debugging

    city_data.forEach(element => {
      const option = document.createElement('option');
      option.innerText = element.city + ", " + element.country;
      option.value = element.latitude + "," + element.longitude;
      select.appendChild(option);
    });
    const display = document.getElementById('content');
    select.addEventListener('change', function () {
      const selectedOption = select.options[select.selectedIndex];
      // alert(selectedOption.innerText);
      const selectedValue = select.value.split(',');
      const meteo = `https://www.7timer.info/bin/api.pl?lon=${selectedValue[1]}&lat=${selectedValue[0]}&product=civillight&output=json`;
      let metData;
      fetch(meteo)
        .then(response => {
          if (!response.ok) { throw new Error(`error ! ${response.status}`); } return response.json();
        })
        .then(datamet => {
          metData = datamet.dataseries;
          const divMet = document.createElement('div');
          divMet.id = "meteo";
          divMet.className = "row";
          metData.forEach(element => {

            if (document.getElementById('meteo')) {
              // divMet.innerHTML=''
              display.innerHTML = ""
              // const h4=document.createElement('h4')
              // h4.innerText=element.date;
              // h4.className="date_time"
              // divMet.appendChild(h4);
              console.log('i work');
            } else {
              const card = document.createElement('div')
              card.className = "card";
              card.style = "width: 18rem;"
              const cardbody = document.createElement('div');
              cardbody.className = "card-body";
              const column = document.createElement('div');
              column.className = "col-lg-4  col-sm-6 ";

              const dateP = document.createElement('h5')
              const heat = document.createElement('p')
              heat.innerText = `Max ${element.temp2m.max} C , Min ${element.temp2m.min} `

              const wind = document.createElement('p');
              wind.innerText = `wind is gonna be about ${element.wind10m_max} Km/h`



              const yearInt = element.date;
              const yearString = yearInt.toString();
              console.log(yearString);
              const year = parseInt(yearString.substring(0, 4), 10);
              const month = parseInt(yearString.substring(4, 6), 10) - 1; // Months are 0-based
              const day = parseInt(yearString.substring(6, 8), 10);

              const dateObject = new Date(year, month, day);
              const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
              const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

              const dayOfWeek = daysOfWeek[dateObject.getDay()];
              const dayOfMonth = dateObject.getDate();
              const monthName = months[dateObject.getMonth()];
              const fullYear = dateObject.getFullYear();
              const formattedDate = `${dayOfWeek} ${dayOfMonth} ${monthName} ${fullYear}`;
              // const year_= parseInt(element.date.substring(0,4),10);
              // console.log(year_);


              const weather_icon = document.createElement('img');
              weather_icon.src = `images/${element.weather}.png`
              weather_icon.class = "card-img-top"
              weather_icon.className = "card-img-top;"
              dateP.innerText = formattedDate;
              dateP.className = "date_time";
              card.appendChild(weather_icon);
              cardbody.appendChild(dateP)
              cardbody.appendChild(heat)
              cardbody.appendChild(wind);
              card.appendChild(cardbody)
              column.appendChild(card);
              divMet.appendChild(column);

            }

            // display.appendChild(divMet);
          });
          if (!document.getElementById('meteo')) {
            const H1 = document.createElement('h1');
            H1.innerText = selectedOption.innerText;
            display.appendChild(H1);
            display.appendChild(divMet)
          }
          console.log(metData);
        })


    })
  })
  .catch(error => {
    console.error('Error fetching JSON:', error);
  });
