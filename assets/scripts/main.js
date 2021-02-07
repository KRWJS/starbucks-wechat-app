(function($) {

    /**
     * Fullpage
     * -------------------------
     */
    (function() {

        function setAnimatingState(animating) {
            animating = true;
            setTimeout(function() { animating = false }, 500);
        }

        // init fullpage
        var fullpage = $('#fullpage-wrapper').fullpage({
            loopHorizontal: false, // no loop for slider
            slidesNavigation: true, // slider dots navigation
            controlArrows: false, // no arrow for the slider
            verticalCentered: false,
            normalScrollElements: '.js-scrollable',
            afterLoad: function(anchorLink, index) {
                // add a loaded class for animations
                $('.section-' + index).addClass('section-loaded');

                // disable scrolling up/down when on section 3
                if (index == 3) {
                    $.fn.fullpage.setAllowScrolling(false, 'up, down');
                    $('.slide-1').addClass('slide-loaded');
                    ga('send', 'pageview', 'slide-1');
                }
                else {
                    $.fn.fullpage.setAllowScrolling(true);
                    ga('send', 'pageview', 'section-' + index);
                }
            },
            onLeave: function(index, nextIndex, direction) {
                // remove loaded class
                $('.section').removeClass('section-loaded');

                // only show section down arrow for the first 2 sections
                if (nextIndex == 4) {
                    $('.js-section-nav-down').addClass('is-faded');
                    $('.js-slide-next').removeClass('is-faded');
                }
                else {
                    $('.js-section-nav-down').removeClass('is-faded');
                    $('.js-slide-next').addClass('is-faded');
                }
            },
            afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {
                // attention: slideIndex starts at 0, while section index starts at 1 (because fuck consistency)

                ga('send', 'pageview', 'slide-' + (slideIndex + 1 ));

                // add a loaded class for animations
                $('.slide-' + (slideIndex + 1)).addClass('slide-loaded');

                var $slideNextBtn = $('.js-slide-next');
                // show/hide next slide nav
                if ($('.slide-' + (slideIndex + 1)).hasClass('last')) {
                    $slideNextBtn.addClass('is-faded');
                }
                else {
                    $slideNextBtn.removeClass('is-faded');
                }

                // different copy for next slide nav on first slide
                if (slideIndex == 0) {
                    $slideNextBtn.find('.slide__nav__copy').html($slideNextBtn.find('.slide__nav__copy').data('copy'));
                }
                else {
                    $slideNextBtn.find('.slide__nav__copy').html($slideNextBtn.find('.slide__nav__copy').data('copy-alt'));
                }
            },
            onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){
                $('.slide').removeClass('slide-loaded slide-content-opened slide-content-extra-opened');
                $('.section').removeClass('section-content-opened');
            },
            afterRender: function() {
                $('.js-section-height').height($('.section').height()); // set height with JS to counter iOS bug
            },
            afterResize: function() {
                $('.js-section-height').height($('.section').height()); // set height with JS to counter iOS bug
            }
        });

        // move to next section
        $('.js-section-nav-down').on('click touchstart', function(e) {
            e.preventDefault();
            $.fn.fullpage.moveSectionDown();
        });

        // move to next slide
        $('.js-slide-next').on('click', function(e) {
            e.preventDefault();
            $.fn.fullpage.moveSlideRight();
        });

        $('.js-content-open').on('click', function(e) {
            e.preventDefault();
            $(this).closest('.slide').addClass('slide-content-opened');
            $(this).closest('.section').addClass('section-content-opened');

            var page = 'slide-' + $(this).closest('.slide').data('index') + '-more-overview';
            ga('send', 'pageview', page);
        });

        $('.js-slide-content-more').each(function() {
            var hammertime = new Hammer(this, {
                touchAction: 'auto'
            });
            var $this = $(this);
            var $scrollableContent = $this.find('.js-scrollable');
            var animating = false;

            hammertime.get('swipe').set({
                direction: Hammer.DIRECTION_VERTICAL,
                threshold: 5,
                velocity: 0.3
            });

            hammertime.on('swipedown', function(e) {


                if (!animating) {
                    if ($this.closest('.slide').hasClass('slide-content-extra-opened')) {
                        // alert($scrollableContent.scrollTop());

                        //setTimeout(function() {
                            if ($scrollableContent.scrollTop() == 0) {
                                $this.closest('.slide').removeClass('slide-content-extra-opened');
                                setAnimatingState(animating);
                            }
                        //}, 100);

                    }
                    else {
                        $this.closest('.slide').removeClass('slide-content-opened slide-content-extra-opened');
                        $this.closest('.section').removeClass('section-content-opened');
                        setAnimatingState(animating);

                        var page = 'slide-' + $this.closest('.slide').data('index');
                        ga('send', 'pageview', page);
                    }
                }

            });

            hammertime.on('swipeup', function(e) {

                if (!animating) {
                    $this.closest('.slide').addClass('slide-content-extra-opened');
                    setAnimatingState(animating);
                    var page = 'slide-' + $this.closest('.slide').data('index') + '-more-content';
                    ga('send', 'pageview', page);
                }

            });

        });

        $('.js-slide-nav-down').on('click', function(e) {
            e.preventDefault();
            $(this).closest('.slide').addClass('slide-content-extra-opened');
            var page = 'slide-' + $(this).closest('.slide').data('index') + '-more-content';
            ga('send', 'pageview', page);
        });
    })();


    /**
     * Link tracking
     * -------------------------
     */
    (function() {
        $('.js-application-link').on('click', function(e) {
            // send vitual page view for application link clicks
            // we can make a goal funnel based on this later
            ga('send', 'pageview', '/apply');
        });
    })();

})($);
