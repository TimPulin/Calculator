// ModalWorkV3.js
//==================вызов и закрытие модального окна======================
jQuery(document).ready(function() {
    let Iam;

    jQuery('.boxoutput-name').click(function(){
        jQuery('#ElementModal').modal();
    });

    jQuery('#ElementModal .JS_Save').click(function() {
         HideModal();
    })
    jQuery('#ElementModal .JS_Reset').click(function() {
        HideModal();
        ResetModal(jQuery(this) );
    })

    function HideModal() {jQuery('#ElementModal').modal('hide');}

    jQuery('.JS_Goe').click(function() {
        jQuery('#GoeModal').modal();
    })
    jQuery('#GoeModal .JS_ButtonModal').click(function() {
         jQuery('#GoeModal').modal('hide');
    })
})
//======================КОНЕЦ вызов и закрытие модального окна======================


//===========================ПОВЕДЕНИЕ КНОПОК=========================================

//========================Переключение вкладок в модальном окне==
    jQuery('.tabCalc-link').click(function() {
        SwitchTabsInModal(jQuery(this) );
    })
//========================КОНЕЦ Переключение вкладок в модальном окне==

//====================вызов экрана для выбора значения атрибута элемента==========
jQuery(document).ready(function() {
    let Iam,
        Val_Iam,
        ID;

    jQuery('.JS_Goe').click(function() {
        Val_Iam = jQuery(this).val();
        ID = '#'+jQuery(this).attr('name');
        addClassActiveTo_JS_ButtonModal();
    })

    jQuery('.JS_Name, .JS_Level, .JS_Rotation').click(function() {
        Iam = jQuery(this);
        Val_Iam = jQuery(this).val();
        ID = '#'+Iam.attr('name');
        Hide_CurrentHeadersSection();
        ToggleHeaderSection();
        CheckClass() == true ? ShowHeader() : addClassActiveTo_JS_ButtonModal();
    })

    function Hide_CurrentHeadersSection() {
        Iam.closest('.JS_Section-Modal').find('.mod-header .JS_Section').not(jQuery(ID) ).removeClass('active');
    }

    function ToggleHeaderSection() {
        jQuery(ID).toggleClass('active');
    }

    function CheckClass() {
        return !jQuery(ID).hasClass('active') ? true : false;
    }

    function addClassActiveTo_JS_ButtonModal() {
        jQuery(ID).find(".JS_ButtonModal").each(function(index) {
            jQuery(this).removeClass('active activeColor');
            if(Val_Iam == jQuery(this).val() ){
                jQuery(this).addClass('active activeColor');
            }
        })
    }
}) //====================КОНЕЦ вызов экрана для выбора значения атрибута элемента==========

//=======================закрытие экранов "выбор значения атрибута элемента" и открытие заголовка модульного окна=======
jQuery(document).ready(function () {
    jQuery('.JS_Fly, .JS_ChangeLeg, .JS_V, .JS_Galka, .JS_Edge').click(function() {
        Hide_HeadersSections(jQuery(this) );
        ShowHeader();
    })
}) //=======================КОНЕЦ закрытие экранов "выбор значения атрибута элемента"=======

//===============================активация кнопок при выборе значения атрибута==========
jQuery(document).ready(function() {
    let Iam;

    jQuery('.JS_Fly, .JS_ChangeLeg, .JS_V').click(function() {
        jQuery(this).toggleClass('active activeColor');

    })

    jQuery('.JS_Galka').click(function() {
        Iam = jQuery(this);
        Iam.toggleClass('active activeColor');
        Iam.parent().find('.JS_Galka').not(Iam).each(function() {
            jQuery(this).removeClass('active activeColor');
        })
    })

    jQuery('.JS_Edge').click(function() {
        Iam = jQuery(this);
        Iam.toggleClass('active activeColor');
        Iam.parent().find('.JS_Edge').not(Iam).each(function() {
            jQuery(this).removeClass('active activeColor');
        })
    })
})

jQuery(document).ready(function() {
    jQuery('.JS_Level, .JS_Rotation').click(function() {
        jQuery(this).addClass('active activeColor');
    })
})
//===============================КОНЕЦ поведение кнопок при выборе значения атрибута==========

//=====================работа кнопок на экране для выбора значения атрибута элемента====
jQuery(document).ready(function(){

    jQuery('#GoeModal .JS_ButtonModal').click(function() {
        AddRemove_Active(jQuery(this) );
    })

    jQuery('#ElementModal .JS_ButtonModal').click(function() {
        AddRemove_Active(jQuery(this) );
        Hide_HeadersSections(jQuery(this) );
        ShowHeader();
    })

    function AddRemove_Active(Iam) {
        Iam.closest('.JS_Section').find('.JS_ButtonModal').each(function() {
            jQuery(this).removeClass('active activeColor');
        })
        Iam.addClass('active activeColor');
    }
}) //=====================КОНЕЦ работа кнопок на экране для выбора значения атрибута элемента====

