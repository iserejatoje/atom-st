setTimeout(function () {
    let element = document.createElement('script');
    element.type = 'text/javascript';
    element.src = '//api-maps.yandex.ru/2.0/?load=package.standard&apikey=51d373bc-ef59-4e41-8e63-3f5828620b8e&lang=ru-RU&onload=mapInit';
    document.getElementsByTagName('body')[0].appendChild(element);
}, 1200);

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
