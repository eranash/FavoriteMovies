const addMovieModalEl = document.getElementById("add-modal");
const startAddMovieButtonEl = document.querySelector("header button");
const backdropEl = document.getElementById("backdrop");
const cancelAddMovieButtonEl = addMovieModalEl.querySelector(".btn--passive");
const confirmAddMovieButtoEl = cancelAddMovieButtonEl.nextElementSibling;
const userInputEls = addMovieModalEl.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const deleteMovieModal = document.getElementById('delete-modal');
const movies = [];

const toggleBackdrop = () => {
    backdropEl.classList.toggle("visible");
  };

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

const cancelMovieDeletion = ()=> {
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');

}

const deleteMovie = (movieIdx) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieIdx) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const listEl = document.getElementById("movie-list");
  listEl.children[movieIndex].remove();
  cancelMovieDeletion();
  updateUI();
};

const deleteMOvieHandler = (movieIdx) => {
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();
    const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
    let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));
    confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');
    cancelDeletionButton.removeEventListener('click', cancelMovieDeletion);
    cancelDeletionButton.addEventListener('click', cancelMovieDeletion);
    confirmDeletionButton.addEventListener('click', deleteMovie.bind(null, movieIdx));
};

const renderNewMovieEl = (idx, title, imageUrl, rating) => {
  const newMovieEl = document.createElement("li");
  newMovieEl.classList.add("movie-element");
  newMovieEl.innerHTML = `
    <div class='movie-element__image'>
        <img src='${imageUrl}' alt='${title}'>
    </div>
    <div class='movie-element__info'>
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
    </div>
    `;
  newMovieEl.addEventListener("click", deleteMOvieHandler.bind(null, idx));
  const listEl = document.getElementById("movie-list");
  listEl.appendChild(newMovieEl);
};

const closeMovieModal= ()=> {
    addMovieModalEl.classList.remove("visible");
}

const openMovieModal = () => {
  addMovieModalEl.classList.add("visible");
  toggleBackdrop();
};

const clearMovieInputs = () => {
  for (const userInput of userInputEls) {
    userInput.value = "";
  }
};



const cancelAddMoviehandler = () => {
  closeMovieModal();
  toggleBackdrop();
  clearMovieInputs();
};

const backdropClickHandler = () => {
  closeMovieModal();
  cancelMovieDeletion();
  clearMovieInputs();
};

const addMovieHandler = () => {
  const titleValue = userInputEls[0].value;
  const imageUrlValue = userInputEls[1].value;
  const ratingValue = userInputEls[2].value;

  if (
    titleValue.trim() === "" ||
    imageUrlValue.trim() === "" ||
    ratingValue.trim() === "" ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert("please enter valid values");
    return;
  }
  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };
  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  toggleBackdrop();
  clearMovieInputs();
  renderNewMovieEl(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
  updateUI();
};

startAddMovieButtonEl.addEventListener("click", openMovieModal);
backdropEl.addEventListener("click", backdropClickHandler);
cancelAddMovieButtonEl.addEventListener("click", cancelAddMoviehandler);
confirmAddMovieButtoEl.addEventListener("click", addMovieHandler);
