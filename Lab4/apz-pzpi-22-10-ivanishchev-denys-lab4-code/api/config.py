class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:oblepiha@postgres-db-service:5432/waterqualitymonitoring'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'your_secret_key'
