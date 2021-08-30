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
	$(document)
		.on('click', '.tabs li', function() {
			$(this)
				.closest('.tabs')
					.find('li')
						.removeClass('active')
					.end()
				.end()
				.addClass('active');	

			$('.tabs-content li').removeClass('active');
			$($(this).data('target')).addClass('active');

			loadMixedChart($($(this).data('target')).find('.doughnut-chart' + ($(window).width() < 600 ? '.mobile' : '.desktop'))[0]);
		})
		.on('click', '.tabs-content h5', function() {
			$(this)
				.closest('.tabs-content')
					.find('li')
						.removeClass('active')
					.end()
				.end()
				.closest('li')
					.addClass('active');	

			$('.tabs li').removeClass('active');
			$('[data-target="#' + $(this).data('id') + '"]').addClass('active');

			loadMixedChart($(this).closest('li').find('.doughnut-chart' + ($(window).width() < 600 ? '.mobile' : '.desktop'))[0]);
		});

	$(window)
		.on('scroll', throttle(function() {
			$('.odometer').each(function() {
				if (elementInViewport(this) && !$(this).data('odometer-ready')) {
					od = new Odometer({
						el: this
					});

					od.update($(this).data('odometer'));
					$(this).data('odometer-ready', true)
				}
			});
		}, 100));

	if ($(window).width() > 600) {
		var controller = new ScrollMagic.Controller();

		function tweenOpacity(el) {
			var tween = TweenMax.fromTo(el, 1, {
				opacity: 0,
				y: 100,
				force3D: true
			}, {
				opacity: 1,
				y: 0,
				force3D: true
			});

			return tween;
		};

		$('.sliding-info .slides .item').each(function() {
			new ScrollMagic.Scene({
					triggerElement: $(this).get(),
					triggerHook: .75,
					duration: '50%'
				})
				.setTween(tweenOpacity($(this).get()))
				.addTo(controller);
		});

		new ScrollMagic.Scene({triggerElement: '.trigger-1', duration: $('.trigger-2').offset().top - $('.trigger-1').offset().top}).setPin('.sliding-info h2').addTo(controller);
	} else {
		$('.sliding-info .slides').addClass('owl-carousel').owlCarousel({
			items: 1,
			dots: true
		});
	}


	var chartOptions = $('#aum-chart').data('chart');

	var chart1Canvas = document.getElementById('aum-chart');
	var c1Ctx = chart1Canvas.getContext("2d");
	var gradient = c1Ctx.createLinearGradient(0, 0, 0, $(window).width() < 600 ? 120 : 300);
	
	gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
	gradient.addColorStop(.2, "#388067");

	const tooltipPlugin = Chart.registry.getPlugin('tooltip');
	tooltipPlugin.positioners.above = function(elements, position) {
		if (!elements.length) {
			return false;
		}

		return {
			x: elements[0].element.x,
			y: elements[0].element.y - 10
		}
	}

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
				drawBorder: false,
				pointBackgroundColor: "#388067",
			}
		]
	};

	const config = {
	  	type: 'line',
		data: data,
		options: {
			layout: {
				padding: {
					top: $(window).width() < 600 ? 30 : 45,
					bottom: $(window).width() < 600 ? 5 : 45,
					left: $(window).width() < 600 ? 15 : 50,
					right: $(window).width() < 600 ? 15 : 50,
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
					align: 'start',
					labels: {
						pointStyle: 'rect',
						usePointStyle: true,
						color: '#000000',
						font: {
							family: "Raleway",
							size: $(window).width() < 600 ? 11 : 16,
							weight: 700
						},
						padding: 0
					},
				},
				tooltip: {
					position: 'above',
					callbacks: {
						title: function(tooltipItem, data) {
							return false;
						},
						label: function(tooltipItem, data) {
							return '$' + tooltipItem.raw;
						}
					},
					backgroundColor: '#388067',
					color: '#fff',
					displayColors: false,
					bodyFont: {
						family: "Raleway",
						size: $(window).width() < 600 ? 11 : 16,
						weight: 600
					},
					yAlign: 'bottom'
				}
			},
			interaction: {
				intersect: false,
			},
			scales: {
				y: {
					ticks: {
						stepSize: 50,
						padding: 5,
						color: '#000000',
						font: {
							family: "Raleway",
							size: $(window).width() < 600 ? 11 : 14,
							weight: 600
						},
						callback: function(value, index, values) {
							return '$' + value;
						}
					},
					grid: {
						borderDash: [10,5],
						borderDashOffset: 10,
						tickBorderDash: [100],
						drawBorder: false,
					},
				},
				x: {
					ticks: {
						padding: $(window).width() < 600 ? 10 : 20,
						color: '#000000',
						font: {
							family: "Raleway",
							size: $(window).width() < 600 ? 11 : 14,
							weight: 600
						}
					},
					grid: {
						display: false,
						drawBorder: false,
					},
				}
			},
			elements: {
				line: {
					tension: 0.4
				}
			}
		},
	};

	var myChart = new Chart(chart1Canvas, config);

	document.querySelectorAll('.breakdown .active .doughnut-chart' + ($(window).width() < 600 ? '.mobile' : '.desktop')).forEach(function(mixCanvas) {
		loadMixedChart(mixCanvas);
	});
}

