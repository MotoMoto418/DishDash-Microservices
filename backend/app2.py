from flask import Flask, request, jsonify
import db
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# LANDING
@app.get('/cafe')
def get_cafe():
    return jsonify(db.get_info('cafe')), 200

# ADMIN
@app.get('/admin')
def admin():
    res = db.admin()
    return res, 200

# CAFE
@app.get('/cafe/user/<int:cafe_id>')
def get_food_user(cafe_id):
    return jsonify(db.get_food_user(cafe_id)), 200

# CART
@app.post('/order')
def post_order():
    if request.is_json:
        req = request.get_json()
        print(req)
        res = db.post_order(req)

        return {'success': res}, 200
    return {"error": "Request must be JSON"}, 415

# LOGIN
@app.post('/login')
def login():
    if request.is_json:
        req = request.get_json()
        res = db.login(req['user_id'], req['password'])

        return jsonify(res), 200

    return {"error": "Request must be JSON"}, 415

# ORDERS
@app.post('/orders')
def get_orders():
    if request.is_json:
        req = request.get_json()
        res = db.get_orders(req)

        return res, 200
    return {"error": "Request must be JSON"}, 415

# PRODUCT
@app.get('/food/<int:food_id>')
def food_info(food_id):
    res = db.food_info(food_id)
    return res, 200

@app.get('/cafename/<int:cafe_id>')
def get_cafe_name(cafe_id):
    res = db.get_cafe_name(cafe_id)
    return res, 200


# REGISTER
@app.post('/register')
def register():
    if request.is_json:
        req = request.get_json()
        res = db.register(req)

        return jsonify(res), 200

    return {"error": "Request must be JSON"}, 415

# VENDOR
@app.post('/food/add')
def add_food():
    if request.is_json:
        req = request.get_json()
        print(req)
        res = db.add_food(req)

        return jsonify(res), 200

    return {"error": "Request must be JSON"}, 415

@app.post('/update')
def update():
    if request.is_json:
        req = request.get_json()
        res = db.update(req)

        return res, 200
    return {"error": "Request must be JSON"}, 415

@app.get('/order/<int:order_id>')
def update_order(order_id):
    db.update_order(order_id)

    return {'success': 'done'}, 200

@app.get('/orders/active/<string:owner_id>')
def get_active_orders(owner_id):
    res = db.get_active_orders(owner_id)

    return res, 200

@app.get('/cafe/<string:owner_id>')
def get_food(owner_id):
    return jsonify(db.get_food(owner_id)), 200

@app.get('/food/<int:food_id>')
def food_info(food_id):
    res = db.food_info(food_id)
    return res, 200

@app.get('/food/delete/<int:food_id>')
def delete_food(food_id):
    db.delete_food(food_id)
    return {'success': 'deleted'}, 200
