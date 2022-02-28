class User {
  constructor(_email, _password, _isAdminUser) {
    this.email = _email;
    this.password = _password;
    this.isAdminUser = _isAdminUser;
  }
}

function getUserTable(_url, _email, _password) {
  var userCredentials = {
    email: '"' + _email + '"',
    password: '"' + _password + '"',
  };

  let request = new XMLHttpRequest();
  request.open("GET", _url, false);
  request.send(JSON.stringify(userCredentials));

  return request.responseText;
}

//

function signupUser(_url, _method, _user) {
  let request = new XMLHttpRequest();

  request.open(_method, _url, false);
  request.send(JSON.stringify(_user));

  return request.responseText;
}

//

// function getUserTableTest(_url) {
//   var userCredentials = {
//     email: "testA",
//     password: "passA",
//     isAdminUser: true,
//   };

//   var userCredentials2 = new YouTubeCredential("_email", "_password");

//   var request = new XMLHttpRequest();

//   // request.responseType = "json";

//   request.open("POST", _url, false);
//   // request.setRequestHeader("Content-Type", "application/json");

//   request.send(JSON.stringify(userCredentials2));

//   return request.responseText;
// }

function main() {
  user = new User("email1", "pass1", true);
  signupUser("http://127.0.0.1:5000/user/signup", "POST", user);
  // console.log(getUserTableTest("http://127.0.0.1:5000/user/signup"));
  // console.log(getUserTable("http://127.0.0.1:5000/user/table", "test1", "pass1"));
}

main();
