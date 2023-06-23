
const 
	body = document.querySelector('body'),
	html = document.querySelector('html'),
	menu = document.querySelectorAll('.header__burger, .header__nav, body'),
	burger = document.querySelector('.header__burger'),
	header = document.querySelector('.header');


// =-=-=-=-=-=-=-=-=-=- <image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-

const imageBody = document.querySelectorAll('.image-body, figure');
imageBody.forEach(imageBody => {
	const img = imageBody.querySelector('img'), style = getComputedStyle(imageBody);
	if(img) {
		if(img.getAttribute('width') && img.getAttribute('height') && style.position == "relative")
		imageBody.style.paddingTop = Number(img.getAttribute('height')) / Number(img.getAttribute('width')) * 100 + '%';
	}
	
})

// =-=-=-=-=-=-=-=-=-=- </image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-


// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

const aboutProjectContent = new Splide('.about-project__content', {
	perPage: 1,
	gap: 20,
	pagination: false,
	arrows: true,
})

aboutProjectContent.mount();

const gallerySlider = new Splide('.gallery__slider', {
	type: "loop",
	perPage:1,
	gap: 30,
	pagination: false,
	arrows: true,
	speed: 2000,
	focus: 'center',
	padding: '30vw',
	breakpoints: {
		992: {
			padding: '10vw',
			gap: 16,
			speed: 1000,
		},
		550: {
			gap: 8,
		},
	}
})

gallerySlider.on('mounted', function () {
	setTimeout(() => {
		gallerySlider.refresh();
		gallerySlider.go(1)
	},0)
	console.log('test')
})

gallerySlider.mount()


const galleryPopupSlider = new Splide('.gallery-popup__slider', {
	type: "loop",
	perPage:1,
	gap: 30,
	pagination: false,
	arrows: true,
	speed: 1000,
	focus: 'center',
	padding: '10vw',
	updateOnMove: true,
	breakpoints: {
		992: {
			gap: 16,
		},
		550: {
			gap: 8,
		},
	}
})

galleryPopupSlider.mount()

const expertsSlider = new Splide('.experts__slider', {
	perPage: 1,
	gap: 16,
	pagination: false,
	arrows: true,
	drag: false,
})

expertsSlider.on('mounted', function (event) {
	if(expertsSlider.root.classList.contains('is-overflow')) expertsSlider.options.drag = true;
})

expertsSlider.on('active', function (event) {
	event.slide.parentElement.style.height = event.slide.offsetHeight + 'px';
})

expertsSlider.mount();

const locationSlider = new Splide('.location__slider', {
	perPage: 2,
	heightRatio : 1.35,
	pagination: false,
	arrows: true,
	gap: 30,
	direction : 'ttb',
	wheel: true,
	drag: false,
	breakpoints: {
		992: {
			direction : 'ltr',
			gap: 8,
			heightRatio : false,
		},
		768: {
			perPage: 1,
			padding: {
				right: '15vw',
			}
		}
	}
})

locationSlider.on('mounted', function (event) {
	if(locationSlider.root.classList.contains('is-overflow')) locationSlider.options.drag = true;
})

locationSlider.mount()



// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

let windowSize = 0;

function resize() {

	html.style.setProperty("--height-header", header.offsetHeight + "px");
	if(windowSize != window.innerWidth) {
		html.style.setProperty("--svh", window.innerHeight * 0.01 + "px");
	}
	html.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
	
	windowSize = window.innerWidth;
	
}

resize();

window.addEventListener('resize', resize)

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=- <click events> -=-=-=-=-=-=-=-=-=-=-

