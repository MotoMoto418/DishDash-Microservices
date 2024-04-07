from flask import Flask, request, jsonify
import db
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# Format I'm assuming:
# {user_id, f_name, l_name, ph_no, password, category}

@app.get('/cafe')
def get_cafe():
    return jsonify(db.get_info('cafe')), 200


@app.get('/cafe/user/<int:cafe_id>')
def get_food_user(cafe_id):
    return jsonify(db.get_food_user(cafe_id)), 200


@app.get('/cafe/<string:owner_id>')
def get_food(owner_id):
    return jsonify(db.get_food(owner_id)), 200


@app.get('/food/<int:food_id>')
def food_info(food_id):
    res = db.food_info(food_id)
    return res, 200


@app.get('/cafename/<int:cafe_id>')
def get_cafe_name(cafe_id):
    res = db.get_cafe_name(cafe_id)
    return res, 200


# @app.get('/cafeid/<string:owner_id>')
# def get_cafe_id(owner_id):
#     res = db.get_cafe_id(owner_id)

#     return res, 200


# @app.get('/orders/active/<int:cafe_id>')
# def get_active_orders(cafe_id):
#     res = db.get_active_orders(cafe_id)

#     return res, 200

@app.get('/orders/active/<string:owner_id>')
def get_active_orders(owner_id):
    res = db.get_active_orders(owner_id)

    return res, 200

# @app.post('/orders/active')
# def get_active_orders_2():
#     if request.is_json:
#         req = request.get_json()
#         res = db.get_active_orders_2(req)

#         return res, 200
#     return {"error": "Request must be JSON"}, 415

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
        print(req)
        res = db.add_food(req)

        return jsonify(res), 200

    return {"error": "Request must be JSON"}, 415

# toggles availability


@app.get('/food/<int:food_id>')
def toggle_availability(food_id):
    db.toggle_availability(food_id)
    return {'success': 'toggled'}, 200


@app.get('/food/delete/<int:food_id>')
def delete_food(food_id):
    db.delete_food(food_id)
    return {'success': 'deleted'}, 200

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


@app.get('/order/<int:order_id>')
def update_order(order_id):
    db.update_order(order_id)

    return {'success': 'done'}, 200


@app.get('/admin')
def admin():
    res = db.admin()
    return res, 200


@app.post('/update')
def update():
    if request.is_json:
        req = request.get_json()
        res = db.update(req)

        return res, 200
    return {"error": "Request must be JSON"}, 415


'''
	recieve order 
	menu items add/remove
'''
