from flask import jsonify
from common.ErrorHandling import ObjectNotFound, AppErrorBaseClass

class RegisterErrors:

    def register_error_handlers(self,app):

        @app.errorhandler(Exception)
        def handle_exception_error(e):
            print(f"Specific error {e}")
            return jsonify({'msg': 'Internal server error'}), 500

        @app.errorhandler(405)
        def handle_405_error(e):
            return jsonify({'msg': 'Method not allowed'}), 405

        @app.errorhandler(403)
        def handle_403_error(e):
            return jsonify({'msg': 'Forbidden error'}), 403

        @app.errorhandler(404)
        def handle_404_error(e):
            return jsonify({'msg': 'Not Found error'}), 404

        @app.errorhandler(AppErrorBaseClass)
        def handle_app_base_error(e):
            return jsonify({'msg': str(e)}), 500

        @app.errorhandler(ObjectNotFound)
        def handle_object_not_found_error(e):
            return jsonify({'msg': str(e)}), 404
