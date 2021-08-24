function initHeaderEvents() {
	var triggeredSearch = false;

	$(document).on('click', function() {
		if (!triggeredSearch && $('.search-types').hasClass('show')) {
			$('.search-types').removeClass('show')
			$('.search-types-toggle').removeClass('opened');
		} else if (!triggeredSearch && ($('form.search.desktop').hasClass('show') || $('form.search.mobile').hasClass('show'))) {
			$('.action-search').removeClass('active');
			$('.search-types-toggle').removeClass('opened');
			$('form.search').removeClass('show');
		}

		triggeredSearch = false;
	});

	$('form.search').on('click', function(e) {
		e.stopPropagation();
	});

	$('form.search input[type=text]')
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
		triggeredSearch = true;

		if ($(window).width() < 1024) {
			$('#menu-toggle').toggleClass('opened');

			if ($('.mega-nav').hasClass('opened')) {
				$('.mega-nav').css('min-height', $(window).outerHeight() - 70).toggleClass('opened');
				setTimeout(function() {
					$('.mega-nav').toggle();
				}, 1000);
			} else {
				$('.mega-nav').toggle().css('min-height', $(window).outerHeight() - 70).toggleClass('opened');
			}
			$('.actions-nav').toggleClass('invisible');
			$('form.search.mobile input[type=text]').focus();
		} else {
			$(this).toggleClass('active');
			$('form.search.desktop').toggleClass('show');
		}

	});

	$('form.search .search-types-toggle').on('click', function() {
		triggeredSearch = true;
		$(this).toggleClass('opened');
		$(this).siblings('.search-types').toggleClass('show');
	});

	$('form.search .close').on('click', function() {
		$('.action-search').removeClass('active');
		$('form.search').removeClass('show');
	});

	$('.search-types input:radio').on('change', function() {
		var formSearch = $(this).closest('form.search');
		formSearch.find('.search-types-toggle')
			.removeClass('all insights strategies people')
			.removeClass('opened')
			.addClass( $(this).val() );
		formSearch.find('.search-types').removeClass('show');

		formSearch.find('input[type=text]').attr('placeholder', $(this).closest('li').data('label'));
	});

	$(document)
		.on('click', '#menu-toggle', function(e) {
			e.preventDefault();

			if ($(window).width() < 1280) {
				$('#menu-toggle').toggleClass('opened');

				if ($('.mega-nav').hasClass('opened')) {
					$('.mega-nav').css('min-height', $(window).outerHeight() - 70).toggleClass('opened');
					setTimeout(function() {
						$('.mega-nav').toggle();
					}, 1000);
				} else {
					$('.mega-nav').toggle().css('min-height', $(window).outerHeight() - 70).toggleClass('opened');
				}

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
	if ($('.home-slides video:eq(0)').length) {
		$('.home-slides video:eq(0)')[0].play();
	}

	$('.home-info .tiles li').each(function() {
		var h3Margin = $(window).width() < 1280 ? 10 : 25;
		$('.tile-content', this).css('top', $(this).outerHeight() - $('h3', this).outerHeight() - h3Margin);
	});

	$('.home-info .tiles li')
		.on('mouseenter', function() {
			$('h3', this).css('margin-bottom', 5);
			$('.tile-content', this).css('top', $('.tile-content', this).outerHeight(true) - $('.tile-content a', this).outerHeight(true) + ($(window).width() < 1280 ? 10 : 20));
		})
		.on('mouseleave', function() {
			var h3Margin = $(window).width() < 1280 ? 10 : 25;
			$('h3', this).css('margin-bottom', h3Margin);
			$('.tile-content', this).css('top', $(this).outerHeight() - $('h3', this).outerHeight() - h3Margin);
		});

	$(".hero-slides").owlCarousel({
		items: 1
	});

	$('.hero-slides .owl-dot').on('click', function() {
		$(".hero-slides").trigger('to.owl.carousel', [$(this).index(), 300]);

		$('.hero-slides .owl-dot').removeClass('active');
		$(this).addClass('active');
	})

	$(".insights-list").owlCarousel({
		nav: true,
		loop: true,
		responsive: {
			0: {
				items: 2
			},
			628: {
				items: 3
			}
		}
	});

	$('.scrollbar-inner').scrollbar();

	loadTwitterCSS();

	$(window).on('scroll', function() {
		if ($(window).scrollTop() + $(window).innerHeight() > $('.home-info .content').offset().top) {
			var delay = 200;

			$(window).off('scroll');

			$('.tiles li').each(function(i) {
				var tile = $(this);

				setTimeout(function() {
					tile.addClass('show')
				}, delay * i);
			})
		}
	});
}

function initAboutEvents() {
	// Chart.register(ChartDataLabels);
	$(document).on('click', '.tabs li', function() {
		$(this)
			.closest('.tabs')
				.find('li')
					.removeClass('active')
				.end()
			.end()
			.addClass('active');	

		$('.tabs-content li').removeClass('active');
		$($(this).data('target')).addClass('active');
	})


	var chartOptions = $('#aum-chart').data('chart');

	var chart1Canvas = document.getElementById('aum-chart');
	var c1Ctx = chart1Canvas.getContext("2d");
	var gradient = c1Ctx.createLinearGradient(0, 0, 0, 450);
	
	gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
	gradient.addColorStop(0, "#388067");

	const data = {
		labels: chartOptions.labels,
		datasets: [
			{
				label: chartOptions.label,
				data: chartOptions.data,
				backgroundColor: gradient,
				borderColor: "#388067",
				fill: 'origin',
				pointRadius: 0,
				// datalabels: {
				// 	align: 'top',
				// 	anchor: 'top',
				// }
			}
		]
	};

	const config = {
	  	type: 'line',
		data: data,
		options: {
			layout: {
				padding: {
					top: 45,
					bottom: 45,
					left: 50,
					right: 50,
				}
			},
			plugins: {
				filler: {
					propagate: false,
				},
				title: {
					display: false,
				},
				legend: {
					position: 'bottom',
					align: 'start'
				}
			},
			interaction: {
				intersect: false,
			},
			scales: {
				y: {
					ticks: {
						stepSize: 50
					},
					grid: {
						display: function(a) {
							console.log(a);
							return true;
						}
					}
				},
				x: {
					ticks: {
						padding: 20,
						fontSize: 16,
						fontColor: '#0071CE'
					},
					grid: {
						display: false,
					},
				}
			},
			elements: {
				line: {
					tension: 0.4
				}
			},
			tooltips: {
				yAlign: 'bottom'
			}
		},
	};

	var myChart = new Chart(chart1Canvas, config);

	document.querySelectorAll('.mix-chart').forEach(function(mixCanvas) {
		var chartOptions  = $(mixCanvas).data('chart');

		const config = {
	  		type: 'doughnut',
			data: {
				datasets: [
					{
						data: chartOptions.data,
						backgroundColor: ['#388067','#BA7838','#BCA236','#766660','#9D4D34','#A0BFC4','#DCAE7C','#65929A','#F7DE63','#AEA19D','#CF8B76','#79833C'],
						borderWidth: 0,
						// borderColor: "#388067",
						// fill: 'origin',
						// pointRadius: 0
						rotation: 90,
						hover: false,
					}
				]
			},
			options: {
				cutout: 110,
				hover: false,
				plugins: {
					tooltip: {
						enabled: false,
						external: empty
					},
					datalabels: {
        				display: false,
        			}
				},
				elements: {
					center: {
						text: chartOptions.data[0] + '%',
						color: '#388067', //Default black
						fontStyle: 'Raleway'
					}
				}
			},
			plugins: [
				ChartDataLabels, 
				{
					beforeDraw: function (chart, args, options) {
						console.log(chart);
						var txt = chart.tooltip.dataPoints ? chart.tooltip.dataPoints[0].raw + '%' : chart.options.elements.center.text;
						var color = chart.tooltip.dataPoints ? chart.tooltip.dataPoints[0].dataset.backgroundColor[chart.tooltip.dataPoints[0].dataIndex] : chart.options.elements.center.color;

						if (txt) {
							//Get ctx from string
							var ctx = chart.ctx;

							//Get options from the center object in options
							var centerConfig = chart.config.options.elements.center;
							var fontStyle = centerConfig.fontStyle || 'Arial';
							//Start with a base font of 30px
							ctx.font = "64px " + fontStyle;

							//Set font settings to draw it correctly.
							ctx.textAlign = 'center';
							ctx.textBaseline = 'middle';
							var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
							var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
							ctx.fillStyle = color;

							//Draw text in center
							ctx.fillText(txt, centerX, centerY);
						}
					}
				}
			],
		};

		new Chart(mixCanvas, config);
	});
}

$(document).ready(function () {
	var page = $('body').data('page');
	initHeaderEvents();

	switch (page) {
		case 'home':
			initHomeEvents();
			break;
		case 'about':
			initAboutEvents();
			break;
	}

	initFooterEventss();
});

function empty() {}