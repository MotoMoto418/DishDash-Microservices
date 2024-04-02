from flask import Flask, request, jsonify
import db
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.get('/inventory/<path:link>')
def inventory_get(link):
	res = requests.get(f'http://43.204.189.209:8080/{link}')
	return res.json(), res.status_code

# Format I'm assuming:
# {user_id, f_name, l_name, ph_no, password, category}

@app.get('/cafe')
def get_cafe():
	return jsonify(db.get_info('cafe')), 200

@app.get('/cafe/<int:cafe_id>')
def get_food(cafe_id):
	return jsonify(db.get_food(cafe_id)), 200

@app.get('/food/<int:food_id>')
def food_info(food_id):
    res = db.food_info(food_id)
    return res, 200

@app.get('/cafename/<int:cafe_id>')
def get_cafe_name(cafe_id):
    res = db.get_cafe_name(cafe_id)
    return res, 200

@app.get('/orders/active/<int:cafe_id>')
def get_active_orders(cafe_id):
	res = db.get_active_orders(cafe_id)

	return res, 200
	
# Format I'm assuming:
# {user_id, password}
@app.post('/login')
def login():
	if request.is_json:
		req = request.get_json()
		res = db.login(req['user_id'], req['password'])

		return jsonify(res), 200

	return {"error": "Request must be JSON"}, 415

# {user_id}
@app.post('/orders')
def get_orders():
	if request.is_json:
		req = request.get_json()
		res = db.get_orders(req)

		return res, 200
	return {"error": "Request must be JSON"}, 415


@app.post('/inventory/<path:link>')
def inventory_post(link):
	res = requests.post(f'http://43.204.189.209:8080/{link}')
	return res.json(), res.status_code

@app.post('/register')
def register():
	if request.is_json:
		req = request.get_json()
		res = db.register(req)

		return jsonify(res), 200

	return {"error": "Request must be JSON"}, 415

# {name, user_id, desc, price, category, image}
@app.post('/food/add')
def add_food():
	if request.is_json:
		req = request.get_json()
		res = db.add_food(req)

		return jsonify(res), 200

	return {"error": "Request must be JSON"}, 415

# toggles availability
@app.post('/food/<int:food_id>')
def toggle_availability(food_id):
	db.toggle_availability(food_id)
	return {'success': 'toggled'}, 200

# The format I'm assuming:
# {food_id:{{<food_id> : <qty>}}, user_id, total}
@app.post('/order')
def post_order():
	if request.is_json:
		req = request.get_json()
		print(req)
		res = db.post_order(req)

		return {'success': res}, 200
	return {"error": "Request must be JSON"}, 415

@app.post('/order/<int:order_id>')
def update_order(order_id):
	db.update_order(order_id)

	return {'success': 'done'}, 200

@app.get('/admin')
def admin():
	res = db.admin()
	return res, 200


'''
	recieve order 
	menu items add/remove
'''