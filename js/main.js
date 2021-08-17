function initHeaderEvents() {
	var triggeredSearch = false;

	$(document).on('click', function() {
		if (!triggeredSearch && $('.search-types').hasClass('show')) {
			$('.search-types').removeClass('show')
			$('.search-types-toggle').toggleClass('opened');
		}

		triggeredSearch = false;
	});

	$('#search-field')
		.on('focus', function() {
			$(this).data('placeholder', $(this).attr('placeholder'));
			$(this).attr('placeholder', '');
		})
		.on('blur', function() {
			$(this).attr('placeholder', $(this).data('placeholder'));
			$(this).data('placeholder', false);
		});

	$('.navigations .mega-nav .menu li').on('mouseenter', function() {
		$('.sub-menu', this).css('text-indent', $(this).offset().left);
	});

	$('.action-search').on('click', function() {
		if ($(window).width() < 1024) {
			$('.burger').toggleClass('opened');
			$('.mega-nav').toggleClass('opened');
			$('.actions-nav').toggleClass('invisible');
			$('form.search input[type=text]').focus();
		} else {
			$(this).toggleClass('active');
			$('form.search').toggleClass('show');
		}

	});

	$('form.search .search-types-toggle').on('click', function() {
		triggeredSearch = true;
		$(this).toggleClass('opened');
		$('.search-types').toggleClass('show');
	});

	$('form.search .close').on('click', function() {
		$('.action-search').removeClass('active');
		$('form.search').removeClass('show');
	});

	$('.search-types input:radio').on('change', function() {
		$('form.search .search-types-toggle')
			.removeClass('all insights strategies people')
			.addClass( $(this).val() );
		$('.search-types').removeClass('show');

		$('#search-field').attr('placeholder', $(this).closest('li').data('label'));
	});

	$(document)
		.on('click', '.burger', function(e) {
			e.preventDefault();

			if ($(window).width() < 1280) {
				$('.burger').toggleClass('opened');
				$('.mega-nav').toggleClass('opened');
				$('.actions-nav').toggleClass('invisible');
			}
		}).on('click', '.mega-nav .menu > li.has-submenu > a', function(e) {
			if ($(window).width() < 1280) {
				e.preventDefault();

				$(this)
					.closest('li')
					.toggleClass('opened');
			}
		});
}

function initFooterEventss() {
	$('.footer-menu').on('click', 'h5 a', function(e) {
		if ($(window).width() < 1280) {
			e.preventDefault();

			$(this)
				.closest('li')
				.toggleClass('opened');
		}
	});
}

function insertCSS(bodyEl, cssPath) {
	var cssLink = document.createElement("link");
	cssLink.href = cssPath;
	cssLink.rel = "stylesheet";
	bodyEl.appendChild(cssLink);
}

function loadTwitterCSS() {
	if (frames.length > 0) {
		twttr.events.bind(
			'loaded',
			function (event) {
				setTimeout(function() {
					var twitterBody = $('.twitter-timeline').contents().find('body');

					twitterBody.append('<link rel="stylesheet" href="https://raw.githack.com/targetnyc/oaktree-frontend/master/css/twitter.css"/>');
					twitterBody.append('<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700&display=swap"/>');
				}, 500);
			}
		);
	} else {
		setTimeout(loadTwitterCSS, 500);
	}
}

function initHomeEvents() {
	$('.tile-content').each(function() {
		$(this).css('bottom', (parseInt($('p:eq(0)', this).outerHeight(true)) + parseInt($('p:eq(1)', this).outerHeight(true))) * -1);
	});
	
	$('.home-info .tiles li')
		.on('mouseenter', function() {
			$('h3', this).css('margin-bottom', 5);
			$('.tile-content', this).css('bottom', 0);
		})
		.on('mouseleave', function() {
			$('h3', this).css('margin-bottom', 25);
			$('.tile-content', this).css('bottom', (parseInt($('p:eq(0)', this).outerHeight(true)) + parseInt($('p:eq(1)', this).outerHeight(true))) * -1);
		});

	$(".hero-slides").owlCarousel({
		items: 1,
		dots: true,
		loop: true,
		dotsData: true
	});

	$('.hero-slides .owl-dot').on('click', function() {
		$(".hero-slides").trigger('to.owl.carousel', [$(this).index(), 300]);

		$('.hero-slides .owl-dot').removeClass('active');
		$(this).addClass('active');
	})

	$(".insights-list").owlCarousel({
		nav: true,
		loop: true
	});

	$('.scrollbar-inner').scrollbar();

	loadTwitterCSS();
}

$(document).ready(function () {
	initHeaderEvents();
	initHomeEvents();
	initFooterEventss();
});