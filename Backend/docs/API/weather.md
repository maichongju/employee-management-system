# Weather

## Get 16 days forecast

Return the employee that match the given criteria.

**URL**: `/weather/store/:store`

**Method**: `GET`

**URL Parameters**:

- **required**
  - `store`: ID of the store
- **optional**
  - `forceRefresh`: `true` to force refresh, this will also update the cache in the database.

**Data Parameters**: None

### Success Response

Code: `200 OK`

```json
{
  "status": 200,
  "timestamp": "2022-03-13T19:19:44.969Z",
  "content": {
    "store_id": 1,
    "city_id": 1,
    "lat": 42.9849,
    "lon": -81.2497,
    "forecast": [
      {
        "date": "2022-03-12T00:00:00.000Z",
        "temp_avg": -7.6,
        "temp_max": -2.8,
        "temp_min": -10.4,
        "rain_prob": 60,
        "rain_mm": 0.457813,
        "snow_mm": 5.3378,
        "wind_speed": 7.1,
        "weather_code": 202,
        "warning_description": "Light snow",
        "last_update": "2022-03-13T05:21:43.000Z"
      },
      ...]
  }
}
```

Field Description:

- `status`: HTTP status code
- `timestamp`: timestamp of the response
- `content`: content of the response
  - `store_id`: ID of the store
  - `city_id`: ID of the city
  - `lat`: latitude of the store
  - `lon`: longitude of the store
  - `forecast`: 16 days forecast of the location
    - list of [day](#day)

**Error Response**:

Invalid store ID

Code: `400 Bad Request`

Error Code: `V1001`

Request: `GET` | `/weather/store/0`

```json
{
  "status": 400,
  "timestamp": "2022-03-13T19:40:25.074Z",
  "error": {
    "code": "V1001",
    "message": "Invalid store ID"
  }
}
```

**Sample Call**

URL `GET` | `/weather/store/1`

```json
{
  "status": 200,
  "timestamp": "2022-03-13T19:41:37.321Z",
  "content": {
    "store_id": 1,
    "city_id": 1,
    "lat": 42.9849,
    "lon": -81.2497,
    "forecast": [
      {
        "date": "2022-03-12T00:00:00.000Z",
        "temp_avg": -7.6,
        "temp_max": -2.8,
        "temp_min": -10.4,
        "rain_prob": 60,
        "rain_mm": 0.457813,
        "snow_mm": 5.3378,
        "wind_speed": 7.1,
        "weather_code": 202,
        "warning_description": "Light snow",
        "last_update": "2022-03-13T05:21:43.000Z"
      },
      {
        "date": "2022-03-13T00:00:00.000Z",
        "temp_avg": -6.5,
        "temp_max": 0.7,
        "temp_min": -12.2,
        "rain_prob": 75,
        "rain_mm": 0.985481,
        "snow_mm": 11.8258,
        "wind_speed": 4.9,
        "weather_code": 600,
        "warning_description": null,
        "last_update": "2022-03-13T05:21:43.000Z"
      },
      {
        "date": "2022-03-14T00:00:00.000Z",
        "temp_avg": 0.8,
        "temp_max": 7.9,
        "temp_min": -4.6,
        "rain_prob": 0,
        "rain_mm": 0,
        "snow_mm": 0,
        "wind_speed": 3.9,
        "weather_code": 803,
        "warning_description": null,
        "last_update": "2022-03-13T05:21:43.000Z"
      },
      {
        "date": "2022-03-15T00:00:00.000Z",
        "temp_avg": 1,
        "temp_max": 3.4,
        "temp_min": -0.3,
        "rain_prob": 95,
        "rain_mm": 8.375,
        "snow_mm": 97.5,
        "wind_speed": 3,
        "weather_code": 601,
        "warning_description": null,
        "last_update": "2022-03-13T05:21:43.000Z"
      },
      {
        "date": "2022-03-16T00:00:00.000Z",
        "temp_avg": 2.6,
        "temp_max": 7.1,
        "temp_min": 0,
        "rain_prob": 0,
        "rain_mm": 0,
        "snow_mm": 0,
        "wind_speed": 2,
        "weather_code": 804,
        "warning_description": null,
        "last_update": "2022-03-13T05:21:43.000Z"
      },
      {
        "date": "2022-03-17T00:00:00.000Z",
        "temp_avg": 6.6,
        "temp_max": 13.7,
        "temp_min": 2.2,
        "rain_prob": 10,
        "rain_mm": 0.1875,
        "snow_mm": 0,
        "wind_speed": 4.2,
        "weather_code": 804,
        "warning_description": null,
        "last_update": "2022-03-13T05:21:43.000Z"
      },
      {
        "date": "2022-03-18T00:00:00.000Z",
        "temp_avg": 8.8,
        "temp_max": 11.9,
        "temp_min": 3.9,
        "rain_prob": 80,
        "rain_mm": 8.75,
        "snow_mm": 0,
        "wind_speed": 8.1,
        "weather_code": 500,
        "warning_description": null,
        "last_update": "2022-03-13T05:21:43.000Z"
      },
      {
        "date": "2022-03-19T00:00:00.000Z",
        "temp_avg": 3.9,
        "temp_max": 9.7,
        "temp_min": 2.1,
        "rain_prob": 40,
        "rain_mm": 1.4375,
        "snow_mm": 0,
        "wind_speed": 7,
        "weather_code": 804,
        "warning_description": null,
        "last_update": "2022-03-13T05:21:43.000Z"
      },
      {
        "date": "2022-03-20T00:00:00.000Z",
        "temp_avg": 5,
        "temp_max": 8.7,
        "temp_min": 1.6,
        "rain_prob": 20,
        "rain_mm": 0.0625,
        "snow_mm": 0,
        "wind_speed": 3.3,
        "weather_code": 804,
        "warning_description": null,
        "last_update": "2022-03-13T05:21:43.000Z"
      },
      {
        "date": "2022-03-21T00:00:00.000Z",
        "temp_avg": 4.8,
        "temp_max": 8.1,
        "temp_min": 2.1,
        "rain_prob": 75,
        "rain_mm": 6.25,
        "snow_mm": 0,
        "wind_speed": 5.4,
        "weather_code": 500,
        "warning_description": null,
        "last_update": "2022-03-13T05:21:43.000Z"
      },
      {
        "date": "2022-03-22T00:00:00.000Z",
        "temp_avg": 2.2,
        "temp_max": 2.8,
        "temp_min": 0.9,
        "rain_prob": 85,
        "rain_mm": 10.875,
        "snow_mm": 0,
        "wind_speed": 7.5,
        "weather_code": 501,
        "warning_description": null,
        "last_update": "2022-03-13T05:21:43.000Z"
      },
      {
        "date": "2022-03-23T00:00:00.000Z",
        "temp_avg": 12.9,
        "temp_max": 17.5,
        "temp_min": 4.1,
        "rain_prob": 65,
        "rain_mm": 3.6875,
        "snow_mm": 0,
        "wind_speed": 7.1,
        "weather_code": 520,
        "warning_description": null,
        "last_update": "2022-03-13T05:21:43.000Z"
      },
      {
        "date": "2022-03-24T00:00:00.000Z",
        "temp_avg": 7.5,
        "temp_max": 14.1,
        "temp_min": 4,
        "rain_prob": 15,
        "rain_mm": 0.3125,
        "snow_mm": 0,
        "wind_speed": 5.3,
        "weather_code": 804,
        "warning_description": null,
        "last_update": "2022-03-13T05:21:43.000Z"
      },
      {
        "date": "2022-03-25T00:00:00.000Z",
        "temp_avg": 3.5,
        "temp_max": 7.9,
        "temp_min": -0.8,
        "rain_prob": 0,
        "rain_mm": 0,
        "snow_mm": 0,
        "wind_speed": 5.4,
        "weather_code": 801,
        "warning_description": null,
        "last_update": "2022-03-13T05:21:43.000Z"
      },
      {
        "date": "2022-03-26T00:00:00.000Z",
        "temp_avg": -0.1,
        "temp_max": 5.6,
        "temp_min": -2.5,
        "rain_prob": 65,
        "rain_mm": 3.5,
        "snow_mm": 0,
        "wind_speed": 4.3,
        "weather_code": 520,
        "warning_description": null,
        "last_update": "2022-03-13T05:21:43.000Z"
      },
      {
        "date": "2022-03-27T00:00:00.000Z",
        "temp_avg": -0.2,
        "temp_max": 1.2,
        "temp_min": -4,
        "rain_prob": 95,
        "rain_mm": 8.9375,
        "snow_mm": 100.5,
        "wind_speed": 2.5,
        "weather_code": 601,
        "warning_description": null,
        "last_update": "2022-03-13T05:21:43.000Z"
      }
    ]
  }
}
```

## `day`

Field Description:

- `date`: Date of the forecast
- `temp_avg`: Average temperature (Celsius)
- `temp_min`: Minimum temperature (Celsius)
- `temp_max`: Maximum temperature (Celsius)
- `rain_prob`: Probability of rain (Percentage)
- `rain_mm`: Rain volume (Millimeters)
- `snow_mm`: Accumulated snowfall (Millimeters)
- `wind_speed`: Wind speed (Kilometers per hour)
- `weather_code`: [weather code](https://www.weatherbit.io/api/codes)
- `warning_description`: Warning message. Only present if there is a warning, otherwise `null`

Warning Weather codes:

```javascript
const WARNING_WEATHER_CODE = [
  202, //Thunderstorm with heavy rain
  232, //Thunderstorm with heavy drizzle
  302, //Heavy Drizzle
  502, //Heavy Rain
  511, //Freezing rain
  602, //Heavy Snow
  612, //Heavy sleet
];
```

Sample

```json
{
  "date": "2022-03-12",
  "temp_avg": -7.6,
  "tamp_max": -2.8,
  "temp_min": -10.4,
  "rain_prob": 60,
  "rain_mm": 0.457813,
  "snow_mm": 5.3378,
  "wind_speed": 7.1,
  "weather_code": 202,
  "warning": "Light snow"
}
```
