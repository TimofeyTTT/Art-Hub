$(document).ready (function () {

  var countClicks = 0;

  $("#login").click (function () {
   $("#login-user").show();
  });
  $("#register").click (function () {
   $("#register-user").show();
  });
  $(".search").click(function (){
    $("#search").show();
  })
  $("#post").click(function (){
    $("#write").show();
  })
  $( "#fire" ).click(function() {
  countClicks +=1;
  $("#add").html(countClicks);
});
$("#posted").click(function (){
  $("#write").hide();
  $("#writ").show();
  $("#fire").show();
  var write=[];
  write.push($("#write").val());
  $("#writ").html(write);
});
$(".btn btn-primary").click(function(){
  checkCorrectLogin();
  checkPasswordsMatch();
  checkUniqueUserName();
});


//

var isDefaultSet = false;

var profileArray = [];

var varDefaultProfile = {
  userName: "dummyUserName",
  password: "dummyPassword",
  firstName: "dummyFirstName",
  lastName: "dummyLastName",
  gender: "dummyGender",
  typeofArtist: "dummyTypeofArtist"
};

function setDefaultValue()
{
  localStorage.setItem('profile', JSON.stringify(varDefaultProfile));
  isDefaultSet = true;
}

function checkPasswordsMatch(varPwd1, varPwd2){

  if(varPwd1 === varPwd2){

      var varPassword = varPwd1;

      return varPassword;
    }

  else {

    alert("Passwords do not match! Kindly re-register with passwords that match.");

    return false;

  }

}

function checkUniqueUserName(userProfileName){

  var profileList = JSON.parse(localStorage.getItem('profile'));

  var userNameExists;

  for( var i = 0; i < profileList.length; i++ ){

     for (var key in profileList[i]) {

      if (profileList[i].hasOwnProperty(key)) {

          console.log(key + " -> " + profileList[i][key]);

          if(key === "userName") {

             if (userProfileName === profileList[i][key]){
               userNameExists = true;
             }

             else{
               userNameExists = false;
             }

          }

      }

    }
    return userNameExists;
  }

}

function checkCorrectLogin(varUserName, varPassword){

  var varName;

  var varPwd;

  var existingProfiles = JSON.parse(localStorage.getItem('profile'));

  for( var i = 0; i < existingProfiles.length; i++ ){

    console.log(existingProfiles[i]);

    for (var key in existingProfiles[i]) {

      if (existingProfiles[i].hasOwnProperty(key)) {

          console.log(key + " -> " + existingProfiles[i][key]);

          if(key === "userName"){
            varName = existingProfiles[i][key];
          }

          if(key === "password"){
            varPwd = existingProfiles[i][key];
          }

          if(varName === varUserName && varPwd === varPassword){
            alert("User name and password combination match");
          }
          else{
            alert("User name and password combination do not match");
            return false;
          }
        }

    }
  }

}

function addProfile(varProfile) {

  var localStor = JSON.parse(localStorage.getItem('profile'));

  if(localStor === null || typeof(localStor) == "undefined") {
    console.log("Get profile: " + localStor);
    console.log("Get profile: " + typeof localStor);
    setDefaultValue();
    alert("The database was empty and had to be initialized. Please re-register the user.");

  }

  else{

      var existingProfiles = JSON.parse(localStorage.getItem('profile'));
      profileArray = [];

      for (i =0; i < existingProfiles.length; i++){

        profileArray.push(existingProfiles[i]);

      }

      profileArray.push(varProfile);

      localStorage.setItem('profile', JSON.stringify(profileArray));


    }

}


$(document).ready(function () {

// Register New Artist

$("#submit-user").submit(function(event) {

    event.preventDefault();

    var varUserName = $("#user-name").val();
    var varPwd1 =  $("#pwd1").val();
    var varPwd2 =  $("#pwd2").val();
    var varFirstName =  $("#first-name").val();
    var varLastName =  $("#last-name").val();
    var varGender =  $("#gender").children("option").filter(":selected").text();
    var varTypeofArtist = $("#artist-type").children("option").filter(":selected").text();


   // Check that passwords match

   var varPassword =  checkPasswordsMatch(varPwd1, varPwd2);



   var uniqueProfile = checkUniqueUserName(varUserName);

  if( uniqueProfile === true) {

      var varProfile = {

      userName: varUserName,
      password: varPassword,
      firstName: varFirstName,
      lastName: varLastName,
      gender: varGender,
      typeofArtist: varTypeofArtist,

    };

     addProfile(varProfile);

  }

  else {

    alert("Cannot add a user name that exists");

  }

});

  // Login Existing Artist

  $("#btnLogin").click(function () {

    var varUserName = $("#user-name").val();
    var varPassword =  $("#pwd").val();

    checkCorrectLogin(varUserName, varPassword);

    //Next steps

  });

});
});
