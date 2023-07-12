console.log("working");

const loadPhone = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit);

}

const displayPhone = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText = '';
    const showAll = document.getElementById('show-more');
    if (dataLimit && phones.length >= 12) {
        phones = phones.slice(0, 12);

        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');

    }

    const noPhone = document.getElementById('warning-massage');
    if (phones.length === 0)
        noPhone.classList.remove('d-none')


    else noPhone.classList.add('d-none');

    phones.forEach(phone => {

        const phoneDiv = document.createElement("div");
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-5">
                        <img src="${phone.image}" class="card-img-top" alt="...">
                            <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text">${phone.slug}</p>
                            <button onclick="loadPhoneDetailes('${phone.slug}')" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> Show Detailes </button>
                            
                        </div>
                    </div>

        `;
        phoneContainer.appendChild(phoneDiv);

    })
    toggleLoader(false);
}


document.getElementById("btn-search").addEventListener('click', function () {

    processSearch(12);


})


document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(12);
    }
})

const toggleLoader = isLoading => {
    const loadersection = document.getElementById('loader');

    if (isLoading) loadersection.classList.remove('d-none');
    else loadersection.classList.add('d-none');


}
const processSearch = (dataLimit) => {
    toggleLoader(true);

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    loadPhone(searchText, dataLimit);

}

document.getElementById('btn-show-more').addEventListener('click', function () {
    console.log("clicked");
    processSearch();

})

const loadPhoneDetailes = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetailes(data.data);


}
const displayPhoneDetailes = phone => {
    const modalTitle = document.getElementById('staticBackdropLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : " No release date found"
        }</p>
<p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : " No storage information given"}</p>
<p>Others:${phone.others ? phone.others.Bluetooth : " No bluetooth information given"} </p>



`

}