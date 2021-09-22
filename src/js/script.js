{
  'use strict';

  const select = {
    templateOf: {
      bookTemplate: '#template-book'
    },
    containerOf: {
      bookList: '.book-list'
    },
    booksImages: '.book-image .book-list'
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };


  function rander() {
    const thisBook = this;

    for (let allBooks of dataSource.books) {
      const generatedHTML = templates.bookTemplate(allBooks);
      thisBook.element = utils.createDOMFromHTML(generatedHTML);
      const bookListContainer = document.querySelector(select.containerOf.bookList);
      bookListContainer.appendChild(thisBook.element);
    }
  }
}
