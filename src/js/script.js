{
  'use strict';

  const select = {
    templateOf: {
      bookTemplate: '#template-book'
    },
    containerOf: {
      bookList: '.book-list'
    },
    booksImages: {
      images: '.book-image .book-list'
    },
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  // Funkcje
  function render() {
    // const thisBook = this;

    for (let allBooks of dataSource.books) {
      const generatedHTML = templates.bookTemplate(allBooks);
      const element = utils.createDOMFromHTML(generatedHTML);
      const bookListContainer = document.querySelector(select.containerOf.bookList);
      bookListContainer.appendChild(element);
    }
  }


  function initAction() {
    // const thisBook = this;

    const favoriteBooks = [];

    const bookImage = document.querySelector(select.booksImages.images);

    for (let image of bookImage) {
      image.addEventListener('dblclick', function (event) {
        event.preventDefault();
        image.classList.add('favorite');
        const bookId = image.getAttribute('data-id');
        favoriteBooks.push(bookId);
      });
    }
  }

  //   Wywoływanie funkcji
  render();
  initAction();
}
