var iPhone = /iPhone/.test(navigator.userAgent) && !window.MSStream;
var iPad = /iPad/.test(navigator.userAgent) && !window.MSStream;
var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if (iPhone) {
    $('body').addClass('iphone');
}
if (iPad) {
    $('body').addClass('ipad');
}
var ua = navigator.userAgent.toLowerCase();
if (ua.indexOf('safari') != -1) {
    if (ua.indexOf('chrome') > -1) {
        // alert("1") // Chrome
    } else {
        // alert("2") // Safari
        $('body').addClass('safari');
    }
}

if (window.navigator.userAgent.indexOf("Edge") > -1) {
    $('body').addClass('edge');
}

var UAString = navigator.userAgent;
if (UAString.indexOf("Trident") !== -1 && UAString.indexOf("rv:11") !== -1) {
    $('body').addClass('ie');
}


$(document).ready(function () {

    $('.js_custom-slider').slick({
        infinite: true,
        slidesToShow: 7,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        prevArrow: "<img class='a-left control-c prev slick-prev' src='../img/images/slider-arrow.svg'>",
        nextArrow: "<img class='a-right control-c next slick-next' src='../img/images/slider-arrow.svg'>",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                }
            },

            {
                breakpoint: 920,
                settings: {
                    slidesToShow: 4,
                }
            },

            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                }
            },

            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '100px',
                    variableHeight: true
                }
            },

            {
                breakpoint: 350,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '80px',
                    variableHeight: true
                }
            },

        ]
    });

    $(document).scroll(function () {
        var top = $(document).scrollTop();
        if (top > 50) {
            $('.header').addClass('scroll')
        } else {
            $('.header').removeClass('scroll')
        }
    });

    $(document).on('click', '.header__mobile-menu', function (e) {
        $('.mobile-menu-overlay').addClass('active');
        $('.mobile-menu').addClass('active');
    });

    $(document).on('click', '.mobile-menu__close', function (e) {
        $('.mobile-menu-overlay').removeClass('active');
        $('.mobile-menu').removeClass('active');
    });

    $(document).on('click', '.mobile-menu-overlay', function (e) {
        $(this).removeClass('active');
        $('.mobile-menu').removeClass('active');
    });

    $(document).on('click', '.mobile-menu__link-arrow', function (e) {
        $(this).next().addClass('active');
        $('.mobile-menu__inner').addClass('hidden');
    });

    $(document).on('click', '.mobile-menu__back', function (e) {
        // $(this).prev().parent().removeClass('active');
        $('.mobile-menu__submenu').removeClass('active');
        $('.mobile-menu__inner').removeClass('hidden');
    });

    $(document).on('click', '.header__search-ico', function (e) {
        $('.popup-search').addClass('active');
    });

    $(document).on('click', '.header__mobile-search', function (e) {
        $('.popup-search').addClass('active');
    });

    $(document).on('click', '.header__search-name', function (e) {
        $('.popup-search').addClass('active');
    });

    $(document).on('click', '.popup-search__inner svg', function (e) {
        $('.popup-search').removeClass('active');
    });


// checking browser for WEBP
    hasWebP().then(function () {
        // var bLazy = new Blazy({
        //   src: 'data-blazy' // Default is data-src
        // });

    }, function () {
        if ($(window).width() > 768) {
            $('.webp-img').each(function () {
                var img = $(this).data('img');
                $(this).attr('data-blazy', img);

                var bLazy = new Blazy({
                    src: 'data-blazy' // Default is data-src
                });
            });
        } else {
            $('.webp-img').each(function () {
                var img;
                if ($(this).data('img-mobile') !== undefined)
                    img = $(this).data('img-mobile'); else webp = $(this).data('img');
                $(this).attr('style', 'background-image: url(' + img + ')');
            });
        }

    });

});


//script fro webp img and background
var hasWebP = (function () {
    // some small (2x1 px) test images for each feature
    var images = {
        basic: "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==",
        lossless: "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA="
    };

    return function (feature) {
        var deferred = $.Deferred();

        $("<img>").on("load", function () {
            // the images should have these dimensions
            if (this.width === 2 && this.height === 1) {
                deferred.resolve();
            } else {
                deferred.reject();
            }
        }).on("error", function () {
            deferred.reject();
        }).attr("src", images[feature || "basic"]);

        return deferred.promise();
    }
})();