/* global bookmark, store, api, minRating */
// let minRating = 0;

$(document).ready(function () {
  bookmark.bindEventListeners();
  // bookmark.render();

  //====== getting data from server
  api.getItems((items) => {
    items.forEach(item => {
      store.addItem(item)
    })

    // //========= update date in local file ======
    // const item = store.items[0];
    // console.log('current name: ' + item.name);
    // store.findAndUpdate(item.id, { name: 'foobar' });
    // console.log('new name:' + item.name);

    api.filterRating();
    bookmark.render()
  });

  // api.filterRating();
  // bookmark.render()
  // store.items == server.items
  //=================================


});