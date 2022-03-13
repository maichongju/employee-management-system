
const weatherData_openWeatherMap = require('../json/weather-openweathermap.json');
const weatherData_weatherBit = require('../json/weather-weatherbit.json');

const WARNING_WEATHER_CODE = [
    202, //Thunderstorm with heavy rain
    232, //Thunderstorm with heavy drizzle
    302, //Heavy Drizzle
    502, //Heavy Rain
    511, //Freezing rain
    602, //Heavy Snow
    612, //Heavy sleet
];

/**
 * API explain https://www.weatherbit.io/api/weather-forecast-16-day 
 * @param {float} lat 
 * @param {float} lon 
 */
async function weatherBitAPI(lat, lon) {

    var result = [];
    for (const day of weatherData_weatherBit.data) {
        var weather_warning = null;
        if (WARNING_WEATHER_CODE.includes(day.weather.code)) {
            weather_warning = day.weather.description;
        }

        var dayWeather = {
            date: new Date(day.valid_date).toISOString(),
            temp_avg: day.temp,
            temp_max: day.max_temp,
            temp_min: day.min_temp,
            rain_prob: day.pop,
            rain_mm: day.precip,
            snow_mm: day.snow,
            wind_speed: day.wind_spd,
            weather_code: day.weather.code,
            warning_description: weather_warning,
            last_update: new Date().toISOString()
        };
        result.push(dayWeather);
    }
    return result;
}

/**
 * Get the weather for a given location. Weather information are retrieved from openweathermap.org
 * @param {float} lat latitude
 * @param {float} lon longitude
 */
async function getWeatherForecast(lat, lon) {
    const result = await weatherBitAPI(lat, lon);
    return result;
}

async function getWeather(city) {
    const weather = await prisma.weather.findMany({
        where: {
            city_id: city
        },
        select: exclude("weather", ["city_id"])
    });
    return weather;
}


module.exports = {
    getWeatherForecast: getWeatherForecast,
    getWeather: getWeather
}