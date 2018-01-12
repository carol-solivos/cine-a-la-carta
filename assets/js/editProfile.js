$(document).ready(() =>{
/*$('#pic-top').append(
  '<img class="responsive-img profilepic right" src="' +
  + photoURL + '.jpg">');*/



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

});





//-------------------------------------------------

/*
*Variables de apoyo, para crear función que ponga la información obtenida desde el formulario a un array.
*/
var profilePicture = $('#selected-pic').val();
var userName = $('#textareaUser').val();
var firstName = $('#first_name').val();
var lastName = $('#last_name').val();
var userName = $('#user_name').val();
var password = $('#password').val();
var mail = $('#mail').val();
var favGenre =$('#select-genre').val();
var saveUser = $('#saveUser-btn');

$('saveUser').click()


$('')

