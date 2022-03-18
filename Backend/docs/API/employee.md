# Employee
## Get Employees list

Return the employee that match the given criteria.

**URL**: `/employee`

**Method**: `GET`

**UTL Parameters**:

- **Optional**
  - <del>`employee_id`: Employee ID </del> Use [`/employee/:id`](#get-employee-detail) instead
  - `last_name`: Employee last name
  - `first_name`: Employee first name
  - `email`: Employee email
  - `phone`: Employee phone
  - `job_id`: ID of the job
  - `store_id`: ID of the store
  - `department_id`: ID of the department
  - `manager_id`: ID of the manager (`null` if no manager)
  - `hire_date`: Employee hire date **Not Support Yet**

**Data Parameters**: None

### Success Response

Code: `200 OK`

```json
{
  "status": 200,
  "timestamp": "2022-03-09T04:37:47.737Z",
  "content": [{
      "employee_id": 1000000,
      "last_name": "rocky",
      "first_name": "conner",
      "email": "test@mail.com",
      "phone_number": "123456789",
      "hire_date": "2022-03-07T00:00:00.000Z",
      "departments": {
        "department_id": 1,
        "department_name": "tech"
      },
      "store": {
        "store_id": 1,
        "address": "123 some address",
        "city_id": "LONDON_CA",
        "province_id": "ON",
        "country_id": "CA",
        "post_code": "XXXXXX"
      },
      "jobs": {
        "job_id": 1000000,
        "job_title": "cashier"
      },
      "manager": null
    },...
    ]
}

```

Field Description:

- `status` HTTP status code
- `timestamp`: timestamp of the response (YY-MM-DDTHH:MM:SS.SSSZ)
- `content`: list of [employee](#employee-1) object. Empty if no matching found

**Error Response**:

Code: `400 Bad Request`

Error Code: `V1001`

Request: `GET` | `/employee?employe_id=10`

```json
{
  "status": 400,
  "timestamp": "2022-03-09T04:42:27.367Z",
  "error": {
    "code": "V1001",
    "message": "Invalid argument: `employe_id`"
  }
}
```

Error Code: `V1002`

Request:`GET` | `/employee?employee_id=1`

```json
{
  "status": 400,
  "timestamp": "2022-03-09T04:44:03.337Z",
  "error": {
    "code": "V1002",
    "message": "employee_id parameter is not supported"
  }
}
```

**Sample Call**

Get all employees:

`GET` | `/employee`

```json
{
  "status": 200,
  "timestamp": "2022-03-09T04:37:47.737Z",
  "content": [
    {
      "employee_id": 1000000,
      "last_name": "rocky",
      "first_name": "conner",
      "email": "test@mail.com",
      "phone_number": "123456789",
      "hire_date": "2022-03-07",
      "departments": {
        "department_id": 1,
        "department_name": "tech"
      },
      "store": {
        "store_id": 1,
        "address": "123 some address",
        "city_id": "London",
        "province_id": "ON",
        "country_id": "CA",
        "post_code": "XXXXXX"
      },
      "jobs": {
        "job_id": 1000000,
        "job_title": "cashier"
      },
      "manager": null
    },
    {
      "employee_id": 1000001,
      "last_name": "karla",
      "first_name": "allison",
      "email": "example@example.com",
      "phone_number": "123456779",
      "hire_date": "2022-03-08",
      "departments": {
        "department_id": 2,
        "department_name": "shoes"
      },
      "store": {
        "store_id": 1,
        "address": "123 some address",
        "city_id": "London",
        "province_id": "ON",
        "country_id": "CA",
        "post_code": "XXXXXX"
      },
      "jobs": {
        "job_id": 1000000,
        "job_title": "cashier"
      },
      "manager": {
        "employee_id": 1000000,
        "last_name": "rocky",
        "first_name": "conner",
        "email": "test@mail.com",
        "phone_number": "123456789",
        "hire_date": "2022-03-07",
        "job_id": 1000000,
        "manager_id": null,
        "department_id": 1,
        "store_id": 1
      }
    }
  ]
}
```

## Get Employee Detail

Return a employee data by employee ID

**URL**: `/employee/:id`

**Method**: `GET`

**URL Parameters**:

- **Required**
  - `id`: ID of the employee

**Data Parameters**: None

### Success Response

Code: `200 OK`

```json
{
  "status": 200,
  "timestamp": "2022-03-09T00:40:41.981Z",
  "content": {
    "employee_id": 1000001,
    "last_name": "karla",
    "first_name": "allison",
    "email": "example@example.com",
    "phone_number": "123456779",
    "hire_date": "2022-03-08",
    "departments": {
      "department_id": 2,
      "department_name": "shoes"
    },
    "store": {
      "store_id": 1,
      "address": "123 some address",
      "city_id": "London",
      "province_id": "ON",
      "country_id": "CA",
      "post_code": "XXXXXX"
    },
    "jobs": {
      "job_id": 1000000,
      "job_title": "cashier"
    },
    "manager": {
      "employee_id": 1000000,
      "last_name": "rocky",
      "first_name": "conner",
      "email": "test@mail.com",
      "phone_number": "123456789",
      "hire_date": "2022-03-07",
      "job_id": 1000000,
      "manager_id": null,
      "department_id": 1,
      "store_id": 1
    }
  }
}
```

Field Description:

- `status` HTTP status code
- `timestamp`: timestamp of the response (YY-MM-DDTHH:MM:SS.SSSZ)
- `content`: [employee](#employee-1) object. `null` if there is no matching employee

### Error Response

Code: `400 Bad Request`

Error Code : `V1001`

```json
{
  "status": 400,
  "timestamp": "2022-03-09T01:00:47.535Z",
  "error": {
    "code": "V1001",
    "message": "Invalid ID, ID must be a number"
  }
}
```

### Sample Call

Get employee with employee ID 1000000

`GET` | `/employee/1000000`

```json
{
  "status": 200,
  "timestamp": "2022-03-09T00:40:41.981Z",
  "content": {
    "employee_id": 1000000,
    "last_name": "rocky",
    "first_name": "conner",
    "email": "test@mail.com",
    "phone_number": "123456789",
    "hire_date": "2022-03-07",
    "departments": {
      "department_id": 1,
      "department_name": "tech"
    },
    "store": {
      "store_id": 1,
      "address": "123 some address",
      "city_id": "London",
      "province_id": "ON",
      "country_id": "CA",
      "post_code": "XXXXXX"
    },
    "jobs": {
      "job_id": 1000000,
      "job_title": "cashier"
    },
    "manager": null
  }
}
```

Get employ with employee ID 1000 where it does not exist

`GET` | `/employee/1000`

```json
{
  "status": 200,
  "timestamp": "2022-03-09T00:40:41.981Z",
  "content": null
}
```

## `employee` Object

Field in Employee object

- `employee_id`: ID of the employee
- `last_name`: last name of the employee
- `first_name`: first name of the employee
- `email`: email of the employee
- `phone_number`: phone number of the employee
- `hire_date`: hire date of the employee
- `department`:
  - `department_id`: ID of the department
  - `department_name`: name of the department
- `store`:
  - `store_id`: ID of the store
  - `address`: address of the store
  - `city_id`: city of the store
  - `province_id`: province of the store
  - `country_id`: country of the store
  - `post_code`: post code of the store
- `job`:
  - `job_id`: ID of the job
  - `job_title`: title of the job
- `manager`: `null` if has no manager
  - `employee_id`: ID of the manager
  - `last_name`: last name of the manager
  - `first_name`: first name of the manager
  - `email`: email of the manager
  - `phone_number`: phone number of the manager
  - `hire_date`: hire date of the manager
  - `job_id`: ID of the job
  - `manager_id`: ID of the manager
  - `department_id`: ID of the department
  - `store_id`: ID of the store

Sample Obeject:

```json
{
  "employee_id": 1000001,
  "last_name": "karla",
  "first_name": "allison",
  "email": "example@example.com",
  "phone_number": "123456779",
  "hire_date": "2022-03-08",
  "departments": {
    "department_id": 2,
    "department_name": "shoes"
  },
  "store": {
    "store_id": 1,
    "address": "123 some address",
    "city_id": "London",
    "province_id": "ON",
    "country_id": "CA",
    "post_code": "XXXXXX"
  },
  "jobs": {
    "job_id": 1000000,
    "job_title": "cashier"
  },
  "manager": {
    "employee_id": 1000000,
    "last_name": "rocky",
    "first_name": "conner",
    "email": "test@mail.com",
    "phone_number": "123456789",
    "hire_date": "2022-03-07",
    "job_id": 1000000,
    "manager_id": null,
    "department_id": 1,
    "store_id": 1
  }
}
```
