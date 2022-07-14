// GalleryControl.js
$(document).ready(function() {
    let colorActve = '#ea84ff',
        colorRegular = '#f3f4f8';

    // изменение цвета кнопок прокрутки
    $(document).ready(function() {
        $('.JS_Gallery-Control').on('touchstart mousedown', function() {
            $(this).css('background-color', colorActve);
        })
        $('.JS_Gallery-Control').on('touchend mouseup', function() {
            $(this).css('background-color', colorRegular);
        })
    })    // END изменение цвета кнопок прокрутки

    $(document).ready(function() {
        let arrPositionsOfTabs = {};

        $('.JS_Gallery-Control').click(function() {
            const WindowPositionLeft = 1 + $('.JS_Gallery-Window').offset().left;
            const WindowWidth = $('.JS_Gallery-Window').css('width');
            const WindowPostitonRight = WindowPositionLeft + WindowWidth ;
            let widthOfFirstVisibleTab,
                tabPositionLeft,
                tabPositionTop,
                galleryTabs = $('.JS_Gallery-Tab'),
                indexOfFirstVisibleTab;


            $('.JS_Gallery-Tab').each(function(index) {
console.log(WindowPositionLeft +'  '+ WindowWidth)
                tabPositionLeft = $(this).offset().left;
                tabPositionTop = $(this).offset().top;
                tabPositionLeft -= 300;
                $(this).offset({top:tabPositionTop, left:tabPositionLeft})
            })


        })

        function getPositionsOfTabs() {
            $('.JS_Gallery-Window').find('.JS_Gallery-Tab').offset(function(index, coords) {

            })
        }
    })

})
// END GalleryControl.js
