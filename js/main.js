// Future Past Present Prototype
// Video Switching Method  by Ivaylo Getov
//Hacked for this Prototype by Mandy Mandelstein
// (c) 2016 Luxloop
var frametwo = false;
var framethree = false;
var framefour = false;
var framefive = false;
var mostRecent = "";
var top1 = 1215;
var top2 = 900;
var top3 = 475;
var top4 = 9999999;
var hasLoaded = false;
var timeOut;
// var numvideo=4; //number of videos in the video file
// var vidheight=400;
// var vidwidth=720;
// var vidfileheight=((videoheight+5)*numvideo)


$(document).ready(function() {
  //console.log("ready");
  // timeout = setTimeout(setReadyToPlay, 10000);
  $("#theVideo").on('canplaythrough', canPlayThrough);
  $("#theVideo").attr('src','http://s455689574.onlinehome.us/FPN/vid/fp.mp4');

  var whereAmI = window.location.href;

  resizeContainer()
  animate()

});


$(document).keydown(function(e) {
    // console.log(e.keyCode);
    switch (e.keyCode) {
        case 51:
            e.preventDefault();
            //$("#vidWindow video").addClass("shift");
            frametwo = true;
            mostRecent = "1";
            break;
        case 54:
            //e.preventDefault();
            //$("#vidWindow video").addClass("shift2");
            framethree = true;
            mostRecent = "2";
            break;
        default:
            break;
        case 57:
            e.preventDefault();
            //$("#vidWindow video").addClass("shift");
            framefour = true;
            mostRecent = "3";
            break;
        case 49: case 50: case 52: case 53: case 55: case 56: case 58:
          e.preventDefault();
          framefive = true;
          mostRecent = "4";

    }
});

$("#imgCover").click(function(e) {
    e.preventDefault();
    if (hasLoaded) {
      $(this).addClass("hidden");
      //$(this).fadeOut(2000);
      var vid = document.getElementById("theVideo");
      vid.play();
    }
});

$(document).keyup(function(e) {
    mostRecent = "";
    // console.log(e.keyCode);
    switch (e.keyCode) {
      case 51:
        e.preventDefault();
        //$("#vidWindow video").removeClass("shift");
        frametwo = false;
        break;
      case 54:
        e.preventDefault();
        //$("#vidWindow video").removeClass("shift2");
        framethree = false;
        break;
      case 57:
        e.preventDefault();
        //$("#vidWindow video").removeClass("shift2");
        framefour = false;
        break;
      case 49: case 50: case 52: case 53: case 55: case 56: case 58:
        e.preventDefault();
        framefive = false;
      case 37: case 40:
        e.preventDefault();
        break;
      default:
        break;
    }
});

$("#vidWindow video").click(function(e) {
    e.preventDefault();
    var vid = document.getElementById("theVideo");
    if(vid.paused){
        vid.play();
    } else {
        vid.pause();
    }
});

var theVid = document.getElementById("theVideo");
theVid.onended = function() {
    //alert("The video has ended");
    $("#imgCover").removeClass("hidden");
    //$("#imgCover").fadeIn(2000);
};

function animate() {
  if (mostRecent !== "") {
    if (mostRecent == "1") {
      $("#vidWindow").scrollTop(top1);
    } else if (mostRecent == "2") {
      $("#vidWindow").scrollTop(top2);
    } else if (mostRecent == "3") {
      $("#vidWindow").scrollTop(top3);
    } else if (mostRecent == "4") {
      $("#vidWindow").scrollTop(top4);
    }
  } else if (frametwo) {
    $("#vidWindow").scrollTop(top1);
  } else if (framethree) {
    $("#vidWindow").scrollTop(top2);
  } else if (framefour) {
    $("#vidWindow").scrollTop(top3);
  }else if (framefive) {
    $("#vidWindow").scrollTop(top4);
  } else {
    $("#vidWindow").scrollTop(1);
  }
  requestAnimationFrame(animate);
}

//Throttled on-resize handler
on_resize(function() {
    resizeContainer()
});

function canPlayThrough() {
  console.log("video can play")
  clearTimeout(timeOut)
  setReadyToPlay()
}

function setReadyToPlay() {
  $("#imgCover").removeClass('loading')
  $("#imgCover").addClass('loaded')
  hasLoaded = true;
}

function resizeContainer() {
  //scale is width/height for single video frame
  var scale = 0.5632;
  //scale3up is the width to height for entire video file
  var scale3up = 2.8167
  var winWidth = window.innerWidth;
  var width;

    if (winWidth > 1700) {
        width = winWidth * 1;
      } else if (winWidth > 1400) {
        width = winWidth * 1;
      } else if (winWidth > 600) {
        width = winWidth * 1;
      } else {
        width = winWidth * 0.9;
      }

    if (width !== undefined) {
      $("body #vidWindow").css({"width":width,"height":width*scale})
      $("body #theVideo").css({"width":width,"height":width*scale3up})
      //you must add an additional one of these for every video you add
      top3 = width *(scale*3);
      top1 = width * scale;
      top2 = width * (scale*2);
      top4 = width * (scale*4);
    }
}


// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// debulked onresize handler
function on_resize(c,t){onresize=function(){clearTimeout(t);t=setTimeout(c,250)};return c};

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// MIT license
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] ||
                                      window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

