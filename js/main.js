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
				$('.mega-nav').toggleClass('opened');
				$("body").css({ overflow: 'inherit' });

				setTimeout(function() {
					$('.mega-nav').toggle();
				}, 1000);
			} else {
				$('.mega-nav').toggle().toggleClass('opened');
				$("body").css({ overflow: 'hidden' });
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
					$('.mega-nav').toggleClass('opened');
					$("body").css({ overflow: 'inherit' });

					setTimeout(function() {
						$('.mega-nav').toggle();
					}, 1000);
				} else {
					$('.mega-nav').toggle().toggleClass('opened');
					$("body").css({ overflow: 'hidden' });
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

	$(window).on('scroll.tiles-delay', function() {
		if ($(window).scrollTop() + $(window).innerHeight() > $('.home-info .content').offset().top) {
			var delay = 200;

			$(window).off('scroll.tiles-delay');

			$('.tiles li').each(function(i) {
				var tile = $(this);

				setTimeout(function() {
					tile.addClass('show')
				}, delay * i);
			})
		}
	});
}

function loadAumChart() {
	if (window.aumChart) {
		window.aumChart.destroy();
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

	window.aumChart = new Chart(chart1Canvas, config);
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

			loadMixedChart($($(this).data('target')).find('.doughnut-chart' + ($(window).width() < 1024 ? '.mobile' : '.desktop'))[0]);
		})
		.on('click', '.tabs-content h5', function() {
			var isMobile = $(window).outerWidth() < 1024;

			if ($(this).closest('li').hasClass('active')) {
				$(this)
					.closest('li')
						.find('.content')
							.slideUp(500)
						.end()
						.removeClass('active');
			} else {
				$(this)
					.closest('.tabs-content')
						.find('li')
							.find('.content')
								.slideUp(500)
							.end()
							.removeClass('active')
						.end()
					.end()
					.closest('li')
						.find('.content')
							.slideDown(500)
						.end()
						.addClass('active');	

				$('.tabs li').removeClass('active');
				$('[data-target="#' + $(this).data('id') + '"]').addClass('active');
			}

			loadMixedChart($(this).closest('li').find('.doughnut-chart' + ($(window).width() < 1024 ? '.mobile' : '.desktop'))[0]);
		});


	if ($(window).width() < 600) {
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
	} else {
		$('.odometer').each(function() {
			od = new Odometer({
				el: this
			});

			od.update($(this).data('odometer'));
			$(this).data('odometer-ready', true)
		});
	}

	window.controller = new ScrollMagic.Controller();

	$(window)
		.on('resize', function() {
			if (!window.controller) {
				window.controller = new ScrollMagic.Controller();
			}

			if ($(window).width() > 600) {
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

				$('.sliding-info .slides')
					.trigger('destroy.owl.carousel.core')
					.removeClass('owl-carousel owl-loaded')
					.find('.owl-stage-outer')
						.children()
							.unwrap();

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

				if (window.controller) {
					window.controller.destroy();
					window.controller = null;

					$('.scrollmagic-pin-spacer')
						.prop('style', '')
						.find('h2')
							.prop('style', '');
				}
			}
			loadMixedChart($('.tabs-content .active .doughnut-chart' + ($(window).width() < 1024 ? '.mobile' : '.desktop'))[0]);

			loadAumChart();
		})
		.trigger('resize');

	document.querySelectorAll('.breakdown .active .doughnut-chart' + ($(window).width() < 600 ? '.mobile' : '.desktop')).forEach(function(mixCanvas) {
		loadMixedChart(mixCanvas);
	});
}

