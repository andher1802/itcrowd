# ITCrowdChallenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.4.

## Development serve
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## ITCrowd API Challenge

This application was created using a decoupled solution with FLASK in python for the server-side code, and Angular for the SPA User Interface using a RESTFUL API communication. The database solution was implemented using a no-SQL approach in firebase (https://firebase.google.com/), which is in cloud under a free private account.

The code for the Flask REST APIs are located in the src/app/services/databaseaccess/app.py file, and run with the python app.py command.

## Requirements 
The FLASK REST API, uses flask, firebase and its complementary packages, that can be installed with the pip command line (pip install <PACKAGE NAME>):

- flask
- firebase_admin
- functools
- flask_cors # Only for same client - server machine (development mode)

## EndPoints

Server side FLASK API using python include the following endpoints that solve the challenge requirements.

### login
Provide authentication against the firebase authentication service, and return the token to include in the authenticated services (Create/Edit, and delete). It accepts POST METHODS with email and password of the user.

header route:
@app.route('/login', methods=['GET','POST'])
body call: 
POST {email: <user email>, password: <password>}

### Create person
This endpoint creates a new person in the database. It store firstname, Lastname and receives a list with the ids of the movies in casting, director and roles

header route:
@app.route('/create', methods=['POST'])

body call
POST {firstName: <person firstname>, lastName: <person lastname>, casting:"[1,2,3]", director:"[1,3]", producer="[1]"}
Note that casting, director, and producer are string representation of lists that contain the id of the movies separated by comma (no space). 


@app.route('/create_movies', methods=['POST'])



@app.route('/search', methods=['GET'])


@app.route('/roman', methods=['GET'])


@app.route('/delete', methods=['GET', 'DELETE', 'POST'])
