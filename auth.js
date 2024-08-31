const handleRegister = (event) => {
  event.preventDefault();
  const username = getValue("username");
  const email = getValue("email");
  const first_name = getValue("first_name");
  const last_name = getValue("last_name");
  const password = getValue("password");
  const confarm_password = getValue("confarm_password");
  //console.log("hello");
  const info = {
    username,
    email,
    first_name,
    last_name,
    password,
    confarm_password,
  };

  if (password == confarm_password) {
    document.getElementById("error").innerText = "";
    if (
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        password
      )
    ) {
      console.log(info);

      fetch("https://testing-8az5.onrender.com/patient/register/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(info),
      })
        .then((requset) => requset.json())
        .then((data) => console.log(data));
    } else {
      document.getElementById("error").innerText =
        "Minimum eight characters, at least one letter, one number and one special character";
    }
  } else {
    document.getElementById("error").innerText =
      "password and confram password don't match";
    alert("password and confram password don't match");
  }
};

const getValue = (id) => {
  const value = document.getElementById(id).value;
  return value;
};

const handleLogin = (event) => {
  event.preventDefault();
  const username = getValue("login_username");
  const password = getValue("login_password");
  console.log(username, password);

  if ((username, password)) {
    fetch("https://testing-8az5.onrender.com/patient/login/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((request) => request.json())
      .then((data) => {
        console.log(data);

        if (data.token && data.user_id) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_id", data.user_id);
          window.location.href = "index.html";
        }
      });
  }
};