body.addEventListener('click', function (event) {

	function $(elem) {
		return event.target.closest(elem)
	}

	// =-=-=-=-=-=-=-=-=-=- <open menu in header> -=-=-=-=-=-=-=-=-=-=-

	if ($('.header__burger')) {
		menu.forEach(element => {
			element.classList.toggle('_mob-menu-active')
		})
	}

	// =-=-=-=-=-=-=-=-=-=- </open menu in header> -=-=-=-=-=-=-=-=-=-=-

	
	
	// =-=-=-=-=-=-=-=-=-=-=-=- <video-preview> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const aboutProjectVideoPreview = $(".about-project__video--preview")
	if(aboutProjectVideoPreview) {
	
		const videoWrapper = aboutProjectVideoPreview.parentElement,
		video = videoWrapper.querySelector('.about-project__video--element');

		videoWrapper.classList.add('_hidden');
		setTimeout(() => {
			video.play();
		},400)
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </video-preview> -=-=-=-=-=-=-=-=-=-=-=-=



	// =-=-=-=-=-=-=-=-=-=-=-=- <gallery-filter> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const galleryFilterButton = $(".gallery__filter button")
	if(galleryFilterButton) {

		if(!galleryFilterButton.classList.contains('current')) {

			if(document.querySelector('.gallery__filter button.current')) document.querySelector('.gallery__filter button.current').classList.remove('current');
			galleryFilterButton.classList.add('current');
		
			const section = galleryFilterButton.closest('section'),
			slider = section.querySelector('.splide'),
			galleryPopup = document.querySelector('#gallery-popup'),
			slides = slider.querySelectorAll('.gallery__slider--slide'),
			gallerySlides = galleryPopup.querySelectorAll('.gallery-popup__slider--slide');

			slider.classList.add('_hidden');

			setTimeout(() => {
				slides.forEach(slide => {
					if(slide.dataset.category != galleryFilterButton.dataset.categoryTarget && galleryFilterButton.dataset.categoryTarget != 'all') {
						slide.classList.add('_hidden');
						slide.classList.remove('splide__slide');
					} else {
						slide.classList.remove('_hidden');
						slide.classList.add('splide__slide');
					}
				})

				gallerySlides.forEach(slide => {
					if(slide.dataset.category != galleryFilterButton.dataset.categoryTarget && galleryFilterButton.dataset.categoryTarget != 'all') {
						slide.classList.add('_hidden');
						slide.classList.remove('splide__slide');
					} else {
						slide.classList.remove('_hidden');
						slide.classList.add('splide__slide');
					}
				})

				gallerySlider.destroy();
				gallerySlider.mount();

				galleryPopupSlider.destroy();
				galleryPopupSlider.mount();
				//galleryPopupSlider.go(0)
				gallerySlider.go(1)
		
				setTimeout(() => {
					slider.classList.remove('_hidden');
				},200)
			},500)

		}

	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </gallery-filter> -=-=-=-=-=-=-=-=-=-=-=-=



	// =-=-=-=-=-=-=-=-=-=-=-=- <experts> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const expertsItem = $(".experts__item:not(._active)")
	if(expertsItem) {

		expertsItem.style.height = expertsItem.offsetHeight + 'px';
	
		const activeExpertsItem = document.querySelector('.experts__item._active');
		activeExpertsItem.querySelector('.experts__item--text').style.paddingRight = (windowSize >= 1200) ? '67px' : '35px';
		activeExpertsItem.classList.remove('_active-end')
		
		setTimeout(() => {
			activeExpertsItem.classList.remove('_active');
			expertsItem.style.height = "415px";

			expertsItem.classList.add('_active-start')
			const text = expertsItem.querySelector('.experts__item--text');
	
			setTimeout(() => {
				expertsItem.classList.add('_active');
				expertsItem.classList.remove('_active-start')
				
				setTimeout(() => {
					expertsItem.style.height = expertsItem.offsetHeight + 'px';
					text.style.paddingRight = (windowSize >= 1200) ? '67px' : '35px';
					setTimeout(() => {
						if(windowSize >= 1200) {
							expertsItem.style.setProperty('height', (text.offsetHeight + 200 + 24) + 'px');
						} else {
							expertsItem.style.setProperty('height', (text.offsetHeight + 100 + 24) + 'px');
						}
						text.style.removeProperty('padding-right');
						setTimeout(() => {
							expertsItem.classList.add('_active-end')
							expertsItem.style.removeProperty('height')
						},400)
					},0)
					
				},500)
			},200)
		},400)

	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </experts> -=-=-=-=-=-=-=-=-=-=-=-=



	// =-=-=-=-=-=-=-=-=-=-=-=- <filter-popup> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const planFilterTarget = $(".plan-filter__target")
	if(planFilterTarget) {
	
		const popup = document.querySelector('.plan-filter__popup');
		popup.classList.add('_active');

		body.classList.remove('_popup-active');
		html.style.setProperty('--popup-padding', window.innerWidth - body.offsetWidth + 'px');
		body.classList.add('_popup-active');
	
	}

	if($('.plan-filter__popup--bg') || $('.plan-filter__popup--close')) {
		body.classList.remove('_popup-active');
		html.style.setProperty('--popup-padding', '0px');
		document.querySelector('.plan-filter__popup').classList.remove('_active');
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </filter-popup> -=-=-=-=-=-=-=-=-=-=-=-=



	// =-=-=-=-=-=-=-=-=-=-=-=- <FAQ> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const faqQuestion = $(".faq__question")
	if(faqQuestion) {
	
		const item = faqQuestion.parentElement;
		item.classList.toggle('_active')
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </FAQ> -=-=-=-=-=-=-=-=-=-=-=-=

	// =-=-=-=-=-=-=-=-=-=-=-=- <scroll on click to section> -=-=-=-=-=-=-=-=-=-=-=-=
	let scrollTo = $('.scroll-to');
	if(scrollTo) {
		event.preventDefault();
		let section;
	
		if(scrollTo.getAttribute('href')) {
			section = document.querySelector(scrollTo.getAttribute('href'))
		} else {
			section = false;
		}
		
		menu.forEach(elem => {
			elem.classList.remove('_mob-menu-active')
		})
	
		if(section) {
			section.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
		} else {
			body.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
		}
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </scroll on click to section> -=-=-=-=-=-=-=-=-=-=-=-=

})

// =-=-=-=-=-=-=-=-=-=- </click events> -=-=-=-=-=-=-=-=-=-=-




// =-=-=-=-=-=-=-=-=-=-=-=- <filter> -=-=-=-=-=-=-=-=-=-=-=-=

const filter = document.querySelector('.plan-filter');
if(filter) {

	let url = new URL(document.URL);
	let params = new URLSearchParams(url.search);

	const sortRadios = filter.querySelectorAll('.plan-filter__sort-btn');
	sortRadios.forEach(sortRadio => {
		const icon = sortRadio.querySelector('svg use');
		sortRadio.addEventListener('click', function (event) {

			sortRadios.forEach(sortRadio2 => {
				if(sortRadio2 != sortRadio) {
					const icon = sortRadio2.querySelector('svg use');
					sortRadio2.classList.remove('_active-asc')
					sortRadio2.classList.remove('_active-desc')
					icon.setAttribute('xlink:href', icon.getAttribute('xlink:href').replace(icon.getAttribute('xlink:href').slice(icon.getAttribute('xlink:href').indexOf('#')), "#filter-sort"))
					params.delete(sortRadio2.dataset.name)
					
				}
			})
			
			if(!sortRadio.classList.contains('_active-asc') && !sortRadio.classList.contains('_active-desc')) {

				sortRadio.classList.add('_active-asc');
				icon.setAttribute('xlink:href', icon.getAttribute('xlink:href').replace(icon.getAttribute('xlink:href').slice(icon.getAttribute('xlink:href').indexOf('#')), "#filter-sort-asc"))
				params.set(sortRadio.dataset.name, "ASC")
				history.pushState("", "",`?${params.toString()}`);

			} else if(sortRadio.classList.contains('_active-asc') && !sortRadio.classList.contains('_active-desc')) {

				sortRadio.classList.remove('_active-asc');
				sortRadio.classList.add('_active-desc');
				icon.setAttribute('xlink:href', icon.getAttribute('xlink:href').replace(icon.getAttribute('xlink:href').slice(icon.getAttribute('xlink:href').indexOf('#')), "#filter-sort-desc"))
				params.set(sortRadio.dataset.name, "DESC")
				history.pushState("", "",`?${params.toString()}`);

			} else if(sortRadio.classList.contains('_active-desc') && !sortRadio.classList.contains('_active-asc')) {

				sortRadio.classList.remove('_active-desc');
				icon.setAttribute('xlink:href', icon.getAttribute('xlink:href').replace(icon.getAttribute('xlink:href').slice(icon.getAttribute('xlink:href').indexOf('#')), "#filter-sort"))
				params.delete(sortRadio.dataset.name);
				history.pushState("", "",`?${params.toString()}`);

			}
			
		})
	})


	const paramItems = filter.querySelectorAll('.plan-filter__param-row--btn input');
	paramItems.forEach(paramItem => {
		paramItem.addEventListener('change', function (event) {
			if(paramItem.getAttribute('type') == 'checkbox') {
				if(paramItem.checked) {
					params.set(paramItem.name, paramItem.value)
				} else {
					params.delete(paramItem.name, paramItem.value)
				}
				
			} else  {
				params.set(paramItem.name, paramItem.value)
			}
			
			history.pushState("", "",`?${params.toString()}`);
		})
	})

	const checkboxList = filter.querySelectorAll('.plan-filter__checkbox-list input');
	checkboxList.forEach(input => {
		input.addEventListener('change', function (event) {
			
			if(input.checked) {
				params.set(input.name, input.value);
			} else {
				params.delete(input.name);
			}
			
			history.pushState("", "",`?${params.toString()}`);
		})
	})

		
	const planFilterRange = document.querySelectorAll('.plan-filter__range');

	const reset = filter.querySelector('[type="reset"]');
	

	planFilterRange.forEach(planFilterRange => {
		const element = planFilterRange.querySelector('.plan-filter__range--element'),
		min = planFilterRange.querySelector('.plan-filter__range--min'),
		max = planFilterRange.querySelector('.plan-filter__range--max');

		noUiSlider.create(element, {
			start: [(params.get(`${element.dataset.name}_min`) ? params.get(`${element.dataset.name}_min`) : element.dataset.min), (params.get(`${element.dataset.name}_max`) ? params.get(`${element.dataset.name}_max`) : element.dataset.max)],
			connect: true,
			step: 1,
			range: {
				'min': Number(element.dataset.min),
				'max': Number(element.dataset.max)
			}
		});

		element.noUiSlider.on('update', function (event) {
			min.textContent = Number(event[0]).toLocaleString('ru-RU');
			max.textContent = Number(event[1]).toLocaleString('ru-RU');
		})

		element.noUiSlider.on('change', function (event) {
			params.set(`${element.dataset.name}_min`, Math.round(Number(event[0])));
			params.set(`${element.dataset.name}_max`, Math.round(Number(event[1])));

			history.pushState("", "",`?${params.toString()}`);
		})

		reset.addEventListener('click', function (event) {
			element.noUiSlider.set([Number(element.dataset.min),Number(element.dataset.max)])
		})

	})

	if(reset) {
		reset.addEventListener('click', function (event) {
			filter.querySelectorAll('input:checked').forEach(input => {
				input.checked = false;
			})

			url.search = '';
			history.pushState("", "", url.href);
			url = new URL(document.URL);
			params = new URLSearchParams(url.search);
		})
	}

	

}

// =-=-=-=-=-=-=-=-=-=-=-=- </filter> -=-=-=-=-=-=-=-=-=-=-=-=


function Popup(arg) {

	let body = document.querySelector('body'),
		html = document.querySelector('html'),
		saveHref = (typeof arg == 'object') ? (arg['saveHref']) ? true : false : false,
		popupCheck = true,
		popupCheckClose = true;

	const removeHash = function () {
		let uri = window.location.toString();
		if (uri.indexOf("#") > 0) {
			let clean_uri = uri.substring(0, uri.indexOf("#"));
			window.history.replaceState({}, document.title, clean_uri);
		}
	}

	const open = function (id, initStart) {

		if (popupCheck) {
			popupCheck = false;

			let popup = document.querySelector(id);

			if (popup) {

				if(popup.classList.contains('popup')) {

					body.classList.remove('_popup-active');
					html.style.setProperty('--popup-padding', window.innerWidth - body.offsetWidth + 'px');
					body.classList.add('_popup-active');

					if (saveHref) history.pushState('', "", id);

					popup.style.display = 'flex';

					if(popup.getAttribute('id') == 'gallery-popup') {
						//galleryPopupSlider.options.speed = 0,
						galleryPopupSlider.refresh();
						setTimeout(() => {
							galleryPopupSlider.go(gallerySlider.index);
						},0)
					}

					setTimeout(() => {
						if (!initStart) {
							popup.classList.add('_active');
							//galleryPopupSlider.options.speed = 1000;
							function openFunc() {
								popupCheck = true;
								popup.classList.add('_active-end');
								popup.removeEventListener('transitionend', openFunc);
							}
							popup.addEventListener('transitionend', openFunc)
						} else {
							popup.classList.add('_transition-none');
							popup.classList.add('_active');
							popupCheck = true;
						}

					}, 100)
				}

			} else {
				return new Error(`Not found "${id}"`)
			}
		}
	}

	const close = function (popupClose) {
		if (popupCheckClose) {
			popupCheckClose = false;

			let popup
			if (typeof popupClose === 'string') {
				popup = document.querySelector(popupClose)
			} else {
				popup = popupClose.closest('.popup');
			}

			if (popup.classList.contains('_transition-none')) popup.classList.remove('_transition-none')

			setTimeout(() => {
				
				function closeFunc() {
					const activePopups = document.querySelectorAll('.popup._active');

					if (activePopups.length < 1) {
						body.classList.remove('_popup-active');
						html.style.setProperty('--popup-padding', '0px');
					}

					if (saveHref) {
						removeHash();
						if (activePopups[activePopups.length - 1]) {
							history.pushState('', "", "#" + activePopups[activePopups.length - 1].getAttribute('id'));
						}
					}

					popupCheckClose = true;
					popup.style.display = "none";
					/* popup.removeEventListener('transitionend', closeFunc) */
					/* setTimeout(() => {
						popup.style.display = "none";
					},400) */
				}

				
				/* popup.addEventListener('transitionend', closeFunc) */

				popup.classList.remove('_active');
				popup.classList.remove('_active-end');

				setTimeout(() => {
					closeFunc()
				},500)

			}, 0)

		}
	}

	return {

		open: function (id) {
			open(id);
		},

		close: function (popupClose) {
			close(popupClose)
		},

		init: function () {

			let thisTarget
			body.addEventListener('click', function (event) {

				thisTarget = event.target;

				let popupOpen = thisTarget.closest('.open-popup');
				if (popupOpen) {
					event.preventDefault();
					open(popupOpen.getAttribute('href'))
				}

				let popupClose = thisTarget.closest('.popup-close');
				if (popupClose) {
					close(popupClose)
				}

			});

			if (saveHref) {
				let url = new URL(window.location);
				if (url.hash) {
					open(url.hash, true);
				}
			}
		},

	}
}

const popup = new Popup();

popup.init()






/* 
// =-=-=-=-=-=-=-=-=-=-=-=- <lazyload> -=-=-=-=-=-=-=-=-=-=-=-=

new LazyLoad();

// =-=-=-=-=-=-=-=-=-=-=-=- </lazyload> -=-=-=-=-=-=-=-=-=-=-=-=
 */

/* 
// =-=-=-=-=-=-=-=-=-=-=-=- <animation> -=-=-=-=-=-=-=-=-=-=-=-=

AOS.init({
	disable: "mobile",
});

// =-=-=-=-=-=-=-=-=-=-=-=- </animation> -=-=-=-=-=-=-=-=-=-=-=-=

*/
