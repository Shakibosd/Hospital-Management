const handlePdf = () => {
  const doctor_id = new URLSearchParams(window.location.search).get("doctorId");
  console.log(doctor_id);
  const user_id = localStorage.getItem("user_id");
  console.log(`https://testing-8az5.onrender.com/users/${user_id}`);
  fetch(`https://testing-8az5.onrender.com/doctor/list/${doctor_id}`)
    .then((request) => request.json())
    .then((data) => {
      fetch(`https://testing-8az5.onrender.com/users/${user_id}`)
        .then((request) => request.json())
        .then((pdData) => {
          const newData = [data, pdData];
          console.log(newData);
          const parent = document.getElementById("pdf-container");
          const div = document.createElement("div");
          div.innerHTML = `
             <br>
             <div class="card container"
                style="padding-left: 40px; padding-right:40px; padding-top:40px; padding-bottom:40px;">
                <div class="row">
                    <div class="col-6 text-center">
                        <h1 style="color: red;">Patient</h1>
                        <div class="data-pdf">
                            <h6>Username</h6>
                            <h4>Rahim@1</h4>
                            <h6>Name</h6>
                            <h4>Rahim Uddin</h4>
                            <h6>Email</h6>
                            <h4>rahimuddin@gmail.com</h4>
                        </div>
                    </div>
                    <div class="col-6 text-center">
                        <h1 style="color: red;">Doctor</h1>
                        <div class="data-pdf">
                            <h6>Username</h6>
                            <h4>${newData[0].username}</h4>
                            <h6>Specialization</h6>
                            <h4>${newData[0].specialization}</h4>
                            <h6>Designation</h6>
                            <h4>${newData[0].designation}</h4>
                        </div>
                    </div>
                </div>
                <h1 class="text-center" style="color: red;">Symptom</h1>
                <p class="data-pdf text-center"
                    style="padding-left: 25px; padding-right:25px; padding-top:25px; padding-bottom:25px; color:blue;">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum illo fugit sit earum ipsa? Laborum commodi quam adipisci iste veritatis iure mollitia sunt enim voluptatibus! Esse fugit doloremque dolorum temporibus.
                </p>
                <br>
                <h6 class="text-center" style="color: red;">Fees</h6>
                <h4 class="text-center m-auto p-2" style="border: 2px solid lightblue; border-radius:10px; color:blue">${newData[0].fee}</h4>
            </div>
          `;
          parent.appendChild(div);
          donwloadPdf();
        });
    });
};

const donwloadPdf = () => {
  const element = document.getElementById("pdf-container");

  // Define the options for html2pdf
  const options = {
    margin: 10,
    filename: "appointment.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  // Use html2pdf to generate and download the PDF
  html2pdf(element, options);
};

handlePdf();
