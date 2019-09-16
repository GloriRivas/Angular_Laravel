

(function ($) {
  "use strict";
  
  function loggedIn() {
    return localStorage.getItem('token') && !!localStorage.getItem('profile');
  }

  function showHide(selector,show){    
    $(selector).each(function(i,element){
      if (show)
        $(element).show();
      else
	$(element).hide();
    })
  }
  
  function showEach(selector) {
    showHide(selector,true);
  }
  
  function hideEach(selector) {
    showHide(selector,false);
  }
  
  function filterAuthFields() {
    if (loggedIn()) {
      $(".authenticate").hide();
      $(".loadcredo").hide();


      showEach(".dropdown");
      showEach(".inventory_nav");
      
      $("#user-profile-menu").hide();      
      ////////////////////////////////////////////////////////////////////////
      // $(".inventory_nav").each(function(index,inventoryElement) {	    //
      // 	$(inventoryElement).css({display: "block"})		    //
      // });								    //
      // $(".dropdown").each(function(index,dropdown) {			    //
      // 	$(dropdown).css({display: "block"});			    //
      // });								    //
      ////////////////////////////////////////////////////////////////////////
    }
    else {
      hideEach(".user-profile-menu");
      
      hideEach(".inventory_nav");

      hideEach(".dropdown")
      
      $("#logout").removeClass("active");
      $("#logout").parent().removeClass("active");

      
      showEach(".authenticate");
      showEach(".loadcredo");
    }
  }

  function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    
    filterAuthFields();
  }

  
  // Filter un-/auth fields
  filterAuthFields();

  $(document).on('click','#logout',function(e){
    logOut(); 
  });

  $(window).on('resize',function(){
    console.log('resized');
    filterAuthFields();
  });
  
  // Initiate the wowjs animation library
  new WOW().init();
  
  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');
    
    $(document).on('click', '.menu-has-children i', function(e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
      
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    
    
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }
  
  // Header scroll class
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }





  // Intro carousel
  var introCarousel = $(".carousel");
  var introCarouselIndicators = $(".carousel-indicators");
  introCarousel.find(".carousel-inner").children(".carousel-item").each(function(index) {
    (index === 0) ?
    introCarouselIndicators.append("<li data-target='#introCarousel' data-slide-to='" + index + "' class='active'></li>") :
    introCarouselIndicators.append("<li data-target='#introCarousel' data-slide-to='" + index + "'></li>");

    $(this).css("background-image", "url('" + $(this).children('.carousel-background').children('img').attr('src') +"')");
    $(this).children('.carousel-background').remove();
  });

  $(".carousel").swipe({
    swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
      if (direction == 'left') $(this).carousel('next');
      if (direction == 'right') $(this).carousel('prev');
    },
    allowPageScroll:"vertical"
  });

  // Porfolio isotope and filter
  var portfolioIsotope = $('.portfolio-container').isotope({
    itemSelector: '.portfolio-item',
    layoutMode: 'fitRows'
  });

  $('#portfolio-flters li').on( 'click', function(e) {
    $("#portfolio-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');

    
    portfolioIsotope.isotope({ filter: $(this).data('filter') });
    
  });

})(jQuery);

