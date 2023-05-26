window.awe = window.awe || {};

function awe_showLoading(selector) {
	var loading = $('.loader').html();
	$(selector).addClass("loading").append(loading); 
}  window.awe_showLoading=awe_showLoading;
function awe_hideLoading(selector) {
	$(selector).removeClass("loading"); 
	$(selector + ' .loading-icon').remove();
}  window.awe_hideLoading=awe_hideLoading;
function awe_showPopup(selector) {
	$(selector).addClass('active');
}  window.awe_showPopup=awe_showPopup;
function awe_hidePopup(selector) {
	$(selector).removeClass('active');
}  window.awe_hidePopup=awe_hidePopup;
awe.hidePopup = function (selector) {
	$(selector).removeClass('active');
}
function awe_convertVietnamese(str) { 
	str= str.toLowerCase();
	str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
	str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
	str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
	str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
	str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
	str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
	str= str.replace(/đ/g,"d"); 
	str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,"-");
	str= str.replace(/-+-/g,"-");
	str= str.replace(/^\-+|\-+$/g,""); 
	return str; 
} window.awe_convertVietnamese=awe_convertVietnamese;
function awe_category(){
	$('.nav-category .fa-caret-down').click(function(e){
		$(this).toggleClass('fa-caret-up');
		$(this).parent().toggleClass('active');
	});
} window.awe_category=awe_category;
function initRecapchaScript(){
	!function(e,t,n){var a=t.getElementsByTagName(n)[0],c=t.createElement(n);c.async=true,c.src="https://www.google.com/recaptcha/api.js?render=6LdD18MUAAAAAHqKl3Avv8W-tREL6LangePxQLM-",a.parentNode.insertBefore(c,a)}(window,document,"script");  
}


function awe_backtotop() { 
	if ($('.back-to-top').length) {
		var scrollTrigger = 100, // px
			backToTop = function () {
				var scrollTop = $(window).scrollTop();
				if (scrollTop > scrollTrigger) {
					$('.back-to-top').addClass('show');
				} else {
					$('.back-to-top').removeClass('show');
				}

				if (scrollTop > ($(document).height() - 700) ) {
					$('.back-to-top').addClass('end');
				} else {
					$('.back-to-top').removeClass('end');
				}
			};
		backToTop();
		$(window).on('scroll', function () {
			backToTop();
		});
		$('.back-to-top').on('click', function (e) {
			e.preventDefault();
			$('html,body').animate({
				scrollTop: 0
			}, 700);
		});
	}
} window.awe_backtotop=awe_backtotop;
function awe_tab() {
	$(".e-tabs:not(.not-dqtab)").each( function(){
		$(this).find('.tabs-title li:first-child').addClass('current');
		$(this).find('.tab-content').first().addClass('current');
		$(this).find('.tabs-title li').click(function(e){
			var tab_id = $(this).attr('data-tab');
			var url = $(this).attr('data-url');
			var tab_content = $(this).parents('.e-tabs').next('.e-tabs')
			$(this).closest('.e-tabs').find('.tab-viewall').attr('href',url);
			$(this).closest('.e-tabs').find('.tabs-title li').removeClass('current');
			tab_content.find('.tab-content').removeClass('current');
			$(this).addClass('current');
			console.log(tab_content.html())

			tab_content.find("#"+tab_id).addClass('current');

		});    
	});
} window.awe_tab=awe_tab;


