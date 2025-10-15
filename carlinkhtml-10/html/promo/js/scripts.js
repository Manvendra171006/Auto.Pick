jQuery.noConflict()(function($) {

  "use strict";



  var $window = window,
      offset = '90%',
      fl_theme = window.fl_theme || {};
      fl_theme.window = $(window);
      fl_theme.document = $(document);
      window.fl_theme = fl_theme;
      fl_theme.window = $(window);
      fl_theme.sameOrigin = true;

  fl_theme.initVelocityAnimation = function(){
    var animated_velocity = $('.animated-item-velocity');

    // Hided item if animated not complete
    animated_velocity.each(function () {
      var $this = $(this),
          $item;

      if ($this.data('item-for-animated')) {
        $item = $this.find($this.data('item-for-animated'));
        $item.each(function() {
          if(!$(this).hasClass('animation-complete')) {
            $(this).css('opacity','0');
          }
        });
      } else {
        if(!$this.hasClass('animation-complete')) {
          $this.css('opacity','0');
        }
      }
    });

    // animated Function
    animated_velocity.each(function () {
      var $this_item = $(this), $item, $animation;
      $animation = $this_item.data('animate-type');
      if ($this_item.data('item-for-animated')) {
        $item = $this_item.find($this_item.data('item-for-animated'));
        $item.each(function() {
          var $this = $(this);
          var delay='';
          if ($this_item.data('item-delay')) {
            delay = $this_item.data('item-delay');
          }else {
            if ($this.data('item-delay')) {
              delay = $this.data('item-delay');
            }
          }
          $this.waypoint(function () {
                if(!$this.hasClass('animation-complete')) {
                  $this.addClass('animation-complete')
                      .velocity('transition.'+$animation,{delay:delay,display:'undefined',opacity:1});
                }
              },
              {
                offset: offset
              });
        });
      } else {
        $this_item.waypoint(function () {
              var delay='';
              if ($this_item.data('item-delay')) {
                delay = $this_item.data('item-delay');
              }

              if(!$this_item.hasClass('animation-complete')) {
                $this_item.addClass('animation-complete')
                    .velocity('transition.'+$animation,{  delay:delay,display:'undefined',opacity:1});
              }

            },
            {
              offset: offset
            });
      }
    });
  };
  fl_theme.initCounterFunction = function () {
    var fl_counter = $('.counter');
    fl_counter.each(function() {
      var $this = $(this);
      $this.waypoint(function () {
        $this.countTo();
      },{
        offset: offset
      });
    });
  };
  fl_theme.initSliderFunction = function () {
        $('.slider-preview-wrap').not('.slick-initialized').slick({
            draggable: true,
            speed: 900,
            slidesToShow: 3,
            centerMode: true,
            infinite: true,
            centerPadding: '60px',
            dots:true,
            arrows: false,
            autoplay:true,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });

    };
    // Isotope Indicator
   fl_theme.initIsotopeCustomFunction = function() {
        var $grid = $('.isotope-wrap');
        $grid.isotope({
            itemSelector: '.isotope-item',
            isAnimated: true,
            percentPosition: true,
            masonry: {
                columnWidth: '.isotope-item'
            }
        });

        $grid.imagesLoaded().progress( function() {
            $grid.isotope('layout');
        });
    };

    fl_theme.initScrollMenuFunction = function(){
        $('.nav-item a').click(function(){
            $(".active").removeClass("active");
            $(this).addClass("active");

            $('html, body').stop().animate({
                scrollTop: $($(this).attr('href')).offset().top - 160
            }, 300);
            return false;
        });
    };


  fl_theme.initVelocityAnimation();
  fl_theme.initSliderFunction();
  fl_theme.initIsotopeCustomFunction();
  fl_theme.initScrollMenuFunction();
  setTimeout(fl_theme.initCounterFunction,800);


});