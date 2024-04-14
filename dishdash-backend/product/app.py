from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import json


mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="changeme",
    database="dishdash"
)

cursor = mydb.cursor(dictionary=True)


app = Flask(__name__)
CORS(app)


def food_info(food_id):
    cursor.execute(f"SELECT * FROM `food` WHERE `food_id`=%s", (food_id,))
    res = cursor.fetchone()
    return res


def get_cafe_name(cafe_id):
    cursor.execute(f'SELECT `name` from `cafe` WHERE `cafe_id`=%s', (cafe_id,))
    return cursor.fetchone()


@app.get('/food/<int:food_id>')
def _food_info(food_id):
    res = food_info(food_id)
    return res, 200


@app.get('/cafename/<int:cafe_id>')
def _get_cafe_name(cafe_id):
    res = get_cafe_name(cafe_id)
    return res, 200


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5005, debug=True)
