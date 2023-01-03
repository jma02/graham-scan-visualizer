from flask import Flask, request, send_from_directory, redirect, url_for
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS, cross_origin 
from convexhull import graham_scan, Animator
from pymongo import MongoClient
import json
import sys
import numpy as np

app = Flask(__name__, static_url_path='/', static_folder='frontend/build')
CORS(app)
api = Api(app)

mongoClient = MongoClient('mongodb://127.0.0.1:27017')
db = mongoClient.get_database('submissions_db')
submissions_col = db.get_collection('submissions_col')
 

def update_gif(id):
    if submissions_col.find({"_id":id}):
        pts = list(map(lambda x : int(x), submissions_col.find_one({"_id":id})['vals'].split()))
    
        cartesian = []

        i = 0
        while(i < len(pts)):
            cartesian += [[pts[i], pts[i+1]]]
            i+=2
        processed_pts = graham_scan(np.unique(np.array(cartesian), axis=0))
        create_gif = Animator(processed_pts)
        create_gif.animate()
        return

@app.route('/addsubmission', methods=['POST'])
def addsubmission():
    print("here", file=sys.stderr)
    data = request.get_json()
    print("here2", file=sys.stderr)

    sub = data['vals']
    
    result = submissions_col.insert_one({"vals": sub})
    print("here3", file=sys.stderr)
    update_gif(result.inserted_id)
    print("here4", file=sys.stderr)

    return {"result": str(result.inserted_id)}
  # Save the item to the database

@app.route("/profile")
def app_profile():
    return {"Systems": "Nominal"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=8000)
    
    
