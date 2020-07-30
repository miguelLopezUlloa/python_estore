

function getAllCustomersRequest() {
  var resultElement = document.getElementById('getResult1');
  resultElement.innerHTML = '';

  console.log("Executing GET All Customers Operation")

  axios.get('http://localhost:5000/api/v1/customers/all')
    .then(function (response) {
      resultElement.innerHTML = generateSuccessHTMLOutput(response);
    })
    .catch(function (error) {
      resultElement.innerHTML = generateErrorHTMLOutput(error);
    });
}

function getCustomerRequest(id) {
  var resultElement = document.getElementById('getResult2');
  var customerId = id;
  idToEdit = customerId;
 
  var GET_CUSTOMER_BY_ID = 'http://localhost:5000/api/v1/customers/' + customerId

  console.log("Executing GET Operation by Customer Id:" + customerId);

  resultElement.innerHTML = '';
  
  axios.get(GET_CUSTOMER_BY_ID, {
      responseType: 'json'
   })
  .then(function (response) {

    document.getElementById('inputEditName').value = response.data.name;
    document.getElementById('inputEditLastname').value = response.data.lastname;
    document.getElementById('inputEditMail').value = response.data.email;
   
    resultElement.innerHTML = generateSuccessHTMLOutput(response);
  })
  .catch(function (error) {
      resultElement.innerHTML = generateErrorHTMLOutput(error);
  });
}


//document.getElementById('todoInputForm').addEventListener('submit', customerAddRequest);

function customerAddRequest(e) {
  var resultElement = document.getElementById('AddCustomerResult');
  var ADD_CUSTOMER = 'http://localhost:5000/api/v1/customers/all';

  var nameCustomer = document.getElementById('addCustomerName').value;
  var lastnameCustomer = document.getElementById('addCustomerLastname').value;
  var emailCustomer = document.getElementById('email1').value;

  var tableCustomer = document.getElementById(customersTable);

  /* var outputCusto = nameCustomer + " " + lastnameCustomer + " " + emailCustomer;
  alert(outputCusto); */

  resultElement.innerHTML = '';

  axios({
    method: 'post',
    url: ADD_CUSTOMER,
    data:{
      name: nameCustomer,
      lastname: lastnameCustomer,
      email: emailCustomer
    }
  })
  .then((response) => {
    showAlert({message: 'Customer has been Added.', class:"success", timeout:1000});

    resultElement.innerHTML = generateSuccessHTMLOutput(response);
    tableCustomer.bootstrapTable('refresh');
  })
  .catch(function (error) {
    resultElement.innerHTML = generateErrorHTMLOutput(error);
  });

}

function customerEditRequest() {
  var resultElement = document.getElementById('EditCustomerResult');
  var EDIT_CUSTOMER = 'http://localhost:5000/api/v1/customers/' + idToEdit;

  console.log("URL to Update Customer is:",EDIT_CUSTOMER);

  var nameCustomer = document.getElementById('inputEditName').value;
  var lastnameCustomer = document.getElementById('inputEditLastname').value;
  var emailCustomer = document.getElementById('inputEditMail').value;

  var tableCustomer = document.getElementById(customersTable);

  resultElement.innerHTML = '';

  axios({
          method: 'put',
          url: EDIT_CUSTOMER,
          data:{
            name: nameCustomer,
            lastname: lastnameCustomer,
            email: emailCustomer
          }
  })
  .then((response) => {
    showAlert({message: 'Customer has been edited sucesfully.', class:"success", timeout:1000});

    resultElement.innerHTML = generateSuccessHTMLOutput(response);
    tableCustomer.bootstrapTable('refresh');
  })
  .catch(function (error) {
    resultElement.innerHTML = generateErrorHTMLOutput(error);
  });

}


function deleteCustomerById(){
  var customerId = idToDelete
  
  console.log("Listo para borrar el id:", customerId);
  var resultElement = document.getElementById('DeleteCustomerResult');
  var tableCustomer = document.getElementById(customersTable);

  var DELETE_CUSTOMER = 'http://localhost:5000/api/v1/customers/' + customerId

  resultElement.innerHTML = '';

  console.log("Executing DELETE Operation by Customer Id",customerId);

    axios.delete(DELETE_CUSTOMER)
    .then(function (response) {
      console.log("DELETE --> user id removed is:" + customerId);

       showAlert({message: 'Customer has been deleted sucesfully.', class:"success", timeout:1000});
      //showAlert('#DeleteCustomerResult','Customer has been deleted', 1000);

      hiddeDeleteModal();
      //resultElement.innerHTML = generateSuccessHTMLOutput(response);
      tableCustomer.bootstrapTable('refresh');

  })
  .catch(function (error) {
    //resultElement.innerHTML = generateErrorHTMLOutput(error);
    console.log(error);
  });

}

