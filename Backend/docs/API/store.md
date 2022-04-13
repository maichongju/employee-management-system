# Store

## Get Store information

Return the store that match the store number.

**URL**: `/store/:store_id`

**Method**: `GET`

**UTL Parameters**:

- **required** -`store_id`: store id for the store

**Data Parameters**: None

### Success Response

Code: `200 OK`

```json
{
  "status": 200,
  "timestamp": "2022-03-19T02:12:33.683Z",
  "content": {
    "store_id": 1,
    "address": "123 some address",
    "province_id": "ON",
    "country_id": "CA",
    "post_code": "XXXXXX",
    "store_hour": [
      {
        "day": 0,
        "open_time": "07:30:00",
        "close_time": "22:30:00",
        "public_open_time": "08:00:00",
        "public_close_time": "22:00:00"
      },
      {
        "day": 1,
        "open_time": "07:30:00",
        "close_time": "22:30:00",
        "public_open_time": "08:00:00",
        "public_close_time": "22:00:00"
      },
      {
        "day": 2,
        "open_time": "07:30:00",
        "close_time": "22:30:00",
        "public_open_time": "08:00:00",
        "public_close_time": "22:00:00"
      },
      {
        "day": 3,
        "open_time": "07:30:00",
        "close_time": "22:30:00",
        "public_open_time": "08:00:00",
        "public_close_time": "22:00:00"
      },
      {
        "day": 4,
        "open_time": "07:30:00",
        "close_time": "22:30:00",
        "public_open_time": "08:00:00",
        "public_close_time": "22:00:00"
      },
      {
        "day": 5,
        "open_time": "07:30:00",
        "close_time": "22:30:00",
        "public_open_time": "08:00:00",
        "public_close_time": "22:00:00"
      },
      {
        "day": 6,
        "open_time": "07:30:00",
        "close_time": "22:30:00",
        "public_open_time": "08:00:00",
        "public_close_time": "22:00:00"
      }
    ],
    "city": {
      "city_id": 1,
      "name": "London",
      "province_id": "ON",
      "country_id": "CA",
      "lat": 42.9849,
      "lon": -81.2497
    }
  }
}
```

Field Description:

- `status`: HTTP status code
- `timestamp`: timestamp of the response
- `content`: content of the response
  - `store_id`: ID of the store
  - `address`: address of the store
  - `province_id`: ID of the province
  - `country_id`: ID of the country
  - `post_code`: postal code of the store
  - `store_hour`: store hours in each day, list of `day` object
    - `day`: day of the week
    - `open_time`: opening time of the store
    - `close_time`: closing time of the store
    - `public_open_time`: opening time of the store for public
    - `public_close_time`: closing time of the store for public
  - `city`: city information
    - `city_id`: ID of the city
    - `name`: name of the city
    - `province_id`: ID of the province
    - `country_id`: ID of the country
    - `lat`: latitude of the city
    - `lon`: longitude of the city

**Error Response**:

store number as non-number

Code: `400`

Error Code: `V1001`

Request: `GET` | `/store/random`

```json
{
  "status": 400,
  "timestamp": "2022-03-19T02:23:42.279Z",
  "error": {
    "code": "V1001",
    "message": "Invalid ID, ID must be a number"
  }
}
```

store not found

Code: `400`

Error Code: `V1006`

Request: `GET` | `/store/9999`

```json
{
  "status": 400,
  "timestamp": "2022-03-19T02:28:53.283Z",
  "error": {
    "code": "V1006",
    "message": "Store not found"
  }
}
```

**Sample Call**

`GET` | `/store/1`

```json
{
  "status": 200,
  "timestamp": "2022-03-19T02:32:32.347Z",
  "content": {
    "store_id": 1,
    "address": "123 some address",
    "province_id": "ON",
    "country_id": "CA",
    "post_code": "XXXXXX",
    "store_hour": [
      {
        "day": 0,
        "open_time": "07:30:00",
        "close_time": "22:30:00",
        "public_open_time": "08:00:00",
        "public_close_time": "22:00:00"
      },
      {
        "day": 1,
        "open_time": "07:30:00",
        "close_time": "22:30:00",
        "public_open_time": "08:00:00",
        "public_close_time": "22:00:00"
      },
      {
        "day": 2,
        "open_time": "07:30:00",
        "close_time": "22:30:00",
        "public_open_time": "08:00:00",
        "public_close_time": "22:00:00"
      },
      {
        "day": 3,
        "open_time": "07:30:00",
        "close_time": "22:30:00",
        "public_open_time": "08:00:00",
        "public_close_time": "22:00:00"
      },
      {
        "day": 4,
        "open_time": "07:30:00",
        "close_time": "22:30:00",
        "public_open_time": "08:00:00",
        "public_close_time": "22:00:00"
      },
      {
        "day": 5,
        "open_time": "07:30:00",
        "close_time": "22:30:00",
        "public_open_time": "08:00:00",
        "public_close_time": "22:00:00"
      },
      {
        "day": 6,
        "open_time": "07:30:00",
        "close_time": "22:30:00",
        "public_open_time": "08:00:00",
        "public_close_time": "22:00:00"
      }
    ],
    "city": {
      "city_id": 1,
      "name": "London",
      "province_id": "ON",
      "country_id": "CA",
      "lat": 42.9849,
      "lon": -81.2497
    }
  }
}
```

## Get all employees from the shop

Return the employee that match the given criteria.

**URL**: `/store/:store_id/employee`

**Method**: `GET`

**UTL Parameters**:

- **required**
  - `store_id`: ID of the store

**Data Parameters**: None

### Success Response

Code: `200 OK`

```json
{
  "status": 200,
  "timestamp": "2022-03-19T02:34:26.191Z",
  "content": [
    {
      "employee_id": 1000000,
      "last_name": "rocky",
      "first_name": "conner",
      "manager": null,
      "department": {
        "department_id": 1,
        "department_name": "tech"
      }
    },
    {
      "employee_id": 1000001,
      "last_name": "karla",
      "first_name": "allison",
      "manager": {
        "employee_id": 1000000,
        "last_name": "rocky",
        "first_name": "conner"
      },
      "department": {
        "department_id": 2,
        "department_name": "shoes"
      }
    }
  ]
}
```

Field Description:

- `status`: status of the response
- `timestamp`: timestamp of the response
- `content`: list of employee
  - `employee_id`: ID of the employee
  - `last_name`: last name of the employee
  - `first_name`: first name of the employee
  - `manager`: manager of the employee
    - `employee_id`: ID of the manager
    - `last_name`: last name of the manager
    - `first_name`: first name of the manager
  - `department`: department of the employee
    - `department_id`: ID of the department
    - `department_name`: name of the department

**Error Response**:

See **Error Response** from [previous](#get-store-information)

**Sample Call**

Get all employees from store 1

`GET` | `/store/1/employee`

```json
{
  "status": 200,
  "timestamp": "2022-03-19T02:34:26.191Z",
  "content": [
    {
      "employee_id": 1000000,
      "last_name": "rocky",
      "first_name": "conner",
      "manager": null,
      "department": {
        "department_id": 1,
        "department_name": "tech"
      }
    },
    {
      "employee_id": 1000001,
      "last_name": "karla",
      "first_name": "allison",
      "manager": {
        "employee_id": 1000000,
        "last_name": "rocky",
        "first_name": "conner"
      },
      "department": {
        "department_id": 2,
        "department_name": "shoes"
      }
    }
  ]
}
```
