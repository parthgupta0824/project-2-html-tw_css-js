const city = document.querySelector('.city')
let city_name_entered;

city.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        e.preventDefault()
        city_name_entered = document.querySelector('input').value
        weatherFunCall(city_name_entered)

        let parentElement = document.querySelector('.temp');
        while (parentElement.firstChild) {
            parentElement.removeChild(parentElement.firstChild);
        }

        parentElement = document.querySelector('.hum');
        while (parentElement.firstChild) {
            parentElement.removeChild(parentElement.firstChild);
        }
        parentElement = document.querySelector('.wind');
        while (parentElement.firstChild) {
            parentElement.removeChild(parentElement.firstChild);
        }
        console.log('ok')

    }
})

window.addEventListener('load', (e) => {
    weatherFunCall('delhi');
})

function weatherFunCall(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dbc40f162ae11a7a2d7acb775294311d`)
        .then((resp) => resp.json()) // Parse the response to JSON and return the Promise
        .then((data) => {
            /* tempblock start */
            console.log(data)
            let temp = (data.main.feels_like - 273.15).toFixed(2);
            let maxtemp = (data.main.temp_max + 5 - 273.15).toFixed(2);
            let mintemp = (data.main.temp_min - 273.15).toFixed(2);
            if (temp > maxtemp) {
                let t = temp
                temp = maxtemp
                maxtemp = t
            }
            let htemp = document.querySelector('.temp');
            let tp1 = document.createElement('p')
            let tp2 = document.createElement('p')
            let tp3 = document.createElement('p')
            tp1.innerHTML = 'Current temp : ' + temp
            tp2.innerHTML = 'Maxtemp : ' + (maxtemp)
            tp3.innerHTML = 'Mintemp : ' + mintemp
            htemp.append(tp1)
            htemp.append(tp2)
            htemp.append(tp3)
            /* tempblock finish */
            /* humidityblock start */
            let humidity = data.main.humidity;
            let weather = data.weather[0].description;
            let pressure = data.main.pressure;
            let hum = document.querySelector('.hum');
            let hp1 = document.createElement('p')
            let hp3 = document.createElement('p')
            hp1.innerHTML = 'Humidity : ' + humidity
            let hello = document.querySelector('.hello')
            hello.innerHTML = `Weather at ${city} is ${weather}.`
            hp3.innerHTML = 'Pressure : ' + pressure
            hum.append(hp1)
            hum.append(hp3)
            /* humidityblock finish */
            /* wind start */
            let win = document.querySelector('.wind');
            let wind = data.wind.speed
            let deg = data.wind.deg
            let visibility = data.visibility
            let wp1 = document.createElement('p')
            let wp2 = document.createElement('p')
            let wp3 = document.createElement('p')
            wp1.innerHTML = 'Wind speed : ' + wind
            wp2.innerHTML = 'Deg : ' + (deg)
            wp3.innerHTML = 'Visibility : ' + visibility
            win.append(wp1)
            win.append(wp2)
            win.append(wp3)
            /* wind finish */
        })
        .catch((error) => {
            alert('Enter the name of the place correctly.');
        })
}
