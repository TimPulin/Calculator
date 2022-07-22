// GalleryControl.js
jQuery(document).ready(function() {
    let colorActve = '#ea84ff',
        colorRegular = '#f3f4f8';

    // изменение цвета кнопок прокрутки
    jQuery(document).ready(function() {
        jQuery('.JS_Gallery-ControlButton').on('touchstart mousedown', function() {
            jQuery(this).css('background-color', colorActve);
        })
        jQuery('.JS_Gallery-ControlButton').on('touchend mouseup', function() {
            jQuery(this).css('background-color', colorRegular);
        })
    })    // END изменение цвета кнопок прокрутки

    jQuery(document).ready(function() {
        const GALLERY_ITEMS = jQuery('.JS_Gallery-Item');

        let jq_items_currentCoords = [],
            index_min,                  //присваивается в makeRating()
            index_max,
            coord_min,
            coord_max,
            v_item_width = item => item.outerWidth(),
            round = coords => parseFloat(coords.toFixed(2) ),
            direction = that => that.attr('data-direction'),
            step = index => v_item_width( GALLERY_ITEMS.eq(index) ),
            stepLeft_around = () => jq_items_currentCoords[index_max] - step(index_min) + step(index_max),
            stepRight_around = () => coord_min;

        jQuery('.JS_Gallery-ControlButton').click(function() {
            let that = jQuery(this);
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
            GALLERY_ITEMS.each(function(index) {
                jq_items_currentCoords.push( round( jQuery(this).offset().left) );
            })
        } //END getCoordsCurrent()

        function letsMoveIt(index_key, step_around, direction) {
            GALLERY_ITEMS.each(function(index) {
                if(index == index_key) {
                    jQuery(this).offset( {left: step_around} );
                }
                else {
                      jQuery(this).offset( {left:jq_items_currentCoords[index] + direction * step(index_key)} )
                }
            })
            reset_jq_items_currentCoords();
        } //END letsMoveIt()

        function removeOpacity0(item) {
            item.removeClass('opacity')
        }

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
