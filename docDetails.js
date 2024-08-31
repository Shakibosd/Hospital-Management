const getparams = () => {
  const param = new URLSearchParams(window.location.search).get("doctorId");
  loadTime(param);
  fetch(`https://testing-8az5.onrender.com/doctor/list/${param}`)
    .then((request) => request.json())
    .then((data) => displayDetails(data));

  fetch(`https://testing-8az5.onrender.com/doctor/review/?doctor_id=${param}`)
    .then((request) => request.json())
    .then((data) => doctorReview(data));
};

const doctorReview = (reviews) => {
  reviews.forEach((review) => {
    const parent = document.getElementById("doc-details-review");
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

const displayDetails = (doctor) => {
  console.log(doctor);
  const parent = document.getElementById("doc-details");
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="doc-details-container">
      <div class="doctor-img">
          <img src="${doctor.image}" alt="man-img">
      </div>
      <div class="doc-info">
          <h1>${doctor.full_name}</h1>
          <h5 class="w-50">${doctor.designation}</h5>
          <h5>${doctor?.specialization?.map((item) => {
            return `<button class="btn btn-secondary btn-sm">${item}</button>`;
          })}
          </h5>
          <h4>Fees:${doctor.fee}BDT</h4>
          <h6>${doctor.meet_link}</h6>
          <button type="button" class="btn btn-success btn-lg" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Take Appointment
          </button>
      </div>
    </div>
    `;
  parent.appendChild(div);
};

const loadTime = (id) => {
  fetch(
    `https://testing-8az5.onrender.com/doctor/availabletime/?doctor_id=${id}`
  )
    .then((request) => request.json())
    .then((data) => {
      data.forEach((item) => {
        const parent = document.getElementById("time-container");
        const option = document.createElement("option");
        option.value = item.id;
        option.innerText = item.name;
        parent.appendChild(option);
      });
      console.log(data);
    });
};

const handleAppoinment = () => {
  const param = new URLSearchParams(window.location.search).get("doctorId");
  loadTime(param);
  // console.log("hello boss");
  const status = document.getElementsByName("status");

  const selected = Array.from(status).find((button) => button.checked);
  // console.log(selected);

  const symptom = document.getElementById("symptom").value;
  const time = document.getElementById("time-container");
  const selectedTime = time.options[time.selectedIndex];
  // console.log(selectedTime);
  // console.log(selected.value, symptom, selectedTime.value);
  const patient_id = localStorage.getItem("patient_id");
  const info = {
    appointmenet_type: selected.value,
    appointmenet_status: "Pending",
    time: selectedTime.value,
    symptom: symptom,
    cancel: false,
    patient: patient_id,
    doctor: param,
  };
  console.log(info);
  fetch("https://testing-8az5.onrender.com/appointment/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(info),
  })
    .then((request) => request.json())
    .then((data) => {
      window.location.href = `pdf.html?doctorId=${param}`;
      // console.log(data);
    });
};

const loadPatientID = () => {
  const user_id = localStorage.getItem("user_id");
  fetch(`https://testing-8az5.onrender.com/patient/list/?user_id=${user_id}`)
    .then((request) => request.json())
    .then((data) => {
      localStorage.setItem("patient_id", data[0].id);
    });
};

loadPatientID();
getparams();
loadTime();
