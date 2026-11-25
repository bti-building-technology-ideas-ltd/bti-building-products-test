/* bti Building Products — homepage.
   Content data and animation settings are intentionally separate from the markup.
   All product images are from the current official bti site. */
(() => {
'use strict';
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
const site = 'https://btibuildingproducts.com';
const uploads = site + '/wp-content/uploads/';
const images = {
  facade: uploads + '2026/04/btibuildingproducts.com-repurposing-concrete-hollow-blocks-in-modern-architecture-full-frame-shot-plants.webp',
  paving: uploads + '2026/06/btibuildingproducts.com-unipavers-vs-pavement-tiles-the-key-to-sustainable-living-secondary-image-split-view.webp',
  bench: uploads + '2026/04/btibuildingproducts.com-repurposing-concrete-hollow-blocks-in-modern-architecture-stone-bench-garbage-can-paving-stone-path-quiet-city-park-sunny-summer-day-against-background-trees.webp',
  hollow: uploads + '2021/11/BP-product-slider-Holo.jpg',
  solid: uploads + '2021/11/Concrete-solid-brick-1024x682.jpg',
  unipaver: uploads + '2021/03/67-1024x853.jpg',
  tile: uploads + '2021/03/78-1024x853.jpg',
  flick: uploads + '2026/11/btibuildingproducts.com-flick-0c879d8a-9aee-4d61-ae6d-f32093f13ce1-1600x800.webp',
  landscape: './landscape-possibilities.webp',
  wall: uploads + 'photo-gallery/20210316_082817.jpg?bwg=1643714531',
  interior: uploads + 'photo-gallery/20191231_082720.jpg?bwg=1616570078',
};
const products = [
  {name:'Concrete Hollow Block', type:'Masonry', group:'masonry', image:'./concrete-hollow-block.webp', detail:'Machine-made hollow blocks in a range of dimensions, designed for efficient masonry construction.'},
  {name:'Concrete Solid Brick', type:'Masonry', group:'masonry', image:'./02-concrete-solid-brick.webp', detail:'Solid concrete bricks with uniform dimensions and a consistent finish for modern building work.'},
  {name:'Unipavers', type:'Outdoor flooring', group:'paving', image:'./03-unipavers.webp', detail:'Interlocking concrete pavers in multiple colours and thicknesses for driveways, pathways and landscapes.'},
  {name:'Pavement Tiles', type:'Surface solutions', group:'paving', image:'./04-pavement-tiles.webp', detail:'Explore colour and pattern options for walkways, terraces and outdoor flooring.'},
  {name:'Flick', type:'Electrical solutions', group:'electrical', image:'./05-flick.webp', detail:'Modern switches and sockets with minimal forms, thoughtful detailing and everyday functionality.'},
];
const slides = [
  {image:'./hero-masonry.webp', alt:'Architectural concrete masonry', title:'Concrete masonry for contemporary construction.', link:'Explore masonry', caption:'MASONRY / DESIGN INSPIRATION'},
  {image:'./hero-paving.webp', alt:'Outdoor interlocking paving', title:'Shape the outdoors with versatile paving solutions.', link:'Explore unipavers', caption:'PAVING / DESIGN INSPIRATION'},
  {image:'./hero-surfaces.webp', alt:'Outdoor surface finishes', title:'Thoughtful finishes for everyday outdoor spaces.', link:'Explore pavement tiles', caption:'SURFACES / DESIGN INSPIRATION'},
  {image:'./hero-electrical.webp', alt:'Electrical switches and finishes', title:'Purposeful electrical details for modern interiors.', link:'Discover Flick', caption:'FLICK / ELECTRICAL SOLUTIONS'},
];
const gallery = [
  {name:'Architectural screens', type:'architecture', image:images.facade, credit:'Design inspiration · bti blog'},
  {name:'Outdoor surfaces', type:'outdoor', image:images.paving, credit:'Design inspiration · bti blog'},
  {name:'Landscape possibilities', type:'outdoor', image:images.landscape, credit:'bti photo gallery'},
  {name:'Exposed masonry', type:'architecture', image:images.wall, credit:'bti photo gallery'},
  {name:'Interior feature walls', type:'interior', image:images.interior, credit:'bti photo gallery'},
];
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hoverMedia = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 761px)');
const gs = window.gsap, st = window.ScrollTrigger;
const motion = !!(gs && !reduced);
const nativeMotion = !reduced;
const canTrigger = !!(st && gs && !reduced);
if(gs && st) {gs.registerPlugin(st); if(window.SplitText) gs.registerPlugin(window.SplitText);}
let lenis = null;
if(canTrigger && window.Lenis){
  lenis = new window.Lenis({duration:1.22, smoothWheel:true, anchors:false, syncTouch:false, prevent:node=>!!node.closest('dialog,.mega')});
  lenis.on('scroll', st.update);
  gs.ticker.add(t=>lenis.raf(t*1000));
  gs.ticker.lagSmoothing(0);
}
function toAnchor(id){const target=$(id);if(!target)return;if(lenis){lenis.scrollTo(target,{offset:id==='#home'?0:-80});}else target.scrollIntoView({behavior:reduced?'instant':'smooth'});}
const pad = n=>String(n).padStart(2,'0');
const picture = (url,alt)=>`<div class="image-frame"><img src="${url}" alt="${alt}" loading="lazy" decoding="async"></div>`;
// Use the poster of the actual video embedded on the current bti homepage.
const posterSources=['https://i.ytimg.com/vi/Fp3XaD7TlMY/maxresdefault.jpg','https://i.ytimg.com/vi/Fp3XaD7TlMY/hqdefault.jpg',uploads+'2021/03/1-min-1024x701.jpg'];
function advancePoster(img){const i=Number(img.dataset.posterIndex||0);if(i>=posterSources.length-1)return false;img.dataset.posterIndex=String(i+1);img.src=posterSources[i+1];if(i+1===2)img.alt='bti Building Products factory in Dhamrai';return true;}
document.addEventListener('load',e=>{const img=e.target;if(img.id==='factory-poster'&&Number(img.dataset.posterIndex||0)===0&&img.naturalWidth<600)advancePoster(img);},true);
const imgError = img => {if(img.id==='factory-poster' && advancePoster(img))return;if(img.dataset.failed)return;if(img.classList.contains('brand-logo')){img.hidden=true;img.nextElementSibling.hidden=false;return;}img.dataset.failed='1';img.style.visibility='hidden';const host=img.closest('.image-frame,.hero-layer,.factory-media,.newsletter-media');if(host){host.classList.add('image-unavailable');if(!host.querySelector('.image-label')){const label=document.createElement('span');label.className='image-label';label.textContent=img.alt||'Image unavailable';host.append(label);}}};
document.addEventListener('error',e=>{if(e.target instanceof HTMLImageElement)imgError(e.target);},true);
$$('img').forEach(i=>{if(i.complete&&!i.naturalWidth)imgError(i)});
let refreshFrame; function refresh(){if(canTrigger){cancelAnimationFrame(refreshFrame);refreshFrame=requestAnimationFrame(()=>st.refresh());}}
// Navigation: a mouse-hover mega menu, keyboard/touch click support, escape and outside dismissal.
const header=$('#header'), veil=$('.menu-veil'), mobile=$('.mobile-toggle');
const menuButtons=$$('.menu-toggle'), menus=$$('.mega');let openMenu='', menuTimer=0, menuTween=null;
$('#mega-products').innerHTML=products.map(p=>`<a class="mega-card" href="#">${picture(p.image,p.name)}<span>${p.name}<i>↗</i></span></a>`).join('');
const navShell=$('.nav-shell',header), navHero=$('.hero'), navFactory=$('#factory .factory-feature');
let navFrame=0;

function updateScroll(){
 navFrame=0;
 const navBounds=navShell.getBoundingClientRect();
 const heroBounds=navHero.getBoundingClientRect();
 const factoryBounds=navFactory.getBoundingClientRect();
 const navMidpoint=navBounds.top+navBounds.height/2;
 const overHero=heroBounds.top<=navBounds.top+1 && heroBounds.bottom>=navBounds.bottom;
 const overFactory=factoryBounds.top<=navMidpoint && factoryBounds.bottom>navBounds.bottom;
 header.classList.toggle('scrolled',window.scrollY>65);
 header.classList.toggle('over-hero',overHero);
 header.classList.toggle('over-factory',overFactory);
}

function syncNavigation(){
 if(!navFrame)navFrame=requestAnimationFrame(updateScroll);
}

updateScroll();
window.addEventListener('scroll',syncNavigation,{passive:true});
window.addEventListener('resize',syncNavigation,{passive:true});
window.addEventListener('pageshow',syncNavigation);
window.addEventListener('load',syncNavigation);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)syncNavigation();});
const navLayoutObserver=new ResizeObserver(syncNavigation);
[navShell,navHero,navFactory].forEach(element=>navLayoutObserver.observe(element));
function setMenu(id){clearTimeout(menuTimer);if(openMenu===id)return; if(menuTween)menuTween.kill();openMenu=id;header.classList.toggle('open',!!id);veil.hidden=!id;menuButtons.forEach(b=>b.setAttribute('aria-expanded',String(b.dataset.menu===id)));menus.forEach(m=>{m.hidden=m.id!==id;if(gs)gs.set(m,{clearProps:'opacity,transform,clipPath'});});
  if(id&&motion){const panel=document.getElementById(id);menuTween=gs.timeline().fromTo(panel,{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0% 0)',duration:.55,ease:'power4.inOut'}).fromTo($$('.mega-card',panel),{y:20,opacity:0},{y:0,opacity:1,duration:.55,stagger:.055,ease:'power3.out'},.16);}
  if(lenis){if(id||header.classList.contains('mobile-open'))lenis.stop();else if(!document.querySelector('dialog[open]'))lenis.start();}
  scheduleHero();
}
function closeNav(){header.classList.remove('mobile-open');mobile.setAttribute('aria-expanded','false');setMenu('');if(lenis&&!document.querySelector('dialog[open]'))lenis.start();scheduleHero();}
menuButtons.forEach(b=>{b.addEventListener('mouseenter',()=>{if(hoverMedia.matches)setMenu(b.dataset.menu)});b.addEventListener('click',e=>{if(hoverMedia.matches&&e.detail>0&&openMenu===b.dataset.menu)return;setMenu(openMenu===b.dataset.menu?'':b.dataset.menu);});});
header.addEventListener('mouseenter',()=>clearTimeout(menuTimer));header.addEventListener('mouseleave',()=>{if(hoverMedia.matches)menuTimer=setTimeout(()=>setMenu(''),150)});
$$('.nav-link:not(.menu-toggle)').forEach(a=>a.addEventListener('mouseenter',()=>{if(hoverMedia.matches)setMenu('')}));
veil.addEventListener('click',closeNav);mobile.addEventListener('click',()=>{if(header.classList.contains('mobile-open'))closeNav();else{header.classList.add('mobile-open');mobile.setAttribute('aria-expanded','true');scheduleHero();}});
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&(openMenu||header.classList.contains('mobile-open'))){closeNav();}});
hoverMedia.addEventListener('change',closeNav);
$$('.nav a,.mega a').forEach(a=>a.addEventListener('click',closeNav));
// Hero carousel — one persistent timer, interruptible transitions and native fallback.
const media=$('#hero-media');
slides.slice(1).forEach(slide=>{
 const layer=document.createElement('div');
 layer.className='hero-layer';
 const image=new Image();
 image.alt=slide.alt;
 image.decoding='async';
 image.fetchPriority='low';
 layer.append(image);
 media.append(layer);
 image.src=slide.image;
});
const layers=$$('.hero-layer',media), choices=$$('.hero-choice');
const heroImages=layers.map(layer=>$('img',layer));
const imageReady=heroImages.map(()=>false);
const heroPause=$('#hero-pause'),progress=$('#hero-progress');
let active=0,heroTween=null,heroToken=0,heroTimer=0,heroPaused=reduced,heroInView=true;

