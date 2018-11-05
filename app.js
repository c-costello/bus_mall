'use strict';
//array that catches all the objects created by Products
var products = [];
var mainEl = document.getElementById('main-content');


//function that creates new Products based on name and source
function Products(name, src){
  this.name = name;
  this.src = src;
  this.votes = 0;

  products.push(this);
}

var tracker = {
  totalClicks: 0,
  // mainEl: document.getElementById('main-content'),

  getRandomIndex: function(range) {
    var randomNumber = Math.floor(Math.random()*(range));
    return(randomNumber);
  },
  getUniqueImages: function(range){
    var imgLeftNum = this.getRandomIndex(range);
    var imgCenterNum = this.getRandomIndex(range);
    var imgRightNum = this.getRandomIndex(range);
    console.log(imgLeftNum,imgCenterNum,imgLeftNum);
    // remove duplicates
    
    
    //
    var imageLeft = products[imgLeftNum];
    console.log('imageLeft', imageLeft);
    var imageCenter = products[imgCenterNum];
    var imageRight = products[imgRightNum];
    return([imageLeft, imageCenter, imageRight]);
  },
  renderImages: function(){
    this.getUniqueImages();

    var imgSectionElCheck = document.getElementById('imgSection');
    if (imgSectionElCheck) {
      imgSectionElCheck.remove();
    }
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
    mainEl.appendChild(imageSectionEl);

    //create ids
    imageSectionEl.id = 'imgSection';
    imageLeftEl.id = 'imgLeft';
    imageCenterEl.id = 'imgCenter';
    imageRightEl.id = 'imgRight';

    //create content;
    imageLeftEl.src = this.getUniqueImages(products.length)[0].src;
    imageCenterEl.src = this.getUniqueImages(products.length)[1].src;
    imageRightEl.src = this.getUniqueImages(products.length)[2].src;
  },
  addClickTracker: function() {

  },
  clickHandler: function(event) {

    var imageSectionEl = document.getElementById('imgSection');
    var imageLeftEl = document.getElementById('imgLeft');
    var imageCenterEl = document.getElementById('imgCenter');
    var imageRightEl = document.getElementById('imgRight');
    imageLeftEl.addEventListener('click', function(event){
      tracker.renderImages();

    });
    imageCenterEl.addEventListener('click', function(event){
      tracker.renderImages();
    });
    imageRightEl.addEventListener('click', function(event){
      tracker.renderImages();
    });

  },


};


new Products('bag', './assets/bag.jpg');
new Products('banana', './assets/banana.jpg');
new Products('bathroom', './assets/bathroom.jpg');
new Products('boots', './assets/boots.jpg');
new Products('breakfast', './assets/breakfast.jpg');
new Products('bugglegum', './assets/bubblegum.jpg');

(function createProducts(){
  tracker.renderImages();
  tracker.clickHandler();



})();
tracker;