let $tags = $('.tags');

if ($tags.find('.active').length === 0) {
    $tags.find('a').eq(0).addClass('active');
}

$(document).keyup(function(e) {
    if (e.key === "Escape") {
        $('body').removeClass('success feedback-open subscribe');
    }
});

if ($('#map').length > 0) {
    setTimeout(function () {
        let element = document.createElement('script');
        element.type = 'text/javascript';
        element.src = '//api-maps.yandex.ru/2.0/?load=package.standard&apikey=51d373bc-ef59-4e41-8e63-3f5828620b8e&lang=ru-RU&onload=mapInit';
        document.getElementsByTagName('body')[0].appendChild(element);
    }, 1200);
}

function openFeedbackForm() {
    $('body').addClass('feedback-open')
    $('.feedback-form').addClass('open');
}

function closeFeedbackForm() {
    $('body').removeClass('feedback-open menu-open');
    $('.feedback-form').removeClass('open');
}

function mapInit() {
    let map = new ymaps.Map('map', {
        center: [55.361897, 86.067435],
        zoom: 17
    }, {
        searchControlProvider: 'yandex#search'
    });

    let atom_pin = new ymaps.Placemark([55.361897, 86.067435], {},
        {
            iconLayout: 'default#image',
            iconImageHref: '/wp-content/themes/atom/svg/pin.svg',
            iconImageSize: [64, 80],
            iconImageOffset: [-32, -80]
        });
    map.geoObjects.add(atom_pin);
}

$(document).ready(function () {

    console.log("%cCreated with ❤","color: #0b49c7; padding: 5px 0px 1px; border-bottom:2px solid #0b49c7;");


    $('.header-dark .nav-link')
        .hover(function() {
            $(this).removeClass('unactive').siblings().addClass('unactive');
        })
        .on('mouseleave', function() {
            $(this).siblings().removeClass('unactive');
        });

    $('nav').on('mouseleave', function() {
        $(this).find('.nav-link').removeClass('unactive');
    });

    $('[type="tel"]').mask('+7(000)000-0000');


    let $blogSlider = $('.blog-slider_wrap .swiper-container');
    let $otherProjects = $('.project-slider_wrap .swiper-container');
    let $serviceSlider = $('.services-slider_wrap .swiper-container');
    let $projectSlider = $('.project-slider_block .swiper-container');

    if ($otherProjects.length > 0) {
        new Swiper('.project-slider_wrap .swiper-container', {
            speed: 600,
            watchSlidesVisibility: true,
            preloadImages: false,
            lazy: true,
            navigation: {
                nextEl: '.project-arrows .slider-next',
                prevEl: '.project-arrows .slider-prev',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                910: {
                    slidesPerView: 2,
                    spaceBetween: 80
                }
            }
        });
    }

    if ($projectSlider.length > 0) {
        new Swiper('.project-slider_block .swiper-container', {
            navigation: {
                nextEl: '.project-slider_block .button-next',
                prevEl: '.project-slider_block .button-prev',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    slidesPerColumn: 1
                },
                740: {
                    slidesPerView: 2,
                    slidesPerColumn: 2
                },
                1080: {
                    slidesPerView: 3,
                    slidesPerColumn: 2
                },
                1200: {
                    slidesPerView: 4,
                    slidesPerColumn: 2
                }
            }
        });
    }

    if ($blogSlider.length > 0) {
        new Swiper('.blog-slider_wrap .swiper-container', {
            speed: 600,
            watchSlidesVisibility: true,
            preloadImages: false,
            lazy: true,
            navigation: {
                nextEl: '.blog-arrows .slider-next',
                prevEl: '.blog-arrows .slider-prev',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                660: {
                    slidesPerView: 2,
                    spaceBetween: 15
                },
                900: {
                    slidesPerView: 3,
                    spaceBetween: 15
                },
                1124: {
                    slidesPerView: 3,
                    spaceBetween: 70
                }
            }
        });
    }

    if ($serviceSlider.length > 0) {
        new Swiper('.services-slider_wrap .swiper-container', {
            speed: 600,
            watchSlidesVisibility: true,
            preloadImages: false,
            lazy: true,
            navigation: {
                nextEl: '.service-arrows .slider-next',
                prevEl: '.service-arrows .slider-prev',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                900: {
                    slidesPerView: 2,
                    spaceBetween: 15
                },
                1124: {
                    slidesPerView: 3,
                    spaceBetween: 70
                }
            }
        });
    }

    let $homeSlider = $('.home-slider_block');
    let $mainSlider;

    if ($homeSlider.length > 0) {
        $mainSlider = new Swiper('.home-slider_block .swiper-container', {
            speed: 400,
            watchSlidesVisibility: false,
            slidesPerView: 1,
            virtualTranslate: true,
            autoplay: {
                delay: 8000,
                disableOnInteraction: false
            },
            on: {
                transitionStart: function() {
                    $('.navigation .navigation-item').eq($mainSlider.activeIndex).addClass('active').siblings().removeClass('active');
                },
                init: function () {
                    $('.home-slider_block').addClass('active');
                    $('.navigation .navigation-item:nth-child(1)').addClass('active');
                },
            },
            fadeEffect: {
                crossFade: true
            },
            effect: "fade",
        });
    }

    $('body')
        .on('focus', '.input-wrap_placeholder input', function () {
            $(this).parent().addClass('active');
        })
        .on('click', '.subscribe button', function() {
            $('body').addClass('subscribe');
        })
        .on('click', '.burger', function() {
            $('body').addClass('menu-open');
        })
        .on('click', '.close-form', function() {
            $('body').removeClass('subscribe');
        })
        .on('click', '.subscribe-overlay', function(e) {
            if ($(e.target).hasClass('subscribe-overlay'))
                $('body').removeClass('subscribe');
        })
        .on('blur', '.input-wrap_placeholder input', function () {
            if ($(this).val() === '')
                $(this).parent().removeClass('active');
        })
        .on('click', '[data-feedback]', function() {
            openFeedbackForm();
        })
        .on('click', '.cookie-close', function(e) {
            $('.cookie-popup').remove();
            e.preventDefault();
        })
        .on('click', '.overlay-success .form-close', function() {
            $('body').removeClass('success');
        })
        .on('click', '.overlay-success', function(e) {
            if ($(e.target).hasClass('overlay-success')) {
                $('body').removeClass('success');
            }
        })
        .on('click', '.form-close', function() {
            closeFeedbackForm();
        })
        .on('click', '.clear-search_input', function() {
            $('.article-search_input').val('').focus();
            $('.search-block_wrap').removeClass('active');
            $(this).closest('form')[0].submit();
        })
        .on('click', '.navigation-item', function() {
            $mainSlider.slideToLoop($(this).index());
            $(this).addClass('active').siblings().removeClass('active');
            return false;

        })
        .on('input', '.article-search_input', function() {
            if ($(this).val() !== '') {
                $('.search-block_wrap').addClass('active');
            } else {
                $('.search-block_wrap').removeClass('active');
            }
        });


})