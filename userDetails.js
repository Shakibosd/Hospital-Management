const user_details_container = document.getElementById(
  "user-details-container"
);
fetch("https://testing-8az5.onrender.com/users/")
  .then((response) => response.json())
  .then((data) => userdiv(data));

const userdiv = (users) => {
  users.forEach((user) => {
    user_details_container.innerHTML += `
    <div class="user-all row col-md-4">
          <div clss="d-flex">
                <div class="user-img">
                     <img src="./images/man-1.jpg" alt="man-img">
                </div>
                <div class="user-info">
                     <h1>${user.username}</h1>
                     <h3>${user.first_name} ${user.last_name}</h3>
                     <h3>${user.email}</h3>
                </div>
          </div>
    </div>
    `;
  });
};
