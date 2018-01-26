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

  function filterRating(num = minRating) {
    console.log('in filter: ', minRating);
    
    // store.items = [];
    // bookmark.render();
    // console.log(store.items);
    
    // getItems((items) => {
    //   items.forEach( item => {
    //     store.addItem(item);
    //   })
    //   debugger;
    //   bookmark.render();
    // });

    let ratedItems = [];

    for (let property in store.items) {
      if (store.items[property].rating >= num) {
        ratedItems.push(store.items[property]);
      }
    }
    // console.log(ratedItems);
    store.items = ratedItems;
    // console.log(store.items);
    
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