// services api fetch
const loadServices = () => {
  fetch("https://testing-8az5.onrender.com/services/")
    .then((response) => response.json())
    .then((data) => displayService(data))
    .catch((error) => console.log(error));
};

//services daynamic
const displayService = (services) => {
  services.forEach((service) => {
    const parent = document.getElementById("service-container");
    const li = document.createElement("li");
    li.innerHTML = `
    <div class="card shadow" style="width:80%;">
        <div class="ratio ratio-16x9">
            <img src="${
              service.image
            }" class="card-img-top" loading="lazy" alt="...">
        </div>
        <div class="card-body  p-3 p-xl-5">
            <h3 class="card-title h5" style="color:#04898e;">${
              service.name
            }</h3>
            <p class="card-text">${service.description.slice(0, 140)}</p>
            <a style="text-decoration:none;font-size:20px; color:#04898e;">Lern More-></a>
        </div>
    </div>
    `;
    parent.appendChild(li);
  });
};

//doctor api fetch
const loadDoctor = (search) => {
  document.getElementById("doctors").innerHTML = "";
  document.getElementById("spinner").style.display = "block";
  console.log(search);
  fetch(
    `https://testing-8az5.onrender.com/doctor/list/?search=${
      search ? search : ""
    }`
  )
    .then((requset) => requset.json())
    .then((data) => {
      console.log(data);
      if (data.results.length > 0) {
        document.getElementById("spinner").style.display = "none";
        document.getElementById("nodata").style.display = "none";
        displayDoctors(data?.results);
      } else {
        document.getElementById("doctors").innerHTML = "";
        document.getElementById("spinner").style.display = "none";
        document.getElementById("nodata").style.display = "block";
      }
    });
};

//doctor daynamic
const displayDoctors = (doctors) => {
  doctors?.forEach((doctor) => {
    const parent = document.getElementById("doctors");
    const div = document.createElement("div");
    console.log(doctors);
    div.innerHTML = `
     <div class="doc-card">                      
        <img class="doc-img" src="${doctor.image}" alt="men-img">
        <h4 style="color:#04898e;">${doctor?.full_name}</h4>
        <h6>${doctor?.designation[0]}</h6>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, nihil!</p>

        <p>
        ${doctor?.specialization?.map((item) => {
          return `<button class="btn btn-secondary btn-sm">${item}</button>`;
        })}
        </p>
        <a style="text-decoration:none; color:black;" href="docDetails.html?doctorId=${
          doctor.id
        }" class="btn btn-info">Details</a>
      </div>
    `;
    parent.appendChild(div);
  });
};

//doctor designation api fetch
const loadDesignation = () => {
  fetch("https://testing-8az5.onrender.com/doctor/designation/")
    .then((request) => request.json())
    .then((data) => displayDesignation(data));
};

//doctor designation daynamic
const displayDesignation = (designations) => {
  designations.forEach((item) => {
    const parent = document.getElementById("flush-collapseTwo");
    const li = document.createElement("li");
    // li.innerText = item.name;
    li.innerHTML = `
    <li onclick="loadDoctor('${item.name}')">${item.name}</li>
    `;
    parent.appendChild(li);
  });
};

//doctor specialization api fetch
const loadSpecialization = () => {
  fetch("https://testing-8az5.onrender.com/doctor/specialization/")
    .then((request) => request.json())
    .then((data) => displaySpecialization(data));
};

//doctor specialization daynamic
const displaySpecialization = (designations) => {
  designations.forEach((item) => {
    const parent = document.getElementById("flush-collapseThree");
    const li = document.createElement("li");
    // li.innerText = item.name;
    li.innerHTML = `
    <li onclick="loadDoctor('${item.name}')">${item.name}</li>
`;
    parent.appendChild(li);
  });
};

//search box doctors found
const displayHandleSearch = () => {
  const value = document.getElementById("search").value;
  loadDoctor(value);
};

//doctor reviews api fetch
const loadReview = () => {
  fetch("https://testing-8az5.onrender.com/doctor/review/")
    .then((request) => request.json())
    .then((data) => displayReview(data));
};

//doctor reviews dynamic
const displayReview = (reviews) => {
  reviews.forEach((review) => {
    const parent = document.getElementById("review-container");
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="reviews-card"> 
        <div class="d-flex">
           <div>
               <img src="./images/girl.png" alt="girl-img">
           </div>
           <div>
               <h4>${review.reviewer}</h4>
               <h5>${review.rating}</h5>
           </div>
        </div>
        <br>
        <h4>${review.doctor}</h4> 
        <p>${review.body.slice(0, 130)}</p>
    </div>   
    `;
    parent.appendChild(div);
  });
};

loadServices();
loadDoctor();
loadDesignation();
loadSpecialization();
loadReview();
