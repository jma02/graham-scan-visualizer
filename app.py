from flask import Flask, request, send_from_directory, redirect, url_for, send_file
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS, cross_origin 
from convexhull import graham_scan, Animator
import json
import sys
import numpy as np

app = Flask(__name__, static_url_path='/', static_folder='frontend/build')
CORS(app)
api = Api(app)

def update_gif(sub):
    pts = list(map(lambda x : float(x), sub))

    cartesian = []

    i = 0                       # x & ~1 will floor an integer to the nearest even number
    while(i < (len(pts) & ~1)): # if somehow a user manages to get an odd number of elements here
        cartesian += [[pts[i], pts[i+1]]]
        i+=2
    processed_pts = graham_scan(np.unique(np.array(cartesian), axis=0))
    create_gif = Animator(processed_pts)
    create_gif.animate()
    return 

@app.route('/api/addsubmission', methods=['POST'])
def addsubmission():
    data = request.get_json()
    sub = data['vals']
    update_gif(sub)

    return send_file("gscan.gif", mimetype="image/gif")

@app.route("/api/test")
def app_profile():
    return {"Systems": "Nominal"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=8000)
    
    
