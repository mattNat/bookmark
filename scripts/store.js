'use strict'
/* global Item */
console.log('store.js registered');

// eslint-disable-next-line no-unused-vars
let store = (function () {
  const addItem = function(item) {
    item.condense = true;
    item.add = false;
    // console.log(this);
    
    this.items.push(item);

  //   try { Item.validateName(name); 
  //   this.items.push(Item.create(name)); 
  //   } catch(e) 
  //   { consothis.le.log(e.message); 
  // };
  };
  
  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };

  const findById = function(id) {
    return this.items.find(item => item.id === id);
  };

  const findAndUpdate = function (id, newData) {
    const foundItem = this.findById(id)
    Object.assign(foundItem, newData)
  }

  return {
    items: [],
    // toggleAddForm,

    // condensed: true,
    add: false,
    // searchTerm: '',

    addItem,
    findById,
    findAndDelete,
    // toggleCheckedFilter,
    // setSearchTerm,
    findAndUpdate
  };

}());