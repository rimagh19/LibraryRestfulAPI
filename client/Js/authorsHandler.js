const hostURL = 'http://localhost:9090/';

function postAuthor() {
    event.preventDefault();
    const formData = new FormData(event.target); // Get the form data
    const data = {};
    // Convert FormData to JSON object
    formData.forEach((value, key) => {
        data[key] = value;
        console.log(key, value);
    });

    // Send the data to the API using POST method
    fetch(hostURL + 'authors/create', {
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
