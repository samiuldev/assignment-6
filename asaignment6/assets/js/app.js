// function for get input && load data.
function loadphone () {
  const searchBox = document.getElementById("search-box").value;
  const url =`https://openapi.programming-hero.com/api/phones?search=${searchBox}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showphone(data.data.slice(0, 20)));
  document.getElementById("search-box").value = "";
}
  const showphone = (phones) => {
    for (const phone of phones) {
      const phoneContainer = document.getElementById("phone-container");
      const container = document.createElement("div");
      container.classList.add("col-lg-4");
      container.classList.add("col-md-6");
      container.classList.add("col-sm-10");
      container.classList.add("card");
      container.innerHTML = `
     <div class="image mx-auto">
         <img src='${phone.image}' class="img-fluid rounded">
     </div>
     <div class="card-body fw-bold text-center">
         <ul class="list-group">
             <li class="list-group-item">'${phone.brand}'</li>
             <li class="list-group-item">Model: '${phone.phone_name}'</li>
         </ul>
         <a href="#phone-Info" onclick="phoneDtails('${phone.slug}')" class="btn fw-bold btn-info mt-2">Details</a>
     </div>
    `;
      phoneContainer.appendChild(container);
    };
  };
  // phone detalis function section
const phoneDtails = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => phoneDescription(data.data));
};
const phoneDescription = (info) => {
  document.getElementById("phone-Info").innerHTML = `
  <div class="card m-3 col-9">
     <div class="mx-auto">
         <img src='${info.image}' class="w-100 rounded">
     </div>
     <div class="card-body fw-bold text-center">
      <ul class="list-group">
          <li class="list-group-item">Sensors: '${info.mainFeatures.sensors}'</li>
          <li class="list-group-item">Others:-<br>Bluetooth-'${info.others.Bluetooth}'<br>GPS-'${info.others.GPS}'<br>NFC-'${info.others.NFC}'<br>Radio:-'${info.others.Radio}'<br>USB:-'${info.others.USB}'<br>WLAN:-'${info.others.WLAN}'</li>
          <li class="list-group-item">ReleaseDate:- '${info.releaseDate?info.releaseDate:"Comming Soon"}'</li>
      </ul>
    </div>
   </div>
  `;
};