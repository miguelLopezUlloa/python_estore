from database import db, BaseModel

class Customers(db.Model,BaseModel):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250))
    lastname = db.Column(db.String(250))
    email = db.Column(db.String(150))

    def __init__(self, name, lastname, email):
        self.name = name
        self.lastname = lastname
        self.email = email


    def __str__(self):
        return (
            f'Id: { self.id}, '
            f'Name: {self.name}, '
            f'Last Name:{self.lastname}, '
            f'email:{self.email}'
        )
