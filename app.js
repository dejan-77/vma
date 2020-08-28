 /*
  ================================================================================
    SMOOTH SCROLL + SCROLLTRIGGER
  ================================================================================
  */

// --- REGISTER SCROLLTRIGGER
gsap.registerPlugin(ScrollTrigger);

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


/*
  ================================================================================
    PROJECT IMG HOVER -- version 1
  ================================================================================
*/


/* var cursor = document.querySelector('.cursor');
var overlay = document.querySelectorAll('.project-overlay');
  
function moveCircle(e) {
gsap.to(cursor, {duration:0.3,
      x: e.clientX,
      y: e.clientY,
      delay:0.03
  });
    } 
    
    
document.querySelector('.p-1').addEventListener("mouseover", function(){
document.querySelector('.cursor').style.backgroundImage = "url(https://res.cloudinary.com/du25cd0bj/image/upload/v1579694456/driveImages/drive1_fkkxso.jpg)"});
document.querySelector('.p-2').addEventListener("mouseover", function(){
document.querySelector('.cursor').style.backgroundImage = "url(https://res.cloudinary.com/du25cd0bj/image/upload/v1579694456/driveImages/drive2_gcrxje.jpg)"});
    
document.querySelector('.p-3').addEventListener("mouseover", function(){
document.querySelector('.cursor').style.backgroundImage = "url(https://res.cloudinary.com/du25cd0bj/image/upload/v1579694456/driveImages/drive3_mfhw4e.jpg)"});
document.querySelector('.p-4').addEventListener("mouseover", function(){
document.querySelector('.cursor').style.backgroundImage = "url(https://res.cloudinary.com/du25cd0bj/image/upload/v1579694456/driveImages/drive4_ztkutp.jpg)"});
      
 var flag = false;
    overlay.forEach(item => {
      item.addEventListener("mousemove", function(){
      flag = true;
      gsap.to(cursor, {duration:0.3, scale: 1, autoAlpha: 1});
      overlay.forEach(item =>{
        item.addEventListener("mousemove", moveCircle);
        })
      })
    });
    overlay.forEach(item => {
      item.addEventListener("touchmove", function(){
      flag = true;
      gsap.to(cursor, {duration:0.3, scale: 1, autoAlpha: 1});
      overlay.forEach(item =>{
        item.addEventListener("touchmove", moveCircle);
        })
      })
    });
    
    overlay.forEach(item => {item.addEventListener("mouseout", function(){
     flag = false;
     gsap.to(cursor, {duration:0.3, scale: 0.1, autoAlpha: 0});
    })
    });
    overlay.forEach(item => {item.addEventListener("touchend", function(){
     flag = false;
     gsap.to(cursor, {duration:0.3, scale: 0.1, autoAlpha: 0});
    })
	});
	 */

 /*
  ================================================================================
    FULLSCREEN NAVIGATION
  ================================================================================
  */

