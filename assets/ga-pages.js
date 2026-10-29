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
