'use strict'
/* global store, minRating */
let minRating = 0;

// set minimum rating to 0 as default
// const minRating = 4;

// eslint-disable-next-line no-unused-vars
const bookmark = (function () {

  function toggleAddForm() {
    console.log('toggle add form');
    let acc = document.getElementsByClassName("accordion");
    let i;
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        this.classList.toggle("active");

        /* Toggle between hiding and showing the active panel */
        let panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }
  }

  function generateItemElement(item) {
    // console.log(item.url);
    const rating = $(item.rating);
    const stars = '&#9733;'.repeat(rating[0]);
    const starsBlank = '&#9734;'.repeat(5 - rating[0]);


    return `
      <li class="js-item-element" data-item-id="${item.id}" data-item-url="${item.url}" data-item-condense="${item.condense}">
      ${item.title} <a href="${item.url}">Visit Site</a>
        <div class="bookmark-item-controls">
          <button class="bookmark-item-condensed js-item-condensed">
            <span class="button-label">Expand</span>
          </button>
          <button class="bookmark-item-delete js-item-delete">
            <span class="button-label">Delete</span>
          </button>
          <p>Rating: ${stars}${starsBlank}</p>
        </div>
      </li>
      `;
  }

  function generatebookmarkItemsString(bookmarkList) {
    const items = bookmarkList.map((item) => generateItemElement(item));
    return items.join('');
  }

  function render() {
    // Filter item list if store prop is true by item.checked === false
    const items = store.items;

    // render the bookmark list in the DOM
    console.log('`render` ran', items);
    const bookmarkListItemsString = generatebookmarkItemsString(items);
    // console.log(bookmarkListItemsString);
    
    // insert that HTML into the DOM
    $('.js-bookmark-list').html(bookmarkListItemsString);
  }

  function handleNewItemSubmit() {
    $('#js-bookmark-form').submit(function (event) {
      event.preventDefault();
      // debugger;

      const title = $('.js-bookmark-title').val();
      $('.js-bookmark-title').val('');

      const link = $('.js-bookmark-link').val();
      $('.js-bookmark-link').val('');

      const description = $('.js-bookmark-description').val();
      $('.js-bookmark-description').val('');

      const rating = $('.js-bookmark-rating').val();
      $('.js-bookmark-rating').val('');

      console.log('new item: ', title, link, description, rating);


      // store.addItem(newItemName);

      // api.createItem(newItemName, (newItem) => {
      //   store.addItem(newItem);
      //   render();
      // })
    });
  }

  // let minRating = 0;
  function handleNewRatingSubmit() {
    $('#js-filter-form').submit(function (event) {
      // location.reload();
      event.preventDefault();
      // debugger;

      const numRating = $('#ratingFilter').val();
      console.log('Rating chosen: ', numRating);
      minRating = numRating;
      console.log(minRating);
      api.filterRating(numRating);


      // $('.js-rating-filter').val('');

      // store.addItem(newItemName);

      // api.createItem(newItemName, (newItem) => {
      //   store.addItem(newItem);
      //   render();title
      // })
    });
  }

  function reset() {
    $('#js-filter-form').submit(function (event) {
      // location.reload();
      event.preventDefault();
      // debugger;

      const numRating = $('#ratingFilter').val();
      console.log('Rating chosen: ', numRating);
      minRating = numRating;
      console.log(minRating);
      api.filterRating(numRating);


      // $('.js-rating-filter').val('');

      // store.addItem(newItemName);

      // api.createItem(newItemName, (newItem) => {
      //   store.addItem(newItem);
      //   render();
      // })
    });
  }

  function handleNewItemSubmit() {
    $('#js-bookmark-form').submit(function (event) {
      event.preventDefault();
      // debugger;

      const title = $('.js-bookmark-title').val();
      $('.js-bookmark-title').val('');

      const link = $('.js-bookmark-link').val();
      $('.js-bookmark-link').val('');

      const description = $('.js-bookmark-description').val();
      $('.js-bookmark-description').val('');

      const rating = $('.js-bookmark-rating').val();
      // $('.js-bookmark-rating').val('');

      api.createItem(title, link, description, rating, (newItem) => {
        store.addItem(newItem);
        render();
      })

      // store.addItem(newItemName);

      // api.createItem(newItemName, (newItem) => {
      //   store.addItem(newItem);
      //   render();
      // })
    });
  }

  function getItemIdFromElement(item) {
    // console.log(item.closest('.js-item-element'));
    
    return $(item)
      .closest('.js-item-element') 
      // const id = getItemIdFromElement(event.currentTarget);

      // const item = store.findById(id);
      
      // console.log(id, item);
      .data('item-id');
  }

  function getItemCondenseFromElement(item) {
    // console.log(item.closest('.js-item-element'));
    
    return $(item)
      .closest('.js-item-element') 
      // const id = getItemIdFromElement(event.currentTarget);

      // const item = store.findById(id);
      
      // console.log(id, item);
      .data('item-condense');
  }

  function handleDeleteItemClicked() {
    // like in `handleItemCheckClicked`, we use event delegation
    $('.js-bookmark-list').on('click', '.js-item-delete', event => {
      // get the index of the item in store.items
      const id = getItemIdFromElement(event.currentTarget);

      const item = store.findById(id);
      
      // delete the item
      api.deleteItem(id, () => {
        store.findAndDelete(id);
        render();
      // store.findAndDelete(id);
      // render the updated shopping list
      // render();
      });
    })
  }

  function handleExpandClicked() {
    $('.js-bookmark-list').on('click', '.js-item-condensed', event => {
      const cond = getItemCondenseFromElement(event.currentTarget);
      const id = getItemIdFromElement(event.currentTarget);
      const item = store.findById(id);
      console.log(cond, id, item);
      store.findAndUpdate(id, { condense: !item.condense });
      render();

      // 'true'
    })
  }
  
  function bindEventListeners() {
    handleNewItemSubmit();
    handleNewRatingSubmit();
    // handleItemCheckClicked();
    handleDeleteItemClicked();
    handleExpandClicked();
    // handleLinkClicked();
    // handleEditShoppingItemSubmit();
    // handleToggleFilterClick();
    // handleShoppingListSearch();
    toggleAddForm();
  }

  // This object contains the only exposed methods from this module:
  return {

    render: render,
    bindEventListeners: bindEventListeners,
  };
}());link