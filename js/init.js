


(function($){
  "use strict";
  
  
	let Resumo = {
		
		root: $(':root'),
		
		/* collect all functions for next initialization */
		init: function(){
			/* Set background image from data attribute */
			Resumo.BgImg();
			
			/* Change image into SVG */
			Resumo.imgToSVG();
			
			/* Set scroll for right panel */
			Resumo.rightPanelScroll();
			
			/* Right Panel Opener */
			Resumo.rightNav();
			
			/* Tabs */
			Resumo.tabs();
			
			/* Progress Bar */
			Resumo.progress();
			
			/* Magic Cusror */
			Resumo.cursor();
			
			/* Portfolio Carousel */
			Resumo.portfolioCarousel();
			
			/* Testimonial Carousel */
			Resumo.testimonialCarousel();
			
			/* Load more blog posts */
			Resumo.loadBlogPosts();
			
			/* Movig placeholders */
			Resumo.movingPlaceholder();
			
			/* Contact Form */
			Resumo.contactForm();
			
			/* Scroll to Anchor */
			Resumo.scrollToAnchor();
			
			/* Page width Animation*/
			Resumo.pageWidthAnimation();
			
			/* Modalbox for portfolio and blog */
			Resumo.modal();
			
			/* Type Effect for right panel */
			Resumo.typed();
		},
		
		typed: function(){
			$('.animated_title').each(function(){
				let span		= $(this);
				let items		= span.find('.title_in');
				if(items !== ''){
					let strings = [];
					items.each(function(){
						strings.push($(this).text());
					});
					span.typed({
						strings: strings,
						loop: true,
						smartBackspace: false,
						typeSpeed: 40,
						startDelay: 700,
						backDelay: 3e3
					});	
				}
			});
		},
		
		modal: function(){
			let self		= this;
			let modalBox	= $('.vin_fn_modalbox');
			let item		= $('.modal_item');
			let closePopup	= modalBox.find('.closer,.extra_closer');
			let prevNext	= modalBox.find('.fn__nav');
			let extraCloser = modalBox.find('.extra_closer');
			extraCloser.on('mouseenter',function(){
				modalBox.addClass('hovered');
			}).on('mouseleave',function(){
				modalBox.removeClass('hovered');
			});
			item.on('click',function(){
				let element		= $(this);
				let content 	= element.find('.fn__hidden').html();
				
				
				let items		= element.closest('.modal_items'),
					index		= element.attr('data-index'),
					from		= items.attr('data-from');
				prevNext.attr('data-index',index);
				prevNext.attr('data-from',from);
				
				
				$('body').addClass('modal');
				modalBox.addClass('opened');
				modalBox.find('.modal_in').html(content);
				
				self.modal_prevnext(prevNext,modalBox);
				self.imgToSVG();
				self.BgImg();
				
				return false;
			});
			self.modal_prevnext(prevNext,modalBox);
			closePopup.on('click',function(){
				modalBox.removeClass('opened hovered');
				modalBox.find('.modal_in').html('');
				$('body').removeClass('modal');
				return false;
			});
		},
		
		modal_prevnext: function(prevNext,modalBox){
			let self		= this;
			prevNext.find('a').off().on('click',function(){
				let e		= $(this);
				let from 	= prevNext.attr('data-from');
				let index	= parseInt(prevNext.attr('data-index'));
				let itemss	= $('.modal_items[data-from="'+from+'"]');
				let count	= parseInt(itemss.attr('data-count'));
				if(e.hasClass('prev')){
					index--;
				}else{
					index++;
				}
				if(index < 1){index = count;}
				if(index > count){index = 1;}
				
				let content = itemss.find('.modal_item[data-index="'+index+'"] .fn__hidden').html();
				prevNext.removeClass('disabled');
				prevNext.attr('data-index',index);
				
				setTimeout(function(){
					modalBox.find('.modal_in').fadeOut(500, function() {
						$(this).html('').html(content).fadeIn(500);
					});
				},500);
					
				$(".vin_fn_modalbox .modal_content").stop().animate({scrollTop:0}, 500, 'swing');
				
				self.modal_prevnext(prevNext,modalBox);
				self.imgToSVG();
				self.BgImg();
				return false;
			});
		},
		
		scrollToAnchor: function(){
			$('a[href^="#"]').not('[href="#"]').not('[href^="#tab"]').on('click',function(){
				let element = $(this);
				let section	= $(element.attr('href'));
				if(section.length){
					$("html, body").animate({ 
						scrollTop: section.offset().top
					}, 1000);
					$('#nav ul li').css({transitionDelay: '0ms'});
					$('.vin_fn_wrapper').removeClass('nav-opened nav-hover-close');
					$('.vin_fn_navigation .nav_footer').removeClass('ready');
					return false;
				}
			});
			$('.vin_fn_totop').on('click',function(){
				$("html, body").animate({ 
					scrollTop: 0
				}, 1500);
			});
		},
		
		pageWidthAnimation: function(){
			Resumo.changeWidth();
			$(window).on('scroll', function() {
				Resumo.changeWidth();
			});
		},
		
		changeWidth: function(){
			let scrolltop	= $(window).scrollTop();
			let action		= 0;
			if(scrolltop > 0 && !$('body').hasClass('scrolled')){
				$('body').addClass('scrolled');
				action++;
			}else if(scrolltop === 0 && $('body').hasClass('scrolled')){
				$('body').removeClass('scrolled');
				action++;
			}
			if(action > 0){
				setTimeout(function(){
					Resumo.portfolioCarousel();
					Resumo.testimonialCarousel();
				},500);
			}
		},
		
		
		
		contactForm: function(){
			$('#send_message').on('click', function(){
				let form		= $('.vin_fn_contact .contact_form');
				let name 		= $("#name").val();
				let email 		= $("#email").val();
				let message 	= $("#message").val();
				let phone 		= $("#phone").val();
				let spanSuccess	= form.find(".success");
				let success     = spanSuccess.data('success');
				let emailto     = form.data('email');

				spanSuccess.empty();
				if(name === ''|| email === ''|| message === '' || emailto === '' || phone === ''){
					$('.empty_notice').slideDown(500).delay(2000).slideUp(500);
				}
				else{
					$.post(
						"modal/contact.php",
						{
							ajax_name: 		name,
							ajax_email: 	email,
							ajax_emailto: 	emailto,
							ajax_message: 	message,
							ajax_phone: 	phone
						}, function(data) {
							spanSuccess.append(data);
							if(spanSuccess.find(".contact_error").length){
								spanSuccess.slideDown(500).delay(2000).slideUp(500);		
							}else{
								spanSuccess.append("<span class='contact_success'>" + success + "</span>");
								spanSuccess.slideDown(500).delay(4000).slideUp(500);
							}
							if(data === ''){ form[0].reset();}
						}
					);
				}
				return false; 
			});
		},
		
		movingPlaceholder: function(){
			$('.vin_fn_contact .input_wrapper').each(function(){
				let e		= $(this);
				let input 	= e.find('input, textarea');
				if(input.val() === ''){e.removeClass('active');}
				input.on('focus', function() {
				  	e.addClass('active');
				}).on('blur',function() {
					if(input.val() === ''){e.removeClass('active');}
				});
			});
		},
		
		loadBlogPosts: function(){
			$('.vin_fn_blog_list .load_more a').on('mousedown',function(){
				let element 	= $(this);
				let text 		= element.find('.text');
				// stop function if don't have more items
				if(element.hasClass('done')){
					element.addClass('hold');
					text.text(element.attr('data-no'));
					return false;
				}
			}).on('mouseup',function(){
				let element 	= $(this);
				let text 		= element.find('.text');
				// stop function if don't have more items
				if(element.hasClass('done')){
					element.removeClass('hold');
					text.text(element.attr('data-done'));
					return false;
				}
			}).on('mouseleave',function(){
				let element 	= $(this);
				let text 		= element.find('.text');
				// stop function if don't have more items
				if(element.hasClass('done')){
					element.removeClass('hold');
					text.text(element.attr('data-done'));
					return false;
				}
			});
			$('.vin_fn_blog_list .load_more a').on('click',function(){
				let element 	= $(this);
				let text 		= element.find('.text');
				
				// stop function if elements are loading right now
				if(element.hasClass('loading') || element.hasClass('done')){return false;}
				element.addClass('loading');
				
				
				
				
				setTimeout(function(){
					let listItem = element.closest('.vin_fn_blog_list').find('.be_animated');
					listItem.each(function(i, e){
						setTimeout(function(){
							$(e).addClass('fadeInTop done');
						}, (i*100));	
					});
					element.addClass('done').removeClass('loading');
					text.text(element.attr('data-done'));
				},1500);
				
				
				return false;
			});
		},
		
		testimonialCarousel: function(){
			let owl 		= $('.vin_fn_testimonials .owl-carousel');
			owl.each(function(){
				let el 		= $(this);
				let parent	= el.closest('.vin_fn_testimonials');
				el.owlCarousel({
					autoplay: true,
					autoplayTimeout: 7000,
					smartSpeed: 1000,
					margin: 20,
					nav: false,
					loop: true,
					items: 1,
					dots: false
				});
				el.trigger('refresh.owl.carousel');
				el.on('changed.owl.carousel', function() {
					el.trigger('stop.owl.autoplay');
					el.trigger('play.owl.autoplay');
				});
				let prev = parent.find('.my__nav .prev');
				let next = parent.find('.my__nav .next');
				prev.off().on('click',function(){
					el.trigger('prev.owl');
					return false;
				});
				next.off().on('click',function(){
					el.trigger('next.owl');
					return false;
				});
			});
			Resumo.imgToSVG();
			Resumo.BgImg();
		},
		
		portfolioCarousel: function(){
			let owl 		= $('#portfolio .owl-carousel');
			owl.each(function(){
				let el 		= $(this);
				let parent	= el.closest('#portfolio');
				el.owlCarousel({
					autoplay: true,
					autoplayTimeout: 7000,
					smartSpeed: 1000,
					margin: 20,
					nav: false,
					loop:true,
					autoWidth:true,
					items:4,
					dots: false,
					responsive : {
						0 : {
							autoWidth : false,
							items: 1
						},
						700 : {
							autoWidth : true,
							items: 4
						}
					}
				});
				el.trigger('refresh.owl.carousel');
				el.on('changed.owl.carousel', function() {
					el.trigger('stop.owl.autoplay');
					el.trigger('play.owl.autoplay');
				});
				let prev = parent.find('.my__nav .prev');
				let next = parent.find('.my__nav .next');
				prev.off().on('click',function(){
					el.trigger('prev.owl');
					return false;
				});
				next.off().on('click',function(){
					el.trigger('next.owl');
					return false;
				});
			});
			Resumo.imgToSVG();
			Resumo.BgImg();
		},
		
		cursor: function () {
			let myCursor = $('.frenify-cursor');
			if (myCursor.length) {
				const 	e = document.querySelector(".cursor-inner"),
						t = document.querySelector(".cursor-outer");
				let n, i = 0, o = !1;
				let buttons = "a, input[type='submit'], .cursor-link, button, .modal_item";
				let sliders = ".owl-carousel, .swiper-container, .cursor-link";
				// link mouse enter + move
				window.onmousemove = function(s) {
					o || (t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"), e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)", n = s.clientY, i = s.clientX
				}, $("body").on("mouseenter", buttons, function() {
					e.classList.add("cursor-hover"), t.classList.add("cursor-hover")
				}), $("body").on("mouseleave", buttons, function() {
					$(this).is("a") && $(this).closest(".cursor-link").length || (e.classList.remove("cursor-hover"), t.classList.remove("cursor-hover"))
				}), e.style.visibility = "visible", t.style.visibility = "visible";


				// slider mouse enter
				$('body').on('mouseenter', sliders, function(){
					e.classList.add('cursor-slider');
					t.classList.add('cursor-slider');
				}).on('mouseleave', sliders,function(){
					e.classList.remove('cursor-slider');
					t.classList.remove('cursor-slider');
				});

				// slider mouse hold
				$('body').on('mousedown', sliders, function(){
					e.classList.add('mouse-down');
					t.classList.add('mouse-down');
				}).on('mouseup', sliders, function(){
					e.classList.remove('mouse-down');
					t.classList.remove('mouse-down');
				});

				// forced dark
				$('body').on('mouseenter', '.dark-section', function(){
					e.classList.add('dark');
					t.classList.add('dark');
				}).on('mouseleave', '.dark-section',function(){
					e.classList.remove('dark');
					t.classList.remove('dark');
				});
			}
		},
		
		progress: function(){
			$('.vin_fn_progress_bar').each(function() {
				let pWrap 	= $(this);
				pWrap.waypoint({handler: function(){Resumo.progressF(pWrap);},offset:'90%'});
			});
		},
		
		progressF: function(container){
			container.find('.progress_item').each(function(i) {
				let progress 	= $(this);
				let pValue 		= parseInt(progress.data('value'));
				let percent 	= progress.find('.progress_percent');
				let pBar 		= progress.find('.progress_bg');
				pBar.css({width:pValue+'%'});
				setTimeout(function(){
					progress.addClass('open');
					percent.html(pValue+'%').css({right:(100 - pValue)+ '%'});
				},(i*500));
			});	
		},
		
		recallProgress: function(tabs){
			tabs.find('.progress_bg').css({width:'0%'});
			tabs.find('.progress_percent').html('').css({right:'100%'});
			tabs.find('.progress_item').removeClass('open');
			Resumo.progress();
		},
		
		tabs: function(){
			$('.vin_fn_tabs .tab_header a').off().on('click',function(){
				let e 			= $(this);
				let li			= e.parent();
				let tabs		= e.closest('.vin_fn_tabs');
				if(li.hasClass('active')){
					return false;
				}else{
					li.siblings().removeClass('active');
					tabs.find('.tab_content').children().removeClass('active');
					li.addClass('active');
					$(e.attr('href')).addClass('active');
					Resumo.recallProgress(tabs);
				}
				
				return false;
			});
		},
		
		rightNav: function(){
			let closer 		= $('.vin_fn_navigation .closer,.vin_fn_nav_overlay');
			let overlay		= $('.vin_fn_nav_overlay');
			let opener 		= $('.vin_fn_right .menu_trigger');
			let wrapper 	= $('.vin_fn_wrapper');
			let navFooter	= $('.vin_fn_navigation .nav_footer');
			let navLi		= $('#nav ul li');
			let speed		= 200, transitionTime = 700;
			let summary		= (navLi.length+1)*speed + transitionTime;
			opener.on('click',function(){
				wrapper.addClass('nav-opened');
				navLi.each(function(i,e){
					$(e).css({transitionDelay: i*speed + transitionTime + 'ms'});
				});
				setTimeout(function(){
					navFooter.addClass('ready');
				},summary);
				return false;
			});
			closer.on('click',function(){
				navLi.css({transitionDelay: '0ms'});
				wrapper.removeClass('nav-opened nav-hover-close');
				navFooter.removeClass('ready');
				return false;
			});
			overlay.on('mouseenter',function(){
				wrapper.addClass('nav-hover-close');
			}).on('mouseleave',function(){
				wrapper.removeClass('nav-hover-close');
			});
			
			
		},
		
		rightPanelScroll: function(){
			let rightPanel 	= $('.vin_fn_right .right_in');
			let navIn 		= $('.vin_fn_navigation .nav_in');
			let nav 		= $('#nav');
			let navFooter	= $('.vin_fn_navigation .nav_footer');
			rightPanel.css({height: $(window).height()});
			nav.css({height: navIn.height() - navFooter.outerHeight()});
			if($().niceScroll){
				rightPanel.niceScroll({
					touchbehavior: false,
					cursorwidth: 0,
					autohidemode: true,
					cursorborder: "0px solid #333"
				});
				nav.niceScroll({
					touchbehavior: false,
					cursorwidth: 0,
					autohidemode: true,
					cursorborder: "1px solid #333"
				});
			}
		},
		
		
		imgToSVG: function(){
			$('img.fn__svg').each(function(){
				let img 		= $(this);
				let imgClass	= img.attr('class');
				let imgURL		= img.attr('src');

				$.get(imgURL, function(data) {
					let svg 	= $(data).find('svg');
					if(typeof imgClass !== 'undefined') {
						svg 	= svg.attr('class', imgClass+' replaced-svg');
					}
					img.replaceWith(svg);

				}, 'xml');

			});	
		},

	  	BgImg: function(){
			let div = $('*[data-bg-img]');
			div.each(function(){
				let element = $(this);
				let attrBg	= element.attr('data-bg-img');
				if(typeof(attrBg) !== 'undefined'){
					element.css({backgroundImage:'url('+attrBg+')'});
				}
			});
			let div2 = $('*[data-fn-bg-img]');
			div2.each(function(){
				let element = $(this);
				let attrBg	= element.attr('data-fn-bg-img');
				if(typeof(attrBg) !== 'undefined'){
					element.css({backgroundImage:'url('+attrBg+')'});
				}
			});
		},
  	};
  	
	
	// READY Functions
	$(document).ready(function(){
		
		Resumo.init();
		
	});
	
	// RESIZE Functions
	$(window).on('resize',function(){
		
		Resumo.rightPanelScroll();
		
	});
	
	
	
	// LOAD Functions
	$(window).on('load',function(){
		
		
		setTimeout(function(){
			
		},10);
		
	});
	
	// SCROLL Functions
	$(window).on('scroll',function(){
		
	});
  
})(jQuery);