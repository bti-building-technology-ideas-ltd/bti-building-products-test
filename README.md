# bti Building Products — Homepage V3

## Run
Extract the ZIP and open `bti-homepage-v3/index.html` with VS Code Live Server. No npm/build step. Alternatively open the single-file preview. Internet access is required for official remote images, fonts, GSAP/ScrollTrigger, Lenis, and YouTube.

## V3 changes
- Hero layout uses explicit top and bottom safe areas with viewport-height-aware typography, preventing overlap with slider controls. Auto rotation and transparent/glassy navbar retained.
- Materials in real spaces: dedicated per-card GSAP ScrollTrigger entrances in both scroll directions, cinematic directional image masking, masked title and metadata stagger, independent scrubbed image parallax, hover scale and arrow response. Gallery filters rebuild and clean up animation instances. Native Web Animations + IntersectionObserver fallback when the CDN fails.
- Our Factory: full-width film cover from the official homepage video (YouTube ID Fp3XaD7TlMY). High-res thumbnail, then standard thumbnail, then official factory photo as fallbacks. Actual opening frame could not be extracted or visually verified. Play opens the same film in a dialog; close removes the iframe.
- Refined neutral warm-white and charcoal backgrounds with restrained green accents. Other homepage content and the eight project support topics retained.

## Testing and limitations
JS syntax checked. Chromium layout and horizontal overflow checked at 1585x810, 1440x900, 1280x650, 390x844, and 360x640. Gallery replay, gallery filter rebinding, factory player dialog open/close checked on desktop and mobile with external network requests blocked. No runtime errors in those tests. GSAP/Lenis CDN and remote images/video could not be loaded in this environment; actual GSAP playback, image crops and YouTube streaming require testing in a connected browser. Check `document.documentElement.dataset.motion` in DevTools (`gsap`, `native-fallback`, `reduced`). Newsletter and quote forms are frontend demos only; no WordPress backend connected. Product and other external links retain the existing site URLs. Respect reduced-motion settings.
# bti-building-products-test
