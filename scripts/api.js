'use strict'
const api = (function () {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/matt';

  
  function getItems(callback) {
    $.getJSON(`${BASE_URL}/bookmarks`, callback)
  }

  function createItem(title, url, desc, rating, callback) {
    const newItem = JSON.stringify(
      {
        title: title,
        url: url,
        desc: desc,
        rating: rating,
      });
    const setting = {
      url:`${BASE_URL}/bookmarks`,
      method:'POST',
      dataType:'json',
      contentType:'application/json',
      data:newItem,
      success: callback
    }

    $.ajax(setting)
  }

  function updateItem(id, updateData, callback) {
    const newItem = JSON.stringify(updateData);
    const setting = {
      url:`${BASE_URL}/bookmarks/${id}`,
      method:'PATCH',
      dataType:'json',
      contentType:'application/json',
      data:newItem,
      success: callback
    }

    $.ajax(setting)
  }

  function filterRating(minRating) {
    let ratedItems = [];
  
    // console.log(store.items);
    // store.items[0].rating
    // console.log();
    
    Object.keys(store).map(x => { 
      console.log(x);
      
      var rate = x.items[0].rating; 
      if (rate >= minRating) {ratedItems.push(x);} 
    });
    return ratedItems;

    // Object.keys(store)

    // const minRated = store.map((store.items) => (rating >= minRating));
    // store.items.push(minRated);
    console.log(ratedItems);
    
    // fetch from filterrating
    // render()
    // global minRating 0 def
    //  uiser changes update
    //  pass through method
    // always pass minRating global through filter function
  }

  return {
    BASE_URL,
    getItems,
    createItem,
    updateItem,
    filterRating
  }
}())