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

class Application {
  runRequest(_url, _method, _user) {
    let request = new XMLHttpRequest();

    request.open(_method, _url, false);
    request.send(JSON.stringify(_user));

    return request.responseText;
  }

  signupUser() {
    var url = "http://127.0.0.1:5000/user/signup";
    var method = "POST";
    var email = document.querySelector("#email").value;
    var password = document.querySelector("#password").value;
    var isAdminUser = document.getElementById("isAdminUser").checked;

    var youtubeUser = new User(email, password, isAdminUser);

    if (youtubeUser) {
      this.runRequest(url, method, youtubeUser);
    }
  }

  getUserTable() {
    var url = "http://127.0.0.1:5000/user/table";
    var method = "POST";
    var email = document.querySelector("#email").value;
    var password = document.querySelector("#password").value;

    var userCredentials = new Credential(email, password);

    if (userCredentials) {
      this.runRequest(url, method, userCredentials);
    }
  }

  main() {
    var youtubeUser = new User("email1", "pass1", true);
    this.signupUser("http://127.0.0.1:5000/user/signup", "POST", youtubeUser);

    var userCredentials = new Credential(youtubeUser.email, youtubeUser.password);
    console.log(
      this.getUserTable("http://127.0.0.1:5000/user/table", "POST", userCredentials)
    );
  }
}

var application = new Application();