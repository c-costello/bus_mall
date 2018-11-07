'use strict';
//array that catches all the objects created by Products
var products = [];
var mainEl = document.getElementById('main-content');
var imgSEl = document.getElementById('imageSection1');
var ctx = document.getElementById("myChart").getContext('2d');




//function that creates new Products based on name and source
function Products(name, src){
  this.name = name;
  this.src = src;
  this.votes = 0;
  this.appearances = 0;

  var cOne = Math.floor(Math.random()*255);
  var cTwo = Math.floor(Math.random()*255);
  var cThree = Math.floor(Math.random()*255);

  this.color = `rgb(${cOne}, ${cTwo}, ${cThree}, 0.3)`;


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
    imageLeftEl.name = imgLeft.name;
    imageCenterEl.src = imgCenter.src;
    imageCenterEl.name = imgCenter.name;
    imageRightEl.src = imgRight.src;
    imageRightEl.name = imgRight.name;
    for (var i = 0; i < products.length; i++){
      if (products[i].name === imageLeftEl.name) {
        products[i].appearances++;
      }
    }
    for (var j = 0; j < products.length; j++){
      if (products[j].name === imageCenterEl.name) {
        products[j].appearances++;
      }
    }
    for (var k = 0; k < products.length; k++){
      if (products[k].name === imageRightEl.name) {
        products[k].appearances++;
      }
    }
    
    //counter box;
    tracker.clickHandler();
    tracker.addClickTracker();

    
    

    
  },
  addClickTracker: function() {
    
    
    if ( this.totalClicks < 27){
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
    if (this.totalClicks < 25){
      var imageLeftEl = document.getElementById('imgLeft');
      var imageCenterEl = document.getElementById('imgCenter');
      var imageRightEl = document.getElementById('imgRight');
      imageLeftEl.addEventListener('click', function(){
        tracker.renderImages();
        tracker.totalClicks++;
        
        
        for (var i = 0; i < products.length; i++){
          if (products[i].name === imageLeftEl.name) {
            products[i].votes++;
            console.log(products[i].src);
          }
        }
        
      });
      imageCenterEl.addEventListener('click', function(){ 
        tracker.renderImages();
        this.totalClicks++;
        this.addClickTracker();
        for (var i = 0; i < products.length; i++){
          if (products[i].name === imageCenterEl.name) { 
            products[i].votes++;                        
            console.log(products[i].src);
          }
        }

      });

      imageRightEl.addEventListener('click', function(){
        tracker.renderImages();
        this.totalClicks++;
        this.addClickTracker();
        for (var i = 0; i < products.length; i++){
          if (products[i].name === imageRightEl.name) {
            products[i].votes++;
            console.log(products[i].src);
          }
        }
      });
    }
    if (this.totalClicks === 25){
      var submitEl = document.createElement('button');
      var imageSectionEl = document.getElementById('imgSection');
      imageSectionEl.appendChild(submitEl);
      submitEl.textContent = 'Results';
      submitEl.addEventListener('click',function(){
        tracker.renderGraph();
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
  },
  renderGraph: function(){
    var names = [];
    var colors = [];
    var votes = [];
    for (var i = 0; i < products.length; i++){
      names.push(products[i].name);
      votes.push(products[i].votes);
      colors.push(products[i].color);
    }

    var chartConfig = {
      type: 'bar',
      data: {
        labels: names,
        datasets: [{
          label: '# of Votes',
          data: votes,
          backgroundColor: colors,
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







