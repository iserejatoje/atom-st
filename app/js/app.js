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
    $('body').removeClass('feedback-open')
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
            iconImageHref: 'app/svg/pin.svg',
            iconImageSize: [64, 80],
            iconImageOffset: [-32, -80]
        });
    map.geoObjects.add(atom_pin);
}

$(document).ready(function () {

    console.log("%cCreated by Sergey Valitov, with ❤","color: #000; padding: 5px 0px 1px; border-bottom:2px solid #71d1c2;");

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

    let $blogSlider = $('.blog-slider_wrap .swiper-container');
    $('[type="tel"]').mask('+7(000)000-0000');

    if ($blogSlider.length > 0) {
        const swiperCases = new Swiper('.blog-slider_wrap .swiper-container', {
            speed: 800,
            watchSlidesVisibility: true,
            preloadImages: false,
            lazy: true,
            navigation: {
                nextEl: '.blog-slider_arrows .blog-next',
                prevEl: '.blog-slider_arrows .blog-prev',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                800: {
                    slidesPerView: 2,
                    spaceBetween: 15
                },
                1124: {
                    slidesPerView: 3,
                    spaceBetween: 50
                }
            }
        });

    }

    $('body')
        .on('focus', '.input-wrap_placeholder input', function () {
            $(this).parent().addClass('active');
        })
        .on('blur', '.input-wrap_placeholder input', function () {
            if ($(this).val() === '')
                $(this).parent().removeClass('active');
        })
        .on('click', '[data-feedback]', function() {
            openFeedbackForm();
        })
        .on('click', '.form-close', function() {
            closeFeedbackForm();
        })
        .on('click', '.clear-search_input', function() {
            $('.article-search_input').val('').focus();
            $('.search-block_wrap').removeClass('active');
        })
        .on('input', '.article-search_input', function() {
            if ($(this).val() !== '') {
                $('.search-block_wrap').addClass('active');
            } else {
                $('.search-block_wrap').removeClass('active');
            }
        });

})