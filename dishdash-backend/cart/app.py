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


def post_order(req):
    cursor.execute(f"SELECT MAX(`order_id`) AS id FROM `order`")
    order_id = cursor.fetchall()[0]['id'] + 1

    cursor.execute(f"INSERT INTO `order` VALUES (%s, %s, %s, %s, %s)",
                   (order_id, req['total'], req['user_id'], 0, req['cafe_id']))
    mydb.commit()

    for i in req['food_id'].items():
        cursor.execute(
            f"INSERT INTO `f_order` VALUES (%s, %s, %s)", (order_id, i[0], i[1]))
        mydb.commit()

    return order_id


@app.post('/order')
def _post_order():
    if request.is_json:
        req = request.get_json()
        print(req)
        res = post_order(req)

        return {'success': res}, 200
    return {"error": "Request must be JSON"}, 415


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5003, debug=True)
