// GalleryControl.js
$(document).ready(function() {
    let colorActve = '#ea84ff',
        colorRegular = '#f3f4f8';

    // изменение цвета кнопок прокрутки
    $(document).ready(function() {
        $('.JS_Gallery-ControlButton').on('touchstart mousedown', function() {
            $(this).css('background-color', colorActve);
        })
        $('.JS_Gallery-ControlButton').on('touchend mouseup', function() {
            $(this).css('background-color', colorRegular);
        })
    })    // END изменение цвета кнопок прокрутки

    $(document).ready(function() {
        const JQ_ITEMS = $('.JS_Gallery-Item'),
              V_ITEMS = document.querySelectorAll('.JS_Gallery-Item');
        let arrCoordsCurrent = [],
            V_Step = item => item.offsetWidth,
            Round = digits => parseFloat(digits.toFixed(2) ),
            stepForward,
            coordForStepAround,
            indexFirstVisibleItem,
            rating;

        $('.JS_Gallery-ControlButton').click(function() {
            getCoordsCurrent();
            stepForward = V_Step( V_ITEMS[getMaxMinValue(arrCoordsCurrent).indexMin] );
            coordForStepAround = arrCoordsCurrent[getMaxMinValue(arrCoordsCurrent).indexMax] - stepForward + V_Step( V_ITEMS[getMaxMinValue(arrCoordsCurrent).indexMax]);
            moveLeft();
        })

        function getCoordsCurrent() {
            JQ_ITEMS.each(function(index) {
                arrCoordsCurrent.push( Round( $(this).offset().left) );
            })
        }

        function moveLeft() {
            JQ_ITEMS.each(function(index) {
                if(index == getMaxMinValue(arrCoordsCurrent).indexMin) {
                    $(this).offset({left: coordForStepAround});
                } else {
                    $(this).offset({left:arrCoordsCurrent[index] - stepForward});
                }
            })
            reset_arrCoordsCurrent();
        }

        function reset_arrCoordsCurrent() {
            arrCoordsCurrent.splice(0, arrCoordsCurrent.length);
        }

        function getMaxMinValue(arr) {
            let rating = {
                max: arr[0],
                min: arr[0],
                indexMax: 0,
                indexMin: 0
            }

            for(let i = 0; i < arr.length; ++i) {
                if(arr[i] > rating.max) {
                    rating.max = arr[i];
                    rating.indexMax = i;
                } else if(arr[i] < rating.min) {
                    rating.min = arr[i];
                    rating.indexMin = i
                }
            }
            return rating;
        } //END getMaxMinValue

    }) //END прокрутка закладок

})
// END GalleryControl.js
