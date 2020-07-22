# app.py

import os
from flask import Flask, request, jsonify, json
from firebase_admin import credentials, firestore, initialize_app, auth
from transform import getallinfo, delete_collection, int_to_Roman
from functools import wraps
from flask_cors import CORS, cross_origin

import pyrebase

# Initialize Flask App
app = Flask(__name__)
CORS(app)

# Set config for the
config = {
  "apiKey": "AIzaSyCqcSSkytkgnhHaQH3GmYas7NSU4dConJ4",
  "authDomain": "it-crowd-challenge.firebaseapp.com",
  "databaseURL": "https://it-crowd-challenge.firebaseio.com",
  "projectId": "it-crowd-challenge",
  "storageBucket": "it-crowd-challenge.appspot.com",
  "messagingSenderId": "478351173674",
  "appId": "1:478351173674:web:d89460203bb8b4a7a17b53"
}

firebase_init = pyrebase.initialize_app(config)

# Initialize Firestore DB
cred = credentials.Certificate('./firebase-key.json')
default_app = initialize_app(cred)
db = firestore.client()

ref_movies = db.collection('movies')
ref_people = db.collection('people')

@app.route('/login', methods=['GET','POST'])
@cross_origin()
def authfire():
  params = json.loads(request.data)
  print(params)
  if request.method == 'POST':
    email = params['email']
    password = params['password']
    try:
      user = firebase_init.auth().sign_in_with_email_and_password(email, password)
      jwt = user['idToken']
      return {'token': jwt}, 200
    except:
      return {'message': 'There was an error logging in'},400

def check_token(f):
    @wraps(f)
    def wrap(*args,**kwargs):
      if not request.headers.get('authorization'):
          return {'message': 'No token provided'},400
      try:
        user = auth.verify_id_token(request.headers['authorization'])
        request.user = user
      except:
        return {'message':'Invalid token provided.'},400
      return f(*args, **kwargs)
    return wrap

# Rest API methods for interacting with the database
@app.route('/create', methods=['POST'])
@check_token
def create():
  try:
    todo_ref = ref_people
    params = json.loads(request.data)
    # params = request.args
    id = params.get('id')
    firstname = params.get('firstName')
    lastname = params.get('lastName')
    producer = params.get('producer')[1:-1].split(",")
    casting = params.get('casting')[1:-1].split(",")
    director = params.get('director')[1:-1].split(",")
    json_info = {'firstName':firstname, "lastName":lastname}
    print(id, json_info, casting, director, producer)
    todo_ref.document(id).set(json_info)
    counter = 0
    for element in producer:
      if(len(element) > 0):
        ref_movie = ref_movies.document(element)
        cart_ref = todo_ref.document(id).collection('producer').add({'id':ref_movie})
        cart_ref_2 = ref_movie.collection('producer').add({'id':todo_ref.document(id)})
        # cart_ref = todo_ref.document(id).collection('producer').document(str(counter)).set({'id':ref_movie})
        counter += 1
    counter = 0
    for element in casting:
      if(len(element) > 0):
        ref_movie = ref_movies.document(element)
        cart_ref = todo_ref.document(id).collection('casting').add({'id':ref_movie})
        cart_ref_2 = ref_movie.collection('casting').add({'id':todo_ref.document(id)})
        # cart_ref = todo_ref.document(id).collection('casting').document(str(counter)).set({'id':ref_movie})
        counter += 1
    counter = 0
    for element in director:
      if(len(element) > 0):
        ref_movie = ref_movies.document(element)
        cart_ref = todo_ref.document(id).collection('director').add({'id':ref_movie})
        cart_ref_2 = ref_movie.collection('director').add({'id':todo_ref.document(id)})
        # cart_ref = todo_ref.document(id).collection('director').document(str(counter)).set({'id':ref_movie})
        counter += 1
    return jsonify({"success": True}), 200
  except Exception as e:
    return f"An Error Occured: {e}"