/********************************************************
# MENU MOBILE
********************************************************/
function awe_menumobile(){
	$('.menu-bar').click(function(e){
		e.preventDefault();
		$('#nav').toggleClass('open');
	});
	$('#nav .fa').click(function(e){		
		e.preventDefault();
		$(this).parent().parent().toggleClass('open');
	});
} window.awe_menumobile=awe_menumobile;
/*Double click go to link menu*/
;(function ($, window, document, undefined) {
	$.fn.doubleTapToGo = function (params) {
		if (!('ontouchstart' in window) &&
			!navigator.msMaxTouchPoints &&
			!navigator.userAgent.toLowerCase().match(/windows phone os 7/i)) return false;

		this.each(function () {
			var curItem = false;

			$(this).on('click', function (e) {
				var item = $(this);
				if (item[0] != curItem[0]) {
					e.preventDefault();
					curItem = item;
				}
			});

			$(document).on('click touchstart MSPointerDown', function (e) {
				var resetItem = true,
					parents = $(e.target).parents();

				for (var i = 0; i < parents.length; i++)
					if (parents[i] == curItem[0])
						resetItem = false;

				if (resetItem)
					curItem = false;
			});
		});
		return this;
	};
})(jQuery, window, document);
function initNavigation(){
$('.header-left').append($('[data-template="sticky-nav"]').html())
	$('.navigation-wrapper').html($('[data-template="navigation"]').html())
	$('body').append($('[data-template="menuMobile"]').html())
	initStickyHeader()
	var head = document.getElementsByTagName('head').item(0);
	var script = document.createElement('script');
	script.setAttribute('src', 'https://mixcdn.egany.com/themes/smartsearch-builtin/index.min.js');
	head.appendChild(script);
}
function prefetchUrl (url){
	window.prefetchUrlArr= window.prefetchUrlArr || []
	if(!window.prefetchUrlArr.includes(url) && url && url.includes('/')){
		window.prefetchUrlArr.push(url)
		let prefetchLink = `<link rel="prefetch" href="${url}">`
		$('head').eq(0).append(prefetchLink)
	}
}
function initStickyHeader(){
	const stickyHeader = $('.header_menu')
	const sticky =$(window).height() / 2
	$(window).scroll(()=>{
		let searchValue = $(' .header_menu #search-header .custom-input-group .input-group-field').val()
		if (window.pageYOffset > sticky) {
			stickyHeader.addClass("active");
		} else if ((window.innerWidth >= 992 && window.pageYOffset < sticky - 30) || (window.innerWidth < 992 && window.pageYOffset < sticky - 83))  {
			stickyHeader.removeClass("active")
		}
	})
}
var is_renderd = 0

