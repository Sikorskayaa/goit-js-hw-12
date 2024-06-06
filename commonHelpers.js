import{a as b,i as m,S}from"./assets/vendor-6e0bf343.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function u(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=u(e);fetch(e.href,s)}})();const y=r=>r.map(({webformatURL:t,largeImageURL:u,tags:a,likes:e,views:s,comments:o,downloads:L})=>`<li class="list-item">
                    <a class="gallery-link" href="${u}">
                      <img class="list-img" src="${t}" alt="${a}" />
                    </a>
                    <ul>
                      <li>
                        <h3>Likes</h3>
                        <p>${e}</p>
                      </li>
                      <li>
                        <h3>Views</h3>
                        <p>${s}</p>
                      </li>
                      <li>
                        <h3>Comments</h3>
                        <p>${o}</p>
                      </li>
                      <li>
                        <h3>Downloads</h3>
                        <p>${L}</p>
                      </li>
                    </ul>
                  </li>`).join(""),g=(r,t)=>b.get("https://pixabay.com/api/",{params:{key:"43859237-c6386bdcccc66f068a9509366",q:r,orientation:"horizontal",safesearch:!0,page:t,per_page:"15"}}),d=document.querySelector(".js-search-form"),l=document.querySelector(".js-search-list"),h=document.querySelector(".js-loader"),f=document.querySelector(".js-loader-more"),i=document.querySelector(".js-search-more");let n=1,p=1,c="";d.addEventListener("submit",async r=>{if(r.preventDefault(),c=d.elements.forSearsh.value.trim(),!!c){i.classList.contains("is-active")&&i.classList.remove("is-active"),l.innerHTML="",h.classList.add("is-active"),n=1;try{const{data:t}=await g(c,n);if(!t.totalHits){h.classList.remove("is-active"),m.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}),d.reset();return}l.innerHTML=y(t.hits),h.classList.remove("is-active"),i.classList.add("is-active"),t.totalHits<15&&(i.classList.remove("is-active"),m.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})),v.refresh()}catch(t){console.log(t)}}});i.addEventListener("click",async()=>{f.classList.add("is-active-more"),i.classList.remove("is-active");try{const{data:r}=await g(c,++n);l.insertAdjacentHTML("beforeend",y(r.hits)),f.classList.remove("is-active-more"),i.classList.add("is-active"),v.refresh(),window.scrollBy({top:l.firstChild.getBoundingClientRect().height*2,behavior:"smooth"}),p=Math.ceil(r.totalHits/15),p===n&&(i.classList.remove("is-active"),m.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."}))}catch(r){console.log(r)}});const v=new S(".gallery-link",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=commonHelpers.js.map
