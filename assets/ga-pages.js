(function(){
  var pairs=[["svcBtn","svcDrop"],["indBtn","indDrop"]];
  function closeAll(){pairs.forEach(function(p){var d=document.getElementById(p[1]),b=document.getElementById(p[0]);if(d)d.hidden=true;if(b)b.setAttribute("aria-expanded","false");});}
  pairs.forEach(function(p){
    var b=document.getElementById(p[0]),d=document.getElementById(p[1]);if(!b||!d)return;
    b.addEventListener("click",function(e){e.stopPropagation();var open=d.hidden;closeAll();d.hidden=!open;b.setAttribute("aria-expanded",String(open));});
  });
  document.addEventListener("click",function(e){if(!e.target.closest(".has-drop"))closeAll();});
  document.addEventListener("keydown",function(e){if(e.key==="Escape")closeAll();});
  var burger=document.getElementById("burger"),mob=document.getElementById("mobileNav");
  if(burger&&mob)burger.addEventListener("click",function(){mob.hidden=!mob.hidden;burger.setAttribute("aria-expanded",String(!mob.hidden));});
})();
(function(){
  var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
  function typeSerp(el){
    var t=el.getAttribute("data-type")||"",out=el.querySelector(".typed"),i=0;
    if(reduce||!out){if(out)out.textContent=t;el.classList.add("done");return;}
    (function step(){out.textContent=t.slice(0,i++);if(i<=t.length)setTimeout(step,55);else setTimeout(function(){el.classList.add("done")},250);})();
  }
  var els=[].slice.call(document.querySelectorAll(".rv,.serp,.dash"));
  if(!("IntersectionObserver" in window)||reduce){els.forEach(function(e){e.classList.add("in");if(e.classList.contains("serp"))typeSerp(e);});return;}
  var io=new IntersectionObserver(function(entries){entries.forEach(function(en){if(!en.isIntersecting)return;var e=en.target;e.classList.add("in");if(e.classList.contains("serp")&&!e._t){e._t=1;typeSerp(e);}io.unobserve(e);});},{threshold:.15,rootMargin:"0px 0px -40px 0px"});
  els.forEach(function(e){io.observe(e);});
})();