function stopHero(){clearTimeout(heroTimer);heroTimer=0;progress.classList.remove('running');}
function canPlayHero(){
 return !heroPaused&&heroInView&&!document.hidden&&!openMenu&&!header.classList.contains('mobile-open')&&!document.querySelector('dialog[open]');
}
function scheduleHero(){
 stopHero();
 if(!canPlayHero()||!imageReady.some((ready,index)=>ready&&index!==active))return;
 void progress.offsetWidth;
 progress.classList.add('running');
 heroTimer=setTimeout(()=>{
   heroTimer=0;
   if(!canPlayHero()){stopHero();return;}
   for(let offset=1;offset<slides.length;offset++){
     const next=(active+offset)%slides.length;
     if(imageReady[next]){slideTo(next);return;}
   }
   stopHero();
 },6500);
}

// Decode each image once and keep its element mounted for subsequent rotations.
heroImages.forEach((img,index)=>{
 img.decode().then(()=>{
   imageReady[index]=true;
   if(!heroTimer)scheduleHero();
 }).catch(()=>{});
});
function slideTo(index){index=(index+slides.length)%slides.length;if(index===active||!imageReady[index])return;const previous=active;active=index;const token=++heroToken;const incoming=layers[index],outgoing=layers[previous],s=slides[index];if(heroTween)heroTween.kill();
  layers.forEach((el,i)=>{el.getAnimations().forEach(a=>a.cancel());$('img',el).getAnimations().forEach(a=>a.cancel());el.classList.toggle('active',i===index);el.classList.remove('leaving');if(gs)gs.set(el,{clearProps:'visibility,zIndex,clipPath,opacity'});});
  choices.forEach((b,i)=>{b.classList.toggle('is-active',i===index);b.setAttribute('aria-pressed',String(i===index));});
  const desc=$('#hero-description'),link=$('#hero-link'),caption=$('#hero-caption');desc.textContent=s.title;link.innerHTML=s.link+' <span>↗</span>';caption.textContent=s.caption;$('#hero-count').textContent=`${pad(index+1)} / ${pad(slides.length)}`;
  if(nativeMotion){outgoing.classList.add('leaving'); const done=()=>{if(token===heroToken)outgoing.classList.remove('leaving');};
    if(motion){heroTween=gs.timeline({onComplete:done}).fromTo(incoming,{clipPath:'inset(100% 0 0 0)'},{clipPath:'inset(0% 0 0 0)',duration:1.12,ease:'power4.inOut',clearProps:'clipPath'},0).fromTo($('img',incoming),{scale:1.13},{scale:1.035,duration:2,ease:'power3.out'},0).fromTo([desc,link,caption],{y:14,opacity:0},{y:0,opacity:1,duration:.65,stagger:.07,ease:'power3.out',clearProps:'transform,opacity'},.24);}
    else {const a=incoming.animate([{clipPath:'inset(100% 0 0 0)'},{clipPath:'inset(0% 0 0 0)'}],{duration:1050,easing:'cubic-bezier(.77,0,.18,1)'});a.onfinish=done;$('img',incoming).animate([{transform:'scale(1.13)'},{transform:'scale(1.035)'}],{duration:1800,easing:'cubic-bezier(.22,1,.36,1)'});[desc,link,caption].forEach((el,i)=>{el.getAnimations().forEach(a=>a.cancel());el.animate([{transform:'translateY(14px)',opacity:0},{transform:'translateY(0)',opacity:1}],{duration:650,delay:200+i*70,fill:'backwards',easing:'ease-out'});});}}
  scheduleHero();
}
let hoverTimer;choices.forEach((b,i)=>{b.addEventListener('mouseenter',()=>{if(hoverMedia.matches){clearTimeout(hoverTimer);hoverTimer=setTimeout(()=>slideTo(i),100)}});b.addEventListener('mouseleave',()=>clearTimeout(hoverTimer));b.addEventListener('focus',()=>slideTo(i));b.addEventListener('click',()=>slideTo(i));});
function stepHero(direction){
 for(let offset=1;offset<slides.length;offset++){
   const next=(active+direction*offset+slides.length)%slides.length;
   if(imageReady[next]){slideTo(next);return;}
 }
}
$('#hero-prev').addEventListener('click',()=>stepHero(-1));$('#hero-next').addEventListener('click',()=>stepHero(1));
heroPause.addEventListener('click',()=>{heroPaused=!heroPaused;heroPause.setAttribute('aria-pressed',String(heroPaused));heroPause.setAttribute('aria-label',heroPaused?'Resume automatic slides':'Pause automatic slides');heroPause.textContent=heroPaused?'▷':'Ⅱ';scheduleHero();});
if(reduced){heroPause.setAttribute('aria-pressed','true');heroPause.setAttribute('aria-label','Resume automatic slides');heroPause.textContent='▷';}
new IntersectionObserver(([entry])=>{heroInView=entry.isIntersecting;scheduleHero();},{threshold:.15}).observe($('.hero'));
document.addEventListener('visibilitychange',scheduleHero);
window.addEventListener('pagehide',stopHero);
window.addEventListener('pageshow',scheduleHero);
// Filters: real product links, no simulated commerce. Each card has a separate image mask.
const productGrid=$('#product-grid');
function renderProducts(filter='all',animate=false){productGrid.innerHTML=products.filter(p=>filter==='all'||filter===p.group).map(p=>`<article class="product-card"><a class="product-image" href="#" aria-label="Explore ${p.name}">${picture(p.image,p.name)}<span class="product-index">${pad(products.indexOf(p)+1)}</span><span class="circle-arrow" aria-hidden="true">↗</span></a><div class="product-body"><span class="product-type"><i></i>${p.type}</span><h3>${p.name}</h3><p>${p.detail}</p><a class="line-link" href="#">Learn more <span>↗</span></a></div></article>`).join('');if(animate){registerReveals(productGrid);refresh();}}
renderProducts();
const galleryGrid=$('#gallery-grid');
function renderGallery(filter='all',animate=false){if(animate)destroyGalleryMotion();galleryGrid.innerHTML=gallery.filter(g=>filter==='all'||filter===g.type).map(g=>`<button class="gallery-card${g.image===images.wall?' exposed-masonry':''}" data-gallery-index="${gallery.indexOf(g)}" aria-label="View ${g.name}">${picture(g.image,g.name)}<div class="gallery-copy"><div><h3 class="gallery-title-mask"><span>${g.name}</span></h3><p class="gallery-meta-mask"><span>${g.credit}</span></p></div><span aria-hidden="true">↗</span></div></button>`).join('');if(animate){registerReveals(galleryGrid);setupGalleryMotion();refresh();}}
renderGallery();
function bindFilters(sel,key,render){$$(sel).forEach(btn=>btn.addEventListener('click',()=>{$$(sel).forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-pressed',String(b===btn))});render(btn.dataset[key],true);}));}
bindFilters('[data-product-filter]','productFilter',renderProducts);bindFilters('[data-gallery]','gallery',renderGallery);
// Eight enquiry-led support topics; no promises of unconfirmed services.
const support=[
 ['Product selection','Discuss material choices for your project.','Product consultation'],
 ['Dimensions & variants','Explore product sizes, types and available variants.','Concrete Solid Brick'],
 ['Application guidance','Explore suitable applications for masonry and paving.','Product consultation'],
 ['Colour & finish options','Enquire about available paving colours and finishes.','Pavement Tiles'],
 ['Technical information','Find published product specifications and details.','Concrete Hollow Block'],
 ['Quantity planning','Share your requirements for a quantity and supply enquiry.','Unipavers'],
 ['Electrical product enquiries','Explore Flick switches and sockets for your space.','Flick'],
 ['Quotation enquiries','Discuss product pricing and availability with our team.','Quotation support']
];
const supportList=$('#service-list');
supportList.innerHTML=support.map((s,i)=>`<article class="service-row" data-rise><button class="service-select" data-support="${i}" aria-pressed="false"><span class="service-num">${pad(i+1)}</span><div><h3>${s[0]}</h3><p>${s[1]}</p></div><span class="support-arrow">↗</span></button><button class="support-enquire" data-quote data-interest="${s[2]}">Enquire ↗</button></article>`).join('');
const supportChoices=$$('.service-select',supportList);
const supportTitle=$('#service-title'), supportIndex=$('#service-index');

function selectSupport(index){
 supportChoices.forEach((button,n)=>{
   const selected=n===index;
   button.setAttribute('aria-pressed',String(selected));
   button.closest('.service-row').classList.toggle('is-current',selected);
 });
 supportTitle.textContent=support[index][0];
 supportIndex.textContent=pad(index+1)+' / '+pad(support.length);
}

supportChoices.forEach((button,index)=>{
 const select=()=>selectSupport(index);
 button.addEventListener('click',select);
 button.addEventListener('focus',select);
 button.addEventListener('mouseenter',()=>{if(hoverMedia.matches)select();});
});
selectSupport(0);
// Modal interactions and form availability.
function openDialog(d){closeNav();if(d.open)return;stopHero();d.showModal();if(lenis)lenis.stop();if(motion)gs.fromTo(d,{opacity:0,y:18},{opacity:1,y:0,duration:.35,ease:'power3.out'});}
$$('dialog').forEach(d=>{d.setAttribute('data-lenis-prevent','');d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}});d.addEventListener('close',()=>{if(lenis)lenis.start();scheduleHero();if(d.id==='film-dialog')$('#film-frame').replaceChildren();});});
$$('[data-close]').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
$$('[data-quote]').forEach(b=>b.addEventListener('click',()=>{$('#quote-form select').value=b.dataset.interest||'General enquiry';openDialog($('#quote-dialog'));}));
galleryGrid.addEventListener('click',e=>{const b=e.target.closest('[data-gallery-index]');if(!b)return;const g=gallery[Number(b.dataset.galleryIndex)];const image=$('#lightbox-image');image.style.visibility='';delete image.dataset.failed;image.src=g.image;image.alt=g.name;$('#lightbox-caption').textContent=g.name+' — '+g.credit;openDialog($('#image-dialog'));});
$('#watch-film').addEventListener('click',()=>{$('#film-frame').innerHTML='<iframe title="bti Hollow Blocks video" src="https://www.youtube-nocookie.com/embed/Fp3XaD7TlMY?autoplay=1" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';openDialog($('#film-dialog'));});
$('#newsletter-form').addEventListener('submit',e=>{e.preventDefault();$('.form-status',e.currentTarget).textContent='Online subscriptions are currently unavailable. Please try again later.';});
$('#quote-form').addEventListener('submit',e=>{e.preventDefault();$('.form-status',e.currentTarget).textContent='Online enquiries are currently unavailable. Please call 16604 for assistance.';});
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a)return;if(a.getAttribute('href')==='#'){e.preventDefault();return;}if(!a.hash||!document.getElementById(a.hash.slice(1)))return;e.preventDefault();closeNav();toAnchor(a.hash);});
// Repeatable AOS-style reveals. Observer handles entering from either direction;
// GSAP runs the choreography when available, Web Animations is the offline fallback.
// Reset only after the whole element exits the viewport, never hide visible text on a refresh.
const revealRecords=new Map();
const revealSelector='[data-split],[data-rise],.product-card,[data-mask],.section-top,.footer-column,.footer-identity';
const ease='cubic-bezier(.22,1,.36,1)';
function splitHeading(el){if(el.dataset.wrapped)return;el.dataset.wrapped='1';const parts=el.innerHTML.split(/<br\s*\/?\s*>/i);el.innerHTML=parts.map(t=>`<span class="reveal-line"><span class="reveal-line-inner">${t}</span></span>`).join('');}
function getParts(el){if(el.hasAttribute('data-split')){splitHeading(el);return $$('.reveal-line-inner',el).map((n,i)=>({n,from:{yPercent:112,opacity:0},to:{yPercent:0,opacity:1},frames:[{transform:'translateY(112%)',opacity:0},{transform:'translateY(0)',opacity:1}],duration:1.08,delay:i*.105}));}
 const card=el.matches('.product-card,.gallery-card');const mask=el.hasAttribute('data-mask');if(card||mask){const frame=card?$('.image-frame',el):el;const inner=frame&&$('img',frame);const body=card?$('.product-body,.gallery-copy',el):null;const list=[];if(frame)list.push({n:frame,from:{clipPath:'inset(0 0 98% 0)'},to:{clipPath:'inset(0 0 0% 0)'},frames:[{clipPath:'inset(0 0 98% 0)'},{clipPath:'inset(0 0 0% 0)'}],duration:1.12,delay:0});if(inner&&!el.matches('.service-visual,.factory-feature,.material-board'))list.push({n:inner,from:{scale:1.15},to:{scale:1},frames:[{transform:'scale(1.15)'},{transform:'scale(1)'}],duration:1.35,delay:0});if(body)list.push({n:body,from:{y:22,opacity:0},to:{y:0,opacity:1},frames:[{transform:'translateY(22px)',opacity:0},{transform:'translateY(0)',opacity:1}],duration:.8,delay:.2});return list;}
 return [{n:el,from:{y:25,opacity:0},to:{y:0,opacity:1},frames:[{transform:'translateY(25px)',opacity:0},{transform:'translateY(0)',opacity:1}],duration:.82,delay:0}];}
