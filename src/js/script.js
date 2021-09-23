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
    },
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };
  const favoriteBooks = [];

  const filters = [];

  const bookList = document.querySelector(select.containerOf.bookList);

  const forms = document.querySelector(select.details.form);

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

    bookList.addEventListener('dblclick', function (event) {

      event.preventDefault();
      // image.classList.add('favorite');
      const book = event.target.offsetParent;

      if (book.classList.contains(select.containerOf.imageClassName)) {

        const id = book.getAttribute('data-id');
        // favoriteBooks.push(bookId);
        if (!favoriteBooks.includes(id)) {

          book.classList.add('favorite');

          favoriteBooks.push(id);

        } else {

          favoriteBooks.splice(favoriteBooks.indexOf(id), 1);

          book.classList.remove('favorite');
        }
      }
    });
    // console.log('abcd');
    forms.addEventListener('change', function (event) {
        // console.log('aaa');
      event.preventDefault();
        // console.log('bbb');
      const formElem = event.target;
        // console.log(formElem);
      if (formElem.type === 'checkbox' && formElem.name === 'filter') {
        if(formElem.checked){
            filters.push(formElem.value);
            
        }else{
            filters.splice(filters.indexOf(formElem.value), 1);
            
        }
        }
        console.log(filters);



    });
  }

  //   Wywoływanie funkcji
  render();
  initAction();
}
