
// This function is used to make Locomotive and gsap work together
function init(){
    
gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

init();


// Loader Function
function Loader() {
  var a = 0;
  setInterval(function () {
    if (a < 100) {
      a += Math.floor(Math.random() * 10)
      document.querySelector(".loader h1").innerHTML = a + "%"
    }
    else {
      a = 100;
      document.querySelector(".loader h1").innerHTML = a + "%"
    }
  }, 70)
}

var load = gsap.timeline()

// // loader counting animation
// load.to(".loader h1" ,{
//     duration:1,
//     delay:0.5,
//     scale:1.5,
//     onStart:Loader()
// })
// // loader counting animation
// load.to(".loader" ,{
//   top: "-105%",
//   duration:1.2,
//   delay:0.5,
// })


// for page 1 animation
var tl = gsap.timeline({
    scrollTrigger:{
        trigger: ".page1 h1",
        scroller:".main",
        markers:true,
        start:"top 30%",
        end:"top 0%",
        scrub:1

    }
})

tl.to(".page1 h1" , {
    x:-70,
},"anime")

tl.to(".page1 h2" , {
    x:45,
},"anime")

tl.to(".page1 video",{
    width:"90%"
},"anime")



// to change bg color to white for page 2
var tl2 = gsap.timeline({
  scrollTrigger:{
      trigger: ".page1 h1",
      scroller:".main",
      markers:true,
      start:"top -120%",
      end:"top -30%",
      scrub:1

  }
})

tl2.to(".main" , {
  backgroundColor: "#fff"
})