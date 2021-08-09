function initHeaderEvents() {
	$('.navigations .mega-nav .menu li').on('mouseenter', function() {
		$('.sub-menu', this).css('text-indent', $(this).offset().left);
	});

	$('.action-search').on('click', function() {
		$(this).toggleClass('active');
		$('form.search').toggleClass('show');
	});

	$('form.search .search-types-toggle').on('click', function() {
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
	});
}

function insertCSS(bodyEl, cssPath) {
	var cssLink = document.createElement("link");
	cssLink.href = cssPath;
	cssLink.rel = "stylesheet";
	bodyEl.appendChild(cssLink);
}

function loadTwitterCSS() {
	// TODO iframe onload

	if (frames.length > 0 && frames[0].document) {
		twttr.events.bind(
			'loaded',
			function (event) {
				setTimeout(function() {
					insertCSS(frames[0].document.body, "css/twitter.css");
					insertCSS(frames[0].document.body, "https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700&display=swap");
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

$(window).on('load', function () {
	initHeaderEvents();
	initHomeEvents();
});