$.ajax({
    url: 'https://randomuser.me/api/?results=12&nat=us', // API for generating 12 random user data from US
    dataType: 'json',
    success: function (data) {
        employeeList = data.results; // Storing data 
        data.results.forEach(user => { // Loop through and pull data from each employee;
            const image = user.picture.large;
            const firstName = user.name.first;
            const lastName = user.name.last;
            const email = user.email;
            const city = user.location.city;
            const state = user.location.state;

            // ADDING ELEMENTS CONTAINING EMPLOYEE CARDS
            const employeeCard = 
                `<div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${image}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
                    <p class="card-text">${email}</p>
                    <p class="card-text cap">${city}, ${state}</p>
                </div>
            </div>`;
            $('#gallery').append(employeeCard); // Appending HTML to 'gallery'
        })
    }
});


// CREATING MODAL WINDOW FOR EACH EMPLOYEE 
function modalWindow(x) { 
    const image = employeeList[x].picture.large;
    const firstName = employeeList[x].name.first;
    const lastName = employeeList[x].name.last;
    const email = employeeList[x].email;
    const city = employeeList[x].location.city.toUpperCase(); // Capitalizing City
    const phone = employeeList[x].phone;
    const street = employeeList[x].location.street.toUpperCase(); 
    const state = employeeList[x].location.state.toUpperCase(); 
    const postCode = employeeList[x].location.postcode;
    const dob = employeeList[x].dob.date.slice(0, 10); // Slicing DOB to only include first 10 digits    

    // ADDING ELEMENTS CONTAINING MODAL WINDOW
    const employeeModalData = 
        `<div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${image}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${firstName} ${lastName}</h3>
                <p class="modal-text">${email}</p>
                <p class="modal-text cap">${city}</p>
                <hr>
                <p class="modal-text">${phone}</p>
                <p class="modal-text">${street}, ${city}, ${state}, ${postCode}</p>
                <p class="modal-text">BIRTHDAY: ${dob}</p>
            </div>
        </div>
        <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>`;
    $('body').append(employeeModalData); // Appending HTML to the body

    // LISTEN FOR MODAL WINDOW TO CLICK
    $('#modal-close-btn').on('click', function () {
        $('.modal-container').remove();  
     });
    // REMOVE 'PREV' BUTTON FOR FIRST EMPLOYEE OR 'NEXT' IF LAST EMPLOYEE
    if (x === 0) {
        $(".modal-prev").remove();
    } else if (x === 11) {
        $(".modal-next").remove();
    }
    // LISTEN FOR 'NEXT' BUTTON TO CLICK, REMOVE CURRENT MODAL, OPEN NEXT EMPLOYEE MODAL
    $(".modal-next").on('click', function () {
        $('.modal-container').remove();
        x++ // 
        modalWindow(x); 
    });
    // LISTEN FOR 'PREV' BUTTON TO CLICK, REMOVE CURRENT MODAL AND OPEN PREVIOUS EMPLOYEE MODAL
    $(".modal-prev").on('click', function () {
        $('.modal-container').remove();
        x-- 
        modalWindow(x); // Calling function to open Modal Window 
    });
}


// LISTEN FOR EMPLOYEE GALLERY CARD TO BE CLICKED, 
$('#gallery').on('click', '.card', function () {
    x = ($(this).index()); 
    modalWindow(x); // Calling function to open Modal Window 
});


// ADDING ELEMENT SEARCH BAR
const searchBar = 
    `<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;
$('.search-container').append(searchBar); // Append HTML to 'search-container' div

// ADDING LABEL THAT DISPLAYS 'NO RESULTS' MESSAGE IF SEARCH COMES BACK EMPTY
$('.search-container').before('<label class="noresult" id="noresult"><font color="red">No Search Results</font></label>');
$('.noresult').hide();

let findResults = []; // Create empty array for search results

const dataInput = () => {
    findResults = []; 
    // Loop through employee list
    for (let x = 0; x < $('#gallery .card').length; x++) {
        //Conditional statement to test Gallery Card field                                     
        if ($('#gallery .card')[x].textContent.toLowerCase().includes($('#search-input').val().toLowerCase())) {
            $('#gallery .card')[x].style.display = "flex"; // Display employee content if a match
            findResults.push($('#gallery .card')[x]); 
        } else {
            $('#gallery .card')[x].style.display = "none"; // Hide all students who do not match input value
        }
    }
    // Showing or hiding 'no results' message
    if (findResults.length === 0) {
        $('.noresult').show();; // If the searchResults array is empty, show "no results" message
    } else {
        $('.noresult').hide(); // Otherwise, hide the "no results" message  
    }
}

$('#search-submit').on('click', () => {
    dataInput();
});

// LISTENING FOR SEARCH INPUT KEYUP, RETURN RESULTS 
$('#search-input').on('keyup', (e) => {
    dataInput();
});