from flask import Blueprint

from .auth_routes import auth_routes
from .game_routes import game_routes

main_routes= Blueprint('main_routes', __name__)

main_routes.register_blueprint(auth_routes, url_prefix='/auth')
main_routes.register_blueprint(game_routes, url_prefix='/game')