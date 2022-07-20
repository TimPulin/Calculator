// GalleryControlObject.js
$(document).ready(function() {

    $('#ControlButton_Left').click(function() {
console.log(moveGallery.getCoordsCurrent())
    })
    $('#ControlButton_Right').click(function() {

    })

    let moveGallery = {

        jq_items : $('.JS_Gallery-Item'),
        jq_items_currentCoords : [],
        v_items : document.querySelectorAll('.JS_Gallery-Item'),
        v_item_width : function(v_item) {return v_item.offsetWidth},
        direction : -1,
        min : 0,
        max : 0,
        index_min : 0,
        index_max : 0,


        getCoordsCurrent() {
            this.jq_items.each(function(index) {
                this.jq_items_currentCoords.push(this.round( $(this).offset().left)); // когда доходит до этой строки пишет, jq_items_currentCoords - undefined

            })
            console.log(this.jq_items_currentCoords)
        },

        rating(arr) {
            for(let i = 0; i < arr.length; ++i) {
                if(arr[i] > this.max) {
                    this.max = arr[i];
                    this.index_max = i;
                } else if(arr[i] < this.min) {
                    this.min = arr[i];
                    this.index_min = i;
                }
            }
        },

        round(coord) { return parseFloat(coord.toFixed(2) ) }

    } //END moveGallery


}) //END  GalleryControlObject.js
