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

    return request;
  }

  signupUser() {
    var url = "http://127.0.0.1:5000/user/signup";
    var method = "POST";
    var email = document.querySelector("#email").value;
    var password = document.querySelector("#password").value;
    var isAdminUser = document.getElementById("isAdminUser").checked;
    var user;
    var response;
    var message;

    user = new User(email, password, isAdminUser);
    response = this.runRequest(url, method, user);

    if (response.status == 200) {
      message = "User created successful";
    } else {
      message = response.responseText;
    }

    window.alert(message);
  }

  getUserTable() {
    var url = "http://127.0.0.1:5000/user/table";
    var method = "POST";
    var email = document.querySelector("#email").value;
    var password = document.querySelector("#password").value;
    var userCredentials;
    var response;
    var message;
    var userTable;
    var table = document.getElementById("userTable");

    userCredentials = new Credential(email, password);
    response = this.runRequest(url, method, userCredentials);

    if (response.status == 200) {
      message = "User table generated successful";
      userTable = JSON.parse(response.responseText);

      let headertableLine = this.createHeaderTableLine();
      table.appendChild(headertableLine);

      userTable.forEach((element) => {
        let tableLine = this.createTableLine(element);
        table.appendChild(tableLine);
      });
    } else {
      message = response.responseText;
    }

    window.alert(message);
  }

  createHeaderTableLine() {
    var tableLine = document.createElement("tr");
    var columnHeadEmail = document.createElement("th");
    var columnHeadPassword = document.createElement("th");
    var columnHeadUserType = document.createElement("th");

    columnHeadEmail.innerHTML = "E-mail";
    columnHeadPassword.innerHTML = "Password";
    columnHeadUserType.innerHTML = "User type";

    tableLine.appendChild(columnHeadEmail);
    tableLine.appendChild(columnHeadPassword);
    tableLine.appendChild(columnHeadUserType);

    return tableLine;
  }

  createTableLine(_user) {
    var tableLine = document.createElement("tr");
    var columnEmail = document.createElement("td");
    var columnPassword = document.createElement("td");
    var columnUserType = document.createElement("td");

    columnEmail.innerHTML = _user.email;
    columnPassword.innerHTML = _user.password;
    columnUserType.innerHTML = _user.userType;

    tableLine.appendChild(columnEmail);
    tableLine.appendChild(columnPassword);
    tableLine.appendChild(columnUserType);

    return tableLine;
  }

  main() {
    var youtubeUser = new User("email1", "pass1", true);
    this.signupUser("http://127.0.0.1:5000/user/signup", "POST", youtubeUser);

    var userCredentials = new Credential(
      youtubeUser.email,
      youtubeUser.password
    );
    console.log(
      this.getUserTable(
        "http://127.0.0.1:5000/user/table",
        "POST",
        userCredentials
      )
    );
  }
}

var application = new Application();
