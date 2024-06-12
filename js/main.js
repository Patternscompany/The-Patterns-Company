(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();
    
    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Team carousel
    $(".team-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: false,
        dots: false,
        loop: true,
        margin: 50,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Testimonial carousel

    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: true,
        dots: true,
        loop: true,
        margin: 0,
        nav : true,
        navText: false,
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    $(".clients-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: true,
        dots: true,
        loop: true,
        margin: 0,
        nav : true,
        navText: false,
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:1
            },
            992:{
                items:1
            }
        }
    });


     // Fact Counter

     $(document).ready(function(){
        $('.counter-value').each(function(){
            $(this).prop('Counter',0).animate({
                Counter: $(this).text()
            },{
                duration: 2000,
                easing: 'easeInQuad',
                step: function (now){
                    $(this).text(Math.ceil(now));
                }
            });
        });
    });


    $(document).ready(function() {
        function highlightActiveNavItem() {
            var scrollTop = $(window).scrollTop();
            $("section.scroll-section").each(function() {
                var sectionTop = $(this).offset().top;
                if (scrollTop >= sectionTop && scrollTop < sectionTop + $(this).outerHeight()) {
                    var sectionId = $(this).attr("id");
                    $(".sticky-left-nav li.nav-active").removeClass("nav-active");
                    $(".sticky-left-nav li a[href='#" + sectionId + "']").parent().addClass("nav-active");
                }
            });
        }
    
        // Highlight active navigation item on page load
        highlightActiveNavItem();
        $(document).on("mouseenter", ".sticky-left-nav li", function() {
            $(this).hasClass("mb50") || $(this).addClass("nav-active")
        }),
        $(document).on("mouseleave", ".sticky-left-nav li", function() {
            $(this).hasClass("mb50") || $(this).removeClass("nav-active")
        }),
        $(window).scroll(function() {
            highlightActiveNavItem();
        });
    
        $("nav.sticky-left-nav a").click(function(e) {
            e.preventDefault();
            var targetSectionId = $(this).attr("href");
            $("html, body").animate({
                scrollTop: $(targetSectionId).offset().top
            }, 100);
        });
    });
    // $(document).ready(function() {
    //     function e() {
    //         $(".sticky-left-nav").offset().top + $(".sticky-left-nav").height() >= $("footer").offset().top - 10 && $(".sticky-left-nav").addClass("bottom-menu").removeClass("top-menu"),
    //         $(document).scrollTop() + window.innerHeight < $("footer").offset().top && $(".sticky-left-nav").addClass("top-menu").removeClass("bottom-menu")
    //     }
       
       
    //     $(document).on("mouseenter", ".sticky-left-nav li", function() {
    //         $(this).hasClass("mb50") || $(this).addClass("nav-active")
    //     }),
    //     $(document).on("mouseleave", ".sticky-left-nav li", function() {
    //         $(this).hasClass("mb50") || $(this).removeClass("nav-active")
    //     }),
    //     $(window).scroll(function() {
    //         var a = $(window).scrollTop();
    //         a >= 10 ? $("section.scroll-section").each(function(e) {
    //             $(this).position().top <= a - 0 && ($(".sticky-left-nav li.nav-active").removeClass("nav-active mb50"),
    //             $(".sticky-left-nav li").eq(e).addClass("nav-active mb50"))
    //         }) : $(".stick-left-nav-ul li.nav-active-menu").removeClass("nav-active-menu"),
    //         e()
    //     }),
    //     $("nav.sticky-left-nav a").click(function(e) {
    //         e.preventDefault(),
    //         $(this).parent().addClass("nav-active"),
    //         $("html, body").animate({
    //             scrollTop: $($(this).attr("href")).offset().top +1
    //         }, 500)
    //     })
    // }); 

    document.addEventListener('DOMContentLoaded', function() {
        var video = document.getElementById('myCanvas');

        function tryPlayVideo() {
            video.muted = true; // Start muted to comply with autoplay policy
            var playPromise = video.play();

            if (playPromise !== undefined) {
                playPromise.then(function() {
                    // Autoplay started!
                    console.log('Autoplay started successfully');
                    video.muted = false;
                    playPromise;
                }).catch(function(error) {
                    // Autoplay was prevented
                    console.log('Autoplay was prevented: ', error);
                    // Video remains muted to ensure playback
                    video.muted = true;
                });
            }
        }

        // Ensure video can be played through to avoid premature play attempts
        video.addEventListener('canplaythrough', function() {
            tryPlayVideo();
        });
    });

    
})(jQuery);

