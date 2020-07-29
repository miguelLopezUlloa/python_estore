
$(document).ready(function(){

//const axios = require('axios').default;
const axios = require('axios');

    $(function () {
        load();
        //makeGetRequest();

        //initModal();
        fetchUsers();
        countBreeds();
    });

    function load() {
        alert("Hello world...Open Axios....")
    }

   /* async function makeGetRequest() {

       let res = await axios.get('http://0.0.0.0:5000/api/v1/customers/all', responseType: 'json', {
        responseType: 'json'
      });

       let data = res.data;
       console.log(data);
    }*/

    const getBreeds = async () => {
      try {
        return await axios.get('http://0.0.0.0:5000/api/v1/customers/all')
      } catch (error) {
        console.error(error)
      }
    }

    const countBreeds = async () => {
      alert("Call API Rest....FOR Customers...")
      const breeds = await getBreeds()

      if (breeds.data.message) {
        console.log(`Got ${Object.entries(breeds.data.message).length} breeds`)
      }
    }


    const fetchUsers = () => {
    axios.get('http://0.0.0.0:5000/api/v1/customers/all')
        .then(response => {
            const users = response.data.data;
            console.log(`GET list users`, users);
        })
        .catch(error => console.error(error));
    };






    /*$('#btnCustomer').click(function(){
        alert("btn click")

        $('#customerModal').on('shown.bs.modal', function() {
                $('#myInput').focus()
        })
    });*/

});