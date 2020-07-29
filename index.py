from flask import Flask, render_template, request, jsonify
from flask_restful import Api
from apistore.api_v1.resources import store_api_v1_bp
from common.RegisterErrors import RegisterErrors
from database import db
from ext import ma,migrate
from models import Customers

app = Flask(__name__)

USER_DB = 'postgres'
PASS_DB = 'admin'
#URL_DB = '192.168.1.69'
URL_DB = 'localhost'
NAME_DB ='mikauran_store'
PORT = 5432
FULL_URL_DB = f'postgresql://{USER_DB}:{PASS_DB}@{URL_DB}:{PORT}/{NAME_DB}'

app.config['SQLALCHEMY_DATABASE_URI'] = FULL_URL_DB
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#Configuracion de la Bd
db.init_app(app)
#Configure flask-migrate
ma.init_app(app)
migrate.init_app(app, db)
#
Api(app, catch_all_404s=True)

app.url_map.strict_slashes = False

app.register_blueprint(store_api_v1_bp)
# # Registra manejadores de errores personalizados
regErrors = RegisterErrors()
regErrors.register_error_handlers(app)

@app.route('/')
def home():
    app.logger.debug("Inside Mikauran web admin dashboard and loading home.html")
    app.logger.info(f"Working in the path: { request.path}")
    return render_template("home.html")

@app.route('/customers')
def customers():
    customers = Customers.query.all()
    app.logger.debug(f"Customer List :{customers}")
    return render_template("customers.html", customers=customers)

@app.route('/products')
def products():
    return render_template("products.html")

@app.route('/about')
def about():
    return render_template("about.html")


if __name__ == '__main__':
    app.run(debug=True)
