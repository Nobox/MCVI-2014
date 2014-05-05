(function($) {

    $(document).ready(function() {

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
        $('.btn-play, .btn-play-small').colorbox({
            iframe: true,
            width: "100%",
            maxWidth: "700",
            height: "100%",
            maxHeight: "700",
            returnFocus: false
        });

        $('.lightbox-footer').colorbox({
            iframe: true,
            width: "700",
            height: "650",
            returnFocus: false
        });

        $('#home-slider').find('.slides').carouFredSel({
            responsive: true,
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

        $entryPopup.css({
            left: ($(window).width() - $entryPopup.width()) / 2
        });

        if (!Modernizr.touch) {
            $('.slide-text').css('left', (($('.slide-text').width()) / 2) + (($(window).width() - 960) / 2));
            $('.slide-text h2, .slide-text p').css('text-align', 'left');
        }
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
        }


        function entriesMobile() {

            $entry.on('click', function() {

                var $this = $(this);

                $this.parent().find('.entry-popup').show();
                $this.parent().addClass('expanded');

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

            $('.text-entry').on('click', 'h6', function() {

                var $this = $(this);

                $this.parent().find($entryPopup).show();
                $this.parent().addClass('expanded');

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
    if (!Modernizr.touch) {
        $('.slide-text').css('left', (($('.slide-text').width()) / 2) + (($(window).width() - 960) / 2));
        $('.slide-text h2, .slide-text p').css('text-align', 'left');
    }
});
