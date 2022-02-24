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

function getUserTableTest(_url) {
  let request = new XMLHttpRequest();
  request.open("GET", _url, false);
  request.send();

  return request.responseText;
}

function main() {
  console.log(
    getUserTableTest("http://127.0.0.1:5000/user/test")
  );
  //   console.log(getUserTable("http://127.0.0.1:5000/user/table", "test1", "pass1"));
}

main();
