{
  'use strict';

  const select = {
    templateOf: {
      bookTemplate: '#template-book'
    },
    containerOf: {
      bookList: '.books-list',
      imageClassName: 'book__image',
    },
    details: {
      form: '.filters',
      book: 'hidden'
    },
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };
  const favoriteBooks = [];

  const filters = [];

  // const bookList = document.querySelector(select.containerOf.bookList);

  // const forms = document.querySelector(select.details.form);

  // Funkcje
  class BookList{
    constructor(){
      const thisBook = this;

      thisBook.initData();
      thisBook.getElements();
      thisBook.render();
      thisBook.initAction();
    }
    initData(){
      this.data = dataSource.books;

    }
    getElements(){
      const thisBook = this;

      thisBook.menuContainer = document.querySelector(select.containerOf.bookList);
      thisBook.forms = document.querySelector(select.details.form);
    }
    render() {
      const thisBook = this;

    for (let allBooks of this.data) {

      const generatedHTML = templates.bookTemplate(allBooks);

      const element = utils.createDOMFromHTML(generatedHTML);

      // const bookListContainer = document.querySelector(select.containerOf.bookList);

      thisBook.menuContainer.appendChild(element);

      const ratingBgc = thisBook.determineRatingBgc(allBooks.rating);
      console.log(ratingBgc);
      
      const ratingWidth = allBooks.rating * 10;
      console.log(ratingWidth);
    }
  }


  initAction() {
    const thisBook = this;

    thisBook.menuContainer.addEventListener('dblclick', function (event) {

      event.preventDefault();

      const book = event.target.offsetParent;

      if (book.classList.contains(select.containerOf.imageClassName)) {

        const id = book.getAttribute('data-id');

        if (!favoriteBooks.includes(id)) {

          book.classList.add('favorite');

          favoriteBooks.push(id);

        } else {

          favoriteBooks.splice(favoriteBooks.indexOf(id), 1);

          book.classList.remove('favorite');
        }
      }
    });
    thisBook.forms.addEventListener('change', function (event) {

      event.preventDefault();

      const formElem = event.target;

      if (formElem.type === 'checkbox' && formElem.name === 'filter') {
        if (formElem.checked) {
          filters.push(formElem.value);

        } else {
          filters.splice(filters.indexOf(formElem.value), 1);

        }
      }
      filtersBooks();
    });
  }

  filtersBooks() {
    const thisBook = this;
    for (let books of dataSource.books) {
      let shouldBeHidden = false;

      for (let filter of filters) {
        if (!books.details[filter]) {
          shouldBeHidden = true;
          console.log(shouldBeHidden);
          break;
        }
      }

      if (shouldBeHidden) {

        const bookId = document.querySelector('.book__image[data-id="' + books.id + '"]');
        // console.log(bookId);
        bookId.classList.add(select.details.book);

      } else {
        const bookId = document.querySelector('.book__image[data-id="' + books.id + '"]');
        bookId.classList.remove(select.details.book);
        // console.log(bookId);
      }
    }
  }

  determineRatingBgc(rating) {
    let background = '';
    if (rating < 6) {
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
    } else if (rating > 6 && rating <= 8) {
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
    } else if (rating > 8 && rating <= 9) {
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
    } else if (rating > 9) {
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
    }
    // console.log('aaa', background);
    return background;
  }
}
const app = new BookList();
}
