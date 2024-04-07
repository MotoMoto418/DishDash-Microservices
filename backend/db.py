import mysql.connector
import json

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="changeme",
    database="dishdash"
)

cursor = mydb.cursor(dictionary=True)


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


# def get_active_orders(cafe_id):
# 	cursor.execute(f"SELECT * FROM `order` WHERE `cafe_id`=%s AND `status` = 0",(cafe_id,))
# 	orders = cursor.fetchall()
# 	return {'orders': orders}

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


def update_order(order_id):
    cursor.execute(
        f"UPDATE `order` SET `status` = '1' WHERE (`order_id` = {order_id})")
    mydb.commit()


def get_cafe_name(cafe_id):
    cursor.execute(f'SELECT `name` from `cafe` WHERE `cafe_id`=%s', (cafe_id,))
    return cursor.fetchone()


def get_info(name):
    cursor.execute(f'SELECT * FROM {name}')
    return cursor.fetchall()


def get_food(owner_id):
    cursor.execute(
        "SELECT `cafe_id` FROM `owner` WHERE `owner_id` = %s", (owner_id,))
    cafe_id = cursor.fetchone()['cafe_id']

    cursor.execute(f'SELECT * FROM food WHERE cafe_id={cafe_id}')
    res = {'foods': cursor.fetchall()}
    return res


def get_food_user(cafe_id):
    cursor.execute(f'SELECT * FROM food WHERE cafe_id={cafe_id}')
    res = {'foods': cursor.fetchall()}
    return res


def food_info(food_id):
    cursor.execute(f"SELECT * FROM `food` WHERE `food_id`=%s", (food_id,))
    res = cursor.fetchone()
    return res


def get_cafe_id(owner_id):
    cursor.execute(
        f"SELECT `cafe_id` FROM `owner` WHERE `owner_id`=%s", (owner_id,))
    res = cursor.fetchone()
    return res


def toggle_availability(food_id):
    cursor.execute(f"SELECT * FROM food WHERE food_id={food_id}")
    availability = cursor.fetchone()['availability']
    cursor.execute("UPDATE `food` SET `availability` = %s WHERE (`food_id` = %s)", (int(
        not availability), food_id))
    mydb.commit()


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


def delete_food(food_id):
    print(food_id)
    cursor.execute(f"DELETE FROM `food` WHERE `food_id`=%s", (food_id,))
    mydb.commit()


def admin():
    # cursor.execute(f"show tables")
    # l = [x['Tables_in_dishdash'] for x in cursor.fetchall()]
    l = ['user', 'owner', 'cafe']
    res = {}
    for i in l:
        cursor.execute(f"SELECT * FROM `{i}`")
        res[i] = cursor.fetchall()
    # print(i)

    return res


def update(req):
    for i in req['data'].keys():
        if req['data'][i] != '':
            print(i)
            cursor.execute(
                f"UPDATE `{req['table']}` SET `{i}` = '{req['data'][i]}' WHERE (`{req['table']+'_id'}` = {req['id']})")
            mydb.commit()

    return {'success': 'update successful'}
