var svg = document.getElementById("cups");
var s = Snap(svg);

var simpleCup = Snap.select('#simple-cup');
var fancyCup = Snap.select('#fancy-cup');

var simpleCupPoints = simpleCup.node.getAttribute('d');
var fancyCupPoints = fancyCup.node.getAttribute('d');

var toFancy = function(){
  simpleCup.animate({ d: fancyCupPoints }, 1000, mina.easeinout, toSimple);  
}

var toSimple = function(){
  simpleCup.animate({ d: simpleCupPoints }, 1000, mina.easeinout, toFancy); 
}

var switcher = document.getElementById('cb2');
switcher.addEventListener('change', handleSwitch, false);

function handleSwitch(e){
    if(e.target.checked == true){
      toSimple();
    }
    else{
      simpleCup.stop()
    }
};

