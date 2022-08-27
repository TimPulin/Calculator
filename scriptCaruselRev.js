$(document).ready(function() {

    (function() {

        const scrollBox = document.querySelectorAll('.JS_DragScroll'),
              lengthSB = scrollBox.length;

        let left = 0, // отпустили мышку - сохраняем положение скролла
            drag = false,
            coorX = 0; // нажали мышку - сохраняем координаты.

        for(i = 0; i < lengthSB; i++) {
            scrollBox[i].ondragstart = function() {
                return false;
            }
        }

        for(i = 0; i < lengthSB; i++) {
            scrollBox[i].addEventListener('mousedown', function(e) {
                 drag = true;
                 coorX = e.pageX - this.offsetLeft;
               })
        }

        document.addEventListener('mouseup', function() {
            drag = false;
            for(i = 0; i < lengthSB; i++) {
                left = scrollBox[i].scrollLeft;
            }
        })

        for(i = 0; i < lengthSB; i++) {
            scrollBox[i].addEventListener('mousemove', function(e) {
                 if (drag) {
                     this.scrollLeft = left - (e.pageX - this.offsetLeft - coorX);
                 }
           })
        }
    })()
})

$(document).ready(function() {
    const scrollBox = $('.JS_DragScroll'),
          scrollBox_Items = $('.JS_DragScroll *');
    let flag = 0;

    scrollBox.mousedown(function() {
        flag = 1;
        scrollBox_Items.each(function() {
            $(this).css('cursor', 'grabbing');
        })
        scrollBox.each(function() {
            $(this).css('cursor', 'grabbing');
        })
    })

    $(document).mouseup(function() {
        flag = 0;
        scrollBox_Items.each(function() {
            $(this).css('cursor', 'pointer');
        })
        scrollBox.each(function() {
            $(this).css('cursor', 'default');
        })

    })

    scrollBox.mouseout(function() {
        scrollBox_Items.each(function() {
            $(this).css('cursor', 'pointer');
        })
        scrollBox.each(function() {
            $(this).css('cursor', 'default');
        })
    })

    scrollBox.mouseover(function() {
        if(flag) {
            scrollBox_Items.each(function() {
                $(this).css('cursor', 'grabbing');
            })
            scrollBox.each(function() {
                $(this).css('cursor', 'grabbing');
            })
        }
    })
})
