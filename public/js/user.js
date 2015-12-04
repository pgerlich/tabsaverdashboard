/**
* Function to log a user in
*/
function Login(){
    var username = $("#email").val();
    var password = $("#password").val();

    $.post( "/login", { username: username, password: password })
      .done(function( data ) {
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