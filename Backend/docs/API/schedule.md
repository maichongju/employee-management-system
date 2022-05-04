# Schedule

Auto generate schedule for employees in a store. The schedule is generated based on employee availability and their ability. Weather and how busy of the day is taken into account.

However, due to time constraints, the following function is not implemented:

- [x] Base on employee's ability for each department
- [ ] Weather factor
- [ ] Holiday factor

Return the employee that match the given criteria.

## Generate store employee schedule

**URL**: `/schedule/store/:store_id`

**Method**: `GET`

**URL Parameters**:

- **Required**
  - `store_id`: ID of the store
  - `start`: Start date of the schedule
  - `end`: End date of the schedule

**Data Parameters**: None

### Success Response

Code: `200 OK`

```json
{
  "status": 200,
  "timestamp": "2022-05-04T19:24:27.743Z",
  "content": [
    {
      "employee_id": 1000001,
      "department_id": 1,
      "store_id": 1,
      "date": "2022-03-14T00:00:00.000Z",
      "start_time": "2022-03-14T15:00:00.000Z",
      "end_time": "2022-03-14T23:00:00.000Z",
      "total_time": "1970-01-01T08:00:00.000Z"
    },...
  ]
}

```

Field Description:

- `status`: HTTP status code
- `timestamp`: Timestamp of the response
- `content`: List of schedule
  - `employee_id`: ID of the employee
  - `department_id`: ID of the department
  - `store_id`: ID of the store
  - `date`: Date of the schedule
  - `start_time`: Start time of the schedule
  - `end_time`: End time of the schedule
  - `total_time`: Total time of the schedule

**Error Response**:

Missing required parameter `end`

Code: `400`

Error Code: `V1003`

Request: `GET /schedule/store/1?start=2022-03-14`

```json
{
  "status": 400,
  "timestamp": "2022-05-04T19:56:22.839Z",
  "error": {
    "code": "V1003",
    "message": "Missing end date parameter"
  }
}
```

**Sample Call**

URL

`/schedule/store/1?start=20220314&end=20220320`

```json
{
  "status": 200,
  "timestamp": "2022-05-04T19:24:27.743Z",
  "content": [
    {
      "employee_id": 1000001,
      "department_id": 1,
      "store_id": 1,
      "date": "2022-03-14T00:00:00.000Z",
      "start_time": "2022-03-14T15:00:00.000Z",
      "end_time": "2022-03-14T23:00:00.000Z",
      "total_time": "1970-01-01T08:00:00.000Z"
    },
    {
      "employee_id": 1000002,
      "department_id": 1,
      "store_id": 1,
      "date": "2022-03-14T00:00:00.000Z",
      "start_time": "2022-03-14T15:00:00.000Z",
      "end_time": "2022-03-14T23:00:00.000Z",
      "total_time": "1970-01-01T08:00:00.000Z"
    },
    {
      "employee_id": 1000004,
      "department_id": 1,
      "store_id": 1,
      "date": "2022-03-14T00:00:00.000Z",
      "start_time": "2022-03-14T07:00:00.000Z",
      "end_time": "2022-03-14T15:00:00.000Z",
      "total_time": "1970-01-01T08:00:00.000Z"
    },
    {
      "employee_id": 1000005,
      "department_id": 1,
      "store_id": 1,
      "date": "2022-03-14T00:00:00.000Z",
      "start_time": "2022-03-14T07:00:00.000Z",
      "end_time": "2022-03-14T15:00:00.000Z",
      "total_time": "1970-01-01T08:00:00.000Z"
    },
    {
      "employee_id": 1000000,
      "department_id": 2,
      "store_id": 1,
      "date": "2022-03-14T00:00:00.000Z",
      "start_time": "2022-03-14T07:00:00.000Z",
      "end_time": "2022-03-14T15:00:00.000Z",
      "total_time": "1970-01-01T08:00:00.000Z"
    },
    {
      "employee_id": 1000003,
      "department_id": 2,
      "store_id": 1,
      "date": "2022-03-14T00:00:00.000Z",
      "start_time": "2022-03-14T07:00:00.000Z",
      "end_time": "2022-03-14T15:00:00.000Z",
      "total_time": "1970-01-01T08:00:00.000Z"
    },
    {
      "employee_id": 1000006,
      "department_id": 2,
      "store_id": 1,
      "date": "2022-03-14T00:00:00.000Z",
      "start_time": "2022-03-14T15:00:00.000Z",
      "end_time": "2022-03-14T23:00:00.000Z",
      "total_time": "1970-01-01T08:00:00.000Z"
    },
    {
      "employee_id": 1000007,
      "department_id": 2,
      "store_id": 1,
      "date": "2022-03-14T00:00:00.000Z",
      "start_time": "2022-03-14T15:00:00.000Z",
      "end_time": "2022-03-14T23:00:00.000Z",
      "total_time": "1970-01-01T08:00:00.000Z"
    },
    {
      "employee_id": 1000001,
      "department_id": 1,
      "store_id": 1,
      "date": "2022-03-15T00:00:00.000Z",
      "start_time": "2022-03-15T15:00:00.000Z",
      "end_time": "2022-03-15T23:00:00.000Z",
      "total_time": "1970-01-01T08:00:00.000Z"
    }
  ]
}
```

