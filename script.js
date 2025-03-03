const moviesList = [
    { movieName: "Flash", price: 7 },
    { movieName: "Spiderman", price: 5 },
    { movieName: "Batman", price: 4 },
  ];
  
  // 1. Populate the dropdown menu with movie names
  const selectMovie = document.getElementById("selectMovie");
  const movieNameDisplay = document.getElementById("movieName");
  const moviePriceDisplay = document.getElementById("moviePrice");
  const numberOfSeat = document.getElementById("numberOfSeat");
  const totalPrice = document.getElementById("totalPrice");
  const selectedSeatsHolder = document.getElementById("selectedSeatsHolder");
  
  moviesList.forEach((movie, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${movie.movieName} - $${movie.price}`;
    selectMovie.appendChild(option);
  });
  
  // Update displayed movie name and price when selection changes
  selectMovie.addEventListener("change", () => {
    const selectedMovie = moviesList[selectMovie.value];
    movieNameDisplay.textContent = selectedMovie.movieName;
    moviePriceDisplay.textContent = `$ ${selectedMovie.price}`;
    updatePrice(); // Recalculate the total price
  });
  
  // 2. Add event listeners to each unoccupied seat
  const seats = document.querySelectorAll(".seatCont .seat:not(.occupied)");
  let selectedSeats = [];
  
  seats.forEach((seat, index) => {
    seat.addEventListener("click", () => {
      seat.classList.toggle("selected");
  
      if (seat.classList.contains("selected")) {
        selectedSeats.push(index);
      } else {
        selectedSeats = selectedSeats.filter((seatIndex) => seatIndex !== index);
      }
  
      updateSelectedSeats();
    });
  });
  
  // Function to update selected seats display and total price
  function updateSelectedSeats() {
    selectedSeatsHolder.innerHTML = "";
  
    if (selectedSeats.length === 0) {
      selectedSeatsHolder.innerHTML = '<span class="noSelected">No Seat Selected</span>';
    } else {
      selectedSeats.forEach((seatIndex) => {
        const seatEl = document.createElement("span");
        seatEl.textContent = `Seat ${seatIndex + 1}`;
        seatEl.classList.add("selected-seat-item");
        selectedSeatsHolder.appendChild(seatEl);
      });
    }
  
    numberOfSeat.textContent = selectedSeats.length;
    updatePrice();
  }
  
  // Function to update total price
  function updatePrice() {
    const selectedMovie = moviesList[selectMovie.value];
    totalPrice.textContent = `$ ${selectedSeats.length * selectedMovie.price}`;
  }
  
  // 3. Add event listener to "Continue" button
  document.getElementById("proceedBtn").addEventListener("click", () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat before proceeding.");
    } else {
      alert(`You have selected ${selectedSeats.length} seats for ${movieNameDisplay.textContent}.`);
    }
  });
  
  // 4. Add event listener to "Cancel" button
  document.getElementById("cancelBtn").addEventListener("click", () => {
    selectedSeats = [];
    seats.forEach((seat) => seat.classList.remove("selected"));
    updateSelectedSeats();
  });
  