function cancelReveal(rec){rec.animations.forEach(a=>{if(a.kill)a.kill();else a.cancel();});rec.animations=[];rec.parts.forEach(({n})=>{if(gs)gs.set(n,{clearProps:'transform,opacity,clipPath'});});}
function playReveal(rec){if(rec.visible)return;rec.visible=true;rec.el.dataset.revealState='playing';cancelReveal(rec);if(!nativeMotion)return;const direction=rec.direction||1;rec.parts.forEach(p=>{const delay=p.delay+(rec.el.matches('.product-card,.gallery-card')?Math.min(2,Array.from(rec.el.parentElement.children).indexOf(rec.el)%3)*.075:0);const from={...p.from};let frames=p.frames;if(direction<0){if('yPercent' in from){from.yPercent=-108;frames=[{transform:'translateY(-108%)',opacity:0},p.frames[1]];}else if('y' in from){from.y=-22;frames=[{transform:'translateY(-22px)',opacity:0},p.frames[1]];}else if('clipPath' in from){from.clipPath='inset(98% 0 0 0)';frames=[{clipPath:from.clipPath},p.frames[1]];}}if(motion){const a=gs.fromTo(p.n,from,{...p.to,duration:p.duration,delay,ease:'power3.out',overwrite:'auto',clearProps:'transform,opacity,clipPath'});rec.animations.push(a);}else{rec.animations.push(p.n.animate(frames,{duration:p.duration*1000,delay:delay*1000,easing:ease,fill:'backwards'}));}});}
const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{const rec=revealRecords.get(e.target);if(!rec)return;if(e.isIntersecting){playReveal(rec);}else if(e.boundingClientRect.bottom<=0||e.boundingClientRect.top>=window.innerHeight){cancelReveal(rec);rec.visible=false;rec.direction=e.boundingClientRect.bottom<=0?-1:1;rec.el.dataset.revealState='ready';}});},{threshold:0});
function registerReveals(root=document){for(const [el,rec] of revealRecords){if(!el.isConnected){observer.unobserve(el);cancelReveal(rec);revealRecords.delete(el);}}if(!nativeMotion)return;$$(revealSelector,root).forEach(el=>{if(revealRecords.has(el))return;const rec={el,parts:getParts(el),animations:[],visible:false,direction:1};revealRecords.set(el,rec);observer.observe(el);});}
// Gallery: opposing horizontal movement and independent scroll-linked image parallax.
const galleryMotion=[];
const animatedGalleryCards=()=>$$('.gallery-card[data-gallery-index="0"],.gallery-card[data-gallery-index="1"]',galleryGrid);
function destroyGalleryMotion(){destroyGalleryPair();galleryMotion.splice(0).forEach(r=>{r.parallax?.scrollTrigger?.kill();r.parallax?.kill();if(r.tick)window.removeEventListener('scroll',r.tick);});}
// Shared scroll progress moves the first-row cards in opposite directions.
// CSS translate keeps card movement separate from image parallax and hover.
let galleryPairCleanup=null;
function destroyGalleryPair(){galleryPairCleanup?.();galleryPairCleanup=null;}
function setupGalleryPair(){
 destroyGalleryPair();
 const pair=animatedGalleryCards();
 if(!nativeMotion || pair.length!==2)return;
 const desktop=window.matchMedia('(min-width:761px)');
 let tween=null,frame=0;
 const state={progress:0};
 const apply=()=>{
   const travel=desktop.matches?Math.min(84,innerWidth*.06):Math.min(22,innerWidth*.05);
   const p=Math.max(0,Math.min(1,state.progress));
   pair.forEach((card,i)=>{card.style.setProperty('--pair-x',`${(i?-1:1)*travel*(1-p)}px`);card.dataset.pairProgress=p.toFixed(3);});
 };
 const start=()=>galleryGrid.getBoundingClientRect().top+scrollY-innerHeight*.92;
 const distance=()=>Math.max(1,innerHeight*.57);
 const nativeTick=()=>{frame=0;state.progress=(scrollY-start())/distance();apply();};
 const queue=()=>{if(!frame)frame=requestAnimationFrame(nativeTick);};
 if(canTrigger){tween=gs.fromTo(state,{progress:0},{progress:1,ease:'none',onUpdate:apply,scrollTrigger:{trigger:galleryGrid,start,end:()=>start()+distance(),scrub:.5,invalidateOnRefresh:true,onRefresh:apply}});}
 else{window.addEventListener('scroll',queue,{passive:true});nativeTick();}
 const onResize=()=>{if(canTrigger)refresh();else queue();};window.addEventListener('resize',onResize,{passive:true});apply();
 galleryPairCleanup=()=>{tween?.scrollTrigger?.kill();tween?.kill();cancelAnimationFrame(frame);window.removeEventListener('scroll',queue);window.removeEventListener('resize',onResize);pair.forEach(c=>{c.style.removeProperty('--pair-x');delete c.dataset.pairProgress;});};
}
function setupGalleryMotion(){
 if(!nativeMotion)return;
 setupGalleryPair();
 animatedGalleryCards().forEach(card=>{
   const img=$('img',card);
   const record={};
   galleryMotion.push(record);
   if(canTrigger){
     const top=()=>galleryGrid.getBoundingClientRect().top+scrollY+card.offsetTop;
     record.parallax=gs.fromTo(img,{yPercent:-8},{yPercent:8,ease:'none',scrollTrigger:{
       trigger:galleryGrid,start:()=>top()-innerHeight,end:()=>top()+card.offsetHeight,scrub:true,invalidateOnRefresh:true
     }});
   }else{
     let queued=false;
     record.tick=()=>{
       if(queued)return;
       queued=true;
       requestAnimationFrame(()=>{
         queued=false;
         if(!card.isConnected)return;
         const bounds=card.getBoundingClientRect();
         const progress=Math.min(1,Math.max(0,(innerHeight-bounds.top)/(innerHeight+bounds.height)));
         img.style.transform=`translateY(${(progress-.5)*16}%)`;
       });
     };
     window.addEventListener('scroll',record.tick,{passive:true});
     record.tick();
   }
 });
}
function initMotion(){registerReveals();setupGalleryMotion();if(motion){gs.timeline({defaults:{ease:'power4.out'}}).fromTo('.hero-layer.active img',{scale:1.13},{scale:1.035,duration:1.8},0).fromTo('.hero-kicker',{opacity:0,y:16},{opacity:1,y:0,duration:.75,clearProps:'opacity,transform'},.1).fromTo('.hero-word',{clipPath:'inset(0 0 100% 0)',y:35},{clipPath:'inset(0 0 0% 0)',y:0,duration:1.05,stagger:.1,clearProps:'transform,clipPath'},.15).fromTo('.hero-detail,.hero-bottom',{opacity:0,y:17},{opacity:1,y:0,duration:.8,stagger:.12,clearProps:'transform,opacity'},.55);}
 else if(nativeMotion){$$('.hero-word').forEach((el,i)=>el.animate([{clipPath:'inset(0 0 100% 0)',transform:'translateY(35px)'},{clipPath:'inset(0 0 0% 0)',transform:'translateY(0)'}],{duration:1100,delay:150+i*100,fill:'backwards',easing:ease}));}
 if(canTrigger){gs.fromTo('.factory-media img',{yPercent:-5},{yPercent:5,ease:'none',scrollTrigger:{trigger:'.factory-feature',start:'top bottom',end:'bottom top',scrub:1.1}});refresh();}
 else if(nativeMotion){let pending=false;const factory=$('.factory-feature'),img=$('.factory-media img');const tick=()=>{pending=false;const r=factory.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight){const progress=Math.max(0,Math.min(1,(innerHeight-r.top)/(innerHeight+r.height)));img.style.transform=`translateY(${(progress-.5)*10}%)`;}};window.addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(tick);}},{passive:true});tick();}
 document.documentElement.dataset.motion=canTrigger?'gsap':motion?'gsap-partial':nativeMotion?'native-fallback':'reduced';console.info('[bti motion]',document.documentElement.dataset.motion, 'ScrollTrigger:',canTrigger,'Lenis:',!!lenis);scheduleHero();}
initMotion();window.addEventListener('load',refresh,{once:true});if(document.fonts?.ready)document.fonts.ready.then(refresh);
})();
