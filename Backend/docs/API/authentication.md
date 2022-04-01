# Authentication

This document contain all the authentication methods that need to be use in the API. [supertokens]() is used as the authentication backend. All the following methods are implemented though `supertokens` API.

`sAccessToken`, `sRefreshToken` and `sIdRefreshToken` are the three token save into user's cookie.

> Please note that all the authentication method are belong to `/auth` endpoint.

## signup

Create a new user with the given `username` and `password`.

**URL**: `\auth\signup`

**Method**: `POST`

**UTL Parameters**: None

**Data Parameters**:

- **required**
  - `username`: `String`
  - `password`: `String`

### Success Response

Code: `200 OK`

```json
{
  "status": 200,
  "timestamp": "2022-03-28T04:58:13.306Z",
  "content": {
    "username": "user",
    "id": "66aef16f-3c1d-43a7-a968-aeb42aba9d05",
    "timeJoined": 1648403890748
  }
}
```

Field Description:

- `status` HTTP status code
- `timestamp`: timestamp of the response (YY-MM-DDTHH:MM:SS.SSSZ)
- `content`:
  - `email`: username of the user
  - `id`: id of the user
  - `timeJoined`: time when the user was created

**Error Response**:

Code: `400`

Error Code: `V1009`

Request: invalid username or password

```json
{
  "status": 400,
  "timestamp": "2022-03-28T05:01:49.390Z",
  "error": {
    "code": "V1009",
    "message": "Invalid email or password"
  }
}
```

**Sample Call**

`POST` | `/auth/signup`

POST body:

```json
{
  "username": "user",
  "password": "password"
}
```

```json
{
  "status": 200,
  "timestamp": "2022-03-28T04:58:13.306Z",
  "content": {
    "username": "user",
    "id": "66aef16f-3c1d-43a7-a968-aeb42aba9d05",
    "timeJoined": 1648403890748
  }
}
```

## signin

Sign in the user with the given `username` and `password`.

**URL**: `\auth\signin`

**Method**: `POST`

**UTL Parameters**: None

**Data Parameters**:

- **required**
  - `username`: `String`
  - `password`: `String`

### Success Response

Code: `200 OK`

```json
{
  "status": 200,
  "timestamp": "2022-03-28T04:58:13.306Z",
  "content": {
    "username": "user",
    "id": "66aef16f-3c1d-43a7-a968-aeb42aba9d05",
    "timeJoined": 1648403890748
  }
}
```

Field Description:

- `status` HTTP status code
- `timestamp`: timestamp of the response (YY-MM-DDTHH:MM:SS.SSSZ)
- `content`:
  - `email`: username of the user
  - `id`: id of the user
  - `timeJoined`: time when the user was created

**Error Response**:

Code: `400`

Error Code: `V1009`

Request: invalid username or password

```json
{
  "status": 400,
  "timestamp": "2022-03-28T05:01:49.390Z",
  "error": {
    "code": "V1009",
    "message": "Invalid email or password"
  }
}
```

**Sample Call**

`POST` | `/auth/signin`

POST body:

```json
{
  "username": "user",
  "password": "password"
}
```

```json
{
  "status": 200,
  "timestamp": "2022-03-28T04:58:13.306Z",
  "content": {
    "username": "user",
    "id": "66aef16f-3c1d-43a7-a968-aeb42aba9d05",
    "timeJoined": 1648403890748
  }
}
```

## signout

Sign out the current user.

**URL**: `\auth\signout`

**Method**: `POST`

**UTL Parameters**: None

**Data Parameters**: None

### Success Response

Code: `200 OK`

```json
{
  "status": 200,
  "timestamp": "2022-03-28T04:58:13.306Z"
}
```

Field Description:

- `status` HTTP status code
- `timestamp`: timestamp of the response (YY-MM-DDTHH:MM:SS.SSSZ)

**Error Response**:

> All the error can be ignored due to log out just delete the cookie and the session will be deleted. If invalid session token is provided, nothing will be done.

Code: `400`

Error Code: `V1008`

Request: invalid token is provided

```json
{
  "status": 400,
  "timestamp": "2022-03-28T05:27:31.481Z",
  "error": {
    "code": "V1008",
    "message": "Invalid session token"
  }
}
```

**Sample Call**

`POST` | `/auth/signout`

```json
{
  "status": 200,
  "timestamp": "2022-03-28T04:58:13.306Z"
}
```