//========================добавление/удаление прыжка в модальном окне==================
    //ДОЛЖНО БЫТЬ ВЫШЕ @разблокировка кнопок "добавить прыжок"@
jQuery(document).ready(function() {
    let section;

      jQuery('#ElementModal .JS_AddJump').click(function() {
          jQuery(this).closest('.JS_Section-Table').find('.JS_Section-El:not(.active):first').addClass('active splash');
          Hide_HeadersSections(jQuery(this) );
          ShowHeader();
      })
      jQuery('#ElementModal .JS_RemoveJump').click(function() {
          section = jQuery(this).closest('.JS_Section-Table').find('.JS_Section-El.active:last');
          ResetButtons(section);
          Hide_HeadersSections(jQuery(this) );
          ShowHeader();
      })
}) //=========================КОНЕЦ добавление/удаление прыжка в модальном окне==================



//======================Блокировка/Разблокировка кнопок==================================================
jQuery(document).ready(function () {

    //==блокировка/разблокировка кнопки "E", "!"
    jQuery(document).ready(function() {
        let section,
            button;

        jQuery('.JS_Name').click(function() {
            section = jQuery(this).closest('.JS_Section-El');
        })
        jQuery('#jumps .JS_ButtonModal[value="F"], #jumps .JS_ButtonModal[value="Lz"]').click(function() {
            section.find('.JS_Edge').prop('disabled', false);
        })
        jQuery('#jumps .JS_ButtonModal:not(.JS_ButtonModal[value="F"], .JS_ButtonModal[value="Lz"])').click(function() { //было так: #jumps .JS_ButtonModal[value="Lz"]
            button = section.find('.JS_Edge');
            button.removeClass('active activeColor');
            button.prop('disabled', true);
        })
    }) //==КОНЕЦ блокировка/разблокировка кнопки "E","!"

    //блокировка кнопки "V", "F", "C",
    jQuery(document).ready(function() {
        const BUTTON_PairsSpins = jQuery('#spins .JS_ButtonModal[value="PSp"], #spins .JS_ButtonModal[value="PCoSp"]');
        const BUTTON_Fly = jQuery('#ElementModal .JS_Fly');
        const BUTTON_ChangeLeg = jQuery('#ElementModal .JS_ChangeLeg');
        const BUTTON_V = jQuery('#ElementModal .JS_V');
        let button;

        BUTTON_PairsSpins.click(function() {
            [BUTTON_Fly, BUTTON_ChangeLeg, BUTTON_V].map(function(item) {
                item.prop('disabled', true);
                item.removeClass('active activeColor');
            })
        })

        jQuery('#spins .JS_ButtonModal').not(BUTTON_PairsSpins).click(function() {
            [BUTTON_Fly, BUTTON_ChangeLeg].map(function(item) {
                item.prop('disabled', false);
            })
        })

        jQuery('#spins .JS_ButtonModal[value="CoSp"]').click(function() {
            BUTTON_V.prop('disabled', false);
        })

        jQuery('#spins .JS_ButtonModal:not(.JS_ButtonModal[value="CoSp"])').not(BUTTON_PairsSpins).click(function() {
            if( !BUTTON_Fly.hasClass('active') && !BUTTON_ChangeLeg.hasClass('active') ) {
                BUTTON_V.prop('disabled', true);
                BUTTON_V.removeClass('active activeColor');
            }
        })

        jQuery('#ElementModal .JS_Fly, #ElementModal .JS_ChangeLeg').click(function() {
            button = jQuery(this).closest('.JS_Section-El').find('.JS_Name');
            if(BUTTON_Fly.hasClass('active') || BUTTON_ChangeLeg.hasClass('active') || button.val() == 'CoSp' ) { 
                BUTTON_V.prop('disabled', false);
            } else {
                BUTTON_V.prop('disabled', true);
            }
        })
    }) //КОНЕЦ блокировка кнопки "V", "F", "C", "V"

    jQuery(document).ready(function() {
        let amount, //переменная используется для кнопок "добавить/удалить прыжок" и кнопки "Eu"
            Index_ActiveSection;
        const BTN_AddJump = jQuery('#ElementModal .JS_AddJump');
        const BTN_RemoveJump = jQuery('#ElementModal .JS_RemoveJump');

        //===блокировка/разблокировка кнопок "добавить прыжок" и "удалить прыжок"
        jQuery(document).ready(function() {
            let Iam;

            jQuery('#ElementModal .JS_Name').click(function() {
                Iam = jQuery(this);
            })
            jQuery('#jumps .JS_ButtonModal').click(function() { //:not(.JS_ButtonModal[value="A"])
                CheckAmountLinesHide();
                if(amount < 3){
                    UnlockBTN_AddJump();
                }
            })
            BTN_RemoveJump.click(function () {
                Iam = jQuery(this);
                CheckAmountLinesHide();
                if(amount < 3){
                    UnlockBTN_AddJump();
                }
            })

            BTN_RemoveJump.click(function () {
                Iam = jQuery(this);
                CheckAmountLinesHide();
                if(amount < 2){
                    jQuery(this).prop('disabled', true);
                }
            })

            BTN_AddJump.click(function () {
               LockBTN_AddJump();
                BTN_RemoveJump.prop('disabled', false);
            })

             //блокировка/разблокировка кнопки "добавить прыжок" в зависимости от кнопки "A"
             // BUTTON_A.click(function() {
             //     if(Index_ActiveSection == 1) {
             //         if(amount == 3) {
             //             BTN_RemoveJump.trigger('click');
             //         }
             //         LockBTN_AddJump();
             //     }else {
             //         UnlockBTN_AddJump();
             //    }
             //}) //КОНЕЦ блокировка/разблокировка кнопки "добавить прыжок" в зависимости от кнопки "A"

            function CheckAmountLinesHide() {
                amount = jQuery(Iam).closest('.JS_Section-Table').find('.JS_Section-El.active').length;
            }
        }) //===КОНЕЦ блокировка/разблокировка кнопок "добавить прыжок" и "удалить прыжок"

        function UnlockBTN_AddJump() {
            BTN_AddJump.prop('disabled', false);
            BTN_AddJump.addClass('splash');
        }

        function LockBTN_AddJump() {
            BTN_AddJump.prop('disabled', true);
            BTN_AddJump.removeClass('splash');
        }

        //====================блокировка/разблокировка кнопок   в секции "прыжки"===========
       jQuery(document).ready(function() {
            let Index_ActiveTab,
                section,
                table;
            const NAMESECONDLINE = jQuery('.JS_Section-Table:eq(2) .JS_Section-El:eq(1) .JS_Name'),
                  BUTTONSJUMPS = jQuery('#jumps .JS_ButtonModal');


            //представление кнопок выбора атрибута прыжка в секции "прыжки"
            jQuery('#ElementModal .JS_Name').click(function() {
                table = jQuery(this).closest('.JS_Section-Table');
                Index_ActiveTab = jQuery(this).closest('.JS_Section-Tables').find('.JS_Section-Table').index(table);
                if(Index_ActiveTab == 2){
                    section = jQuery(this).closest('.JS_Section-El');
                    Index_ActiveSection = jQuery(this).closest('.JS_Section-Table').find('.JS_Section-El').index(section);
                    //представление прыжков в первой линии
                    if(Index_ActiveSection == 0){
                        BUTTON_EU.prop('disabled', true);
                        BUTTONSJUMPS.not(BUTTON_EU).prop('disabled', false);
                    //представление прыжков во второй линии
                    } else if (Index_ActiveSection == 1){
                        BUTTONSJUMPS.not('.JS_ButtonModal[value="Lz"]').prop('disabled', false);
                        jQuery('#jumps .JS_ButtonModal[value="Lz"]').prop('disabled', true);
                     //представление прыжков в третьей линии
                    } else if(Index_ActiveSection == 2) {
                        if(NAMESECONDLINE.val() == 'Eu'){
                            BUTTONSJUMPS.not('.JS_ButtonModal[value="S"], .JS_ButtonModal[value="F"]').prop('disabled', true);
                        }else {
                            jQuery('.JS_ButtonModal[value="Eu"], .JS_ButtonModal[value="Lz"]').prop('disabled', true); //.JS_ButtonModal[value="A"],
                            BUTTONSJUMPS.not('.JS_ButtonModal[value="Eu"], .JS_ButtonModal[value="Lz"]').prop('disabled', false); //.JS_ButtonModal[value="A"],
                        }
                    }
                }
            }) //КОНЕЦ представление кнопок выбора атрибута прыжка в секции "прыжки"

            //блокировка/разблокировка кнопки "JS_Rotation"
            BUTTON_EU.click(function() {
                BUTTON_ROTATION.prop('disabled', true);
            })
            jQuery('.JS_RemoveJump').click(function() {
                if (amount == 1){
                    BUTTON_ROTATION.prop('disabled', false);
                }
            })
            jQuery('#jumps .JS_ButtonModal:not(.JS_ButtonModal[value="Eu"])').click(function() {
                if(Index_ActiveSection == 1){
                     BUTTON_ROTATION.prop('disabled', false);
                }
            }) //КОНЕЦ блокировка/разблокировка кнопки "JS_Rotation"

            //блокировка/разблокировка кнопки "JS_Level" в зависимости от кнопки "StSq"
            BUTTON_CHSQ.click(function() {
                BUTTON_STEPLEVEL.prop('disabled', true);
            })
            jQuery('#steps .JS_ButtonModal[value="StSq"]').click(function() {
                 BUTTON_STEPLEVEL.prop('disabled', false);
            }) //КОНЕЦ блокировка/разблокировка кнопки "JS_Level" в зависимости от кнопки "StSq"
        }) //====================КОНЕЦ блокировка/разблокировка кнопок в секции "прыжки"===========
    })
}) //======================КОНЕЦ Блокировка/Разблокировка кнопок===================================
// END ModalWorkV3.js
