from marshmallow import fields
from ext import ma

class CustomerSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    name = fields.String()
    lastname = fields.String()
    email = fields.String()
