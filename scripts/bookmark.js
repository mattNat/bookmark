'use strict'
/* global store */

// eslint-disable-next-line no-unused-vars
const bookmark = (function () {

  function toggleAddForm() {
    console.log('toggle add form');
    let acc = document.getElementsByClassName("accordion");
    let i;
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
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
    // console.log(item);
    const rating = $(item.rating);
    const stars = '&#9733;'.repeat(rating[0]);
    const starsBlank = '&#9734;'.repeat(5-rating[0]);
    
    
    return `
      <li class="js-item-element" data-item-id="${item.title}">
      ${item.title}
        <div class="bookmark-item-controls">
          <button class="bookmark-item-toggle js-item-toggle">
            <span class="button-label">Visit Site</span>
          </button>
          <button class="bookmark-item-delete js-item-delete">
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
    let items = store.items;
  
    // render the bookmark list in the DOM
    console.log('`render` ran');
    const bookmarkListItemsString = generatebookmarkItemsString(items);
  
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
      
      // store.addItem(newItemName);

      // api.createItem(newItemName, (newItem) => {
      //   store.addItem(newItem);
      //   render();
      // })
    });
  }

  function bindEventListeners() {
    handleNewItemSubmit();
    // handleItemCheckClicked();
    // handleDeleteItemClicked();
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
}());