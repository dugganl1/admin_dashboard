// Book constructor
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

// Initialize myLibrary array with sample books
const myLibrary = [
  new Book("To Kill a Mockingbird", "Harper Lee", 281, true),
  new Book("1984", "George Orwell", 328, false),
  new Book("Pride and Prejudice", "Jane Austen", 432, true),
  new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true),
  new Book("The Catcher in the Rye", "J.D. Salinger", 234, false),
];

// Function to toggle read status
function toggleReadStatus(index) {
  myLibrary[index].isRead = !myLibrary[index].isRead;
  displayBooks();
  console.log("Updated Library:", myLibrary); // Add this line
}

// Function to delete a book
function deleteBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
  console.log("Book deleted. Updated Library:", myLibrary);
}

// Function to display books
function displayBooks() {
  const booksContainer = document.querySelector(".books-container");
  booksContainer.innerHTML = ""; // Clear existing content

  myLibrary.forEach((book, index) => {
    const bookTile = document.createElement("div");
    bookTile.classList.add("book-tile");

    bookTile.innerHTML = `
      <span class="delete-btn" onclick="deleteBook(${index})">&times;</span>
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <div class="read-status ${
        book.isRead ? "read" : "want-to-read"
      }" onclick="toggleReadStatus(${index})">
        <span class="status-text">${book.isRead ? "Read" : "Want to Read"}</span>
        <span class="material-icons">${book.isRead ? "book" : "bookmark"}</span>
      </div>
    `;

    booksContainer.appendChild(bookTile);
  });
}

// Function to show modal
function showModal() {
  document.getElementById("addBookModal").style.display = "flex";
}

// Function to hide modal
function hideModal() {
  document.getElementById("addBookModal").style.display = "none";
}

// Function to add new book
function addBook(event) {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = parseInt(document.getElementById("pages").value);
  const isRead = document.getElementById("isRead").value === "true";

  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);

  displayBooks();
  hideModal();
  event.target.reset(); // Reset form fields
  console.log("Updated Library:", myLibrary); // Add this line
}

// Event Listeners
window.addEventListener("load", () => {
  displayBooks();

  // New button click event
  document
    .querySelector(".action-buttons button:nth-child(1)")
    .addEventListener("click", showModal);

  // Form submit event
  document.getElementById("addBookForm").addEventListener("submit", addBook);

  // Cancel button click event
  document.getElementById("cancelAdd").addEventListener("click", hideModal);

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === document.getElementById("addBookModal")) {
      hideModal();
    }
  });
});

// Call this at the end of your script or in a DOMContentLoaded event listener
console.log("Initial Library:", myLibrary);
