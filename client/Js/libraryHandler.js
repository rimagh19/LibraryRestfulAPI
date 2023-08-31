const hostURL = 'http://localhost:9090/';

var libs_fetched = false;
var add_fetched = false;

// GET libraries
function fetchLibraries() {
    add_fetched = false;

    const to_hide_container = document.getElementById('myForm');
    to_hide_container.style.display = 'none';
    if (!libs_fetched) {
        libs_fetched = true;
        const container = document.getElementById('libs-container');
        fetch(hostURL + 'libraries/get')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                let counter = 0;
                data.libraries.forEach((library) => {
                    //div
                    const libContentDiv = document.createElement('div');
                    libContentDiv.classList.add('bg-dark', 'm-1', 'p-1', 'rounded-lg', 'lib-holder', 'd-flex', 'align-items-left', 'div-holder:' + counter);
                    libContentDiv.setAttribute('id', library._id);

                    //id
                    const libContentID = document.createElement('p');
                    libContentID.classList.add('bg-light', 'm-1', 'p-1', 'rounded-lg', 'id-tag');
                    libContentID.textContent = '#' + ++counter;
                    libContentDiv.appendChild(libContentID);

                    //name
                    const libContentName = document.createElement('p');
                    libContentName.classList.add('h5', 'm-1', 'ml-3', 'p-1', 'rounded-lg', 'name-tag', 'text-light');
                    libContentName.textContent = library.name;
                    libContentDiv.appendChild(libContentName);

                    //location
                    const libContentLocation = document.createElement('img');
                    let imgSrc = 'https://flagsapi.com/' + library.location.toUpperCase() + '/flat/32.png ';
                    libContentLocation.setAttribute('src', imgSrc);
                    // libContentLocation.setAttribute('height', 40);
                    // libContentLocation.setAttribute('width', 40);
                    libContentLocation.classList.add('m-1', 'ml-3', 'location-tag');
                    libContentDiv.appendChild(libContentLocation);

                    //books -toggle buttin
                    const libContentBooksToggle = document.createElement('button');
                    libContentBooksToggle.setAttribute('type', 'button');
                    libContentBooksToggle.textContent = '📚 Books';
                    libContentBooksToggle.classList.add('btn-primary', 'btn', 'm-1', 'ml-3', 'p-1', 'rounded-lg', 'books-toggle-tag', 'text-light', 'pr-0');
                    libContentDiv.appendChild(libContentBooksToggle);

                    const libContentDel = document.createElement('button');
                    libContentDel.setAttribute('type', 'button');
                    libContentDel.setAttribute('onClick', 'deleteLibrary(' + counter + ')');
                    libContentDel.setAttribute('id', 'del-' + counter.toString());
                    libContentDel.textContent = 'DELETE';
                    libContentDel.classList.add('btn-danger', 'btn', 'm-1', 'ml-3', 'p-1', 'rounded-lg', 'del-btn', 'text-light', 'pr-0');
                    libContentDiv.appendChild(libContentDel);

                    //books - div
                    const libContentBooks = document.createElement('div');
                    libContentBooks.setAttribute('id', 'BOOKS-' + counter.toString());
                    console.log('BOOKS-' + counter.toString());
                    libContentBooks.classList.add('p-1', 'pl-4', 'bg-secondary', 'rounded-lg', 'books-list', 'text-light', 'BOOKS-' + counter.toString());

                    console.log(library);
                    // books - list
                    library.books.forEach((book) => {
                        console.log(book);
                        const bookElement = document.createElement('li');
                        bookElement.textContent = '"' + book.title + '"' + ' -' + book.genre + ' -' + book.author.name;
                        libContentBooks.appendChild(bookElement);
                    });

                    libContentBooks.style.display = 'none';
                    to_hide_container.style.display = 'none';

                    container.appendChild(libContentDiv);
                    container.appendChild(libContentBooks);
                });
                booksHandler();
            })
            .catch((error) => console.log(error));
    } else {
        console.log('Data Already Fitched');
    }
}

// POST library
function postLibrary() {
    event.preventDefault(); // Prevent the form from submitting normally

    const formData = new FormData(event.target); // Get the form data
    const data = {};

    // Convert FormData to JSON object
    formData.forEach((value, key) => {
        console.log(key, value);
        if (key === 'books') {
            data[key] = getSelctedBooks();
        } else {
            data[key] = value;
        }
    });
    console.log(data);

    // Send the data to the API using POST method
    fetch(hostURL + 'libraries/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .then((responseData) => {
            console.log('Response from server:', responseData);
            // You can perform additional actions with the response if needed
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    const overlay = document.getElementById('overlay');
    const modal = document.getElementById('modal');

    overlay.style.display = 'flex'; // Display the overlay
    modal.style.display = 'flex'; // Display the overlay
    modal.style.position = 'absolute'; // Display the overlay
    setTimeout(() => {
        overlay.style.display = 'none';
        modal.style.display = 'none';
    }, 700);
}

// Display form
function addtoLibraries() {
    add_fetched = true;
    libs_fetched = false;
    hide('libs-container');
    const form_container = document.getElementById('myForm');
    form_container.style.display = 'block';
}

// Books Lists Handler
function booksHandler() {
    var coll = document.getElementsByClassName('books-toggle-tag');
    var i;
    for (i = 0; i < coll.length; i++) {
        const num = i + 1;
        coll[i].addEventListener('click', function () {
            var content = document.getElementById('BOOKS-' + num);
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    }
}

// delete library handler
function deleteLibrary(num) {
    const element = document.getElementById('del-' + num);
    const parent = document.getElementById('del-' + num).parentElement;
    const id = parent.getAttribute('id');
    const toDelbooks = document.getElementById('BOOKS-' + num);
    toDelbooks.remove();
    console.log(id);
    fetch(hostURL + `libraries/delete/${id}`, {
        method: 'DELETE'
    })
        .then((response) => response.json())
        .then((responseData) => {
            console.log('Item deleted:', responseData);
            updateId(num);
            parent.remove(); // Remove the item from the UI
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// update id middleware
function updateId(num) {
    console.log(num);
    var ids = document.getElementsByClassName('id-tag');
    for (i = num; i < ids.length; i++) {
        console.log(ids[i + 1]);
        ids[i].textContent = '#' + i;
    }
}

// remove div middlewar
function hide(id) {
    document.getElementById(id).innerHTML = '';
}

var selectList = document.getElementById('books');
fetch(hostURL + 'books/get')
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        data.books.forEach((book) => {
            var option = document.createElement('option');
            console.log(option);
            option.value = book._id;
            option.id = book._id;
            option.text = '📖  ' + book.title;
            selectList.appendChild(option);
        });
    });
const cont = document.getElementById('libs-container');

function getSelctedBooks() {
    const selectElement = document.getElementById('books');
    const selectedOptions = [];

    for (let i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].selected) {
            selectedOptions.push(selectElement.options[i].value);
        }
    }
    return selectedOptions;
}
