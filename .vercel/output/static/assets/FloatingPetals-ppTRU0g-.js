import{h as o,j as i}from"./index-CeJExyce.js";function d({count:e=7}){const n=o.useRef(null);return o.useEffect(()=>{const t=n.current;if(t){t.innerHTML="";for(let r=0;r<e;r++){const a=document.createElement("div");a.className="petal",a.style.cssText=`
        left: ${Math.random()*48}%;
        animation-duration: ${6+Math.random()*10}s;
        animation-delay: ${Math.random()*8}s;
        --drift: ${(Math.random()-.5)*80}px;
        width: ${10+Math.random()*10}px;
        height: ${10+Math.random()*10}px;
        opacity: ${.25+Math.random()*.35};
      `,t.appendChild(a)}}},[e]),i.jsx("div",{ref:n,className:"pointer-events-none absolute inset-0 z-10","aria-hidden":"true"})}export{d as F};
