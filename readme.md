# Pretest Privyid

This is server-side application based on Node.js to finish Pretest at Privyid to become they Backend developer team.

## What do I use here:
1. Node.js to run javascript in server-side
2. Framework and Library:
    - ```bcryptjs``` Used for hash password become encrpyted password and validate password with encrypted password in database
    - ```dotenv``` Used to loads environment variables from .env file into process.env 
    - ```express``` framework to build RESTful API
    - ```jsonwebtoken``` Used to generate token that will be use for authentication
    - ```morgan``` Used for logging HTTP request
    - ```passport``` Used for middleware authentication for Node.js
    - ```passport-jwt``` Used for passport strategy for authenticating with token has been generate from jsonwebtoken
    - ```pg``` Non-blocking PostgreSQL client for Node.js
    - ```pg-hstore``` Used for serializing and deserializing JSON data to hstore forma
    - ```sequelize``` Used for ORM in Node.js
    - ```sequelize-cli``` Used for command line interface to execute sequlize
    
## How to run this:
1. Make sure you already install Node.js in your device
2. Install postgreSQL, sequelize and sequelize-cli in your device
3. Clone this repository using Git
4. Move to directory you have been clone
5. Create file ```.env``` and filled in like on the ```env.example```
6. Run ```npm install``` to install all dependecies
7. Run ```sequelize db:create``` to create database
8. Run ```sequelize db:migrate``` to execute migration file and generate table into our database
9. Run ```sequelize db:seed:all`` to execute seeder file and generate demo user
10. Last but not least you can run this server-side using ```nmp start``` or ```npm run dev```

## Explanation

Demo user that maybe you want tou use:
```js
  email: tester@mail.com
  username: tester
  password: tester
```

```js
  email: anothertester@mail.com
  username: anothertester
  password: anothertester
```
---


In this server side, I provide 7 API. Which is:

1. **POST** | ```base_url/api/v1/user```

    - This is API to register new user and store into database
    - Request:
        - Body:
        ```js
          {
            "username":"tester",
            "email":"tester@mail.com",
            "password":"tester"
          }
        ```
     - Response:
        ```js
          {
            "status": "success",
            "data": {
                "username": "tester",
                "email": "tester@mail.com",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RlcjIiLCJlbWFpbCI6InRlc3RlcjJAbWFpbC5jb20iLCJpYXQiOjE1OTY2ODcxNDB9.qn9Hx2aN9KwDZX2vxFthRvJen4dyjaMbI9KffgEWYhc"
            }
          }
        ```
---

2. **POST** | ```base_url/api/v1/user/auth```

    - This is API to login or authenticating user
    - Request:
        - Body:
        ```js
        {
          "email":"tester@mail.com",
          "password":"tester"
        }
        ```
    - Response:
        ```js
        {
          "status": "success",
          "data": {
              "username": "tester",
              "email": "tester@mail.com",
              "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RlcjIiLCJlbWFpbCI6InRlc3RlcjJAbWFpbC5jb20iLCJpYXQiOjE1OTY2ODcxNDB9.qn9Hx2aN9KwDZX2vxFthRvJen4dyjaMbI9KffgEWYhc"
          }
        }
        ```
---
    
3. **GET**  | ```base_url/api/v1/user``` *(protected endpoint)*
    - This is API to show data user
    - Request:
        - Headers:
        ```js
        {
          "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RlcjUiLCJlbWFpbCI6InRlc3RlcjVAbWFpbC5jb20iLCJpYXQiOjE1OTY2MjI5MDJ9.xgHPIPVE5s_5_JIKcFYkRLLgZyEakZOpb9u_S76GnP0"
        }
        ```
    - Response:
        ```js
        {
          "status": "success",
          "data": {
              "id": 1,
              "email": "tester@mail.com",
              "username": "tester"
          }
        }
        ```
---
4. **POST**  | ```base_url/api/v1/balance``` *(protected endpoint)*
    - This is API to topup balance user
    - Request:
        - Headers:
        ```js
        {
          "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RlcjUiLCJlbWFpbCI6InRlc3RlcjVAbWFpbC5jb20iLCJpYXQiOjE1OTY2MjI5MDJ9.xgHPIPVE5s_5_JIKcFYkRLLgZyEakZOpb9u_S76GnP0"
        }
        ```
        - Body:
        ```js
          {
            "ammount":100000
          }
        ```
    - Response:
        ```js
        {
          "status": "success",
          "data": {
              "id": 2,
              "user_id": 2,
              "balance": 100000,
              "createdAt": "2020-08-06T04:12:20.484Z",
              "updatedAt": "2020-08-06T06:04:07.755Z"
          }
        }
        ```
---
5. **POST**  | ```base_url/api/v1/balance/transfer``` *(protected endpoint)*
    - This is API to transfer balance into another user
    - Request:
        - Headers:
        ```js
        {
          "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RlcjUiLCJlbWFpbCI6InRlc3RlcjVAbWFpbC5jb20iLCJpYXQiOjE1OTY2MjI5MDJ9.xgHPIPVE5s_5_JIKcFYkRLLgZyEakZOpb9u_S76GnP0"
        }
        ```
        - Body:
        ```js
          {
            "username":"another_tester",
            "ammount":50000
          }
        ```
    - Response:
        ```js
        {
          "status": "success",
          "data": {
              "id": 30,
              "user_balance_id": 2,
              "balance_before": 100000,
              "balance_after": 50000,
              "activity": "Transfer To another_tester",
              "type": "credit",
              "createdAt": "2020-08-06T08:41:30.747Z",
              "updatedAt": "2020-08-06T08:41:30.747Z"
          }
        }
        ```
---
6. **GET**  | ```base_url/api/v1/balance``` *(protected endpoint)*
    - This is API to show user balance
    - Request:
        - Headers:
        ```js
        {
          "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RlcjUiLCJlbWFpbCI6InRlc3RlcjVAbWFpbC5jb20iLCJpYXQiOjE1OTY2MjI5MDJ9.xgHPIPVE5s_5_JIKcFYkRLLgZyEakZOpb9u_S76GnP0"
        }
        ```
    - Response:
        ```js
        {
          "status": "success",
          "data": {
              "id": 2,
              "user_id": 2,
              "balance": 50000,
              "createdAt": "2020-08-06T04:12:20.484Z",
              "updatedAt": "2020-08-06T06:03:48.098Z"
          }
        }
        ```
---

7. **GET**  | ```base_url/api/v1/history``` *(protected endpoint)*
    - This is API to show user balance
    - Request:
        - Headers:
        ```js
        {
          "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RlcjUiLCJlbWFpbCI6InRlc3RlcjVAbWFpbC5jb20iLCJpYXQiOjE1OTY2MjI5MDJ9.xgHPIPVE5s_5_JIKcFYkRLLgZyEakZOpb9u_S76GnP0"
        }
        ```
    - Response:
        ```js
        {
          "status": "succes",
          "data": [
            {
              "id": 27,
              "user_balance_id": 2,
              "balance_before": 100000,
              "balance_after": 50000,
              "activity": "Transfer To another_tester",
              "type": "credit",
              "createdAt": "2020-08-06T06:03:48.105Z",
              "updatedAt": "2020-08-06T06:03:48.105Z"
            },
            {
              "id": 26,
              "user_balance_id": 2,
              "balance_before": 0,
              "balance_after": 100000,
              "activity": "Topup Balance",
              "type": "debit",
              "createdAt": "2020-08-06T06:03:41.823Z",
              "updatedAt": "2020-08-06T06:03:41.823Z"
            }
          ]
        ```
---