function loadMixedChart(mixCanvas) {
	if (Chart.getChart(mixCanvas)) {
		Chart.getChart(mixCanvas).destroy();
	}

	var chartOptions  = $(mixCanvas).data('chart');

	const config = {
  		type: 'doughnut',
		data: {
			datasets: [
				{
					data: $.map(chartOptions, function(item) { return  item.value}),
					backgroundColor: ['#388067','#BA7838','#BCA236','#766660','#9D4D34','#A0BFC4','#DCAE7C','#65929A','#F7DE63','#AEA19D','#CF8B76','#79833C'],
					borderWidth: 0,
					rotation: 90,
					hover: false,
				}
			],
			labels: $.map(chartOptions, function(item) { return  item.id})
		},
		options: {
			cutout: $(window).width() < 1024 ? 65 : 110,
			hover: false,
			plugins: {
				legend: {
					display: false
				},
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
					text: chartOptions[0],
					color: '#388067',
					fontStyle: 'Raleway'
				}
			}
		},
		plugins: [
			ChartDataLabels,
			{
				beforeDraw: function (chart, args, options) {
					var txt = (chart.tooltip.dataPoints ? chart.tooltip.dataPoints[0].raw : chart.options.elements.center.text.value) + '%';
					var label = chart.tooltip.dataPoints ? chart.tooltip.dataPoints[0].label : chart.options.elements.center.text.id;
					var color = chart.tooltip.dataPoints ? chart.tooltip.dataPoints[0].dataset.backgroundColor[chart.tooltip.dataPoints[0].dataIndex] : chart.options.elements.center.color;

					if (txt) {
						var ctx = chart.ctx;
						var labels = label.split('\n');

						var centerConfig = chart.config.options.elements.center;
						var fontStyle = centerConfig.fontStyle || 'Arial';
						ctx.font = ($(window).width() < 1024 ? "34px " : "64px ") + fontStyle;

						ctx.textAlign = 'center';
						ctx.textBaseline = 'middle';
						var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
						var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
						ctx.fillStyle = color;

						if ($(window).width() < 1024) {
							ctx.fillText(txt, centerX, centerY - (labels > 1 ? 17 : 9));
						} else {
							ctx.fillText(txt, centerX, centerY - (labels > 1 ? 34 : 17));
						}


						ctx.font = ($(window).width() < 1024 ? "14px " : "22px ") + fontStyle;
						ctx.textAlign = 'center';
						ctx.fillStyle = "#000000";

						if ($(window).width() < 1024) {
							ctx.fillText(labels[0], centerX, centerY + 17);
						} else {
							ctx.fillText(labels[0], centerX, centerY + 32);
						}

						if (labels.length > 1) {
							if ($(window).width() < 1024) {
								ctx.fillText(labels[1], centerX, centerY + 9 + 17 + 10);
							} else {
								ctx.fillText(labels[1], centerX, centerY + 17 + 32 + 10);
							}
						}
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
	$('.table-view table').each(function() {
		var tabledata = $(this).data('tabledata');
		var columnOptions = $(this).data('columns');

		columnOptions[0].fnCreatedCell = function (nTd, sData, oData, iRow, iCol) {
			$(nTd).html('<a href="#">' + oData[columnOptions[0].data] + '</a>');
		};

		if ($('.table-filters').length) {
			$.fn.dataTable.ext.search.push(
				function( settings, data, dataIndex ) {
					var departmentValue = $('#department-filter').val();
					var locationValue = $('#location-filter').val();
					var searchValue = $('#search-filter').val();

					if ((departmentValue && data[2] !== departmentValue) ||
						(locationValue && data[3] !== locationValue) ||
						(searchValue && data[0].toLowerCase().indexOf(searchValue) === -1)) {
						return false;
					}

					return true;
				}
			);
		}

		var table = $(this).DataTable( {
			paging:   $(this).data('showpagination') ? true : false,
			ordering: false,
			info: false,
			lengthChange: false,
			data: tabledata,
			columns: columnOptions,
		});
	});

	// TODO: change on resize
	if ($('.table-filters').length) {
		var tabledata = $('.table-view table').data('tabledata');
		var searchDepartments = filterData(tabledata, 'department');
		var searchLocations = filterData(tabledata, 'location');

		if ($(window).width() > 860) {
			$('.owl-carousel').owlCarousel({
				items: 5,
				nav: true
			});
		} else {
			$('.people-wrapper')
				.addClass('scrollable-content scrollbar-inner')
				.scrollbar();
		}

		$('#department-filter')
			.html('<option value="">Department</option><option>' + searchDepartments.join('</option><option>') + '</option>')
			.selectmenu({
				change: function() {
					$(this).closest('.table-view').find('table').DataTable().draw();
				}
			});

		$('#location-filter')
			.html('<option value="">Location</option><option>' + searchLocations.join('</option><option>') + '</option>')
			.selectmenu({
				change: function() {
					$(this).closest('.table-view').find('table').DataTable().draw();
				}
			});

		$('#search-filter')
			.on('focus', function() {
				$(this).parent().addClass('focused');
				$(this).data('placeholder', $(this).attr('placeholder'));
				$(this).attr('placeholder', '');
			})
			.on('blur', function() {
				$(this).parent().removeClass('focused');
				$(this).attr('placeholder', $(this).data('placeholder'));
				$(this).data('placeholder', false);
			});
		$('button.search').on('click', function() {
			$(this).closest('.table-view').find('table').DataTable().draw();
		});
	}

	$('.sub-tables,.dataTables_wrapper', '.collapsable-table.collapsed').hide();

	$('.collapsable-table h3').on('click', function() {
		var collapsableTable = $(this).closest('.collapsable-table');

		if (collapsableTable.hasClass('collapsed')) {
			collapsableTable
					.parent()
						.find('.collapsable-table')
							.each(function() {
								var target = $(this).find('.sub-tables').length ? '.sub-tables' : '.dataTables_wrapper';
								$(this)
									.find(target)
										.slideUp(500);
							})
							.addClass('collapsed')
						.end()
					.end()
					.removeClass('collapsed')
					.each(function() {
						var target = $(this).find('.sub-tables').length ? '.sub-tables' : '.dataTables_wrapper';
						$(this)
							.find(target)
								.slideDown(500);
					})
		} else {
			collapsableTable
					.addClass('collapsed')
					.each(function() {
						var target = $(this).find('.sub-tables').length ? '.sub-tables' : '.dataTables_wrapper';
						$(this)
							.find(target)
								.slideUp(500);
					})
		}
	});

	$('.sub-tables li:not(.opened) .dataTables_wrapper').hide();

	$('.sub-tables h4').on('click', function() {
		if (!$(this).closest('li').hasClass('opened')) {
			$(this)
				.closest('.sub-tables')
					.find('li')
						.find('.dataTables_wrapper')
							.slideUp(500)
						.end()
						.removeClass('opened')
					.end()
				.end()
				.closest('li')
					.find('.dataTables_wrapper')
						.slideDown(500)
					.end()
					.addClass('opened');
		} else {
			$(this)
				.closest('li')
					.find('.dataTables_wrapper')
						.slideUp(500)
					.end()
					.removeClass('opened');
		}
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

		});

	$(window)
		.on('resize', function() {
			if ($(window).width() < 1024) {
				$('.tabs li:not(.active)').hide();

				$('.tabs li')
					.off('click.mobile-only')
					.on('click.mobile-only', function() {
						var self = this;
						if ($(this).closest('.tabs').hasClass('opened')) {
							var count = $(this).closest('.tabs').find('li').length - 1;
							var ready = 0;

							$(this)
								.addClass('active')
								.closest('.tabs')
									.find('li')
										.each(function() {
											if (this !== self) {
												$(this)
													.removeClass('active')
													.slideUp(500, function() {
														ready++;

														if (ready == count) {
															$(this).closest('.tabs').removeClass('opened');
														}
													});
											}
										});
						} else {
							$(this)
								.closest('.tabs')
									.find('li:not(.active)')
										.slideDown(500)
									.end()
								.addClass('opened');
						}
					});
			} else {
				$('.tabs li:not(.active)').show();
				$('.tabs li').off('click.mobile-only');
			}
		})
		.trigger('resize');

	
	if ($(window).width() < 860) {
		$('.dataTables_wrapper table')
			.wrap('<div></div>');

		$('.dataTables_wrapper table')
			.parent()
			.scrollbar();

		$('.dataTables_wrapper .scroll-wrapper')
			.addClass('scrollable-content scrollbar-inner');
	}
}

function initPeopleEvents() {
	$(".insights-list").owlCarousel({
		nav: true,
		loop: true,
		dots: true,
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
	$(window)
		.on('resize', function() {
			if ($(window).outerWidth() < 1024) {
				$('.tabbed-content-list li:not(.active) .content').hide();
			} else {
				$('.tabbed-content-list li:not(.active) .content').show();
			}
		})
		.trigger('resize');

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
			var self = $(this);
			if (self.hasClass('active')) {
				self
					.find('.content')
						.slideUp(500)
					.end()
					.removeClass('active');
			} else {
				self
					.closest('.tabbed-content-list')
						.find('li')
							.find('.content')
								.slideUp(500)
							.end()
							.removeClass('active')
						.end()
					.end()
					.find('.content')
						.slideDown(500)
					.end()
					.addClass('active');

				self
					.closest('.tabbed-content-wrapper')
					.find('.tabbed-sections li')
						.each(function() {
							$(this).removeClass('active');

							if ($(this).is('[data-target="#' + self.attr('id') + '"]')) {
								$(this).addClass('active');
							}
						});
			}
		});

	$(".insights-list").owlCarousel({
		nav: true,
		loop: false,
		responsive: {
			0: {
				items: 2
			},
			628: {
				items: 3
			}
		}
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
			$($(this).data('target'), $(this).closest('.tabs').siblings('.tabs-content')).addClass('active');
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

	if ($(window).width() < 600) {
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
	} else {
		$('.odometer').each(function() {
			od = new Odometer({
				el: this
			});

			od.update($(this).data('odometer'));
			$(this).data('odometer-ready', true)
		});
	}

	$('.play-video').on('click', function(e) {
		e.preventDefault();

		var videoData = $(this).data('video');

		if (!$('.video-player').length) {
			$('body').append('<div class="video-player"></div>');
		}

		var videoTemplate = '<video controls>' + 
								'<source src="{video}" type="{mimetype}">' + 
							'</video>';
		$('.video-player').html(videoTemplate.replace('{video}', videoData.video).replace('{mimetype}', videoData.mimetype));

		$('.video-player').dialog({
			modal: true,
			width: '90%',
			maxWidth: '943',
			resizable: false,
			dialogClass: 'video-player-dialog',
			create: function(event, ui) {
				$("body").css({ overflow: 'hidden' })
			},
			beforeClose: function(event, ui) {
				$("body").css({ overflow: 'inherit' })
			}
		});
	})
}

function loadInsights(wrapper, template, start, append) {
	var items = wrapper.find('.insights-list').data('items');
	var filter = wrapper.find('#insights-filter').val();
	var itemsHtml = '';
	var pageCount = 6;
	var count = 0;
	var filteredItems = [];

	$.each(items, function(i, value) {
		if (!filter || filter == value.type) {
			filteredItems.push(value);
		}
	});
	var startCount = start;

	for (var i = start; i < filteredItems.length; i++) {
		var value = filteredItems[i];

		if ((count < pageCount) && (!filter || filter == value.type)) {
			itemsHtml += template
				.replace('{image}', value.image)
				.replace('{type}', value.type)
				.replace('{label}', value.label)
				.replace('{date}', value.date)
				.replace('{title}', value.title)
				.replace('{action}', value.action);
			count++;
		}
	}

	wrapper.find('.insights-list')
		.siblings('.btn-wrap')
			.toggleClass('hidden', (start + pageCount) >= filteredItems.length);

	wrapper.find('.insights-list').html((append ? wrapper.find('.insights-list').html() : '') + itemsHtml);
}

function initInsightEvents() {
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

		});

	var insightsTemplate = '<div class="insight-item">' + 
		'<div class="img-wrapper">' + 
			'<a href="">' + 
				'<img src="{image}" alt="">' + 
				'<span class="insight-type {type}"></span>' + 
			'</a>' + 
		'</div>' + 
		'<div class="insights-type">{label}</div>' + 
		'<div class="date">{date}</div>' + 
		'<a href="" class="title-link">{title}</a>' + 
		'<div class="read-more"><a href="" class="link-underline">{action}</a></div>' + 
	'</div>';

	$('.dropdown-filter-wrapper select').selectmenu({
		change: function() {
			loadInsights($(this).closest('.content'), insightsTemplate, 0, false);
		}
	});

	$('.insights-list').each(function() {
		loadInsights($(this).closest('.content'), insightsTemplate, 0, false);
	});

	$('.insights-list ~ .btn-wrap .btn').on('click', function(e) {
		e.preventDefault();

		loadInsights($(this).closest('.content'), insightsTemplate, $(this).closest('.content').find('.insights-list .insight-item').length, true);
	});

	$('.owl-carousel').owlCarousel({
		nav: true,
		dots: true,
		responsive: {
			0: {
				items: 2
			},
			768: {
				items: 5
			}
		}
	});

	$(window)
		.on('resize', function() {
			if ($(window).width() < 1024) {
				$('.tabs li:not(.active)').hide();

				$('.tabs li')
					.off('click.mobile-only')
					.on('click.mobile-only', function() {
						var self = this;
						if ($(this).closest('.tabs').hasClass('opened')) {
							$(this)
								.addClass('active')
								.closest('.tabs')
									.find('li')
										.each(function() {
											if (this !== self) {
												$(this)
													.removeClass('active')
													.slideUp(500);
											}
										})
									.end()
								.removeClass('opened');
						} else {
							$(this)
								.closest('.tabs')
									.find('li:not(.active)')
										.slideDown(500)
									.end()
								.addClass('opened');
						}
					});
			} else {
				$('.tabs li:not(.active)').show();
				$('.tabs li').off('click.mobile-only');
			}
		})
		.trigger('resize');


	$('#memo-archives-filter').selectmenu({
		change: function() {
			$(this)
				.closest('.filter')
					.siblings('.memos-list')
						.find('.memo-sublist.opened')
							.fadeOut(500)
							.removeClass('opened');


			$('[data-target="archive-' + $(this).val() + '"]')
				.fadeIn(500)
				.addClass('opened');
		}
	});

	$(document).on('change', '.checkbox-field', function() {
		$(this).siblings('.checkbox').toggleClass('checked');
	});

	$(document).on('click', '.submit', function(e) {
		e.preventDefault();

		$(this)
			.closest('form')
				.submit();
	});

	$(document).on('click', '.btn.subscribe', function(e) {
		e.preventDefault();

		$('#sf-country').selectmenu();

		$('.subscribe-lightbox').dialog({
			modal: true,
			width: '90%',
			maxWidth: '1180',
			open: function(event, ui) {
				$(this).parent().css('top', window.pageYOffset + 20);
			},
			resizable: false,
			create: function(event, ui) {
				$("body").css({ overflow: 'hidden' })
			},
			beforeClose: function(event, ui) {
				$("body").css({ overflow: 'inherit' })
			}
		});
	});

	if ($('.social-links-wrapper').length && $('.memo-content').length) {
		$('.trigger-top').css('top', 'calc(50vh + ' + ($('.social-links-wrapper').offset().top - 50) + 'px)' );
		var controller = new ScrollMagic.Controller();
		new ScrollMagic.Scene({triggerElement: '.trigger-top', duration: ($('.memo-content').offset().top + $('.memo-content').innerHeight()) - $('.trigger-top').offset().top}).setPin('.social-links-wrapper').addTo(controller);
	}

	var archivedMemosPopupTemplate = 
			'<div class="memo-sublist {className}" data-target="archive-{year}">' +
				'<h3>{year}</h3>' + 
				'<ul class="memo-items">{memo-items}</ul>' + 
			'</div>';
	var memosTemplate = '<li class="memo-item">' + 
		'<div class="date">{date}</div>' + 
		'<a href="" class="title">{title}</a>'
	'</li>';

	$('[data-archived-memos]').on('click', function(e) {
		e.preventDefault();

		var data = $(this).data('archived-memos');
		var template = '<h2>Archived Memos</h2>' +
							'<div class="scrollbar-inner memos-list">';

		for (var i in data) {
			var item = data[i];
			var year = Object.keys(item)[0];
			var memos = item[year];
			var memosHtml = '';
			
			for (var k in memos) {
				var memo = memos[k];
				memosHtml += memosTemplate
									.replace('{date}', memo.date)
									.replace('{title}', memo.title);
			}

			template += archivedMemosPopupTemplate
							.replace('{className}', (i == 0 ? 'opened' : ''))
							.replaceAll('{year}', year)
							.replace('{memo-items}', memosHtml);
		}

		template += '</div>';

		$('.archived-memos-popup')
			.html(template)
			.dialog({
				modal: true,
				width: $(window).outerWidth() < 768 ? $(window).outerWidth() - 30 : '90%',
				maxWidth: '1180',
				resizable: false,
				position: ['center', 20],
				maxHeight: $(window).outerHeight() * 0.90,
				create: function(event, ui) {
					$("body").css({ overflow: 'hidden' })
				},
				beforeClose: function(event, ui) {
					$("body").css({ overflow: 'inherit' })
				}
			});

		$('.memos-list')
			.scrollbar();
		$('.memos-list.scroll-content')
			.removeClass('memos-list')
			.parent()
				.css('max-height', ($('.archived-memos-popup').innerHeight() - $('.archived-memos-popup h2').outerHeight(true) - 60));

		$('.memo-sublist:not(.opened)').each(function() {
			$('.memo-items', this).hide();
		});

		$('.memo-sublist h3').on('click', function() {
			var thisSublist = $(this).closest('.memo-sublist');

			if ($(this).closest('.memo-sublist').hasClass('opened')) {
				thisSublist
					.find('.memo-items')
						.slideUp(500)
					.end()
					.removeClass('opened');
			} else {
				thisSublist
					.closest('.memos-list')
						.find('.memo-sublist.opened')
							.find('.memo-items')
								.slideUp(500)
							.end()
							.removeClass('opened')
						.end()
					.end()
					.find('.memo-items')
						.slideDown(500)
					.end()
					.addClass('opened');
			}
		});
	});
}

function initResponsibilityEvents() {
	$('.insights-list').owlCarousel({
		nav: true,
		dots: true,
		responsive: {
			0: {
				items: 2
			},
			640: {
				items: 3
			}
		}
	});

	$(window)
		.on('resize', function() {
			if ($(window).width() >= 550) {
				$('.membership-list .description').show();
			} else {
				$('.membership-list .item:not(.active) .description').hide();
				$('.membership-list').trigger('destroy.owl.carousel');

				$(document).on('click', '.membership-list .item .img-wrap', function() {
					if ($(this).closest('.item').hasClass('active')) {
						$(this)
							.closest('.item')
								.find('.description')
									.slideUp()
								.end()
							.removeClass('active');
					} else {
						$(this)
							.closest('.membership-list')
								.find('.item.active')
									.each(function() {
										$(this)
											.find('.description')
												.slideUp()
											.end()
											.removeClass('active');
									})
								.end()
							.end()
							.closest('.item')
								.find('.description')
									.slideDown()
								.end()
								.addClass('active');
					}
				});
			}
		})
		.trigger('resize');
}

function initStrategiesEvents() {
	if ($(window).width() < 600) {
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
	} else {
		$('.odometer').each(function() {
			od = new Odometer({
				el: this
			});

			od.update($(this).data('odometer'));
			$(this).data('odometer-ready', true)
		});
	}

	$(".insights-list").owlCarousel({
		nav: true,
		loop: false,
		responsive: {
			0: {
				items: 2
			},
			628: {
				items: 3
			}
		}
	});

	$(".people-wrapper").owlCarousel({
		nav: true,
		loop: false,
		responsive: {
			0: {
				items: 2
			},
			831: {
				items: 3
			},
			1076: {
				items: 4
			}
		}
	});

	$('.full-width-tabs .tab:not(.active) .description').hide();

	$(document).on('click', '.full-width-tabs .tab h4', function() {
		if ($(this).closest('.tab').hasClass('active')) {
			$(this).closest('.full-width-tabs')
		}
	});

	$(document).on('click', '.full-width-tabs .tab h4', function() {
		if ($(this).closest('.tab').hasClass('active')) {
			$(this)
				.closest('.tab')
					.find('.description')
						.slideUp()
					.end()
				.removeClass('active');
		} else {
			$(this)
				.closest('.full-width-tabs')
					.find('.tab.active')
						.each(function() {
							$(this)
								.find('.description')
									.slideUp()
								.end()
								.removeClass('active');
						})
					.end()
				.end()
				.closest('.tab')
					.find('.description')
						.slideDown()
					.end()
					.addClass('active');
		}
	});
}

function initContactUsEvents() {
	$('.map-wrapper svg .map-item').each(function() {
		var content = "<h4>{location}</h4><div class='address'>{address}</div><div class='phone'>P: <a href='tel:{phone}'>{phone}</a></div>";
		var data = $(this).data('tooltip');
		if (data) {
			content = content
					.replaceAll('{location}', data.location)
					.replaceAll('{address}', data.address)
					.replaceAll('{phone}', data.phone);

			if (data.fax) {
				content += "<div class='fax'>F: <a href='tel:{fax}'>{fax}</a></div>".replaceAll('{fax}', data.fax);
			}

			$(this).attr('title', content);
		}
	});

	$('.map-wrapper svg').tooltip({
		content: function () {
			return $(this).attr('title');
		},
		position: { my: "center top+15", at: "center bottom", collision: "flipfit" },
		classes: {
			"ui-tooltip": "map-info"
		}
	});

	var addressTemplate = "<h5>{location}</h5><div class='address'>{address}</div><div class='phone'>P: <a href='tel:{phone}'>{phone}</a></div>";

	$('.addresses').each(function() {
		var allAddresses = $(this).data('addresses');
		console.log(allAddresses);
		var addressesList = "";

		$.each(allAddresses, function(i, data) {
			var content = addressTemplate
					.replaceAll('{location}', data.location)
					.replaceAll('{address}', data.address)
					.replaceAll('{phone}', data.phone);

			if (data.fax) {
				content += "<div class='fax'>F: <a href='tel:{fax}'>{fax}</a></div>".replaceAll('{fax}', data.fax);
			}
			addressesList += "<li>" + content + "</li>";
		});

		$(this).html(addressesList);
	});

	$('.countries .country:not(.active) .addresses').hide();

	$(document).on('click', '.countries h4', function() {
		if ($(this).closest('.country').hasClass('active')) {
			$(this)
				.closest('.country')
					.find('.addresses')
						.slideUp()
					.end()
				.removeClass('active');
		} else {
			$(this)
				.closest('.countries')
					.find('.country.active')
						.each(function() {
							$(this)
								.find('.addresses')
									.slideUp()
								.end()
								.removeClass('active');
						})
					.end()
				.end()
				.closest('.country')
					.find('.addresses')
						.slideDown()
					.end()
					.addClass('active');
		}
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
		case 'insights':
			initInsightEvents();
			break;
		case 'responsibility':
			initResponsibilityEvents();
			break;
		case 'strategies':
			initStrategiesEvents();
			break;
		case 'contact-us':
			initContactUsEvents();
			break;
	}

	$('a.has-tooltip').tooltip({
		position: { my: "center top+15", at: "center bottom", collision: "flipfit",using: function( position, feedback ) {
				$(this)
					.css(position)
					.addClass(feedback.vertical);
			}
		},
		classes: {
			"ui-tooltip": "has-arrow"
		},
	});

	window.prevScrollpos = window.pageYOffset;
	$(window).on('scroll', throttle(function(e) {
		showHideNav(e);
	}, 150));

	initFooterEventss();
});

function showHideNav(e) {
	var currentScrollPos = window.pageYOffset;

	var bannerElement = $('.hero-slides-wrapper').length > 0 ? $('.hero-slides-wrapper') : $('.page-hero');
	var bannerHeight = bannerElement.length > 0 ? bannerElement.offset().top + bannerElement.outerHeight() : 400;

	if (currentScrollPos > bannerHeight) {
		if (window.prevScrollpos > currentScrollPos) {
			$('.header').removeClass('hide-nav');
		} else {
			$('.header').addClass('hide-nav');
		}
	} else {
		$('.header').removeClass('hide-nav');
	}

	window.prevScrollpos = currentScrollPos;
}

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