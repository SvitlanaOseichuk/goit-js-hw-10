import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */import{f as m,i as h}from"./assets/vendor-651d7991.js";const e=document.querySelector("button"),f=document.querySelector("[data-days]"),y=document.querySelector("[data-hours]"),p=document.querySelector("[data-minutes]"),S=document.querySelector("[data-seconds]"),b=new Date;let a;function n(t){return t.toString().padStart(2,"0")}function D(t){const s=Math.floor(t/864e5),r=Math.floor(t%864e5/36e5),i=Math.floor(t%864e5%36e5/6e4),l=Math.floor(t%864e5%36e5%6e4/1e3);return{days:s,hours:r,minutes:i,seconds:l}}const g={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){t&&(a=t[0],a<=b?(h.show({message:"Please choose a date in the future"}),e.disabled=!0):e.disabled=!1)}};m("input#datetime-picker",g);e.addEventListener("click",()=>{console.log("відлік почався"),e.disabled=!0;const t=setInterval(()=>{const c=new Date,o=a-c;if(o<=0){clearInterval(t),e.disabled=!0,console.log("відлік закінчився");return}const{days:u,hours:d,minutes:s,seconds:r}=D(o);f.textContent=n(u),y.textContent=n(d),p.textContent=n(s),S.textContent=n(r)},1e3)});
//# sourceMappingURL=commonHelpers.js.map