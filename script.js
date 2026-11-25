/* bti Building Products — standalone homepage prototype.
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
  landscape: uploads + 'photo-gallery/36.jpg?bwg=1616570780',
  wall: uploads + 'photo-gallery/20210316_082817.jpg?bwg=1643714531',
  interior: uploads + 'photo-gallery/20191231_082720.jpg?bwg=1616570078',
};
const products = [
  {name:'Concrete Hollow Block', type:'Masonry', group:'masonry', image:images.hollow, detail:'Machine-made hollow blocks in a range of dimensions, designed for efficient masonry construction.', slug:'/concrete-hollow-block'},
  {name:'Concrete Solid Brick', type:'Masonry', group:'masonry', image:images.solid, detail:'Solid concrete bricks with uniform dimensions and a consistent finish for modern building work.', slug:'/concrete-solid-brick'},
  {name:'Unipavers', type:'Outdoor flooring', group:'paving', image:images.unipaver, detail:'Interlocking concrete pavers in multiple colours and thicknesses for driveways, pathways and landscapes.', slug:'/unipavers'},
  {name:'Pavement Tiles', type:'Surface solutions', group:'paving', image:images.tile, detail:'Explore colour and pattern options for walkways, terraces and outdoor flooring.', slug:'/pavement-tiles'},
  {name:'Flick', type:'Electrical solutions', group:'electrical', image:images.flick, detail:'Modern switches and sockets with minimal forms, thoughtful detailing and everyday functionality.', slug:'/flick/'},
];
const slides = [
  {image:images.facade, alt:'Concrete screen wall in an architectural setting', title:'Concrete masonry for contemporary construction.', link:'Explore masonry', slug:'/concrete-hollow-block', caption:'MASONRY / DESIGN INSPIRATION'},
  {image:images.bench, alt:'Interlocking paving in a landscaped driveway', title:'Shape the outdoors with versatile paving solutions.', link:'Explore unipavers', slug:'/unipavers', caption:'PAVING / DESIGN INSPIRATION'},
  {image:images.paving, crop:'crop-right', alt:'Modern outdoor tiled surfaces', title:'Thoughtful finishes for everyday outdoor spaces.', link:'Explore pavement tiles', slug:'/pavement-tiles', caption:'SURFACES / DESIGN INSPIRATION'},
  {image:images.flick, alt:'Flick white electrical switch', title:'Purposeful electrical details for modern interiors.', link:'Discover Flick', slug:'/flick/', caption:'FLICK / ELECTRICAL SOLUTIONS'},
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
$('#mega-products').innerHTML=products.map(p=>`<a class="mega-card" href="${site+p.slug}">${picture(p.image,p.name)}<span>${p.name}<i>↗</i></span></a>`).join('');
function updateScroll(){
 const y=window.scrollY, factory=$('#factory .factory-feature').getBoundingClientRect(), hero=$('.hero').getBoundingClientRect();
 const navHeight=header.querySelector('.nav-shell').offsetHeight;
 header.classList.toggle('scrolled',y>65);
 header.classList.toggle('over-hero',hero.top<=0 && hero.bottom>navHeight*.8);
 header.classList.toggle('over-factory',y>65 && factory.top<=navHeight*.5 && factory.bottom>navHeight*.75);
}
window.addEventListener('resize',updateScroll,{passive:true});
updateScroll(); window.addEventListener('scroll',updateScroll,{passive:true});
function setMenu(id){clearTimeout(menuTimer);if(openMenu===id)return; if(menuTween)menuTween.kill();openMenu=id;header.classList.toggle('open',!!id);veil.hidden=!id;menuButtons.forEach(b=>b.setAttribute('aria-expanded',String(b.dataset.menu===id)));menus.forEach(m=>{m.hidden=m.id!==id;if(gs)gs.set(m,{clearProps:'opacity,transform,clipPath'});});
  if(id&&motion){const panel=document.getElementById(id);menuTween=gs.timeline().fromTo(panel,{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0% 0)',duration:.55,ease:'power4.inOut'}).fromTo($$('.mega-card',panel),{y:20,opacity:0},{y:0,opacity:1,duration:.55,stagger:.055,ease:'power3.out'},.16);}
  if(lenis){if(id||header.classList.contains('mobile-open'))lenis.stop();else if(!document.querySelector('dialog[open]'))lenis.start();}
  if(id)stopHero();else scheduleHero();
}
function closeNav(){header.classList.remove('mobile-open');mobile.setAttribute('aria-expanded','false');setMenu('');if(lenis&&!document.querySelector('dialog[open]'))lenis.start();}
menuButtons.forEach(b=>{b.addEventListener('mouseenter',()=>{if(hoverMedia.matches)setMenu(b.dataset.menu)});b.addEventListener('click',e=>{if(hoverMedia.matches&&e.detail>0&&openMenu===b.dataset.menu)return;setMenu(openMenu===b.dataset.menu?'':b.dataset.menu);});});
header.addEventListener('mouseenter',()=>clearTimeout(menuTimer));header.addEventListener('mouseleave',()=>{if(hoverMedia.matches)menuTimer=setTimeout(()=>setMenu(''),150)});
$$('.nav-link:not(.menu-toggle)').forEach(a=>a.addEventListener('mouseenter',()=>{if(hoverMedia.matches)setMenu('')}));
veil.addEventListener('click',closeNav);mobile.addEventListener('click',()=>{if(header.classList.contains('mobile-open'))closeNav();else{header.classList.add('mobile-open');mobile.setAttribute('aria-expanded','true');}});
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&(openMenu||header.classList.contains('mobile-open'))){closeNav();}});
hoverMedia.addEventListener('change',closeNav);
$$('.nav a,.mega a').forEach(a=>a.addEventListener('click',closeNav));
// Hero carousel — one persistent timer, interruptible transitions and native fallback.
const media=$('#hero-media');media.innerHTML=slides.map((s,i)=>`<div class="hero-layer ${i===0?'active':''} ${s.crop||''}"><img src="${s.image}" alt="${s.alt}" ${i===0?'fetchpriority="high"':'decoding="async"'}></div>`).join('');
const layers=$$('.hero-layer'), choices=$$('.hero-choice');let active=0,heroTween=null,heroToken=0,heroTimer=0,heroPaused=reduced,heroInView=true;
const heroPause=$('#hero-pause'),progress=$('#hero-progress');
function stopHero(){clearTimeout(heroTimer);progress.classList.remove('running');}
function scheduleHero(){stopHero();if(heroPaused||!heroInView||document.hidden||openMenu||document.querySelector('dialog[open]'))return;void progress.offsetWidth;progress.classList.add('running');heroTimer=setTimeout(()=>slideTo(active+1),6500);}
function slideTo(index){index=(index+slides.length)%slides.length;if(index===active){scheduleHero();return;}const previous=active;active=index;const token=++heroToken;const incoming=layers[index],outgoing=layers[previous],s=slides[index];if(heroTween)heroTween.kill();
  layers.forEach((el,i)=>{el.getAnimations().forEach(a=>a.cancel());$('img',el).getAnimations().forEach(a=>a.cancel());el.classList.toggle('active',i===index);el.classList.remove('leaving');if(gs)gs.set(el,{clearProps:'visibility,zIndex,clipPath,opacity'});});
  choices.forEach((b,i)=>{b.classList.toggle('is-active',i===index);b.setAttribute('aria-pressed',String(i===index));});
  const desc=$('#hero-description'),link=$('#hero-link'),caption=$('#hero-caption');desc.textContent=s.title;link.innerHTML=s.link+' <span>↗</span>';link.href=site+s.slug;caption.textContent=s.caption;$('#hero-count').textContent=`${pad(index+1)} / ${pad(slides.length)}`;
  if(nativeMotion){outgoing.classList.add('leaving'); const done=()=>{if(token===heroToken)outgoing.classList.remove('leaving');};
    if(motion){heroTween=gs.timeline({onComplete:done}).fromTo(incoming,{clipPath:'inset(100% 0 0 0)'},{clipPath:'inset(0% 0 0 0)',duration:1.12,ease:'power4.inOut',clearProps:'clipPath'},0).fromTo($('img',incoming),{scale:1.13},{scale:1.035,duration:2,ease:'power3.out'},0).fromTo([desc,link,caption],{y:14,opacity:0},{y:0,opacity:1,duration:.65,stagger:.07,ease:'power3.out',clearProps:'transform,opacity'},.24);}
    else {const a=incoming.animate([{clipPath:'inset(100% 0 0 0)'},{clipPath:'inset(0% 0 0 0)'}],{duration:1050,easing:'cubic-bezier(.77,0,.18,1)'});a.onfinish=done;$('img',incoming).animate([{transform:'scale(1.13)'},{transform:'scale(1.035)'}],{duration:1800,easing:'cubic-bezier(.22,1,.36,1)'});[desc,link,caption].forEach((el,i)=>{el.getAnimations().forEach(a=>a.cancel());el.animate([{transform:'translateY(14px)',opacity:0},{transform:'translateY(0)',opacity:1}],{duration:650,delay:200+i*70,fill:'backwards',easing:'ease-out'});});}}
  scheduleHero();
}
let hoverTimer;choices.forEach((b,i)=>{b.addEventListener('mouseenter',()=>{if(hoverMedia.matches){clearTimeout(hoverTimer);hoverTimer=setTimeout(()=>slideTo(i),100)}});b.addEventListener('mouseleave',()=>clearTimeout(hoverTimer));b.addEventListener('focus',()=>slideTo(i));b.addEventListener('click',()=>slideTo(i));});
$('#hero-prev').addEventListener('click',()=>slideTo(active-1));$('#hero-next').addEventListener('click',()=>slideTo(active+1));
heroPause.addEventListener('click',()=>{heroPaused=!heroPaused;heroPause.setAttribute('aria-pressed',String(heroPaused));heroPause.setAttribute('aria-label',heroPaused?'Resume automatic slides':'Pause automatic slides');heroPause.textContent=heroPaused?'▷':'Ⅱ';scheduleHero();});
if(reduced){heroPause.setAttribute('aria-pressed','true');heroPause.setAttribute('aria-label','Resume automatic slides');heroPause.textContent='▷';}
new IntersectionObserver(([entry])=>{heroInView=entry.isIntersecting;scheduleHero();},{threshold:.15}).observe($('.hero'));
document.addEventListener('visibilitychange',scheduleHero);header.addEventListener('mouseenter',stopHero);header.addEventListener('mouseleave',scheduleHero);$('.hero-select').addEventListener('mouseenter',stopHero);$('.hero-select').addEventListener('mouseleave',scheduleHero);
// Filters: real product links, no simulated commerce. Each card has a separate image mask.
const productGrid=$('#product-grid');
function renderProducts(filter='all',animate=false){productGrid.innerHTML=products.filter(p=>filter==='all'||filter===p.group).map(p=>`<article class="product-card"><a class="product-image" href="${site+p.slug}" aria-label="Explore ${p.name}">${picture(p.image,p.name)}<span class="product-index">${pad(products.indexOf(p)+1)}</span><span class="circle-arrow" aria-hidden="true">↗</span></a><div class="product-body"><span class="product-type"><i></i>${p.type}</span><h3>${p.name}</h3><p>${p.detail}</p><a class="line-link" href="${site+p.slug}">Learn more <span>↗</span></a></div></article>`).join('');if(animate){registerReveals(productGrid);refresh();}}
renderProducts();
const galleryGrid=$('#gallery-grid');
function renderGallery(filter='all',animate=false){if(animate)destroyGalleryMotion();galleryGrid.innerHTML=gallery.filter(g=>filter==='all'||filter===g.type).map(g=>`<button class="gallery-card${g.image===images.wall?' exposed-masonry':''}" data-gallery-index="${gallery.indexOf(g)}" aria-label="View ${g.name}">${picture(g.image,g.name)}<div class="gallery-copy"><div><h3 class="gallery-title-mask"><span>${g.name}</span></h3><p class="gallery-meta-mask"><span>${g.credit}</span></p></div><span aria-hidden="true">↗</span></div></button>`).join('');if(animate){registerReveals(galleryGrid);setupGalleryMotion();refresh();}}
renderGallery();
function bindFilters(sel,key,render){$$(sel).forEach(btn=>btn.addEventListener('click',()=>{$$(sel).forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-pressed',String(b===btn))});render(btn.dataset[key],true);}));}
bindFilters('[data-product-filter]','productFilter',renderProducts);bindFilters('[data-gallery]','gallery',renderGallery);
// Eight enquiry-led support topics; no promises of unconfirmed services.
const support=[
 ['Product selection','Discuss material choices for your project.',images.hollow,'Product consultation'],
 ['Dimensions & variants','Explore product sizes, types and available variants.',images.solid,'Concrete Solid Brick'],
 ['Application guidance','Explore suitable applications for masonry and paving.',images.facade,'Product consultation'],
 ['Colour & finish options','Enquire about available paving colours and finishes.',images.tile,'Pavement Tiles'],
 ['Technical information','Find published product specifications and details.',images.hollow,'Concrete Hollow Block'],
 ['Quantity planning','Share your requirements for a quantity and supply enquiry.',images.unipaver,'Unipavers'],
 ['Electrical product enquiries','Explore Flick switches and sockets for your space.',images.flick,'Flick'],
 ['Quotation enquiries','Discuss product pricing and availability with our team.',images.paving,'Quotation support']
];
const supportList=$('#service-list'), supportMedia=$('#service-media'), supportPause=$('#service-pause');let supportActive=-1,supportTimer=0,supportPaused=reduced,supportVisible=false,supportHover=false,supportTween=null;
supportList.innerHTML=support.map((s,i)=>`<article class="service-row" data-rise><button class="service-select" data-support="${i}" aria-pressed="false"><span class="service-num">${pad(i+1)}</span><div><h3>${s[0]}</h3><p>${s[1]}</p></div><span class="support-arrow">↗</span></button><button class="support-enquire" data-quote data-interest="${s[3]}">Enquire ↗</button></article>`).join('');
function selectSupport(i){if(i===supportActive)return;supportActive=i;const item=support[i];$$('.service-select').forEach((b,n)=>{b.setAttribute('aria-pressed',String(n===i));b.closest('.service-row').classList.toggle('is-current',n===i);});$('#service-title').textContent=item[0];$('#service-index').textContent=pad(i+1)+' / 08';if(supportTween)supportTween.kill();const existing=$$('img',supportMedia);const old=existing.at(-1);existing.slice(0,-1).forEach(im=>im.remove());if(old){old.getAnimations().forEach(a=>a.cancel());if(gs)gs.set(old,{clearProps:'clipPath,transform'});old.classList.remove('support-incoming');}const next=new Image();next.src=item[2];next.alt=item[0];next.className='support-incoming';supportMedia.append(next);if(old){supportMedia.querySelectorAll('img').forEach(im=>{if(im!==old&&im!==next)im.remove();});if(nativeMotion){if(motion){supportTween=gs.fromTo(next,{clipPath:'inset(0 100% 0 0)',scale:1.06},{clipPath:'inset(0 0% 0 0)',scale:1,duration:.8,ease:'power3.inOut',onComplete:()=>{old.remove();next.classList.remove('support-incoming');}});}else{const a=next.animate([{clipPath:'inset(0 100% 0 0)',transform:'scale(1.06)'},{clipPath:'inset(0 0% 0 0)',transform:'scale(1)'}],{duration:800,easing:'cubic-bezier(.77,0,.18,1)'});a.onfinish=()=>{old.remove();next.classList.remove('support-incoming');};}}else{old.remove();next.classList.remove('support-incoming');}}}
function scheduleSupport(){clearTimeout(supportTimer);if(!supportPaused&&supportVisible&&!supportHover&&!document.hidden)supportTimer=setTimeout(()=>{selectSupport((supportActive+1)%support.length);scheduleSupport();},5000);}
$$('.service-select').forEach(b=>{const fn=()=>{selectSupport(Number(b.dataset.support));scheduleSupport();};b.addEventListener('click',fn);b.addEventListener('focus',fn);b.addEventListener('mouseenter',()=>{if(hoverMedia.matches)fn();});});supportList.addEventListener('mouseenter',()=>{supportHover=true;scheduleSupport();});supportList.addEventListener('mouseleave',()=>{supportHover=false;scheduleSupport();});supportPause.addEventListener('click',()=>{supportPaused=!supportPaused;supportPause.textContent=supportPaused?'▷':'Ⅱ';supportPause.setAttribute('aria-pressed',String(supportPaused));supportPause.setAttribute('aria-label',supportPaused?'Resume support image rotation':'Pause support image rotation');scheduleSupport();});if(reduced){supportPause.textContent='▷';supportPause.setAttribute('aria-pressed','true');supportPause.setAttribute('aria-label','Resume support image rotation');}
selectSupport(0);new IntersectionObserver(([e])=>{supportVisible=e.isIntersecting;scheduleSupport();},{threshold:.15}).observe($('.service-visual'));document.addEventListener('visibilitychange',scheduleSupport);
// Modal interactions. Newsletter and quotation intentionally do not transmit data in this static demo.
function openDialog(d){closeNav();if(d.open)return;stopHero();d.showModal();if(lenis)lenis.stop();if(motion)gs.fromTo(d,{opacity:0,y:18},{opacity:1,y:0,duration:.35,ease:'power3.out'});}
$$('dialog').forEach(d=>{d.setAttribute('data-lenis-prevent','');d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}});d.addEventListener('close',()=>{if(lenis)lenis.start();scheduleHero();if(d.id==='film-dialog')$('#film-frame').replaceChildren();});});
$$('[data-close]').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
$$('[data-quote]').forEach(b=>b.addEventListener('click',()=>{$('#quote-form select').value=b.dataset.interest||'General enquiry';openDialog($('#quote-dialog'));}));
galleryGrid.addEventListener('click',e=>{const b=e.target.closest('[data-gallery-index]');if(!b)return;const g=gallery[Number(b.dataset.galleryIndex)];const image=$('#lightbox-image');image.style.visibility='';delete image.dataset.failed;image.src=g.image;image.alt=g.name;$('#lightbox-caption').textContent=g.name+' — '+g.credit;openDialog($('#image-dialog'));});
$('#watch-film').addEventListener('click',()=>{$('#film-frame').innerHTML='<iframe title="bti Hollow Blocks video" src="https://www.youtube-nocookie.com/embed/Fp3XaD7TlMY?autoplay=1" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';openDialog($('#film-dialog'));});
$('#newsletter-form').addEventListener('submit',e=>{e.preventDefault();$('.form-status',e.currentTarget).textContent='Demo only — no subscription was created. Connect the WordPress newsletter backend before launch.';});
$('#quote-form').addEventListener('submit',e=>{e.preventDefault();$('.form-status',e.currentTarget).textContent='Preview only — no enquiry was sent. Use the live contact form to contact bti.';});
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a||!a.hash||!document.getElementById(a.hash.slice(1)))return;e.preventDefault();closeNav();toAnchor(a.hash);});
// Repeatable AOS-style reveals. Observer handles entering from either direction;
// GSAP runs the choreography when available, Web Animations is the offline fallback.
// Reset only after the whole element exits the viewport, never hide visible text on a refresh.
const revealRecords=new Map();
const revealSelector='[data-split],[data-rise],.product-card,[data-mask],.section-top,.catalogue-note,.footer-column,.footer-identity';
const ease='cubic-bezier(.22,1,.36,1)';
function splitHeading(el){if(el.dataset.wrapped)return;el.dataset.wrapped='1';const parts=el.innerHTML.split(/<br\s*\/?\s*>/i);el.innerHTML=parts.map(t=>`<span class="reveal-line"><span class="reveal-line-inner">${t}</span></span>`).join('');}
function getParts(el){if(el.hasAttribute('data-split')){splitHeading(el);return $$('.reveal-line-inner',el).map((n,i)=>({n,from:{yPercent:112,opacity:0},to:{yPercent:0,opacity:1},frames:[{transform:'translateY(112%)',opacity:0},{transform:'translateY(0)',opacity:1}],duration:1.08,delay:i*.105}));}
 const card=el.matches('.product-card,.gallery-card');const mask=el.hasAttribute('data-mask');if(card||mask){const frame=card?$('.image-frame',el):el;const inner=frame&&$('img',frame);const body=card?$('.product-body,.gallery-copy',el):null;const list=[];if(frame)list.push({n:frame,from:{clipPath:'inset(0 0 98% 0)'},to:{clipPath:'inset(0 0 0% 0)'},frames:[{clipPath:'inset(0 0 98% 0)'},{clipPath:'inset(0 0 0% 0)'}],duration:1.12,delay:0});if(inner&&!el.matches('.service-visual,.factory-feature,.material-board'))list.push({n:inner,from:{scale:1.15},to:{scale:1},frames:[{transform:'scale(1.15)'},{transform:'scale(1)'}],duration:1.35,delay:0});if(body)list.push({n:body,from:{y:22,opacity:0},to:{y:0,opacity:1},frames:[{transform:'translateY(22px)',opacity:0},{transform:'translateY(0)',opacity:1}],duration:.8,delay:.2});return list;}
 return [{n:el,from:{y:25,opacity:0},to:{y:0,opacity:1},frames:[{transform:'translateY(25px)',opacity:0},{transform:'translateY(0)',opacity:1}],duration:.82,delay:0}];}
function cancelReveal(rec){rec.animations.forEach(a=>{if(a.kill)a.kill();else a.cancel();});rec.animations=[];rec.parts.forEach(({n})=>{if(gs)gs.set(n,{clearProps:'transform,opacity,clipPath'});});}
function playReveal(rec){if(rec.visible)return;rec.visible=true;rec.el.dataset.revealState='playing';cancelReveal(rec);if(!nativeMotion)return;const direction=rec.direction||1;rec.parts.forEach(p=>{const delay=p.delay+(rec.el.matches('.product-card,.gallery-card')?Math.min(2,Array.from(rec.el.parentElement.children).indexOf(rec.el)%3)*.075:0);const from={...p.from};let frames=p.frames;if(direction<0){if('yPercent' in from){from.yPercent=-108;frames=[{transform:'translateY(-108%)',opacity:0},p.frames[1]];}else if('y' in from){from.y=-22;frames=[{transform:'translateY(-22px)',opacity:0},p.frames[1]];}else if('clipPath' in from){from.clipPath='inset(98% 0 0 0)';frames=[{clipPath:from.clipPath},p.frames[1]];}}if(motion){const a=gs.fromTo(p.n,from,{...p.to,duration:p.duration,delay,ease:'power3.out',overwrite:'auto',clearProps:'transform,opacity,clipPath'});rec.animations.push(a);}else{rec.animations.push(p.n.animate(frames,{duration:p.duration*1000,delay:delay*1000,easing:ease,fill:'backwards'}));}});}
const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{const rec=revealRecords.get(e.target);if(!rec)return;if(e.isIntersecting){playReveal(rec);}else if(e.boundingClientRect.bottom<=0||e.boundingClientRect.top>=window.innerHeight){cancelReveal(rec);rec.visible=false;rec.direction=e.boundingClientRect.bottom<=0?-1:1;rec.el.dataset.revealState='ready';}});},{threshold:0});
function registerReveals(root=document){for(const [el,rec] of revealRecords){if(!el.isConnected){observer.unobserve(el);cancelReveal(rec);revealRecords.delete(el);}}if(!nativeMotion)return;$$(revealSelector,root).forEach(el=>{if(revealRecords.has(el))return;const rec={el,parts:getParts(el),animations:[],visible:false,direction:1};revealRecords.set(el,rec);observer.observe(el);});}
// Gallery: dedicated reversible cinematic entrance + independent scroll-scrub parallax.
const galleryMotion=[];
const animatedGalleryCards=()=>$$('.gallery-card[data-gallery-index="0"],.gallery-card[data-gallery-index="1"]',galleryGrid);
function destroyGalleryMotion(){destroyGalleryPair();galleryMotion.splice(0).forEach(r=>{r.trigger?.kill();r.parallax?.scrollTrigger?.kill();r.parallax?.kill();r.observer?.disconnect();r.timeline?.kill();r.animations?.forEach(a=>a.cancel());if(r.tick)window.removeEventListener('scroll',r.tick);});}
// Shared scroll progress moves the first-row cards in opposite directions.
// CSS translate is separate from GSAP transform/clipPath used by entrance and hover.
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
function setupGalleryMotion(){if(!nativeMotion)return;setupGalleryPair();animatedGalleryCards().forEach(card=>{
 const frame=$('.image-frame',card), img=$('img',frame), title=$('.gallery-title-mask>span',card), meta=$('.gallery-meta-mask>span',card), arrow=$('.gallery-copy>span',card);
 const r={animations:[],visible:false};galleryMotion.push(r);
 const reset=()=>{r.timeline?.kill();r.animations.forEach(a=>a.cancel());r.animations=[];r.visible=false;card.dataset.galleryMotion='ready';if(gs)gs.set([card,frame,title,meta,arrow],{clearProps:'transform,opacity,clipPath'});};
 const reveal=(direction=1)=>{if(r.visible)return;r.visible=true;card.dataset.galleryMotion='playing';const isRightCard=card.dataset.galleryIndex==='1';const delay=isRightCard ? .08 : 0;const clip=isRightCard?'inset(0% 100% 0% 0%)':'inset(0% 0% 0% 100%)';
  if(motion){r.timeline=gs.timeline({defaults:{ease:'power3.out'},delay}).fromTo(card,{opacity:.35},{opacity:1,y:0,duration:1.08,clearProps:'opacity,transform'},0).fromTo(frame,{clipPath:clip},{clipPath:'inset(0% 0% 0% 0%)',duration:1.25,clearProps:'clipPath'},0).fromTo([title,meta],{yPercent:direction*115,opacity:0},{yPercent:0,opacity:1,duration:.76,stagger:.12,clearProps:'transform,opacity'},.28).fromTo(arrow,{scale:.65,opacity:0},{scale:1,opacity:1,duration:.65,clearProps:'transform,opacity'},.47);}
  else {const anim=(el,frames,duration,offset=0)=>r.animations.push(el.animate(frames,{duration,delay:delay*1000+offset,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'}));anim(card,[{opacity:.35,transform:'translateY(0)'},{opacity:1,transform:'translateY(0)'}],1080);anim(frame,[{clipPath:clip},{clipPath:'inset(0% 0% 0% 0%)'}],1250);[title,meta].forEach((el,j)=>anim(el,[{transform:`translateY(${direction*115}%)`,opacity:0},{transform:'translateY(0)',opacity:1}],760,280+j*120));anim(arrow,[{transform:'scale(.65)',opacity:0},{transform:'scale(1)',opacity:1}],650,470);}
 };
 if(canTrigger){const top=()=>galleryGrid.getBoundingClientRect().top+scrollY+card.offsetTop;const start=()=>top()-innerHeight;const end=()=>top()+card.offsetHeight;r.trigger=st.create({trigger:galleryGrid,start,end,onEnter:()=>reveal(1),onEnterBack:()=>reveal(-1),onLeave:reset,onLeaveBack:reset});r.parallax=gs.fromTo(img,{yPercent:-8},{yPercent:8,ease:'none',scrollTrigger:{trigger:galleryGrid,start,end,scrub:true,invalidateOnRefresh:true}});}
 else {let direction=1;r.observer=new IntersectionObserver(([e])=>{if(e.isIntersecting)reveal(direction);else if(e.boundingClientRect.bottom<=0||e.boundingClientRect.top>=innerHeight){direction=e.boundingClientRect.bottom<=0?-1:1;reset();}},{threshold:0});r.observer.observe(card);let queued=false;r.tick=()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;if(!card.isConnected)return;const b=card.getBoundingClientRect();const progress=Math.min(1,Math.max(0,(innerHeight-b.top)/(innerHeight+b.height)));img.style.transform=`translateY(${(progress-.5)*16}%)`;});};window.addEventListener('scroll',r.tick,{passive:true});r.tick();}
 });}
function initMotion(){registerReveals();setupGalleryMotion();if(motion){gs.timeline({defaults:{ease:'power4.out'}}).fromTo('.hero-layer.active img',{scale:1.13},{scale:1.035,duration:1.8},0).fromTo('.hero-kicker',{opacity:0,y:16},{opacity:1,y:0,duration:.75,clearProps:'opacity,transform'},.1).fromTo('.hero-word',{clipPath:'inset(0 0 100% 0)',y:35},{clipPath:'inset(0 0 0% 0)',y:0,duration:1.05,stagger:.1,clearProps:'transform,clipPath'},.15).fromTo('.hero-detail,.hero-bottom',{opacity:0,y:17},{opacity:1,y:0,duration:.8,stagger:.12,clearProps:'transform,opacity'},.55);}
 else if(nativeMotion){$$('.hero-word').forEach((el,i)=>el.animate([{clipPath:'inset(0 0 100% 0)',transform:'translateY(35px)'},{clipPath:'inset(0 0 0% 0)',transform:'translateY(0)'}],{duration:1100,delay:150+i*100,fill:'backwards',easing:ease}));}
 if(canTrigger){gs.fromTo('.factory-media img',{yPercent:-5},{yPercent:5,ease:'none',scrollTrigger:{trigger:'.factory-feature',start:'top bottom',end:'bottom top',scrub:1.1}});gs.to('.hero-media',{yPercent:12,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1.2}});refresh();}
 else if(nativeMotion){let pending=false;const factory=$('.factory-feature'),img=$('.factory-media img');const tick=()=>{pending=false;const r=factory.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight){const progress=Math.max(0,Math.min(1,(innerHeight-r.top)/(innerHeight+r.height)));img.style.transform=`translateY(${(progress-.5)*10}%)`;}if(scrollY<$('.hero').offsetHeight)media.style.transform=`translateY(${scrollY*.10}px)`;};window.addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(tick);}},{passive:true});tick();}
 document.documentElement.dataset.motion=canTrigger?'gsap':motion?'gsap-partial':nativeMotion?'native-fallback':'reduced';console.info('[bti motion]',document.documentElement.dataset.motion, 'ScrollTrigger:',canTrigger,'Lenis:',!!lenis);scheduleHero();}
initMotion();window.addEventListener('load',refresh,{once:true});if(document.fonts?.ready)document.fonts.ready.then(refresh);
})();
