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
    $('[type="tel"]').mask('+7(000)000-0000');

    $('.blog-slider').owlCarousel({
        center: true,
        autoWidth: true,
        startPosition: 1,
        dots: false,
        margin: 70
    });

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
})