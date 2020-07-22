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

Header route:
@app.route('/login', methods=['GET','POST'])

Body call: 
POST {email: <user email>, password: <password>}

### Create\Edit person (Authentication Required)
This endpoint creates a new person in the database. It store firstname, Lastname and receives a list with the ids of the movies in casting, director and roles. If the id corresponds to an existing id in the collection the service will update the values on the ID.

The reference to the movies in the casting, director, and producer are updated automatically in the movies references.

This method require an Authentication header that include the token retrieved from the login endpoint.

Header route:
@app.route('/create', methods=['POST'])

Body call: 
POST {firstName: <person firstname>, lastName: <person lastname>, casting:"[1,2,3]", director:"[1,3]", producer="[1]"}

Note that casting, director, and producer are string representation of lists that contain the id of the movies separated by comma (no space). 

This method require an Authentication header that include the token retrieved from the login endpoint.

### Create\Edit Movies (Authentication Required)
This method allows to create\edit movies in the database. The reference to the person that takes a role as casting, director, and producer are updated automatically in the people references.

Header route:
@app.route('/create_movies', methods=['POST'])

Body call: 
POST {title:string <movie title>, relyear:number <release year>, casting:"[1,2,3]", director:"[1,3]", producer="[1]"}

Similarly to Create Person, but the casting, director, and producer correspond to the person id in the firebase.

### Search
This method explore the database for people or movies, if the id parameter is included in the GET method. Only retrieves the registry that corresponds to the id, if no id is passed the endpoint retrieves all elements in the collection.

Header route:
@app.route('/search', methods=['GET'])
@app.route('/search?id=<query id>', methods=['GET'])

### Roman
This endpoint returns a roman number string from an integer.

Header route:
@app.route('/roman?body=<number>', methods=['GET'])

### Delete (Authentication Required)
This method removes an existing id.

Header route:
@app.route('/delete?id=<id to remove>', methods=['GET', 'DELETE', 'POST'])

This method require an Authentication header that include the token retrieved from the login endpoint.