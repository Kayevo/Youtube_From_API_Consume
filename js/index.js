class Credential {
  constructor(_email, _password) {
    this.email = _email;
    this.password = _password;
  }
}

class User extends Credential {
  constructor(_email, _password, _isAdminUser) {
    super(_email, _password);
    this.isAdminUser = _isAdminUser;
  }
}

function getUserTable(_url, _method, _userCredentials) {
  let request = new XMLHttpRequest();

  request.open(_method, _url, false);
  request.send(JSON.stringify(_userCredentials));

  return request.responseText;
}

function signupUser(_url, _method, _user) {
  let request = new XMLHttpRequest();

  request.open(_method, _url, false);
  request.send(JSON.stringify(_user));

  return request.responseText;
}

function main() {
  youtubeUser = new User("email1", "pass1", true);
  signupUser("http://127.0.0.1:5000/user/signup", "POST", youtubeUser);

  userCredentials = new Credential(youtubeUser.email, youtubeUser.password);
  console.log(
    getUserTable("http://127.0.0.1:5000/user/table", "POST", userCredentials)
  );
}

main();
