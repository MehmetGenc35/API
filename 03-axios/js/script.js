const API_BASE_URL = "https://api.tvmaze.com";
const txtSearch = document.getElementById("txtSearch");
const listShows = document.getElementById("listShows");
const searchShows = async (q) => {
    const res = await axios(`${API_BASE_URL}/search/shows?q=${q}`);
    return res.data;
};
txtSearch.addEventListener("input", async (e) => {
    const q = e.target.value;
    if (q.length < 3) return;
    const shows = await searchShows(q);
    let strShows = "";
    if (shows.length <= 0) {
        strShows = `<div class="alert alert-danger">No show was found</div>`;
    } else {
        shows.forEach((item) => {
            const { id, image, name } = item.show;
            strShows += `
            <div class="col">
                <div class="card h-100" data-id="${id}" style="cursor:pointer">
                    <img class="card-img-top" src="${image.medium}" alt="Title" />
                    <div class="card-body">
                        <h4 class="card-title">${name}</h4>
                    </div>
                </div>
            </div>`;
        });
    }
    listShows.innerHTML = strShows;
});