function loadMixedChart(mixCanvas) {
	if ($(mixCanvas).attr('style')) {
		// already initialized
		return;
	}

	var chartOptions  = $(mixCanvas).data('chart');

	const config = {
  		type: 'doughnut',
		data: {
			datasets: [
				{
					data: chartOptions.data,
					backgroundColor: ['#388067','#BA7838','#BCA236','#766660','#9D4D34','#A0BFC4','#DCAE7C','#65929A','#F7DE63','#AEA19D','#CF8B76','#79833C'],
					borderWidth: 0,
					rotation: 90,
					hover: false,
				}
			]
		},
		options: {
			cutout: $(window).width() < 600 ? 65 : 110,
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
					color: '#388067',
					fontStyle: 'Raleway'
				}
			}
		},
		plugins: [
			ChartDataLabels, 
			{
				beforeDraw: function (chart, args, options) {
					var txt = chart.tooltip.dataPoints ? chart.tooltip.dataPoints[0].raw + '%' : chart.options.elements.center.text;
					var color = chart.tooltip.dataPoints ? chart.tooltip.dataPoints[0].dataset.backgroundColor[chart.tooltip.dataPoints[0].dataIndex] : chart.options.elements.center.color;

					if (txt) {
						var ctx = chart.ctx;

						var centerConfig = chart.config.options.elements.center;
						var fontStyle = centerConfig.fontStyle || 'Arial';
						ctx.font = ($(window).width() < 600 ? "34px " : "64px ") + fontStyle;

						ctx.textAlign = 'center';
						ctx.textBaseline = 'middle';
						var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
						var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
						ctx.fillStyle = color;

						ctx.fillText(txt, centerX, centerY);
					}
				}
			}
		],
	};

	new Chart(mixCanvas, config);
}

function filterData(data, key) {
	var filterData = [];

	for (var i in data) {
		if (filterData.indexOf(data[i][key]) == -1) {
			filterData.push(data[i][key]);
		}
	}

	return filterData;
}

