$(document).ready(() =>{


/*
*Función que muestra el cuadro para ingresar fecha de nacimiento.
*/
$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 100, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
  });

/*
*función que permite funcionar a los select como  tal.
*/

$('select').material_select();
})





//-------------------------------------------------

/*
*Variables de apoyo, para crear función que ponga la información obtenida desde el formulario a un array.
*/
var profilePicture = $('#selected-pic').value();
var userName = $('#textareaUser').value();
var firstName = $('#first_name').value();
var lastName = $('#last_name').value();
var userName = $('#user_name').value();
var password = $('#password').value();
var email = $('#email').value();
var favGenre =$('#select-genre').value();
var saveUser = $('#saveUser-btn');

$('saveUser').click()


$('')