@app.route('/create_movies', methods=['POST'])
@check_token
def createmovies():
  try:
    todo_ref = ref_movies
    params = json.loads(request.data)
    # params = request.args
    id = params.get('id')
    title = params.get('title')
    relyear = params.get('relyear')
    producer = params.get('producer')[1:-1].split(",")
    casting = params.get('casting')[1:-1].split(",")
    director = params.get('director')[1:-1].split(",")
    json_info = {'title':title, 'relyear':relyear}
    todo_ref.document(id).set(json_info)
    counter = 0
    print(params)
    for element in producer:
      if(len(element) > 0):
        ref_person = ref_people.document(element)
        cart_ref = todo_ref.document(id).collection('producer').add({'id':ref_person})
        cart_ref_2 = ref_person.collection('producer').add({'id':todo_ref.document(id)})
        counter += 1
    counter = 0
    for element in casting:
      if(len(element) > 0):
        ref_person = ref_people.document(element)
        cart_ref = todo_ref.document(id).collection('casting').add({'id':ref_person})
        cart_ref_2 = ref_person.collection('casting').add({'id':todo_ref.document(id)})
        # cart_ref = todo_ref.document(id).collection('casting').document(str(counter)).set({'id':ref_person})
        counter += 1
    counter = 0
    for element in director:
      if(len(element) > 0):
        ref_person = ref_people.document(element)
        cart_ref = todo_ref.document(id).collection('director').add({'id':ref_person})
        cart_ref_2 = ref_person.collection('director').add({'id':todo_ref.document(id)})
        # cart_ref = todo_ref.document(id).collection('director').document(str(counter)).set({'id':ref_person})
        counter += 1
    return jsonify({"success": True}), 200
  except Exception as e:
    return f"An Error Occured: {e}"

## Read people or movies from id or all
@app.route('/search', methods=['GET'])
def read():
    try:
        type_search = request.args.get('type')
        if (type_search == 'person'):
          todo_ref = ref_people
        else:
          todo_ref = ref_movies
        todo_id = request.args.get('id')
        if todo_id:
            todo = todo_ref.document(todo_id)
            return getallinfo(todo)
        else:
            all_todos = [doc.id for doc in todo_ref.stream()]
            all_jsons = [todo_ref.document(id) for id in all_todos]
            all_responses = [getallinfo(docref, 2) for docref in all_jsons]
            response_dict = {}
            for element in range(len(all_responses)):
              response_dict[all_todos[element]] = all_responses[element]
            # print(response_dict)
            return jsonify(response_dict), 200
    except Exception as e:
        return f"An Error Occured: {e}"

@app.route('/roman', methods=['GET'])
def roman():
  try:
    params = request.args
    number = int(params.get('body'))
    return (int_to_Roman(number))
  except Exception as e:
        return f"An Error Occured: {e}"


@app.route('/delete', methods=['GET', 'DELETE', 'POST'])
@check_token
def delete():
    try:
        params = json.loads(request.data)
        type_search = params.get('type')
        todo_id = params.get('id')
        if (type_search == 'person'):
          todo_ref = ref_people
          comp_ref = ref_movies
          comp_keyword = "/people/"
        else:
          todo_ref = ref_movies
          comp_ref = ref_people
          comp_keyword = "/movies/"
        for role in ["casting", "director", "producer"]:
          print(role)
          doc_comp = todo_ref.document(todo_id).collection(role).get()
          query = [element.get('id').collection(role).get() for element in doc_comp]
          print(doc_comp, 'doc')
          print(query, 'query')
          if len(query) > 0:
            query2 = [element for element in query[0]]
            print(query, 'query2')
            for record in query2:
              if record.get('id').id == todo_id:
                record.reference.delete()
          todo_ref.document(todo_id).delete()
          ref_coll = todo_ref.document(todo_id).collection(role)
          delete_collection(ref_coll, 1000)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"

port = int(os.environ.get('PORT', 8080))
if __name__ == '__main__':
    app.run(threaded=True, host='127.0.0.1', port=port)