function initLeadershipEvents() {
	var tabledata = $('.table-view table').data('tabledata');
	var columnOptions = $('.table-view table').data('columns');

	columnOptions[0].fnCreatedCell = function (nTd, sData, oData, iRow, iCol) {
		$(nTd).html('<a href="#">' + oData[columnOptions[0].data] + '</a>');
	};

	if ($('.table-filters').length) {
		var searchDepartments = filterData(tabledata, 'department');
		var searchLocations = filterData(tabledata, 'location');

		$.fn.dataTable.ext.search.push(
			function( settings, data, dataIndex ) {
				var departmentValue = $('#department-filter').val();
				var locationValue = $('#location-filter').val();
				var searchValue = $('#search-filter').val();
				console.log(departmentValue, locationValue, searchValue);

				if ((departmentValue && data[2] !== departmentValue) ||
					(locationValue && data[3] !== locationValue) ||
					(searchValue && data[0].toLowerCase().indexOf(searchValue) === -1)) {
					return false;
				}

				return true;
			}
		);
	}

	var table = $('.table-view table').DataTable( {
		paging:   true,
		ordering: false,
		info: false,
		lengthChange: false,
		data: tabledata,
		columns: columnOptions,
	});

	// TODO: change on resize
	if ($('.table-filters').length) {
		if ($(window).width() > 860) {
			$('.owl-carousel').owlCarousel({
				items: 5,
				nav: true
			});
		} else {
			$('.bios-wrapper')
				.addClass('scrollable-content scrollbar-inner')
				.scrollbar();
		}

		$('#department-filter')
			.html('<option value="">Department</option><option>' + searchDepartments.join('</option><option>') + '</option>')
			.selectmenu({
				change: function() {
					table.draw();
				}
			});

		$('#location-filter')
			.html('<option value="">Location</option><option>' + searchLocations.join('</option><option>') + '</option>')
			.selectmenu({
				change: function() {
					table.draw();
				}
			});

		$('#search-filter')
			.on('keyup', function() {
				table.draw();
			})
			.on('focus', function() {
				$(this).data('placeholder', $(this).attr('placeholder'));
				$(this).attr('placeholder', '');
			})
			.on('blur', function() {
				$(this).attr('placeholder', $(this).data('placeholder'));
				$(this).data('placeholder', false);
			});
	}
	
	if ($(window).width() < 860) {
		$('.dataTables_wrapper')
			.addClass('scrollable-content scrollbar-inner')
			.scrollbar();
	}

	$('.collapsable-table h3').on('click', function() {
		$(this)
			.closest('.table-view-content')
				.find('.collapsable-table')
					.addClass('collapsed')
				.end()
			.end()
			.closest('.collapsable-table')
				.removeClass('collapsed');
	});

	$('.sub-tables h4').on('click', function() {
		$(this)
			.closest('.sub-tables')
				.find('li')
					.removeClass('opened')
				.end()
			.end()
			.closest('li')
				.addClass('opened');
	});

	$(document)
		.on('click', '.tabs li', function() {
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
		.on('click', '.tabs-content h2', function() {
			$(this)
				.closest('.tabs-content')
					.find('li')
						.removeClass('active')
					.end()
				.end()
				.closest('li')
					.addClass('active');	

			$('.tabs li').removeClass('active');
			$('[data-target="#' + $(this).data('id') + '"]').addClass('active');
		});
}

function initPeopleEvents() {
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
}

function initPhilosophyEvents() {
	$(document)
		.on('click', '.tabbed-sections li', function() {
			$(this)
				.closest('.tabbed-sections')
					.find('li')
						.removeClass('active')
					.end()
				.end()
				.addClass('active');

			$('.tabbed-content-list li').removeClass('active');
			$($(this).data('target')).addClass('active');
		})
		.on('click', '.tabbed-content-list li', function() {
			$(this)
				.closest('.tabbed-content-list')
					.find('li')
						.removeClass('active')
					.end()
				.end()
				.addClass('active');
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
		case 'about-philosophy':
			initPhilosophyEvents();
			break;
		case 'leadership':
			initLeadershipEvents();
			break;
		case 'people':
			initPeopleEvents();
			break;
	}

	initFooterEventss();
});

function empty() {}

function elementInViewport(el) {
	var top = el.offsetTop;
	var left = el.offsetLeft;
	var width = el.offsetWidth;
	var height = el.offsetHeight;

	while(el.offsetParent) {
		el = el.offsetParent;
		top += el.offsetTop;
		left += el.offsetLeft;
	}

	return (
		top >= window.pageYOffset &&
		left >= window.pageXOffset &&
		(top + height) <= (window.pageYOffset + window.innerHeight) &&
		(left + width) <= (window.pageXOffset + window.innerWidth)
	);
}

function throttle(callback, limit) {
	var waiting = false;

	return function () {
		if (!waiting) {
			callback.apply(this, arguments);
			waiting = true;
			setTimeout(function () {
				waiting = false;
			}, limit);
		}
	}
}