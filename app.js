console.log("working");

const loadPhone = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data);

}

const displayPhone = phones => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText = '';

    phones = phones.slice(0, 20);
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
                        </div>
                    </div>

        `;
        phoneContainer.appendChild(phoneDiv);

    })
    toggleLoader(false);
}


document.getElementById("btn-search").addEventListener('click', function () {

    toggleLoader(true);

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    loadPhone(searchText);


})

const toggleLoader = isLoading => {
    const loadersection = document.getElementById('loader');

    if (isLoading) loadersection.classList.remove('d-none');
    else loadersection.classList.add('d-none');


}