# REST API Documentation

Here are the list of endpoints available in the REST API.

- [`/employee`](API/employee.md)
- [`/weather`](API/weather.md)
- [`/store`](API/store.md)
- [`/auth`](API/authentication.md) Authentication
- [`/eval`](API/eval.md)
- [`/schedule`](API/schedule.md)

## Error Codes

- `V1000` HTTP method not allow.
- `V1001` Validation error, invalid parameter/input
- `V1002` Argument not support
- `V1003` Unsupported parameter. Parameter existed but do not support for that api endpoint.
- `V1004` API not found or not implemented.
- `V1005` Internal Error
- `V1006` Target not found. Target not found in database.
- `V1007` User existed. User already existed in database.
- `V1008` Invalid session token. Session token is invalid
- `V1009` Invalid credential. The credential is invalid.
- `V1010` User already exist. Only return in sign up page.
