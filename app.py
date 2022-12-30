from flask import Flask, send_from_directory, redirect, url_for
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS, cross_origin # comment this on deployment
# from api.apihandler
import convexhull
from pymongo import MongoClient
import json
import requests

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app) # comment this on deployment
api = Api(app)

mongoClient = MongoClient('mongodb://127.0.0.1:27017')
db = mongoClient.get_database('submissions_db')
submissions_col = db.get_collection('submissions_col')

@app.route("/addsubmission", methods=['POST'], strict_slashes=False)
def addsubmission():
    submissions_col.insert_one(requests.json);
    return {
        {"message": "Successful submission!"},
        requests.json
    }

@app.route("/update")
def update_gif():
    pass

@app.route("/profile")
def app_profile():
    return {"Systems": "Nominal"}

if __name__ == "__main__":
    app.run(debug=True)
    
    