// PLAY WHEN ALL CONTENT LOADED // da li prebaciti gore ili ugasiti skroz
document.addEventListener ('DOMContentLoaded', ()=> {

 // --- MENU OPEN / CLOSE
	
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
		
	 // tl.fromTo(".nav-mask", {width: "0%", transformOrigin: "left center"}, {duration: 0.3, width: "100%"})
	 tl.fromTo(".nav-mask", {clipPath:"polygon(0 0, 0 0, 0 100%, 0% 100%)"}, 
	 {duration: 0.5, ease: "power1.out", clipPath:"polygon(0 0, 100% 0, 100% 100%, 0% 100%)"})
			//.to(".fs-menu--column", {yPercent:0, duration:0.4, stagger:0.05, ease: "Expo.inOut"}, "<")
			.to(".open", {autoAlpha:0}, "<")
			.to(".close", {autoAlpha:1}, "<")
			
			//.from(".main-link", {x:-40, stagger:0.1, opacity:0, duration:0.3, ease: "power1.out"}, "<0.3")
			//.from(".small-link", {x:-40, stagger:0.1, opacity:0, duration:0.3, ease: "power1.out"}, "<")
			//.from(".wg-element-wrapper", {opacity:0, duration:0.3}, "<0.5")
			
			.set(".nav-toggle", {pointerEvents: "all"}, "<")
	
	}
	// --- HIDE
	function hide() {
		let tl = gsap.timeline();
	
		gsap.set(".nav-toggle", {pointerEvents: "none"});
	
			//tl.fromTo(".fs-menu--column", {yPercent:0}, {yPercent:-100, duration:0.4, stagger:0.05, ease: "Expo.inOut"})
			
			
			//tl.to(".v-menu", { rotate: 360, duration: 0.3, stagger: 0.1, transformOrigin: "right center"})
			
			tl.fromTo(".nav-mask", {clipPath:"polygon(0 0, 100% 0, 100% 100%, 0% 100%)"}, 
			{duration: 0.5, ease: "power1.out", clipPath:"polygon(100% 0, 100% 0, 100% 100%, 100% 100%)"})
			.to(".open", {autoAlpha:1, }, "<")
			.to(".close", {autoAlpha:0}, "<")
			
			.set(" .nav-toggle", { pointerEvents: "all"});
		
	}

// --- HIDE MENU WHEN CLICK ON LINK

$(".link-nav").click(function(e){
	e.preventDefault();
	var url = $(this).attr('href');
	gsap.fromTo(".nav-mask", {clipPath:"polygon(0 0, 100% 0, 100% 100%, 0% 100%)"}, 
	{duration: 0.5, ease: "power1.out", clipPath:"polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",  
	onComplete: function(){
		window.location.href = url; }     })
 //console.log("AJMOOOOOOOOO!");
});

 /*
  ================================================================================
    HOMEPAGE INTRO NAVIGATION
  ================================================================================
  */

// SPLITTING 
Splitting();

// CUSTOM EASE CREATE
CustomEase.create("hop", "0.215, 0.610, 0.355, 1.000");


var home = gsap.timeline({defaults:{duration:1, ease: "hop"}})
home
.set(".zero", {autoAlpha:1})

.from(".nav-line-1", {scaleX:0, transformOrigin: "left center"})
.from(".nav-line-2", {scaleX:0, transformOrigin: "left center"}, "<0.1")
.from(".char", {stagger:0.02, yPercent:105}, "<0.1")
.from(".home-img-wrap", {yPercent:50}, "<0.1")
.from(".triangle-wrap", {yPercent:300}, "<0.2")

 /*
  ================================================================================
    002 INTRO INFO NAVIGATION
  ================================================================================
 */

var info = gsap.timeline({defaults:{duration:0.5, ease: "power1.inOut"}})
info
.set(".zero", {autoAlpha:1})

.from(".word", {stagger:0.02, rotate:30, y:100, opacity:0})
.fromTo(".info-img-mask", {clipPath:"polygon(0 0, 0 0, 0 100%, 0% 100%)"}, 
{ease: "power1.out", clipPath:"polygon(0 0, 100% 0, 100% 100%, 0% 100%)"})  


//gsap.from(".char", {duration:0.5, opacity:0, stagger:0.02, y:30, ease:"power1.inOut"});












 /*
  ================================================================================
    MENU HOVER BLUE LINE
  ================================================================================
  */

// Mouseenter function
function enterAnimation(link, e, index) {
	link.tl.tweenFromTo(0, "midway");
}
// Mouseleave function
function leaveAnimation(link, e) {
	link.tl.play();
}
// Animations variables
let workLinkUnderlineAnimEnter;
let workLinkUnderlineAnimLeave;

// Get all links
let workLinks = document.querySelectorAll(".link-nav");

workLinks.forEach((link, index, value) => {
	
	let underline = link.querySelector(".menu-lajna");
		link.tl = gsap.timeline({paused: true});
	
	link.tl.fromTo(underline, {width: "0%", left: "0%",}, 
	{width: "100%", duration: 0.3, ease: "power1.out",});
			
	link.tl.add("midway");
	
	link.tl.fromTo(underline, {width: "100%", left: "0%",}, 
	{width: "0%", left: "100%", duration: 0.3, ease: "power1.in", immediateRender: false});

	// Mouseenter
	link.addEventListener("mouseenter", (e) => {
		enterAnimation(link, e, index);
	});

	// Mouseleave
	link.addEventListener("mouseleave", (e) => {
		leaveAnimation(link, e);
	});
	
});










 /*
  ================================================================================
    003 PROJECTS - SWITCH LINE AND THUMBNAIL VIEW
  ================================================================================
  */

		var buttons = $(".but");
		var boxes = $(".projekti-box");
		
		gsap.set("#box2", {autoAlpha:0})
		buttons.click(function() {
				var i = $(this).index(".but");
				gsap.to(".projekti-box", {duration:0.3, autoAlpha:0});
				gsap.to(boxes[i], {duration:0.3, autoAlpha:1});
		});
		
		$("#but6").click(function() {
				gsap.to(boxes, {duration:0.3, autoAlpha:1});
		});
		
		$("#but7").click(function() {
				gsap.to(boxes, {duration:0.3, autoAlpha:0});
		});
		
// ---------- PROJECTS IMAGE CURSOR

		// var cursor = document.querySelector('.cursor');
		// var overlay = document.querySelectorAll('.project-overlay');
		
		// function moveCircle(e){
		//   gsap.to(cursor, {duration:0.3,
		//     css: {
		//       left: e.pageX,
		//       top: e.pageY
		//     },
		//     delay: 0.03
		//   });
		// }
		
		// document.querySelector('.p-1').addEventListener("mouseover", function(){
		//   document.querySelector('.cursor').style.backgroundImage = "url(https://res.cloudinary.com/du25cd0bj/image/upload/v1579694456/driveImages/drive1_fkkxso.jpg)"});
		// document.querySelector('.p-2').addEventListener("mouseover", function(){
		//   document.querySelector('.cursor').style.backgroundImage = "url(https://res.cloudinary.com/du25cd0bj/image/upload/v1579694456/driveImages/drive2_gcrxje.jpg)"});
		
		// document.querySelector('.p-3').addEventListener("mouseover", function(){
		//   document.querySelector('.cursor').style.backgroundImage = "url(https://res.cloudinary.com/du25cd0bj/image/upload/v1579694456/driveImages/drive3_mfhw4e.jpg)"});
		// document.querySelector('.p-4').addEventListener("mouseover", function(){
		//   document.querySelector('.cursor').style.backgroundImage = "url(https://res.cloudinary.com/du25cd0bj/image/upload/v1579694456/driveImages/drive4_ztkutp.jpg)"});
			
		// var flag = false;
		// overlay.forEach(item => {
		//   item.addEventListener("mousemove", function(){
		//   flag = true;
		//   gsap.to(cursor, {duration:0.3, scale: 1, autoAlpha: 1});
		//   overlay.forEach(item =>{
		//     item.addEventListener("mousemove", moveCircle);
		//     })
		//   })
		// });
		// overlay.forEach(item => {
		//   item.addEventListener("touchmove", function(){
		//   flag = true;
		//   gsap.to(cursor, {duration:0.3, scale: 1, autoAlpha: 1});
		//   overlay.forEach(item =>{
		//     item.addEventListener("touchmove", moveCircle);
		//     })
		//   })
		// });
		
		// overlay.forEach(item => {item.addEventListener("mouseout", function(){
		//  flag = false;
		//  gsap.to(cursor, {duration:0.3, scale: 0.1, autoAlpha: 0});
		// })
		// });
		// overlay.forEach(item => {item.addEventListener("touchend", function(){
		//  flag = false;
		//  gsap.to(cursor, {duration:0.3, scale: 0.1, autoAlpha: 0});
		// })
		// });
		







}); // DOM CONTENT LOADED
