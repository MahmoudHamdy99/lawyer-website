(function(){
	// service-nav.js
	// - sets hrefs for header links (in-page or fall back to index anchors)
	// - enables smooth in-page scrolling
	// - implements scroll-spy to mark active nav link
	// - toggles sticky/shrink classes on the header when scrolling
	const SELECTOR = '.service-header';

	function onReady(fn){
		if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
		else fn();
	}

	onReady(() => {
		const header = document.querySelector(SELECTOR);
		if(!header) return;

		const links = Array.from(header.querySelectorAll('[data-target]'));
		const idToLink = new Map();
		const targets = [];

		links.forEach(a => {
			const target = a.getAttribute('data-target');
			if(!target) return;
			targets.push(target);
			idToLink.set(target, a);
			// set href according to whether the target exists on this page
			if(document.getElementById(target)){
				a.setAttribute('href', '#' + target);
				a.addEventListener('click', function(e){
					e.preventDefault();
					const el = document.getElementById(target);
					if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
				});
			}else{
				a.setAttribute('href', 'index.html#' + target);
			}
		});

		// Scroll spy using IntersectionObserver
		const observed = targets.map(id => document.getElementById(id)).filter(Boolean);
		if(observed.length){
			const options = { root: null, rootMargin: '0px 0px -40% 0px', threshold: [0, 0.25, 0.5] };
			const observer = new IntersectionObserver((entries) => {
				// find the best entry (most intersecting)
				let best = null;
				entries.forEach(en => {
					if(!best) best = en;
					else if(en.intersectionRatio > best.intersectionRatio) best = en;
				});
				if(best && best.isIntersecting){
					const id = best.target.id;
					// toggle active classes
					idToLink.forEach((link, key) => {
						if(key === id) link.classList.add('active');
						else link.classList.remove('active');
					});
				}
			}, options);
			observed.forEach(el => observer.observe(el));
		}

		// Sticky + shrink behavior
		// If the service header is inside the page <header> (hero), we don't use sticky/shrink
		const insideHero = header.closest('header') !== null;
		if(!insideHero){
			let lastScroll = 0;
			const shrinkThreshold = 120; // px
			function onScroll(){
				const y = window.scrollY || window.pageYOffset;
				// add sticky once user scrolled a bit
				if(y > 10) header.classList.add('sticky'); else header.classList.remove('sticky');
				// shrink for larger scroll
				if(y > shrinkThreshold) header.classList.add('shrink'); else header.classList.remove('shrink');
				lastScroll = y;
			}

			// Use rAF for scroll handler
			let ticking = false;
			window.addEventListener('scroll', function(){
				if(!ticking){
					window.requestAnimationFrame(function(){ onScroll(); ticking = false; });
					ticking = true;
				}
			}, {passive:true});

			// initialize state
			onScroll();
		} else {
			// if inside hero, ensure header doesn't have sticky/shrink classes
			header.classList.remove('sticky','shrink');
		}
	});
})();