function renderLayout(){
	if(is_renderd) return 
	is_renderd = 1

function awe_lazyloadImage() {
	var ll = new LazyLoad({
		elements_selector: ".lazyload",
		load_delay: 0,
		threshold: 0
	});
} window.awe_lazyloadImage=awe_lazyloadImage;
	//<![CDATA[ 
	function loadCSS(e, t, n) { "use strict"; var i = window.document.createElement("link"); var o = t || window.document.getElementsByTagName("footer")[0]; i.rel = "stylesheet"; i.href = e; i.media = "only x"; o.parentNode.insertBefore(i, o); setTimeout(function () { i.media = n || "all" }) }loadCSS("https://use.fontawesome.com/releases/v5.7.2/css/all.css");
	//]]> 

	//Haravan
	awe.init = function () {
		awe.showPopup();
		awe.hidePopup();	
	};
	$(document).ready(function ($) {
		"use strict";
		awe_backtotop();
		awe_category();
		awe_tab();
	});
	$('.close-pop').click(function() {
		$('#popup-cart').removeClass('opencart');
		$('body').removeClass('opacitycart');
	});
	$(document).on('click','.overlay, .close-popup, .btn-continue, .fancybox-close', function() {   
		hidePopup('.awe-popup'); 
		setTimeout(function(){
			$('.loading').removeClass('loaded-content');
		},500);
		return false;
	})
	$('.dropdown-toggle').click(function() {
		$(this).parent().toggleClass('open'); 	
	}); 
	
	$('.btn-close').click(function() {
		$(this).parents('.dropdown').toggleClass('open');
	}); 
	var wDWs = $(window).width();
	if (wDWs < 1199) {
		$('.ul_menu li:has(ul)' ).doubleTapToGo();
		$('.item_big li:has(ul)' ).doubleTapToGo();
	}
	$(document).on('keydown','#qty, .number-sidebar',function(e){-1!==$.inArray(e.keyCode,[46,8,9,27,13,110,190])||/65|67|86|88/.test(e.keyCode)&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&40>=e.keyCode||(e.shiftKey||48>e.keyCode||57<e.keyCode)&&(96>e.keyCode||105<e.keyCode)&&e.preventDefault()});
	$(document).on('click','.qtyplus',function(e){
		e.preventDefault();   
		fieldName = $(this).attr('data-field'); 
		var currentVal = parseInt($('input[data-field='+fieldName+']').val());
		if (!isNaN(currentVal)) { 
			$('input[data-field='+fieldName+']').val(currentVal + 1);
		} else {
			$('input[data-field='+fieldName+']').val(0);
		}
	});
	$(document).on('click','.qtyminus',function(e){
		e.preventDefault(); 
		fieldName = $(this).attr('data-field');
		var currentVal = parseInt($('input[data-field='+fieldName+']').val());
		if (!isNaN(currentVal) && currentVal > 1) {          
			$('input[data-field='+fieldName+']').val(currentVal - 1);
		} else {
			$('input[data-field='+fieldName+']').val(1);
		}
	});
	$(document).on('click','.open-filters', function(e){
		e.stopPropagation();
		$(this).toggleClass('openf');
		$('.dqdt-sidebar').toggleClass('openf');
		$('body').toggleClass('modal-open')
		$('.opacity_menu').toggleClass('open_opacity')
	}) 
	$(document).ready(function() {
		$('.btn-wrap').click(function(e){
			$(this).parent().slideToggle('fast');
		});


	});
	$(document).ready(function(){
		var wDW = $(window).width();
		/*Footer*/
		if(wDW > 767){
			$('.toggle-mn').show();
		}else {
			$('.footer-click > .clicked').click(function(){
				$(this).toggleClass('open_');
				$(this).next('ul').slideToggle("fast");
				$(this).next('div').slideToggle("fast");
			});
		}
	});

	/*MENU MOBILE*/
	var ww = $(window).width();
	if (ww < 992){
		$('.menu-bar').on('click', function(){
			$('.menu_mobile').slideToggle('400');
		});
	}
	$('.opacity_menu').click(function(e){
		$('.menu_mobile').removeClass('open_sidebar_menu');
		$('.opacity_menu').removeClass('open_opacity');
		$('.sidebar').removeClass('openf')
		$('body').toggleClass('modal-open')

	});

	if ($('.dqdt-sidebar').hasClass('openf')) {
		$('.wrapmenu_full').removeClass('open_menu');
	} 
	$('.ul_collections li > .fa').click(function(){
		$(this).parent().toggleClass('current');
		$(this).toggleClass('fa-angle-down fa-angle-up');
		$(this).next('ul').slideToggle("fast");
		$(this).next('div').slideToggle("fast");
	});
	$('.searchion').mouseover(function() {
		$('.searchmini input').focus();                    
	})
	$('.quenmk').on('click', function() {
		$('.h_recover').slideToggle();
	});

	$('a[data-toggle="collapse"]').click(function(e){
		if ($(window).width() >= 767) { 
			// Should prevent the collapsible and default anchor linking 
			// behavior for screen sizes equal or larger than 768px.
			e.preventDefault();
			e.stopPropagation();
		}    
	});
	/** custom **/

	initNavigation()
	$('[data-toggle-submenu]').click(function(e){
		e.preventDefault();
		e.stopPropagation();
		$(this).parents('.menu-item').addClass('active')
	})
	$('.toggle-submenu').click(function(e){
		e.preventDefault();
		e.stopPropagation();
		$('#mobile-menu .menu-item ').removeClass('active')
	})

	$('.toggle-nav').click(function(){
		$('#mobile-menu').addClass('active')
		$('body').addClass('modal-open')
	})
	$('.menu-overlay, .menu-close-btn').click(function(){
		$('#mobile-menu').removeClass('active')
		$('body').removeClass('modal-open')
	})
	$.getScript(vendors).then(()=>{
		let placeholderText =$('.auto-search').data('placeholder') ? $('.auto-search').data('placeholder').split(';').filter(Boolean) :[]
		placeholderText.length && $('.auto-search').placeholderTypewriter({text: placeholderText});
		})

initRecapchaScript()
if($('.form_register').length > 0){
    $('.form_register form').submit(function(e) { 
        e.preventDefault();
        alert('submit')
        var self = $(this);
        if($(this)[0].checkValidity() == true){
            grecaptcha.ready(function() {
                grecaptcha.execute('6LdD18MUAAAAAHqKl3Avv8W-tREL6LangePxQLM-', {action: 'submit'}).then(function(token) {
                    self.find('input[name="g-recaptcha-response"]').val(token);
                    self.unbind('submit').submit();
                }); 
            });
        }
    });
}

$(document).on('click','.group_action',function(e){
	let url = $(this).data('url')
	if(url && e.currentTarget == e.target){
		window.location.href= url
	}
})

$('img').removeAttr('loading')
$('.navigation  a, section a,.group_action, .list-menu  a, .logo-wrapper, .breadcrumb a').one('mouseenter touchstart' ,(function(){
	let url =	$(this).attr('href') || $(this).data('url')
	prefetchUrl(url)
}))
		 
$('.auto-search').on('focus input', function(e) {
	if (e.target.value) {
		$('.search-overlay').addClass('active')
	} else {
		$('.search-overlay').removeClass('active')
	}
})

$('.search-overlay').click(() => {
    $('.search-overlay').removeClass('active')
})

if($(window).width() >= 1200){
	$("body:not(#template-index) .subheader .toogle-nav-wrapper").hover(function(){
		$("body").addClass("menu-is-hover");
	}, function(){
		$("body").removeClass("menu-is-hover");
	});
}
}

$(document).ready(function ($) {
	$(window).one(' mousemove touchstart scroll',renderLayout)


});

