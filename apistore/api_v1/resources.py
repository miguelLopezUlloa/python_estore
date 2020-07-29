from flask import request, Blueprint
from flask_restful import Api, Resource
from common.ErrorHandling import ObjectNotFound, AppErrorBaseClass
from models import Customers

from .schemas import CustomerSchema

store_api_v1_bp = Blueprint('store_api_v1_bp',__name__)

customerSchema = CustomerSchema()

api = Api(store_api_v1_bp)

class CustomerListAlltResource(Resource):
    def get(self):
        customers = Customers.get_all()
        result = customerSchema.dump(customers, many=True)
        return result

    def post(self):
        data = request.get_json()
        print(f"Data after get_json:{data}")
        customerDict = customerSchema.load(data)

        print(f"The customer schema for insert is:{customerDict}")

        customers = Customers(name=customerDict['name'],
                    lastname=customerDict['lastname'],
                    email=customerDict['email']
                    )
        print(f"The possible dict is:{customers}")

        customers.save()
        resp = customerSchema.dump(customers)
        print(f"Inserting a Customer:{resp}")
        return resp, 201

class CustomersResource(Resource):

    def get(self,id):
        customer = Customers.get_by_id(id)
        if customer is None:
            raise ObjectNotFound("Customer not found")
        resp = customerSchema.dump(customer)
        print(f"Customer by id: {resp}")

        return resp

    def put(self, id):
        customer = Customers.get_by_id(id)
        print(f"Customer id to Update is:{id}")

        if customer is None:
            raise ObjectNotFound("Customer not found")
        else:
            print(f"The original record has:{customer}")

            name = request.json['name']
            lastname = request.json['lastname']
            email = request.json['email']

            customer.name = name
            customer.lastname = lastname
            customer.email = email

            customer.update()

            resp = customerSchema.dump(customer)
            print(f"Updated Customer:{resp}")

            return resp, 201

    def delete(self,id):
        #customer = Customers.simple_filter(id)
        customer = Customers.get_by_id(id)

        if customer is None:
            raise ObjectNotFound("Customer not found")
        else:
            customer.delete()
            resp = customerSchema.dump(customer)
            print(f"Preparing delete for Customer:{resp}")

            return resp

api.add_resource(CustomerListAlltResource, '/api/v1/customers/all', endpoint='customers_all_resource')
api.add_resource(CustomersResource,'/api/v1/customers/<int:id>', endpoint='customer_resource')