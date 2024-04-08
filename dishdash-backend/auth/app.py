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

def register(req):
    print(req)
    if len(req['password']) < 8:
        return {'error': 'short password'}

    cursor.execute(f"SELECT * FROM user WHERE user_id=%s", (req['user_id'],))
    res = cursor.fetchall()
    if len(res) != 0:
        return {'error': 'user exists'}

    cursor.execute(
        f"INSERT INTO user VALUES (%s, %s, %s, %s, %s, %s)",
        (req['user_id'], req['f_name'], req['l_name'],
         req['ph_no'], req['password'], req['category'])
    )
    mydb.commit()

    print("user created")

    if req['category'] == 'vendor':
        try:
            cursor.execute(f"SELECT MAX(`cafe_id`) AS id FROM `cafe`")
            cafe_id = cursor.fetchall()[0]['id'] + 1
        
        except:
            print("except")
            cafe_id = 0

        cursor.execute(
            f"INSERT INTO owner VALUES (%s, %s, %s, %s)",
            (req['user_id'], cafe_id, req['f_name'], req['ph_no'])
        )
        mydb.commit()
        print("committed")

        cursor.execute(
            f"INSERT INTO cafe VALUES (%s, %s, %s, %s)",
            (cafe_id, req['location'],
             req['cafe_name'], req['cafe_image'])
        )
        mydb.commit()

    return {'success': 'created'}

def login(uname, pword):
    cursor.execute(f"SELECT * FROM user WHERE user_id=%s", (uname,))
    res = cursor.fetchall()
    if len(res) == 0:
        return {'error': 'no user'}

    res_obj = res[0]
    if pword == res_obj['password']:
        return {'user_id': res_obj['user_id'], 'f_name': res_obj['f_name'], 'l_name': res_obj['l_name'], 'category': res_obj['category'], 'ph_no': res_obj['ph_no']}
    else:
        return {'error': 'wrong password'}

@app.post('/register')
def _register():
    if request.is_json:
        req = request.get_json()
        res = register(req)

        return jsonify(res), 200

    return {"error": "Request must be JSON"}, 415

@app.post('/login')
def _login():
    if request.is_json:
        req = request.get_json()
        res = login(req['user_id'], req['password'])

        return jsonify(res), 200

    return {"error": "Request must be JSON"}, 415

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5007, debug=True)