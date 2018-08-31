#!/usr/bin/env python3

import sys
import os

from flask import Flask, render_template, jsonify, redirect, url_for, request, send_from_directory, send_file
app = Flask(__name__)
from lib import moclo
from lib import schema
from lib import db
import config


def gb_path(filename):

    return os.path.join(app.root_path, 'genbank', filename + '.gb')

def unique_filepath(name):
    keepcharacters = ('-', '_')
    filename = "".join(c for c in name if c.isalnum() or c in keepcharacters).rstrip()

    filename = (filename[:240] + '..') if len(filename) > 240 else filename

    filepath = False
    i = 0
    while True:
        filepath = gb_path(filename + '_' + str(i))

        if not os.path.exists(filepath):
            break

        i = i + 1
        if i > 999999:
            raise NameError("Could not find unused unique filename")

        
    return filepath

#@app.route("/foo/<bar>")
#def foo(bar):
#    return jsonify({"foo": bar})

@app.route("/get-list")
def get_list():
    data = []
    for instance in db_session.query(schema.Virtual).order_by(schema.Virtual.name):
        data.append(instance.as_dict())

    return jsonify(data)
        

@app.route("/submit", methods = ['POST'])
def submit():
    try:
        data = request.get_json()

        if not data or not 'name' in data or not 'genbankData' in data:
            return jsonify({"error": "Missing fields"})

        genbank_filepath = unique_filepath(data['name'])

        with open(genbank_filepath, "wb") as f:
            print("saving file: " + genbank_filepath)
            f.write(bytes(data['genbankData'], 'UTF-8'))
            f.close()

    except:
        print(sys.exc_info()[0])
        return jsonify({"error": str(sys.exc_info()[0])})

    s = schema.Virtual()
    s.name = data['name']
    s.description = data['description']
    s.genbank_file = genbank_filepath

    db_session.add(s)
    db_session.commit()

    return jsonify({"status": "success"})

@app.route("/check-seq", methods = ['POST'])
def check_seq():

    try:
        data = request.get_json()
    except Error as err:
        print(err)
        return jsonify({"error": "Invalid JSON: " + str(err)})


    if not data or not 'name' in data or not 'sequence' in data or not 'partType' in data:
        return jsonify({"error": "JSON must contain keys geneID, sequence and partType"})

    ret = moclo.sequence_input(data['name'], data['sequence'], data['partType'])
    print(ret)
    return jsonify(ret)
    

@app.route('/genbank/<path:path>')
def send_genbank(path):
    return send_from_directory(os.path.join(app.root_path, 'genbank'), path)

@app.route('/status')
def index_file_status():
    return send_file('build/index.html')

@app.route('/submit')
def index_file_submit():
    return send_file('build/index.html')

@app.route('/list')
def index_file_list():
    return send_file('build/index.html')

@app.route('/')
def index_file():
    return send_file('build/index.html')

@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404




def connect_bionet():
    bionet = bionet.Bionet(BIONET_RPC_URL,True)
    bionet.login(BIONET_USERNAME,BIONET_PASSWORD)
    return bionet


if __name__ == '__main__':
    db_session, db_engine = db.connect(config.CONNECTION_STRING)

    print("server starting on http://localhost:5000/")
    app.run(debug=True)
