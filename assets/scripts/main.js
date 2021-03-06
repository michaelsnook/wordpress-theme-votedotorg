/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  function navOnScroll(fadeInPosition) {
    // fadeIn navigation header after fadeInPosition and fadeOut above section.hero
    scrollPosition = $(this).scrollTop();
    if ( scrollPosition <= fadeInPosition ) {
      $('nav.usa-site-navbar').fadeOut().css({position:'fixed', width: '100%', 'background-color': 'none', 'visibility': 'hidden'});
    } else if ( scrollPosition > fadeInPosition ) {
      $('nav.usa-site-navbar').fadeIn().css({position:'fixed', width: '100%', 'background-color': 'white', 'z-index': 100, 'visibility': 'visible'});
    }
  }

  var Sage = {
    // All pages
    'common': {
      init: function() {
        // JavaScript to be fired on all pages
        // mobile nav
        $('.menu-btn.mobile-only').click(function(){
          var menuCollapsed = $('.nav-menu.mobile-only').hasClass('collapsed');
          if (!menuCollapsed){
            $('.nav-menu.mobile-only').addClass('collapsed');
          } else {
           $('.nav-menu.mobile-only').removeClass('collapsed');
          }
         });

      },
      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired

      }
    },
    // Home page
    'home': {
      init: function() {
        // JavaScript to be fired on the home page
        // fade in the navigation bar based on browser width, remove handler when browser width is below 768px
        var browserWidth = window.innerWidth;
        var fadeInPosition = $('section.hero').next().position().top;

        $(window).resize(function() {
          browserWidth = window.innerWidth;
          fadeInPosition = $('section.hero').next().position().top;
          if (browserWidth < 768) {
            //add css to display mobile nav and remove scroll event handler
            $(window).off('scroll');
            $('nav.usa-site-navbar').fadeIn().css({position:'relative', display: 'block', 'visibility': 'visible'});
          } else {
            //for tablet and above add event handler for scrolling
            navOnScroll(fadeInPosition);
            $(window).scroll( function() {
              navOnScroll(fadeInPosition);
            });
          }
        })
        if (browserWidth >= 768) {
          // fade in and fade out navigation bar based on fadeInPosition
          $(window).scroll( function() {
            navOnScroll(fadeInPosition);
          } );
        } else {
          //don't execute navOnScroll for mobile browsers and show header
          $(window).off('scroll',navOnScroll);
          $('nav.usa-site-navbar').fadeIn().css({position:'relative', display: 'block', 'visibility': 'visible'});
        }
      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      }
    },
    // State pages
    'state': {
      init: function() {
        // JavaScript to be fired on the state pages
        // fade in the navigation bar based on browser width, remove handler when browser width is below 768px
        var browserWidth = window.innerWidth;
        var fadeInPosition = $('section.hero').next().position().top;

        $(window).resize(function() {
          browserWidth = window.innerWidth;
          fadeInPosition = $('section.hero').next().position().top;

          if (browserWidth < 768) {
            //add css to display mobile nav and remove scroll event handler
            $(window).off('scroll');
            $('nav.usa-site-navbar').fadeIn().css({position:'relative', display: 'block', 'visibility': 'visible'});
          } else {
            //for tablet and above add event handler for scrolling
            navOnScroll(fadeInPosition);
            $(window).scroll( function() {
              navOnScroll(fadeInPosition);
            });
          }
        })
        if (browserWidth >= 768) {
          // fade in and fade out navigation bar based on fadeInPosition
          $(window).scroll( function() {
            navOnScroll(fadeInPosition);
          } );

        } else {
          //don't execute navOnScroll for mobile browsers and show header
          $(window).off('scroll',navOnScroll);
          $('nav.usa-site-navbar').fadeIn().css({position:'relative', display: 'block', 'visibility': 'visible'});
        }
        
      },
      finalize: function() {
        // JavaScript to be fired on the state pages, after the init JS
        
      }
    },
    // About us page, note the change from about-us to about_us.
    'about_us': {
      init: function() {
        // JavaScript to be fired on the about us page
      }
    },
    'iframe': {
      init: function() {
        // resize iFrame with inner content
        iFrameResize({ log:true, checkOrigin:false});
        $('iframe').iFrameResize({minHeight: 1000, sizeHeight: true});


      }
    },
    'table': {
      init: function(){
        function UpdateTableHeaders() {
           $(".persist-area").each(function() {

               var el             = $(this),
                   offset         = el.offset(),
                   scrollTop      = $(window).scrollTop(),
                   floatingHeader = $(".floatingHeader", this)

               if ((scrollTop > offset.top) && (scrollTop < offset.top + el.height())) {
                   floatingHeader.css({
                    "visibility": "visible"
                   });
               } else {
                   floatingHeader.css({
                    "visibility": "hidden"
                   });
               }
           });
        }
        // DOM Ready
        var clonedHeaderRow;

        $(".persist-area").each(function() {
            clonedHeaderRow = $(".persist-header", this);
            clonedHeaderRow
              .before(clonedHeaderRow.clone())
              .css("width", clonedHeaderRow.width())
              .addClass("floatingHeader");

        });

        $(window)
         .scroll(UpdateTableHeaders)
         .trigger("scroll");
      }
    },
    // Technology page -- the clip to copy feature
    'technology': {
      init: function() {
        // JavaScript to be fired on the technology page
        var client = new ZeroClipboard( document.getElementsByClassName("clip_button") );

        client.on( "ready", function( readyEvent ) {
          // alert( "ZeroClipboard SWF is ready!" );

          client.on( "aftercopy", function( event ) {
            // `this` === `client`
            // `event.target` === the element that was clicked
            event.target.style.display = "none";
            alert("Copied code to clipboard: " + "\n\r" + event.data["text/plain"] );
          } );
        } );

      }
    }
  };
  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = Sage;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.

jQuery(document).ready(function(){


});
