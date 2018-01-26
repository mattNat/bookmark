'use strict'
/* global Item */
console.log('store.js registered');

// eslint-disable-next-line no-unused-vars
const store = (function () {
  const addItem = function(item) {
    item.condense = true;
    // console.log(this);
    
    this.items.push(item);

  //   try { Item.validateName(name); 
  //   this.items.push(Item.create(name)); 
  //   } catch(e) 
  //   { consothis.le.log(e.message); 
  // };
  };
  // const toggleAdd = function () {
  //   this.hideCheckedItems = !this.hideCheckedItems;
  // };

  // const toggleAddForm = function () {
  //   console.log('toggle add form');
  //   let acc = document.getElementsByClassName("accordion");
  //   let i;
  //   for (i = 0; i < acc.length; i++) {
  //       acc[i].addEventListener("click", function() {
  //           /* Toggle between adding and removing the "active" class,
  //           to highlight the button that controls the panel */
  //           this.classList.toggle("active");
  
  //           /* Toggle between hiding and showing the active panel */
  //           let panel = this.nextElementSibling;
  //           if (panel.style.display === "block") {
  //               panel.style.display = "none";
  //           } else {
  //               panel.style.display = "block";
  //           }
  //       });
  //   }
  // }

  return {
    items: [],
    // toggleAddForm,

    // condensed: true,
    add: false,
    // searchTerm: '',

    addItem,
    // findById,
    // findAndDelete,
    // toggleCheckedFilter,
    // setSearchTerm,
    // findAndUpdate
  };

}());