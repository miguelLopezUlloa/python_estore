
let infoByCustomer = [];

let idToDelete = 0;
let idToEdit = 0;

function customerEditFill() {
    document.getElementById('addCustomerName').value = infoByCustomer.name;
    console.log("Name:" + infoByCustomer.name);
    
    /*for (var i=0; i<infoByCustomer.length; i++) {
        console.log("Name:" + infoByCustomer[])
    }*/
  }

function addInfoByCustomer(id, name, lastname, email) {
    infoByCustomer.push({id, name, lastname, email});
  }


  function searchIdDelete(id,r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("customersTable").deleteRow(i);
  
    console.log("The next id will be deleted:" + id)
    idToDelete = id;
  }


  function showAlert(obj){
    var html = '<div class="alert alert-' + obj.class + ' alert-dismissible" role="alert">'+
        '   <strong>' + obj.message + '</strong>'+
        '       <button class="close" type="button" data-dismiss="alert" aria-label="Close">'+
        '           <span aria-hidden="true">×</span>'+
        '       </button>'
        '   </div>';

    $('#alertBox').append(html);

    if (obj.timeout || obj.timeout === 0) {
      setTimeout(function() { 
        $(elem).alert('close');
      }, obj.timeout);    
    }

}

/* function showAlert(elem, message, timeout) {
  $(elem).show().html('<div class="alert"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><span>'+message+'</span></div>');

  if (timeout || timeout === 0) {
    setTimeout(function() { 
      $(elem).alert('close');
    }, timeout);    
  }
}; */


function generateSuccessHTMLOutput(response) {
    return  '<h4>Result</h4>' +
            '<h5>Status:</h5> ' +
            '<pre>' + response.status + ' ' + response.statusText + '</pre>' +
            '<h5>Headers:</h5>' +
            '<pre>' + JSON.stringify(response.headers, null, '\t') + '</pre>' +
            '<h5>Data:</h5>' +
            '<pre>' + JSON.stringify(response.data, null, '\t') + '</pre>';
  }

  function hiddeDeleteModal(){
      // Get the modal
        var modal = document.getElementById('deleteModal');

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
  }
  
  function generateErrorHTMLOutput(error) {
    return  '<h4>Result</h4>' +
            '<h5>Message:</h5> ' +
            '<pre>' + error.message + '</pre>' +
            '<h5>Status:</h5> ' +
            '<pre>' + error.response.status + ' ' + error.response.statusText + '</pre>' +
            '<h5>Headers:</h5>' +
            '<pre>' + JSON.stringify(error.response.headers, null, '\t') + '</pre>' +
            '<h5>Data:</h5>' +
            '<pre>' + JSON.stringify(error.response.data, null, '\t') + '</pre>';
  }