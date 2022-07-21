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
        let jq_items_currentCoords = [],
            index_min,                  //присваивается в makeRating()
            index_max,
            coord_min,
            coord_max,
            v_item_width = item => item.offsetWidth,
            round = coords => parseFloat(coords.toFixed(2) ),
            direction = that => that.attr('data-direction'),
            step = index => v_item_width( V_ITEMS[index] ),
            stepLeft_around = () => jq_items_currentCoords[index_max] - step(index_min) + step(index_max),
            stepRight_around = () => coord_min;

        $('.JS_Gallery-ControlButton').click(function() {
            let that = $(this);
            getCoordsCurrent();
            makeRating(jq_items_currentCoords);

            if(direction(that) == 'right') {
                letsMoveIt(index_max, stepRight_around(), 1 );
            }
            else {
                letsMoveIt(index_min, stepLeft_around(), -1 );
            }
        })


        function getCoordsCurrent() {
            JQ_ITEMS.each(function(index) {
                jq_items_currentCoords.push( round( $(this).offset().left) );
            })
        } //END getCoordsCurrent()

        function letsMoveIt(index_key, step_around, direction) {
            JQ_ITEMS.each(function(index) {
                if(index == index_key) {
                  $(this).offset( {left: step_around} )
                }
                else {
                      $(this).offset( {left:jq_items_currentCoords[index] + direction * step(index_key)} )
                }
            })
            reset_jq_items_currentCoords();
        } //END letsMoveIt()

        function reset_jq_items_currentCoords() {
            jq_items_currentCoords.splice(0, jq_items_currentCoords.length);
        }//END reset_jq_items_currentCoords()

        function makeRating(arr) {
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
                }
                else if(arr[i] < rating.min) {
                    rating.min = arr[i];
                    rating.indexMin = i
                }
            }
            index_min = rating.indexMin;
            index_max = rating.indexMax;
            coord_min = rating.min;
            coord_max = rating.max;
        } //END makeRating()

    }) //END прокрутка закладок
}) // END GalleryControl.js
