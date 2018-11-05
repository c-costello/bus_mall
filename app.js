'use strict';
//array that catches all the objects created by Products
products = [];


//function that creates new Products based on name and source
function Products(name, src){
  this.name = name;
  this.src = src;
  this.votes = 0;
}

var tracker = {
  totalClicks: 0,
  mainEl: document.getElementById('main-content'),
  
  getRandomIndex: function() {
    var randomNumber = Math.round(Math.random()*(products.length));
    return(randomNumber);
  },
  getUniqueImages: function(){
    var imageLeft = this.getRandomIndex();
    var imageCenter = this.getRandomIndex();
    var imageRight = this.getRandomIndex();
    while (imageLeft === imageCenter); {
      if (imageLeft === imageCenter){
        imageCenter = this.getRandomIndex();
      }
    }
    while (imageLeft === imageRight); {
      if (imageLeft === imageRight){
        imageRight = this.getRandomIndex();
      }
    }
    while (imageCenter === imageRight); {
      if (imageCenter === imageRight){
        imageRight = this.getRandomIndex();
      }
    }
    return([imageLeft, imageCenter, imageRight]);
  },
  renderImages: function(){
    //create elements
    var imageSectionEl = document.createElement('section');
    var imageLeftEl = document.createElement('img');
    var imageCenterEl = document.createElement('img');
    var imageRightEl = document.createElement('img');

    //append images
    imageSectionEl.appendChild(imageLeftEl);
    imageSectionEl.appendChild(imageCenterEl);
    imageSectionEl.appendChild(imageRightEl);

    //append section
    this.mainEl.appendChild(imageSectionEl);

    //create ids
    imageSectionEl.id = 'imgSection';
    imageLeftEl.id = 'imgLeft';
    imageCenterEl.id = 'imgCenter';
    imageRightEl.id = 'imgRight';
    



    

  },
  addClickTracker: function() {

  },
  clickHandler: function(event) {

  },
};

(function createProducts(){

})();