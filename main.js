class UI {
  static addBookToList(booklist) {
    const inputTitle = document.querySelectorAll(".input-field")[0].value;
    const inputAuthor = document.querySelectorAll(".input-field")[1].value;

    if(inputTitle !== "" && inputAuthor !== "") {
      const table = document.querySelector(".booklist");
      const tr = document.createElement("tr");
  
      tr.className = "booklist__row";
      tr.innerHTML = `<td class="booklist__row__data">${booklist.title}</td>
      <td class="booklist__row__data">${booklist.author}</td>
      <td class="booklist__row__data"><img src="cancel_icon.svg" class="cancel-icon"></td>
      </tr>`;
    
      table.appendChild(tr);
      UI.showTable();
    }

  }

  static clearInputField() {
    document.querySelectorAll(".input-field")[0].value = "";
    document.querySelectorAll(".input-field")[1].value = "";
  }

  static alertUser(alertMsg, className) {
    const container = document.querySelector(".container-secondary--lightblue");
    const container_2 = document.querySelector(".container-secondary--flex");
    const div = document.createElement("div");

    div.className = `${className}`;
    div.textContent = `${alertMsg}`;

    container.insertBefore(div, container_2);
    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  static hideTable() {
    document.querySelector(".booklist").style.display = "none";
  }

  static showTable() {
    document.querySelector(".booklist").style.display = "block";
  }
  
}

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Storage {
  static saveToLocalStorage(booklist) {
    let book;
    if(localStorage.getItem("Book title") === null) {
      book = [];
    } else {
      book = JSON.parse(localStorage.getItem("Book title"));
    }

    if(booklist.title === "") {
      localStorage.setItem("Book title", JSON.stringify(book));
    } else {      
      book.push(booklist);
      localStorage.setItem("Book title", JSON.stringify(book));
    }

  }

  static displayListToUser() {
    let book;
    if(localStorage.getItem("Book title") === null) {
      book = [];
    } else {
      book = JSON.parse(localStorage.getItem("Book title"));
    }

    book.forEach((bookItem) => {
      const table = document.querySelector(".booklist");
      const tr = document.createElement("tr");
  
      tr.className = "booklist__row";
      tr.innerHTML = `<td class="booklist__row__data">${bookItem.title}</td>
      <td class="booklist__row__data">${bookItem.author}</td>
      <td class="booklist__row__data"><img src="cancel_icon.svg" class="cancel-icon"></td>
      </tr>`;
    
      table.appendChild(tr);
      UI.showTable();
    });

  }

  static deleteFromStorage(target) {
    let book;
    if(localStorage.getItem("Book title") === null) {
      book = [];
    } else {
      book = JSON.parse(localStorage.getItem("Book title"));
    }

    book.forEach((bookItem, index) => {
      if(target === bookItem.author) {
         book.splice(index, 1);
      }
    })
    
    localStorage.setItem("Book title", JSON.stringify(book))
  }

}

document.querySelector(".btn").addEventListener("click", (e) => {
  const title_field = document.querySelectorAll(".input-field")[0].value;
  const author_field = document.querySelectorAll(".input-field")[1].value;

  const booklist = new Book(title_field, author_field);
  
  UI.addBookToList(booklist);
  Storage.saveToLocalStorage(booklist);
  UI.clearInputField();

  if(title_field === "" || author_field === "") {
    UI.alertUser("Please fill in both fields!", "alert alert--error");
    UI.hideTable();
  } else {
    UI.alertUser("Book added to list", "alert alert--success");
    UI.showTable();
  }
  e.preventDefault();
}); 

document.addEventListener("DOMContentLoaded", UI.hideTable);

document.addEventListener("DOMContentLoaded", Storage.displayListToUser);

document.querySelector(".booklist").addEventListener("click", (e) => {
  if(e.target.classList.contains("cancel-icon")) {
    e.target.parentElement.parentElement.remove();
    Storage.deleteFromStorage(e.target.parentElement.previousElementSibling.textContent);
  }
});
