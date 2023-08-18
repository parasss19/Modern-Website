
// This function is used to make Locomotive and gsap work together
function init() {

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
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
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

// loader counting animation
load.to(".loader h1" ,{
    duration:1,
    delay:0.5,
    scale:1.5,
    onStart:Loader()
})

// loader animation(loader move upwards)
load.to(".loader" ,{
  top: "-105%",
  duration:1.2,
  delay:0.5,
})


// Cursor JS
var crsr = document.querySelector("#cursor")
var main = document.querySelector(".main")
document.addEventListener("mousemove", function (dets) {
  crsr.style.left = dets.x + 15 + "px"                       //dets ki vajah se x axis m follow krega cursor ko            
  crsr.style.top = dets.y + 15 + "px"                        //dets ki vajah se y axis m follow krega cursor ko  
})



// Page 1 animation
var tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 h1",
    scroller: ".main",
    // markers: true,
    start: "top 30%",
    end: "top 0%",
    scrub: 3
  }
})

tl.to(".page1 h1", {
  x: -100,
}, "anim")
tl.to(".page1 h2", {
  x: 100
}, "anim")
tl.to(".page1 video", {
  width: "90%"
}, "anim")


// tl.to(".page1 h1", {
//   x: -70,
// }, "anime")

// tl.to(".page1 h2", {
//   x: 45,
// }, "anime")

// tl.to(".page1 video", {
//   width: "90%"
// }, "anime")


// Page 2
// to change bg color to white for page 2
var tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 h1",
    scroller: ".main",
    // markers:true,
    start: "top -115%",
    end: "top -120%",
    scrub: 3
  }
})
tl2.to(".main", {
  backgroundColor: "#fff",
})


// Page 4
var tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 h1",
    scroller: ".main",
    // markers: true,
    start: "top -300%",
    end: "top -310%",
    scrub: 3

  }
})

tl3.to(".main", {
  backgroundColor: "#0F0D0D"
})


// Page 5
var boxes = document.querySelectorAll(".box");

boxes.forEach(function (e){

  e.addEventListener("mouseenter", function () {
     var att = e.getAttribute("data-image")    //  now i will get data-image for each columns using getAttributes

    //Now abb cursor hover krte hi bada ho jayga (basically cursor hide hoga and image dikhegi)
     crsr.style.height = "300px"
     crsr.style.width = "300px"
     crsr.style.borderRadius = "0"
     crsr.style.backgroundImage = `url(${att})`
  })

  // now jab mouseleave krenge so that cursor vapas se round chota sa ho jaye and cursor ki jagah jo img show hori thi vo abb hide ho jaye
  e.addEventListener("mouseleave", function () {
    crsr.style.height = "20px"
    crsr.style.width = "20px"
    crsr.style.borderRadius = "50%"
    crsr.style.backgroundImage = "none"
  })
})

