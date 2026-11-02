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

(function(){
  var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll(".jp-wrap").forEach(function(wrap){
    var jp=wrap.querySelector(".jp"),sc=[].slice.call(wrap.querySelectorAll(".jps")),steps=[].slice.call(wrap.querySelectorAll(".jp-steps li"));
    var kw=jp.getAttribute("data-kw")||"",typed=wrap.querySelector(".jp-typed"),sug=wrap.querySelector(".jp-sug"),timer=wrap.querySelector(".jp-timer");
    var site=wrap.querySelector(".s-site"),tAd=wrap.querySelector(".t-ad"),tCall=wrap.querySelector(".t-call");
    var timers=[],visible=true,running=false;
    function T(fn,ms){timers.push(setTimeout(fn,ms));}
    function clear(){timers.forEach(clearTimeout);timers=[];}
    function show(i){sc.forEach(function(s,j){s.classList.toggle("on",j===i);});steps.forEach(function(s,j){s.classList.toggle("on",j===i);s.classList.toggle("done",j<i);});}
    function tap(el){if(!el)return;el.classList.remove("go");void el.offsetWidth;el.classList.add("go");}
    if(reduce){typed.textContent=kw;show(1);return;}
    function loop(){
      if(!visible){running=false;return;}running=true;clear();
      typed.textContent="";sug.classList.remove("show");site.classList.remove("scroll");timer.textContent="00:00";show(0);
      var t=500;
      for(var k=1;k<=kw.length;k++){(function(k){T(function(){typed.textContent=kw.slice(0,k);if(k===3)sug.classList.add("show");},t+k*70);})(k);}
      t+=kw.length*70+700;
      T(function(){show(1);},t); t+=1500;
      T(function(){tap(tAd);},t); t+=700;
      T(function(){show(2);},t); t+=900;
      T(function(){site.classList.add("scroll");},t); t+=1500;
      T(function(){site.classList.remove("scroll");},t); t+=700;
      T(function(){tap(tCall);},t); t+=700;
      T(function(){show(3);},t);
      for(var s=1;s<=3;s++){(function(s){T(function(){timer.textContent="00:0"+s;},t+s*550);})(s);} t+=2000;
      T(function(){show(4);},t); t+=2600;
      T(function(){show(5);},t); t+=3000;
      T(loop,t);
    }
    if("IntersectionObserver" in window){
      new IntersectionObserver(function(es){es.forEach(function(e){visible=e.isIntersecting;if(visible&&!running)loop();});},{threshold:.2}).observe(wrap);
    } else loop();
  });
})();
