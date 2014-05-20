var _orientatio = 0;

(function($) {

    $(document).ready(function() {

//        $('.section-expertise').mouseenter(function() {
//            $(this).css('background-image', 'url(css/images/section-expertise-up.jpg)');
//        })
//
//        $('.section-expertise').mouseleave(function() {
//            $(this).css('background-image', 'url(css/images/section-expertise.jpg)');
//        })


        //Vars
        var $btnClose = $('.btn-close'),
                $entry = $('.entry-image, .entry-text'),
                $entryImg = $('.entry-image'),
                $entryPopup = $('.entry-popup'),
                $btnMore = $('.text-entry'),
                $btnNav = $('.btn-menu'),
                $nav = $('.nav > ul'),
                $navOverlay = $('.mobile-overlay'),
                $articleText = $('.article-text'),
                $entryImgHeight = $('.entry-image').outerHeight();



        //Mobile nav
        $btnNav.on('click', function(e) {

            var $this = $(this);

            $this.toggleClass('active');

            $nav.toggle();
            $navOverlay.toggle();

            e.preventDefault();
        });

        //Colorbox
        if (Modernizr.touch) {
            $('.entry-text h6').click(function(event) {
                var _btnAction = $(this).parent().parent().find('a');
                var _file = $(_btnAction).attr('mobile');
                window.open(_file, "_self")
            });
            //

            $('.entry-text span').click(function(event) {
                var _padre = $(this).parent().parent();
                $(_padre).find('.ghosttext').fadeToggle("fast", "linear");
            });

        }

        $('.btn-play, .btn-play-small').click(function(event) {
            if (!Modernizr.touch) {
                $(this).colorbox({
                    iframe: true,
                    width: "100%",
                    maxWidth: "700",
                    height: "100%",
                    maxHeight: "700",
                    returnFocus: false
                });
            } else {
                var _file = $(this).attr('mobile');
                $(this).attr('href', $(this).attr('mobile'));
                //
            }
        });
        /*$('.btn-play, .btn-play-small').colorbox({
         iframe: true,
         width: "100%",
         maxWidth: "700",
         height: "100%",
         maxHeight: "700",
         returnFocus: false
         });*/

        $('.lightbox-footer').colorbox({
            iframe: true,
            width: "700",
            height: "650",
            returnFocus: false
        });


        checkIsSmall();


        $entryPopup.css({
            left: ($(window).width() - $entryPopup.width()) / 2
        });

        //Popups
        entriesToggle();

        function entriesToggle() {
            if ($(window).width() > 767) {
                entriesDesktop();
            } else {
                $entryPopup.hide();
                entriesMobile();

            }
        }

        function entriesDesktop() {
            $('.entries .row .columns:first-child ~ .columns').find('.entry-popup').addClass('center');

            $('.entries .row .columns:last-of-type').find('.entry-popup').addClass('right').removeClass('center');


            $btnMore.on('click', function(e) {

                var $this = $(this),
                        $parentScroll = $this.parent().offset().top,
                        $popUp = $this.parents('.entries').find('.' + $this.attr('rel'));

                //$('html, body' ).animate({scrollTop: $parentScroll - 80});

                //$this.parent().find($entryPopup).toggleClass('visible');
                $popUp.css({
                    position: 'fixed',
                    top: '54px',
//                    top: (($(window).height() - $popUp.height()) / 2) - $(".header").height(),
//                    left: ($(window).width() - $popUp.width()) / 2
                });
                $popUp.toggleClass('visible');

                $this.toggleClass('active');
                $this.parents('.entries').find('.popup-overlay').toggleClass('visible');

                e.preventDefault();

            });

            $entryImg.on('click', function() {
                var $this = $(this),
                        $parentScroll = $this.parent().offset().top,
                        $popUp = $this.parents('.entries').find('.' + $this.parent().attr('rel'));

                if ($this.parents('.entries').hasClass('entries') && !$this.parents('.entries').hasClass('video-entries')) {
                    //$('html, body' ).animate({scrollTop: $parentScroll});
                }

                $popUp.css({
                    position: 'fixed',
                    top: '60px',
//                    top: (($(window).height() - $popUp.height()) / 2) - $(".header").height(),
//                    left: ($(window).width() - $popUp.width()) / 2
                });
                $popUp.toggleClass('visible');
                //$this.parent().find($entryPopup).toggleClass('visible');
                $this.parents('.entries').find('.popup-overlay').toggleClass('visible');

            });

            $btnClose.on('click', function(e) {
                var $this = $(this);

                $this.parents('.entry-popup').removeClass('visible');
                $this.parents('.entries').find('.popup-overlay').removeClass('visible');
                $('.entry').removeClass('active');

                e.preventDefault();
            });

            $(document).on('click', function(e) {
                if ($(e.target).closest('.popup-overlay').length) {
                    $entryPopup.removeClass('visible');
                    $('.popup-overlay').removeClass('visible');
                    $('.entry').removeClass('active');
                }
            });

            //

        }


        function entriesMobile() {

            $('.entries .entry').css('borderTop', '1px solid #EEE');

            $entry.on('click', function() {

//                var $this = $(this);

//                $this.parent().find('.entry-popup').show();
//                $this.parent().addClass('expanded');

            });

            $btnClose.on('click', function(e) {
                var $this = $(this);

                $this.parents('.entry-popup').hide();

                $this.parents('.entry').removeClass('expanded');


                e.preventDefault();
            });

            $btnMore.on('click', function(e) {

                var $this = $(this);

                $this.parent().find($entryPopup).show();
                $this.parent().addClass('expanded');


                e.preventDefault();

            });

            $('.text-entry').on('click', function(e) {

                var $this = $(this),
                        $mobile = $this.parent().find('.mobile-display');

                if ($mobile.css('display') == 'none') {
                    $mobile.slideDown();
                    $this.children('.more').css({
                        background: 'url(css/images/arrow-down.png) no-repeat 0 0',
                        width: '19px',
                        height: '11px',
                    })
                } else {
                    $mobile.slideUp();
                    $this.children('.more').css({
                        background: 'url(css/images/arrow-right.png) no-repeat 0 0',
                        width: '11px',
                        height: '19px',
                    })
                }

//                console.log($this.html());

//                var $this = $(this),
//                        $parentScroll = $this.parent().offset().top,
//                        $popUp = $this.parents('.entries').find('.' + $this.parent().attr('rel'));
//
//                        console.log('.' + $this.parent().attr('rel'));

                //$('html, body' ).animate({scrollTop: $parentScroll - 80});

                //$this.parent().find($entryPopup).toggleClass('visible');
//                $popUp.css({
//                    position: 'relative',
//                    top: '54px',
//                    top: (($(window).height() - $popUp.height()) / 2) - $(".header").height(),
//                    left: ($(window).width() - $popUp.width()) / 2
//                });
//                $popUp.toggleClass('visible');
//
//                $this.toggleClass('active');
//                $this.parents('.entries').find('.popup-overlay').toggleClass('visible');

//                $popUp.show();

//                e.preventDefault();

//                var $this = $(this);

//                $this.parent().find($entryPopup).show();
//                $this.parent().addClass('expanded');

            });

            $('.total-entry').on('click', function(e) {

                var $this = $(this),
                        $mobile = $this.parent().find('.mobile-display');

                console.log($mobile.html());

                if ($mobile.css('display') == 'none') {
                    $mobile.slideDown();
                    $this.children('.entry-text').children('span').css({
                        background: 'url(css/images/ret_arrow2_down.png) no-repeat',
                        backgroundSize: '30px auto'
                    })
                } else {
                    $mobile.slideUp();
                    $this.children('.entry-text').children('span').css({
                        background: 'url(css/images/ret_arrow2.png) no-repeat',
                        backgroundSize: '30px auto'
                    })
                }
            });

        }

    });

    $(window).load(function() {
        var $articleText = $('.article-text'),
                $entryImgHeight = $('.entry-image').outerHeight();

        $articleText.css('height', $entryImgHeight);

        $('.wrapper').addClass('visible');

    });

})(jQuery);


$(window).resize(function() {
    checkIsSmall();
});


function checkIsSmall() {
    //Slider
    if (!matchMedia(Foundation.media_queries['small']).matches) {
        $('#home-slider .slides').carouFredSel({
            responsive: true,
            play: false,
            auto: {
                duration: 800
            },
            next: '.next',
            prev: '.prev',
            pagination: {
                container: '.paging',
                anchorBuilder: true
            },
            swipe: {
                onTouch: true
            }
        });
    } else {
        $('#home-slider .slides').trigger('paused', true);
    }
}