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


def get_orders(req):
    res = {}
    cursor.execute(f"SELECT * FROM `user` WHERE `user_id`=%s",
                   (req['user_id'],))
    user = cursor.fetchone()

    if user['category'] == 'customer':
        cursor.execute(
            f"SELECT * FROM `order` WHERE `user_id`=%s", (req['user_id'],))
        orders = cursor.fetchall()

    elif user['category'] == 'vendor':
        cursor.execute(
            "SELECT `cafe_id` FROM `owner` WHERE `owner_id` = %s", (req['user_id'],))
        cafe_id = cursor.fetchone()['cafe_id']

        cursor.execute(f"SELECT * FROM `order` WHERE `cafe_id`=%s", (cafe_id,))
        orders = cursor.fetchall()

    elif user['category'] == 'admin':
        cursor.execute(f"SELECT * FROM `order`")
        orders = cursor.fetchall()

    for order in orders:
        res[str(order['order_id'])] = {'total': order['total'], 'items': []}
        cursor.execute(
            f"SELECT * FROM `f_order` WHERE `order_id`=%s", (order['order_id'],))
        foods = cursor.fetchall()
        for f in foods:
            cursor.execute(
                "SELECT * FROM `food` WHERE `food_id` = %s", (f['food_id'],))
            food = cursor.fetchall()[0]

            cursor.execute(
                "SELECT * FROM `cafe` WHERE `cafe_id` = %s", (food['cafe_id'],))
            cafe = cursor.fetchone()

            # print(food, cafe)

            item = {'food_name': food['name'], 'cafe_name': cafe['name'],
                    'cafe_location': cafe['location'], 'qty': f['qty'], 'price': food['price']}
            res[str(order['order_id'])]['items'].append(item)

    return res


@app.post('/orders')
def _get_orders():
    if request.is_json:
        req = request.get_json()
        res = get_orders(req)

        return res, 200
    return {"error": "Request must be JSON"}, 415


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5004, debug=True)
