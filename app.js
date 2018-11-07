'use strict';
//array that catches all the objects created by Products
var products = [];
var mainEl = document.getElementById('main-content');
var imgSEl = document.getElementById('imageSection1');




//function that creates new Products based on name and source
function Products(name, src,){
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
    imgSEl.appendChild(imageSectionEl);

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

        tracker.addClickTracker();
        for (var i = 0; i < products.length; i++){
          if (products[i].src === imageLeftEl.src) {
            products[i].votes++;
            console.log(products[i].src);
          }
        }
        
      });
      imageCenterEl.addEventListener('click', function(){ //name your functions
        tracker.renderImages();
        tracker.addClickTracker();
        for (var i = 0; i < products.length; i++){
          if (products[i].src === imageCenterEl.src) { //create id for images to make this better
            products[i].votes++;                        // match id and name rather than src and src 
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
    
    var names = [];
    for (var i = 0; i < products.length; i++) {
      names.push(products[i].name);
    }

    var votes = [];
    for (var j = 0; j < products.length; j++) {
      votes.push(products[j].votes);
    }
    var colors = [];
    for (var k = 0; k < products.length; k++) {
      colors.push(products[k].color);
    }
    var chartConfig = {
      type: 'bar',
      data: {
        labels: names,
        datasets: [{
          label: '# of Votes',
          data: votes,
          backgroundColor: colors,
          // borderColor: [
          //   'rgba(255,99,132,1)',
          //   'rgba(54, 162, 235, 1)',
          //   'rgba(255, 206, 86, 1)',
          //   'rgba(75, 192, 192, 1)',
          //   'rgba(153, 102, 255, 1)',
          //   'rgba(255, 159, 64, 1)'
          // ],
          // borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    };
    
    
    var myChart = new Chart(ctx, chartConfig);
  },
  // var resetButtonEl = document.createElement('button');
  // mainEl.appendChild(resetButtonEl);
  // resetButtonEl.textContent = 'Reset';
  // resetButtonEl.value = 'refresh page';
  // resetButtonEl.addEventListener('onclock', function(){
  //   window.location.reload();
  // });
  // }
};


new Products('bag', './assets/bag.jpg');
new Products('banana', './assets/banana.jpg');
new Products('bathroom', './assets/bathroom.jpg');
new Products('boots', './assets/boots.jpg');
new Products('breakfast', './assets/breakfast.jpg');
new Products('bubblegum', './assets/bubblegum.jpg');
new Products('chair', './assets/chair.jpg');
new Products('cthulhu', './assets/cthulhu.jpg');
new Products('dog-duck', './assets/dog-duck.jpg');
new Products ('dragon', './assets/dragon.jpg');
new Products ('pen', './assets/pen.jpg');
new Products ('pet-sweep', './assets/pet-sweep.jpg');
new Products ('scissors', './assets/scissors.jpg');
new Products ('shark', './assets/shark.jpg');
new Products ('sweep', './assets/sweep.jpg');
new Products ('tauntaun', './assets/tauntaun.jpg');
new Products ('unicorn', './assets/unicorn.jpg');
new Products ('usb', './assets/usb.jpg');
new Products ('water-can', './assets/water-can.jpg');
new Products ('wine-glass', './assets/wine-glass.jpg');



(function createProducts(){
  tracker.renderImages();
  tracker.clickHandler();
})();


//Chart







