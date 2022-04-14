# Evaluation

Evaluation formula.

1. Each store and department have a target that employee need to meet for daily sales. If the department is more focus on the total value of sales, then `target_amount` is being used as the target. If the department is more focus on the total number of sales, `target_quantity` is being used as the target.
2. Based on the target achieved, a score value is being calculated for each skill for each employee.
3. Each employee gets a score from their manager evaluation. Their skill score is calculated by averaging their skill score from the manager evaluation.
4. The final score for each skill is being calculated by the following formula: `score = (manager_eval * 0.5) + (sales_eval * 0.5)`. If one of the value is missing, the other value will be used as 1.0 weight. If both of the value is missing, the score will be 0. All the special situation will be noted.

## Get Evaluation for a store

Get all the performance evaluation for all the employees from a store

**URL**: `/eval/store/:store_id`

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
  "timestamp": "2022-04-13T06:25:37.652Z",
  "content": [
    {
      "employee_id": 1000000,
      "skills": "skills": [
        {
          "skill_id": 1,
          "level": 3.333333333333333
        },
        {
          "skill_id": 2,
          "level": 3.333333333333333
        },
        {
          "skill_id": 3,
          "level": 4
        },
        {
          "skill_id": 4,
          "level": 4
        }
      ]
    }
  ]
}
```

Field Description:

- `status`: HTTP status code
- `timestamp`: timestamp of the response
- `content`: content of the response
  - `employee_id`: ID of the employee
  - `skills`: list of skills and their level - `skill_id`: ID of the skill - `level`: level of the skill

**Error Response**:

Invalid store id

Code: `400`

Error Code: `V1006`

Request: `GET` | `/eval/store/0`

```json
{
  "status": 400,
  "timestamp": "2022-04-13T06:25:26.604Z",
  "error": {
    "code": "V1006",
    "message": "Store not found"
  }
}
```

Not support request method

Code: `405`

Error Code: `V1000`

Request: `POST` | `/eval/store/0`

```json
{
  "status": 405,
  "timestamp": "2022-04-13T22:50:34.478Z",
  "error": {
    "code": "V1000",
    "message": "http method not allowed"
  }
}
```

**Sample Call**

`GET` | `/eval/store/1`

```json
{
  "status": 200,
  "timestamp": "2022-04-13T22:53:01.815Z",
  "content": [
    {
      "employee_id": 1000000,
      "skills": []
    },
    {
      "employee_id": 1000001,
      "skills": [
        {
          "skill_id": 1,
          "level": 3.333333333333333
        },
        {
          "skill_id": 2,
          "level": 3.333333333333333
        },
        {
          "skill_id": 3,
          "level": 4
        },
        {
          "skill_id": 4,
          "level": 4
        }
      ]
    },
    {
      "employee_id": 1000002,
      "skills": [
        {
          "skill_id": 1,
          "level": 0.8008
        },
        {
          "skill_id": 2,
          "level": 0.8008
        },
        {
          "skill_id": 3,
          "level": 0.8008
        }
      ]
    },
    {
      "employee_id": 1000003,
      "skills": []
    },
    {
      "employee_id": 1000004,
      "skills": []
    },
    {
      "employee_id": 1000005,
      "skills": [
        {
          "skill_id": 1,
          "level": 0.56
        },
        {
          "skill_id": 2,
          "level": 0.56
        },
        {
          "skill_id": 3,
          "level": 0.56
        }
      ]
    },
    {
      "employee_id": 1000006,
      "skills": []
    },
    {
      "employee_id": 1000007,
      "skills": []
    },
    {
      "employee_id": 1000008,
      "skills": []
    },
    {
      "employee_id": 1000009,
      "skills": []
    },
    {
      "employee_id": 1000010,
      "skills": []
    },
    {
      "employee_id": 1000011,
      "skills": []
    }
  ]
}
```

## Get Evaluation for an employee

Return the evaluation for an employee. If the there is no evaluation for the employee, `skills` will be an empty list.

**URL**: `/eval/employee/:employee_id`

**Method**: `GET`

**UTL Parameters**:

**Required** - `employee_id`: ID of the employee

**Data Parameters**: None

### Success Response

Code: `200 OK`

```json
{
  "status": 200,
  "timestamp": "2022-04-13T23:01:40.933Z",
  "content": {
    "employee_id": 1000002,
    "skills": [
      {
        "skill_id": 1,
        "level": 0.8008
      },
      {
        "skill_id": 2,
        "level": 0.8008
      },
      {
        "skill_id": 3,
        "level": 0.8008
      }
    ]
  }
}
```

Field Description:

- `status`: HTTP status code
- `timestamp`: timestamp of the response
- `content`: content of the response
  - `employee_id`: ID of the employee
  - `skills`: list of skills and their level
    - `skill_id`: ID of the skill
    - `level`: level of the skill

**Error Response**:

Invalid employee id

Code:`400`

Error Code: `V1006`

Request: `GET` | `/eval/employee/1000`

```json
{
  "status": 400,
  "timestamp": "2022-04-13T23:09:16.960Z",
  "error": {
    "code": "V1006",
    "message": "Employee not found"
  }
}
```

Not support request method

Code: `405`

Error Code: `V1000`

Request: `POST` | `/eval/employee/100000`

```json
{
  "status": 405,
  "timestamp": "2022-04-13T22:50:34.478Z",
  "error": {
    "code": "V1000",
    "message": "http method not allowed"
  }
}
```

**Sample Call**

`GET` | `/eval/employee/100002`

```json
{
  "status": 200,
  "timestamp": "2022-04-13T23:01:40.933Z",
  "content": {
    "employee_id": 1000002,
    "skills": [
      {
        "skill_id": 1,
        "level": 0.8008
      },
      {
        "skill_id": 2,
        "level": 0.8008
      },
      {
        "skill_id": 3,
        "level": 0.8008
      }
    ]
  }
}
```
