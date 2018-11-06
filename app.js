'use strict';
//array that catches all the objects created by Products
var products = [];
var mainEl = document.getElementById('main-content');



//function that creates new Products based on name and source
function Products(name, src){
  this.name = name;
  this.src = src;
  this.votes = 0;
  this.appearances = 0;

  products.push(this);
}

var tracker = {
  totalClicks: -1,
  // mainEl: document.getElementById('main-content'),

  getRandomIndex: function(range) {
    var randomNumber = Math.floor(Math.random()*(range));
    return(randomNumber);
  },
  getUniqueImages: function(range){
    var imgNum = this.getRandomIndex(range);
    var imageSpace = products[imgNum];
    return(imageSpace);
  },
  renderImages: function(){
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
    var imgLeft = this.getUniqueImages(products.length);
    var imgCenter = this.getUniqueImages(products.length);
    while (imgCenter === imgLeft){
      if (imgCenter === imgLeft){
        imgCenter = this.getUniqueImages(products.length);


      }
    }
    var imgRight = this.getUniqueImages(products.length);
    while (imgCenter === imgRight || imgLeft === imgRight){
      while (imgCenter === imgRight){
        if (imgCenter === imgRight){
          imgRight = this.getUniqueImages(products.length);

        }
      }
      while (imgRight === imgLeft){
        if (imgRight === imgLeft){
          imgRight = this.getUniqueImages(products.length);

        }
      }
    }


    imageLeftEl.src = imgLeft.src;
    imageCenterEl.src = imgCenter.src;
    imageRightEl.src = imgRight.src;
    for (var i = 0; i < products.length; i++){
      if (products[i].src === imageLeftEl.src) {
        products[i].appearances++;
      }
    }
    for (var j = 0; j < products.length; j++){
      if (products[j].src === imageCenterEl.src) {
        products[j].appearances++;
      }
    }
    for (var k = 0; k < products.length; k++){
      if (products[k].src === imageRightEl.src) {
        products[k].appearances++;
      }
    }
    
    //counter box;
    tracker.clickHandler();

    
    

    
  },
  addClickTracker: function() {
    this.totalClicks++;
    
    if ( this.totalClicks < 26){
      var clickCounter = `Total Clicks: ${this.totalClicks}/25`;
      var clickCounterEl = document.createElement('p');
      var imageSectionEl = document.getElementById('imgSection');
      imageSectionEl.appendChild(clickCounterEl);
      clickCounterEl.textContent = clickCounter;
    }
    
    console.log(this.totalClicks);
    return(this.totalClicks);
  },
  clickHandler: function() {
    // var imageSectionEl = document.getElementById('imgSection');
    if (this.totalClicks < 24){
      var imageLeftEl = document.getElementById('imgLeft');
      var imageCenterEl = document.getElementById('imgCenter');
      var imageRightEl = document.getElementById('imgRight');
      imageLeftEl.addEventListener('click', function(){
        tracker.renderImages();
        console.log('img', imageLeftEl.src);
        console.log('products', products[0].src);
        tracker.addClickTracker();
        for (var i = 0; i < products.length; i++){
          if (products[i].src === imageLeftEl.src) {
            products[i].votes++;
            console.log(products[i].src);
          }
        }
        
      });
      imageCenterEl.addEventListener('click', function(){
        tracker.renderImages();
        tracker.addClickTracker();
        for (var i = 0; i < products.length; i++){
          if (products[i].src === imageCenterEl.src) {
            products[i].votes++;
            console.log(products[i].src);
          }
        }

      });

      imageRightEl.addEventListener('click', function(){
        tracker.renderImages();
        tracker.addClickTracker();
        for (var i = 0; i < products.length; i++){
          if (products[i].src === imageRightEl.src) {
            products[i].votes++;
            console.log(products[i].src);
          }
        }
      });
    }
    if (this.totalClicks === 24){
      var submitEl = document.createElement('button');
      var imageSectionEl = document.getElementById('imgSection');
      imageSectionEl.appendChild(submitEl);
      submitEl.textContent = 'Results';
      submitEl.addEventListener('click',function(){
        tracker.renderData();
      });
    }

    
  },
  renderData: function() {
    var listEl = document.createElement('ul');
    mainEl.appendChild(listEl);
    for (var i = 0; i < products.length; i++){
      var liEl = document.createElement('li');
      listEl.appendChild(liEl);
      liEl.textContent = `${products[i].name} vote(s): ${products[i].votes}/${products[i].appearances}`;
    }
    // var resetButtonEl = document.createElement('button');
    // listEl.appendChild(resetButtonEl);
    // resetButtonEl.textContent = 'Reset';
    // resetButtonEl.value = 'refresh page';
    // resetButtonEl.addEventListener('onclock', function(){
    //   window.location.reload();
    // });
  }
};


new Products('bag', 'file:///C:/Users/clari/codefellows/201/projects/bus_mall/assets/bag.jpg');
new Products('banana', 'file:///C:/Users/clari/codefellows/201/projects/bus_mall/assets/banana.jpg');
new Products('bathroom', 'file:///C:/Users/clari/codefellows/201/projects/bus_mall/assets/bathroom.jpg');
new Products('boots', 'file:///C:/Users/clari/codefellows/201/projects/bus_mall/assets/boots.jpg');
new Products('breakfast', 'file:///C:/Users/clari/codefellows/201/projects/bus_mall/assets/breakfast.jpg');
new Products('bubblegum', 'file:///C:/Users/clari/codefellows/201/projects/bus_mall/assets/bubblegum.jpg');
new Products('chair', 'file:///C:/Users/clari/codefellows/201/projects/bus_mall/assets/chair.jpg');
new Products('cthulhu', 'file:///C:/Users/clari/codefellows/201/projects/bus_mall/assets/cthulhu.jpg');
new Products('dog-duck', 'file:///C:/Users/clari/codefellows/201/projects/bus_mall/assets/dog-duck.jpg');
new Products ('dragon', 'file:///C:/Users/clari/codefellows/201/projects/bus_mall/assets/dragon.jpg');
new Products ('pen', 'file:///C:/Users/clari/codefellows/201/projects/bus_mall/assets/pen.jpg');
new Products ('pet-sweep', 'file:///C:/Users/clari/codefellows/201/projects/bus_mall/assets/pet-sweep.jpg');
new Products ('scissors', 'file:///C:/Users/clari/codefellows/201/projects/bus_mall/assets/scissors.jpg');
new Products ('shark', 'file:///C:/Users/clari/codefellows/201/projects/bus_mall/assets/shark.jpg');
new Products ('sweep', 'file:///C:/Users/clari/codefellows/201/projects/bus_mall/assets/sweep.jpg');
new Products ('tauntaun', 'file:///C:/Users/clari/codefellows/201/projects/bus_mall/assets/tauntaun.jpg');
new Products ('unicorn', 'file:///C:/Users/clari/codefellows/201/projects/bus_mall/assets/unicorn.jpg');
new Products ('usb', 'file:///C:/Users/clari/codefellows/201/projects/bus_mall/assets/usb.jpg');
new Products ('water-can', 'file:///C:/Users/clari/codefellows/201/projects/bus_mall/assets/water-can.jpg');
new Products ('wine-glass', 'file:///C:/Users/clari/codefellows/201/projects/bus_mall/assets/wine-glass.jpg');



(function createProducts(){
  tracker.renderImages();
  tracker.clickHandler();


})();
