'use strict'

const api = (function () {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/matt';


  function getItems(callback) {
    $.getJSON(`${BASE_URL}/bookmarks`, callback)
  }

  function createItem(title, url, desc, rating, callback) {
    const newItem = JSON.stringify({
      title: title,
      url: url,
      desc: desc,
      rating: rating,
    });
    const setting = {
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: newItem,
      success: callback
    }

    $.ajax(setting)
  }

  function updateItem(id, updateData, callback) {
    const newItem = JSON.stringify(updateData);
    const setting = {
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'PATCH',
      dataType: 'json',
      contentType: 'application/json',
      data: newItem,
      success: callback
    }

    $.ajax(setting)
  }

  function filterRating(minRating) {
    // fetch items from server
    console.log('BEFORE: ', store.items);
    store.items = [];
    console.log('MIDDLE: ', store.items);
    getItems((items) => {
      console.log(items);
      // store.items = items;
      items.forEach( item => {
        store.addItem(item)
      })
    });
    console.log('AFTER: ', store.items);
    // location.reload();

    let ratedItems = [];

    for (let property in store.items) {
      if (store.items[property].rating >= minRating) {
        ratedItems.push(store.items[property]);
      }
    }
    console.log(ratedItems);
    store.items = ratedItems;
    bookmark.render();
  }

  return {
    BASE_URL,
    getItems,
    createItem,
    updateItem,
    filterRating
  }
}())