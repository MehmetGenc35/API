//bu url ile bağlan dedikten sonra yanına method türünü yazmazsak default olarak GET olur.Bu reguest bize promise olarak geri döner
//fetch iki adımdan oluşur. Birinci adımda gelen response u json a çeviriryoruz. Ikinci adım ise bu json objesinin icindeki verileri getirir.
//gelen dataları sayfada göstermek için ayrı bir fonk yazacağız
//dataset "data-" ile başlayan tüm attribute ları getirir

//bu url ile bağlan dedikten sonra yanına method türünü yazmazsak default olarak GET olur.Bu reguest bize promise olarak geri döner
//fonksiyonları bağımsız hale getirmek için parametrede cb fonksiyonu yazıp cb yi return yaptırmak için kullandık
//fetch iki adımdan oluşur. Birinci adımda gelen response u json a çeviriryoruz. Ikinci adım ise bu json objesinin icindeki verileri getirir.


//image i gelen datadan alacak

//spinner yükleme esnasında dönecek
    //fetchCars a parametre olarak yazdığımız fonksiyon bize değer döndürecek olan calllback fonksiyon
    //spinner yükleme bitince kaybolacak
    //container yükleme bitince gözükecek

const API_BASE_URL = "https://carrental-v3-backend.herokuapp.com";
const listCars = document.getElementById("listCars");
const carDetails = document.getElementById("carDetails");
const loader = document.getElementById("loader");
const carContainer = document.getElementById("carContainer");
const fetchCars = (cb) => {
    const url = `${API_BASE_URL}/car/visitors/all`;
    fetch(url) // API a request bu asamada gider, geriye bir promise doner, bu promise then bolumunde cozulur
        .then((res) => res.json()) // data elde edilmek isteniyorsa response json a cevrilir ve bir sonraki then e aktarilir
        .then((data) => cb(data)) // burada istenilen dataya erisilir
        .catch((err) => console.log(err));
};
const fetchCar = (id, cb) => {
    const url = `${API_BASE_URL}/car/visitors/${id}`;
    fetch(url) // API a request bu asamada gider, geriye bir promise doner, bu promise then bolumunde cozulur
        .then((res) => res.json()) // data elde edilmek isteniyorsa response json a cevrilir ve bir sonraki then e aktarilir
        .then((data) => cb(data)) // burada istenilen dataya erisilir
        .catch((err) => console.log(err));
};
const loadCars = (cars) => {
    let strCars = "";
    cars.forEach((item) => {
        strCars += `<div class="col">
        <div class="card car-card h-100" data-id="${item.id}" style="cursor:pointer">
            <img class="card-img-top" src="${API_BASE_URL}/files/display/${item.image[0]}" alt="Title" />
            <div class="card-body">
                <h4 class="card-title">${item.model}</h4>
            </div>
        </div>
    </div>`;
    });
    return strCars;
};
const loadCarDetails = (car) => {
    const {
        image,
        model,
        doors,
        seats,
        luggage,
        transmission,
        airConditioning,
        age,
        pricePerHour,
        fuelType,
    } = car;
    const strCarDetails = `
        <div class="col-md-5">
            <img src="${API_BASE_URL}/files/display/${
        image[0]
    }" class="img-fluid" alt="${model}">
        </div>
        <div class="col-md-7">
            <h1>${model}</h1>
            <table class="table">
                <tr>
                    <td>Doors</td>
                    <td>${doors}</td>
                </tr>
                <tr>
                    <td>Seats</td>
                    <td>${seats}</td>
                </tr>
                <tr>
                    <td>Luggage</td>
                    <td>${luggage}</td>
                </tr>
                <tr>
                    <td>Transmission</td>
                    <td>${transmission}</td>
                </tr>
                <tr>
                    <td>Air Condition</td>
                    <td>${airConditioning ? "✅" : "❎"}</td>
                </tr>
                <tr>
                    <td>Age</td>
                    <td>${age}</td>
                </tr>
                <tr>
                    <td>Price per Hour</td>
                    <td>$${pricePerHour}</td>
                </tr>
                <tr>
                    <td>Fuel Type</td>
                    <td>${fuelType}</td>
                </tr>
            </table>
        </div>`;
    return strCarDetails;
};
const setLoaderVisibility = (state) => {
    if (state === "show") {
        loader.classList.remove("d-none");
    } else {
        loader.classList.add("d-none");
    }
};
const init = () => {
    setLoaderVisibility("show");
    fetchCars((data) => {
        const strCars = loadCars(data);
        listCars.innerHTML = strCars;
        setLoaderVisibility("hide");
        carContainer.classList.remove("d-none");
    });
};
listCars.addEventListener("click", (e) => {
    const card = e.target.closest(".car-card");
    if (!card) return;
    const carId = card.dataset.id;
    setLoaderVisibility("show");
    fetchCar(carId, (data) => {
        const strCarDetails = loadCarDetails(data);
        carDetails.innerHTML = strCarDetails;
        carDetails.classList.remove("d-none");
        setLoaderVisibility("hide");
        window.scrollTo(0, 0);
    });
});
init();

/*
---------METHOD dan DONEN DEGERLER----------------
0:{id: 2, model: 'Kia Rio', doors: 4, seats: 5, luggage: 300, …}
1:{id: 3, model: 'Ford Fiesta', doors: 4, seats: 5, luggage: 300, …}
2:{id: 4, model: 'WV Polo', doors: 4, seats: 4, luggage: 260, …}
3:{id: 5, model: 'Ford Fuga', doors: 4, seats: 5, luggage: 520, …}
4:{id: 6, model: 'Opel Insigna', doors: 4, seats: 5, luggage: 510, …}
5:{id: 7, model: 'BMW i3', doors: 4, seats: 5, luggage: 420, …}
6:{id: 8, model: 'Bugatti Chiron', doors: 2, seats: 2, luggage: 339, …}
7:{id: 9, model: 'Audi Q8', doors: 4, seats: 5, luggage: 300, …}
8:{id: 10, model: 'Maserati', doors: 4, seats: 4, luggage: 250, …}
9:{id: 11, model: 'Mercedes Vito', doors: 5, seats: 6, luggage: 410, …}
10:{id: 12, model: 'Mercedes GLC', doors: 5, seats: 5, luggage: 250, …}
11:{id: 13, model: 'Porsche Ceyenne SUV', doors: 4, seats: 5, luggage: 480, …}
12:{id: 84, model: 'Ferrari ', doors: 2, seats: 2, luggage: 1, …}
length:13
*/