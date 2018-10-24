$(document).ready(function () {
    $('.js-horSlider').each(function () {
        var $this = $(this);
        var $wrapper = $(this).find('.js-horSlider-wrapper');  //бинд на холст из картинок
        if (!$wrapper.hasClass('disable')) {
            var $items = $(this).find('.js-horSlider-item');
            var currentSlide = 0; //текущий слайд
            var animated = false;  //состояние слайдера
            var $btnPag = $(this).find('.js-slider-pag');
            var appendCount = 0;

            $items.each(function () {
                $(this).outerWidth($('.js-horSlider-vewbox').outerWidth());//исправить
            });

            var resizeTimer;
            $(window).resize(function () {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function () {
                    $items.outerWidth($(this).closest('.js-horSlider-viewbox').outerWidth());
                    move();
                }, 100);
            });

            $btnPag.each(function (i) {
                $(this).on('click', function () {
                    currentSlide = i;
                    move();
                });
            });

            $wrapper.on('swipeleft', function () {
                moveRight();
            });

            $wrapper.on('swiperight', function () {
                moveLeft();
            });

            function move() {
                if (animated === false) {
                    animated = true;
                    var width = $items.eq(0).outerWidth() * currentSlide;
                    $wrapper.css({ 'transform': 'translatex(' + -width + 'px)' }).delay(200).promise().done(function () {
                        animated = false;
                    });
                    $btnPag.removeClass('active');
                    $btnPag.eq(currentSlide).addClass('active');
                    $items.removeClass('active');
                    $items.eq(currentSlide).addClass('active');
                    if ($(window).width() < 768) {
                        //$wrapper.outerHeight($items.eq(currentSlide).outerHeight());
                    } else {
                        $items.eq(currentSlide).find('.js-count').each(function () {
                            var $this = $(this);
                            //count($this);
                        });
                    }
                }
            }

            function moveRight() {
                if (currentSlide < $wrapper.children().length - 1) {
                    currentSlide++;
                    move();
                }
            }

            function moveLeft() {
                if (currentSlide > 0) {
                    currentSlide--;
                    move();
                }
            }
        }
    });

    (function() {
    $('.js-intro').find('.js-scroll-down').each(function () {
        $(this).click(() => {
            var height = $('.js-intro').height() + $('.js-intro').offset().top; //100px - header
            $('html').animate({
                scrollTop: height
            }, 500);
        });
        })
    }) ();

    $('.menu-upper_toggle').on('click', function () {
      $('.menu-upper').toggleClass('active');
      $('.menu_list').slideToggle('slow');
      $('.menu_buttons').slideToggle('slow');
    });
    
});