## Get employee schedule

**URL**: `/schedule/employee/:id`

**Method**: `GET`

**URL Parameters**:

- **Required**
  - `id`: ID of the employee
  - `start`: Start date of the schedule
  - `end`: End date of the schedule

**Data Parameters**: None

### Success Response

Code: `200 OK`

```json
{
  "status": 200,
  "timestamp": "2022-05-04T04:12:40.070Z",
  "content": {
    "employee_id": 1000000,
    "last_name": "rocky",
    "first_name": "conner",
    "email": "test@mail.com",
    "phone_number": "123456789",
    "hire_date": "2022-03-07T00:00:00.000Z",
    "job_id": 1000000,
    "manager_id": null,
    "department_id": 1,
    "store_id": 1,
    "fulltime": true,
    "role_id": 2,
    "supertokens_user_id": "e0569d5d-5bb9-41fc-a1e7-ac5e1fd7a8f5",
    "schedule": [
      {
        "employee_id": 1000000,
        "department_id": 1,
        "store_id": 1,
        "date": "2022-03-19T00:00:00.000Z",
        "start_time": "2022-03-19T15:00:00.000Z",
        "end_time": "2022-03-19T23:00:00.000Z",
        "total_time": "1970-01-01T08:00:00.000Z"
      },...
    ]
  }
}
```

Field Description:

- `status`: Status of the request
- `timestamp`: Timestamp of the request
- `content`: Employee
  - `employee_id`: ID of the employee
  - `last_name`: Last name of the employee
  - `first_name`: First name of the employee
  - `email`: Email of the employee
  - `phone_number`: Phone number of the employee
  - `hire_date`: Hire date of the employee
  - `job_id`: Job ID of the employee
  - `manager_id`: Manager ID of the employee
  - `department_id`: Department ID of the employee
  - `store_id`: Store ID of the employee
  - `fulltime`: Whether the employee is fulltime or not
  - `role_id`: Role ID of the employee
  - `supertokens_user_id`: Supertokens user ID of the employee
  - `schedule`: Schedule of the employee
    - `employee_id`: ID of the employee
    - `department_id`: Department ID of the employee
    - `store_id`: Store ID of the employee
    - `date`: Date of the schedule
    - `start_time`: Start time of the schedule
    - `end_time`: End time of the schedule
    - `total_time`: Total time of the schedule

**Error Response**:

Missing required parameter `end`

Code: `400`

Error Code: `V1003`

Request: `GET /schedule/store/1?start=2022-03-14`

```json
{
  "status": 400,
  "timestamp": "2022-05-04T19:56:22.839Z",
  "error": {
    "code": "V1003",
    "message": "Missing end date parameter"
  }
}
```

**Sample Call**

URL

`/schedule/employee/1000000?start=20220314&end=20220320`

```json
{
  "status": 200,
  "timestamp": "2022-05-04T04:12:40.070Z",
  "content": {
    "employee_id": 1000000,
    "last_name": "rocky",
    "first_name": "conner",
    "email": "test@mail.com",
    "phone_number": "123456789",
    "hire_date": "2022-03-07T00:00:00.000Z",
    "job_id": 1000000,
    "manager_id": null,
    "department_id": 1,
    "store_id": 1,
    "fulltime": true,
    "role_id": 2,
    "supertokens_user_id": "e0569d5d-5bb9-41fc-a1e7-ac5e1fd7a8f5",
    "schedule": [
      {
        "employee_id": 1000000,
        "department_id": 1,
        "store_id": 1,
        "date": "2022-03-19T00:00:00.000Z",
        "start_time": "2022-03-19T15:00:00.000Z",
        "end_time": "2022-03-19T23:00:00.000Z",
        "total_time": "1970-01-01T08:00:00.000Z"
      },
      {
        "employee_id": 1000000,
        "department_id": 1,
        "store_id": 1,
        "date": "2022-03-20T00:00:00.000Z",
        "start_time": "2022-03-20T07:00:00.000Z",
        "end_time": "2022-03-20T15:00:00.000Z",
        "total_time": "1970-01-01T08:00:00.000Z"
      },
      {
        "employee_id": 1000000,
        "department_id": 2,
        "store_id": 1,
        "date": "2022-03-14T00:00:00.000Z",
        "start_time": "2022-03-14T07:00:00.000Z",
        "end_time": "2022-03-14T15:00:00.000Z",
        "total_time": "1970-01-01T08:00:00.000Z"
      },
      {
        "employee_id": 1000000,
        "department_id": 2,
        "store_id": 1,
        "date": "2022-03-15T00:00:00.000Z",
        "start_time": "2022-03-15T07:00:00.000Z",
        "end_time": "2022-03-15T15:00:00.000Z",
        "total_time": "1970-01-01T08:00:00.000Z"
      },
      {
        "employee_id": 1000000,
        "department_id": 2,
        "store_id": 1,
        "date": "2022-03-16T00:00:00.000Z",
        "start_time": "2022-03-16T07:00:00.000Z",
        "end_time": "2022-03-16T15:00:00.000Z",
        "total_time": "1970-01-01T08:00:00.000Z"
      }
    ]
  }
}
```
