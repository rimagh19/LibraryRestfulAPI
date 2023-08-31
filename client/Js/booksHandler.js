const hostURL = 'http://localhost:9090/';

var selectList = document.getElementById('author');
fetch(hostURL + 'authors/get')
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        data.authors.forEach((author) => {
            var option = document.createElement('option');
            option.value = author._id;
            option.text = author.name;
            option.setAttribute('id', author._id);
            selectList.appendChild(option);
        });
    });
const cont = document.getElementById('libs-container');

// POST book
function postBook() {
    event.preventDefault(); // Prevent the form from submitting normally
    const formData = new FormData(event.target); // Get the form data
    const data = {};
    const filled = true;
    // Convert FormData to JSON object
    formData.forEach((value, key) => {
        data[key] = value;
        console.log(key, value);
    });
    console.log(data);
    if (filled) {
        // Send the data to the API using POST method
        fetch('http://localhost:9090/books/create', {
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
        const openModalBtn = document.getElementById('submit');
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
}
