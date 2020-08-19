// SMOOTH SCROLL

// --- REGISTER SCROLLTRIGGER
gsap.registerPlugin(ScrollTrigger);

// --- SMOOTH SCROLL -----------------------------------------

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".smooth-scroll"),
  smooth: true,
  getDirection: true,
  //smoothMobile: true,
  //lerp: .05
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".smooth-scroll", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, 
  // we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  // UKLJUČITI SAMO NA MOBILNOJ VERZIJI
  // pinType: document.querySelector(".smooth-scroll").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


/* FULLSCREEN NAVIGATION */

// PLAY WHEN ALL CONTENT LOADED
document.addEventListener ('DOMContentLoaded', ()=> {

 
  
  const { gsap } = window;
  
  const btn = document.querySelector(".nav-toggle");
  
  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
      hide();
    } else {
      btn.classList.add("active");
      show();
    }
  });
  // --- SHOW
  function show() {
    let tl = gsap.timeline();
  
  gsap.set(".nav-toggle", {pointerEvents: "none"});
    //gsap.set(".fs-menu--column", {yPercent:-100})
    gsap.set(".close", {autoAlpha:0})
    
    tl.fromTo(".nav-mask", {width: "0%", transformOrigin: "left center"}, {duration: 0.3, width: "100%"})
      //.to(".fs-menu--column", {yPercent:0, duration:0.4, stagger:0.05, ease: "Expo.inOut"}, "<")
      .to(".open", {autoAlpha:0}, "<")
      .to(".close", {autoAlpha:1}, "<")
      
      //.from(".main-link", {x:-40, stagger:0.1, opacity:0, duration:0.3, ease: "power1.out"}, "<0.3")
      //.from(".small-link", {x:-40, stagger:0.1, opacity:0, duration:0.3, ease: "power1.out"}, "<")
      //.from(".wg-element-wrapper", {opacity:0, duration:0.3}, "<0.5")
      
      .set(".nav-toggle", {pointerEvents: "all"}, "<")
  
  }
  // --- SHOW
  function hide() {
    let tl = gsap.timeline();
  
    gsap.set(".nav-toggle", {pointerEvents: "none"});
  
      //tl.fromTo(".fs-menu--column", {yPercent:0}, {yPercent:-100, duration:0.4, stagger:0.05, ease: "Expo.inOut"})
      
      
      tl.to(".v-menu", { rotate: 360, duration: 0.3, stagger: 0.1, transformOrigin: "right center"})
      
      .to(".nav-mask", { duration: 0.3, transformOrigin: "right center", width: "0%"})
      .to(".open", {autoAlpha:1}, "<")
      .to(".close", {autoAlpha:0}, "<")
      
      .set(" .nav-toggle", { pointerEvents: "all"});
    
  }
});
