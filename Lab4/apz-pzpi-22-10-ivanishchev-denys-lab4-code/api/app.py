from flask import Flask
from flask_cors import CORS
from extensions import db, migrate
from config import Config
from main_routes import api_blueprint
from routes.reports import report_blueprint

app = Flask(__name__)
app.config.from_object(Config)

# CORS до регистрации блюпринтов
CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# и оба блюпринта должны иметь url_prefix='/api'
app.register_blueprint(api_blueprint, url_prefix='/api')
app.register_blueprint(report_blueprint, url_prefix='/api')


db.init_app(app)
migrate.init_app(app, db)


if __name__ == '__main__':
    app.run(debug=True)
