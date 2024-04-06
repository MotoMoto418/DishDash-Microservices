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

def add_food(req):
    cursor.execute(
        "SELECT `cafe_id` FROM `owner` WHERE `owner_id` = %s", (req['user_id'],))
    cafe_id = cursor.fetchone()['cafe_id']

    try:
        cursor.execute(f"SELECT MAX(`food_id`) AS id FROM `food`")
        food_id = cursor.fetchall()[0]['id'] + 1

    except:
         food_id = 0

    cursor.execute(
        f"INSERT INTO food VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
        (food_id, req['name'], req['descr'], cafe_id, req['price'],
         req['availability'], req['category'], req['image'])
    )
    mydb.commit()

    return {'success': 'food added'}

def update(req):
	for i in req['data'].keys():  
		if req['data'][i] != '':
			print(i)
			cursor.execute(f"UPDATE `{req['table']}` SET `{i}` = '{req['data'][i]}' WHERE (`{req['table']+'_id'}` = {req['id']})")
			mydb.commit()

	return {'success': 'update successful'}

def update_order(order_id):
    cursor.execute(
        f"UPDATE `order` SET `status` = '1' WHERE (`order_id` = {order_id})")
    mydb.commit()

def get_active_orders(owner_id):
    res = {}

    cursor.execute(
        "SELECT `cafe_id` FROM `owner` WHERE `owner_id` = %s", (owner_id,))
    cafe_id = cursor.fetchone()['cafe_id']

    cursor.execute(
        f"SELECT * FROM `order` WHERE `cafe_id`=%s AND `status` = 0", (cafe_id,))
    orders = cursor.fetchall()

    for order in orders:
        res[str(order['order_id'])] = {
            'user_id': order['user_id'], 'total': order['total'], 'items': []}
        cursor.execute(
            f"SELECT * FROM `f_order` WHERE `order_id`=%s", (order['order_id'],))
        foods = cursor.fetchall()
        for f in foods:
            cursor.execute(
                "SELECT * FROM `food` WHERE `food_id` = %s", (f['food_id'],))
            food = cursor.fetchall()[0]

            # print(food, cafe)

            item = {'food_name': food['name'],
                    'qty': f['qty'], 'price': food['price']}
            res[str(order['order_id'])]['items'].append(item)

    return {'orders': res}

def get_food(owner_id):
    cursor.execute(
        "SELECT `cafe_id` FROM `owner` WHERE `owner_id` = %s", (owner_id,))
    cafe_id = cursor.fetchone()['cafe_id']

    cursor.execute(f'SELECT * FROM food WHERE cafe_id={cafe_id}')
    res = {'foods': cursor.fetchall()}
    return res

def food_info(food_id):
    cursor.execute(f"SELECT * FROM `food` WHERE `food_id`=%s", (food_id,))
    res = cursor.fetchone()
    return res

def delete_food(food_id):
    print(food_id)
    cursor.execute(f"DELETE FROM `food` WHERE `food_id`=%s", (food_id,))
    mydb.commit()

@app.post('/food/add')
def _add_food():
    if request.is_json:
        req = request.get_json()
        print(req)
        res = add_food(req)

        return jsonify(res), 200

    return {"error": "Request must be JSON"}, 415

@app.post('/update')
def _update():
    if request.is_json:
        req = request.get_json()
        res = update(req)

        return res, 200
    return {"error": "Request must be JSON"}, 415

@app.get('/order/<int:order_id>')
def _update_order(order_id):
    update_order(order_id)

    return {'success': 'done'}, 200

@app.get('/orders/active/<string:owner_id>')
def _get_active_orders(owner_id):
    res = get_active_orders(owner_id)

    return res, 200

@app.get('/cafe/<string:owner_id>')
def _get_food(owner_id):
    return jsonify(get_food(owner_id)), 200

@app.get('/food/<int:food_id>')
def _food_info(food_id):
    res = food_info(food_id)
    return res, 200

@app.get('/food/delete/<int:food_id>')
def _delete_food(food_id):
    delete_food(food_id)
    return {'success': 'deleted'}, 200

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5008, debug=True)