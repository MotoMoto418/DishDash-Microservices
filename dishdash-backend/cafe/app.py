from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import json


mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Root@123",
    database="dishdash"
)

cursor = mydb.cursor(dictionary=True)


app = Flask(__name__)
CORS(app)

def get_info(name):
    cursor.execute(f'SELECT * FROM {name}')
    return cursor.fetchall()

def get_food_user(cafe_id):
    cursor.execute(f'SELECT * FROM food WHERE cafe_id={cafe_id}')
    res = {'foods': cursor.fetchall()}
    return res

@app.get('/cafe')
def get_cafe():
    return jsonify(get_info('cafe')), 200

@app.get('/cafe/user/<int:cafe_id>')
def _get_food_user(cafe_id):
    return jsonify(get_food_user(cafe_id)), 200

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)