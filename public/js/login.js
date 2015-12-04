$( document ).ready( initializeLogin );

/**
    Initialize Parse
*/
function initializeLogin(){
    Parse.$ = jQuery;
    Parse.initialize("mZ1wJCdlDowI28IzRpZ9ycIFkm0TXUYA33EoC3n8", "fOD175berXCPHD9VkQTml4k1EsyX84L6XX2uvZMP");
};


/**
* Function to log a user in
*/
function Login(){
    var username = $("#email").val();
    var password = $("#password").val();

    $.post( "/login", { username: username, password: password })
      .done(function( data ) {
        alert("success")
        location.reload(); //Reload page, effectively redirects to dash home
      })
      .fail(function() {
        alert( "invalid username/password (do something)" );
       });
}

/**
* Function to register a user
*/
function Register(){
    var username = $("#email").val();
    var password = $("#password").val();

    //TODO: Password validation and slick react shit

    $.post( "/register", { username: username, password: password })
      .done(function( data ) {
        location.reload(); //Reload page, effectively redirects to dash home
      })
      .fail(function() {
        alert( "invalid username/password (do something)" );
       });
}