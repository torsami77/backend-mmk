# Backend-mmk Technical Assessment

This exercise demonstrare skills proficiency in regards to the following requirement
https://docs.google.com/document/d/1jZ8GZ5ppIP-ftSY7r8DBIyelLul3dyh8TAKBX9ckzVU/edit

## Stacks
- Express
- Node.js
- PostgreSQL
- Redis
- Sequelize
-  Typescript


## Installation

After cloning this repo ```git clone https://github.com/torsami77/backend-mmk.git```,  check into the root directory ```cd backend-mmk```, and run ``` npm install``` to install all the dependencies and devDevpendencies. **See dependencies, and "devDependencies" section in package.json file for list of all packages that will be installed**. see ```sample_env``` file in root directory for environment variables parameters.

Use ```npm run migrate``` to run database models migrations, and seed the database
## Scripts

```npm run dev```   : for run development mode
```npm start```   : for run production mode
```npm test```   :  to run sample test on sample model with mocha, chai, sinon and sequelise helper.
```npm run migrate``` : to run models migration to database
```npm run undo-seeds``` : undo seeded data

See the **scripts** section of **package.json** file for all available configured scripts. 

## Models and Database

Setup to use Postgres and Sequelise ORM.
```npm run migrate``` : to run models migration, seed data to database
```npm run undo-seeds``` : undo seeded data

## API Documentation
 #### Root Route:  ```/``` 
 ###### Method: GET 
 ###### Sample Success Response  
```
{
        statusCode:  200,
		message:  'welcome to MMK-API',
 }
```
___
#### Sign Up Route: ```/api/v1/auth/signup```
 ###### Method: POST
 ###### Headers
```
Content-Type: 'application/x-www-form-urlencoded'
```
 ###### Sample Body Payload
   ```
{
       username: 'azr1', //username should be alphabets or with numbers, between 2 and 20 characters long 
		auth_id:  '20S0KPNOIM', //auth_id should be at least 8 characters
		confirm_auth_id: '20S0KPNOIM', //should be same as auth_id
 }
```
  

 ###### Sample Success Response  
 ```
{
   statusCode: 201,
   message:  'User created successfully',
   error:  '',
   data: { id, username, createdAt, updatedAt },
   token: 'thIsisaToken10101',
}
```
___
#### Sign In Route: ```/api/v1/auth/signin```
 ###### Method: POST
 ###### Headers
```
Content-Type: 'application/x-www-form-urlencoded'
```
 ###### Sample Body Payload
   ```
{
       username: 'azr1', //username should be alphabets or with numbers, between 2 and 20 characters long 
		auth_id:  '20S0KPNOIM', //auth_id should be at least 8 characters
 }
```
  

 ###### Sample Success Response  
 ```
{
   statusCode: 200,
   message:  'Successfully signed in',
   error:  '',
   data: { id, username, createdAt, updatedAt },
   token: 'thIsisaToken10101',
}
```

___
#### Inbound Route: ```/api/v1/sms/inbound```
 ###### Method: POST
 ###### Headers
```
Content-Type: 'application/x-www-form-urlencoded'
Authorization: `bearer ${token}`
```
 ###### Sample Body Payload
   ```
{
       to: 91983435345, //'the "to" phone number should be numeric, and 6 to 16 characters 
       from: 14152243533, //'the "from" phone number should be numeric, and 6 to 16 characters 
       text: 'Hi there' //string min length 1 max length 120**
 }
```
  

 ###### Sample Success Response  
 ```
{
   statusCode: 200,
   message:  'Inbound sms ok',
   error:  '',
   data: { to, from, text },
}
```
___
#### Outbound Route: ```/api/v1/sms/outbound```
 ###### Method: POST
 ###### Headers
```
Content-Type: 'application/x-www-form-urlencoded'
Authorization: `bearer ${token}`
```
 ###### Sample Body Payload
   ```
{
       to: 919823243432, //'the "to" phone number should be numeric, and 6 to 16 characters 
       from: 919343542749, //'the "from" phone number should be numeric, and 6 to 16 characters 
       text: 'Hi there' //string min length 1 max length 120**
 }
```
  

 ###### Sample Success Response  
 ```
{
   statusCode: 200,
   message:  'Outbound sms ok',
   error:  '',
   data: { to, from, text },
}
```

___
## Thank you