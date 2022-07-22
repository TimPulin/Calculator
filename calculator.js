jQuery(document).ready(function () {
    // ==============================Director.js
    //======================ГЛОБАЛЬНЫЕ служебные функции======================

    let ID,
        INDEX_ActiveTab,
        keyOfElement;

    let arrActiveTabs = {};
    let arrButtonsClass = {};
    let arrButtonsVal = {};
    let arrLinesClass = {};
    let arrButtonsAbility = {};
    let arrOutputs = {};

    jQuery(document).ready(function () {
        jQuery('.JS_Section-Table').find('.boxoutput-name, .JS_Goe, .JS_X').click(function() {
            GetID(jQuery(this) );
            MakeKeyOfElement();
        })
    })

    function GetID(here) {
        ID = here.closest('.JS_Section-Table').find('.JS_Section-El').index(here.closest('.JS_Section-El') );
    }

    function MakeKeyOfElement() {
        keyOfElement = `Element${ID+1}`;
    }

    const BUTTON_EU = jQuery('#jumps .JS_ButtonModal[value="Eu"]'),
          BUTTON_A = jQuery('#jumps .JS_ButtonModal[value="A"]'),
          BUTTON_ROTATION = jQuery('#ElementModal .JS_Section-Tables .JS_Section-Table:eq(2) .JS_Section-El:eq(1) .JS_Rotation'),
          BUTTON_CHSQ = jQuery('#steps .JS_ButtonModal[value="ChSq"]'),
          BUTTON_STEPLEVEL = jQuery('#ElementModal .JS_Section-Tables .JS_Section-Table:eq(0) .JS_Level');
          BUTTON_DEATHSPIRALLEVEL = jQuery('#ElementModal .JS_Section-Tables .JS_Section-Table:eq(6) .JS_Level');


    function ResetModal(Iam) {
        let section;
        section = Iam.closest('.JS_Section-Modal');

        ResetButtons(section);
        Hide_HeadersSections(Iam);
        ShowHeader();
        jQuery('#ElementModal').find('.JS_Section-Table .JS_Section-El').not(':only-child').not(':first').removeClass('active');
        section.find('.headeroutput-name').val('');
        section.find('.headeroutput-scores').val('0.00');
        jQuery('#ElementModal').find('.JS_RemoveJump, .JS_AddJump').prop('disabled', true);
    }

    function ResetButtons(section) {
        section.find('.JS_Button').removeClass('active activeColor');
        section.find('.JS_Name').val('элемент');
        section.find('.JS_Level').val('B').prop('disabled', false);
        section.find('.JS_Rotation').val('1').prop('disabled', false);
        jQuery('#ElementModal .JS_V').prop('disabled', true);
        section.find('.lineoutput-scores').text('0.00');
        section.find('.JS_Edge').prop('disabled', true);
        section.find('.JS_Fly').prop('disabled', false);
        section.find('.JS_ChangeLeg').prop('disabled', false);
    }

    function ShowHeader() {
        jQuery('#header_title').addClass('active');
    }

    function Hide_HeadersSections(Iam) {
        Iam.closest('.JS_Section-Modal').find('.mod-header .JS_Section.active').removeClass('active');
    }

    function SwitchTabsInModal(Iam) {
            let Index,
                Title_Modal,
                section = item => Iam.closest(item);

            Index = Iam.closest('.tabCalc-links').find('.tabCalc-link').index(Iam);
            Title_Modal = Iam.val();
            AddRemove_Active();
            RenderingCoolTab(Iam);
            ResetModal(Iam);
            ShowHide_tabel ();
            ShowHeader();
            Print_Title_Modal();


        function AddRemove_Active() {
            section('.tabCalc-links').find('.tabCalc-link.active').removeClass('active');
            Iam.addClass('active');
        }

        //========================для красивого закругления основания актвной вкладки
        function RenderingCoolTab(that) {

            const TABS = jQuery('.tabCalc-link');
            let index_active,
                index_left,
                index_right;

                index_active = that.index();
                TABS.each(function() {
                    jQuery(this).removeClass('coolTabLeft coolTabRight')
                })
                index_left = index_active - 1;
                if(index_left < 0) {index_left = TABS.length - 1}
                index_right = index_active + 1;
                if(index_right > TABS.length - 1) {index_right = 0}

                TABS.eq(index_left).addClass('coolTabLeft');
                TABS.eq(index_right).addClass('coolTabRight');
        } //========================КОНЕЦ красивого закругления основания актвной вкладки

        function ShowHide_tabel() {
            section('.tabCalc-wrap').find('.tabCalc-content.active').removeClass('active');
            section('.tabCalc-wrap').find('.tabCalc-content').eq(Index).addClass('active');
        }

        function Print_Title_Modal() {
            section('.JS_Section-Modal').find('.headeroutput-title').text(Title_Modal);
        }
    } //END SwitchTabsInModal


    //======================КОНЕЦ ГЛОБАЛЬНЫЕ служебные функции======================

    //======================сброс массивов представлления одной линии==============================
    jQuery(document).ready(function() {
        jQuery('#ElementModal .JS_Reset').click(function(){
            ResetModalArrs();
            Reset_ElementObject(ProgramsElements[keyOfElement]);
        })

        function ResetModalArrs() {
            delete arrActiveTabs[keyOfElement];
            delete arrButtonsClass[keyOfElement];
            delete arrButtonsVal[keyOfElement];
            delete arrLinesClass[keyOfElement];
            delete arrButtonsAbility[keyOfElement];
            delete arrOutputs[keyOfElement];
        }
    })
    //===================КОНЕЦ сброс массивов одной линии===================

    //==================сброс массивов всей таблицы============================
    jQuery(document).ready(function() {
        let section = jQuery('#MainTable');

        jQuery('#MainTable .JS_Reset').click(function() {
            ResetAllArrs();
            CleanUpMainTable();
            section.find('.JS_Section-El').each(function(index) {
                Reset_ElementObject(ProgramsElements[`Element${index+1}`])
            })
        })

        function ResetAllArrs() {
            for (key in arrActiveTabs){
                delete arrActiveTabs[key];
            }
            for (key in arrButtonsClass){
                delete arrButtonsClass[key];
            }
            for (key in arrButtonsVal){
                delete arrButtonsVal[key];
            }
            for (key in arrLinesClass){
                delete arrLinesClass[key];
            }
            for (key in arrButtonsAbility){
                delete arrButtonsAbility[key];
            }
            for (key in arrOutputs){
                delete arrOutputs[key];
            }
        }

        function CleanUpMainTable() {
            section.find('.lineoutput-name').val('');
            section.find('.JS_X').removeClass('active activeColor').prop('disabled', true);
            section.find('.JS_Goe').val(0).removeClass('active activeColor');
            section.find('.lineoutput-scores, .tableoutput-scores').val('0.00');
        }
    }) //==================КОНЕЦ сброс массивов всей таблицы============================

    function Reset_ElementObject(currentObject) {
            currentObject.nameOfElement = '';
            currentObject.name1 = '';
            currentObject.name2 = '';
            currentObject.name3 = '';
            currentObject.valueOfElement = 0;
            currentObject.value1 = 0;
            currentObject.value2 = 0;
            currentObject.value3 = 0;
            currentObject.goe = 0;
            currentObject.halfPartBonus = 1;
            currentObject.index_active_tab = 0;
    }
    // =========================END Director.js

    // ===============================classoflineobject.js
    class Element {

        constructor(){
            this.nameOfElement = ''
            this.name1 = ''
            this.name2 = ''
            this.name3 = ''
            this.valueOfElement = 0
            this.value1 = 0
            this.value2 = 0
            this.value3 = 0
            this.goe = 0
            this.halfPartBonus = 1
            this.index_active_tab = 0
        }

        makeNameOfElement() {
            this.nameOfElement = this.name1
            for (let i = 2; i <= 3; i++) {
                if(this['name'+i] != '')  {
                    this.nameOfElement += ('+' + this['name'+i]);
                }
            }
            if(this.checkAxels(this.name2.toLowerCase() ) || this.checkAxels(this.name3.toLowerCase() )  ) {
                this.nameOfElement += '+SEQ';
            }
        } // END makeNameOfElement()

        // ============== Вычисление стоимости элемента ========================
        calcValueOfElement() {
            this.valueOfElement = this.calcBaseValue() * this.halfPartBonus + this.calcGoeBonus();
        }

        calcBaseValue() {
            // if(this.checkAxels(this.name2.toLowerCase() ) ) {
            //     return (this.value1 + this.value2) * 0.8;
            // }
                return this.value1 + this.value2 + this.value3;
        } // END calcBaseValue()

        calcGoeBonus(){
            if(this.nameOfElement === 'ChSq1') {
                return 0.5*this.goe;
            }
            else {
                let compare = 0;
                for (let i = 1; i <= 3; i++) {
                    if (this[`value${i}`] > compare) {
                        compare = this['value' + i];
                    }
                }
                return compare / 10 * this.goe;
            }
        } // END calcGoeBonus()

        checkAxels(secondjump) {
            return secondjump.charAt(1) === 'a' ?  true : false;
        }
        // ================== END Вычисление стоимости элемента ===================================
    } // END class Element{}

    class ElementInModal extends Element {
        constructor() {
            super()
            this.linename = ''
            this.currentLine_Index = 0
        }

        CheckValidName() {
            return listValue_Elements[this.linename.toLowerCase() ] == undefined ? false : true;
        }

        MakeLinesInfo() {
            this.CheckValidName() == true ? this.SetLinesInfo() : this.ResetToZeroLinesInfo();
        }

        SetLinesInfo() {
            this[`value${this.currentLine_Index + 1}`] = listValue_Elements[ this.linename.toLowerCase() ];
            this[`name${this.currentLine_Index + 1}`] = ProgramsElements.ElementInModal1.linename;
        }

        ResetToZeroLinesInfo() {
            this[`value${this.currentLine_Index + 1}`] = 0;
            this[`name${this.currentLine_Index + 1}`] = '';
            this.linename = '';
        }

        ResetToZeroAllModalInfo() {
            this.linename = '';
            this.nameOfElement = '';
            for(let i = 1; i <= 3; i++) {
                this[`value${i}`] = 0;
                this[`name${i}`] = '';
            }
        }

        GetInfoFromElementObject() {
            for(let i = 1; i <= 3; i++) {
                this[`name${i}`] = ProgramsElements[keyOfElement][`name${i}`];
                this[`value${i}`] = ProgramsElements[keyOfElement][`value${i}`];
            }
        }

        SendLinesScores() {
            return this[`value${this.currentLine_Index + 1}`]
        }

        SendModalInfo(goe) {
            for(let i = 1; i <= 3; i++) {
                ProgramsElements[keyOfElement][`name${i}`] = this[`name${i}`];
                ProgramsElements[keyOfElement][`value${i}`] = this[`value${i}`];
                ProgramsElements[keyOfElement]['goe'] = goe;
                ProgramsElements[keyOfElement]['index_active_tab'] = INDEX_ActiveTab;
            }
        }
    }// END class ElementInModal{}

    let ProgramsElements = {
        Element1 : new Element(),
        Element2 : new Element(),
        Element3 : new Element(),
        Element4 : new Element(),
        Element5 : new Element(),
        Element6 : new Element(),
        Element7 : new Element(),
        Element8 : new Element(),
        Element9 : new Element(),
        Element10 : new Element(),
        Element11 : new Element(),
        Element12 : new Element(),
        ElementInModal1 : new ElementInModal()
    }
    // ==============================END classoflineobject.js

// ==========================ModalWorkV3.js
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
jQuery(document).ready(function() {
    jQuery('.tabCalc-link').click(function() {
        SwitchTabsInModal(jQuery(this) );
    })
}) //========================КОНЕЦ Переключение вкладок в модальном окне==


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
        const BUTTON_CoSp = jQuery('#spins .JS_ButtonModal[value="CoSp"]');
        const BUTTON_PCoSp = jQuery('#spins .JS_ButtonModal[value="PCoSp"]');
        const BUTTON_PSp = jQuery('#spins .JS_ButtonModal[value="PSp"]');
        const BUTTON_Fly = jQuery('#ElementModal .JS_Fly');
        const BUTTON_ChangeLeg = jQuery('#ElementModal .JS_ChangeLeg');
        const BUTTON_V = jQuery('#ElementModal .JS_V');
        let button;

        BUTTON_PSp.click(function() {
            [BUTTON_Fly, BUTTON_ChangeLeg, BUTTON_V].map(function(item) {
                item.prop('disabled', true);
                item.removeClass('active activeColor');
            })
        })

        BUTTON_PCoSp.click(function() {
            [BUTTON_Fly, BUTTON_ChangeLeg].map(function(item) {
                item.prop('disabled', true);
                item.removeClass('active activeColor');
            })
            BUTTON_V.prop('disabled', false)
        })

        jQuery('#spins .JS_ButtonModal').not(BUTTON_PSp).not(BUTTON_PCoSp).click(function() {
            [BUTTON_Fly, BUTTON_ChangeLeg].map(function(item) {
                item.prop('disabled', false);
            })
        })

         BUTTON_CoSp.click(function() {
            BUTTON_V.prop('disabled', false);
        })

        jQuery('#spins .JS_ButtonModal').not(BUTTON_PCoSp).not(BUTTON_CoSp).click(function() {
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
    }) //КОНЕЦ блокировка кнопки "V", "F", "C"

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

            //блокировка/разблокировка кнопки "JS_Level"
            jQuery(document).ready(function() {
                let button;

                jQuery('.JS_Name').click(function() {
                    button = jQuery(this).closest('.JS_Section-El').find('.JS_Level');
                })

                jQuery('.JS_ButtonModal[value="ChSq"], .JS_ButtonModal[value="PiF"]').click(function() {
                    button.prop('disabled', true);
                })

                jQuery('.JS_ButtonModal[value="StSq"], #deathspirals .JS_ButtonModal:not(.JS_ButtonModal[value="PiF"]) ').click(function() {
                    button.prop('disabled', false);
                })
            }) //==КОНЕЦ блокировка/разблокировка кнопки "JS_Level"

        }) //====================КОНЕЦ блокировка/разблокировка кнопок в секции "прыжки"===========
    })
}) //======================КОНЕЦ Блокировка/Разблокировка кнопок===================================
// ========================END ModalWorkV3.js

// ================================ModalCalc.js
jQuery(document).ready(function() {

    let Iam,
        currentLine,
        linescores;

    jQuery('.boxoutput-name').click(function() {
        ProgramsElements.ElementInModal1.ResetToZeroAllModalInfo();
        ProgramsElements.ElementInModal1.GetInfoFromElementObject();
    })

    jQuery('.JS_Name, .JS_Level, .JS_Rotation').click(function() {
        Iam = jQuery(this);
    })

    jQuery('.tabCalc-link').click(function() {
        ProgramsElements.ElementInModal1.ResetToZeroAllModalInfo();
    })

    jQuery('#ElementModal .JS_Reset').click(function() {
        ProgramsElements.ElementInModal1.ResetToZeroAllModalInfo();
    })

//=============================перенос информации с экрана выбора значения атрибута элемента
    jQuery(document).ready(function () {
        let Val_ButtonModal;

       jQuery('#ElementModal .JS_ButtonModal').click(function() {
            Val_ButtonModal = jQuery(this).val();
            SetPropretiesOfButtons();
            DirectorModal();
        })

        function SetPropretiesOfButtons() {
            Iam.val(Val_ButtonModal);
            Iam.addClass('active activeColor');
            if( CheckClass_JS_Name() ) {
                Iam.closest('.JS_Section-El').find('.JS_Level, .JS_Rotation').addClass('active activeColor');
                if (Val_ButtonModal == 'Eu'){
                    BUTTON_ROTATION.val(1);
                }
                if (Val_ButtonModal == 'PiF'){
                    BUTTON_DEATHSPIRALLEVEL.val(1);
                }
                else if(Val_ButtonModal == 'ChSq') {
                    BUTTON_STEPLEVEL.val(1);
                }
            }
        }

        function CheckClass_JS_Name() {
            return Iam.hasClass('JS_Name') ? true : false;
        }
    }) //=============================КОНЕЦ перенос информации с экрана выбора значения атрибута элемента

    jQuery('#ElementModal .JS_Fly, #ElementModal .JS_ChangeLeg').click(function() {
        let button = jQuery(this).closest('.JS_Section-El').find('.JS_Name');
        Iam = jQuery(this);
        if(!jQuery('#ElementModal .JS_Fly').hasClass('active') && !jQuery('#ElementModal .JS_ChangeLeg').hasClass('active') && button.val() != 'CoSp' ) {
            jQuery('#ElementModal .JS_V').removeClass('active activeColor');
        }
        DirectorModal();
    })

    jQuery('#ElementModal').find('.JS_V, .JS_Galka, .JS_Edge, .JS_RemoveJump').click(function() {
        Iam = jQuery(this);
        DirectorModal();
    })

    jQuery('#ElementModal .JS_RemoveJump').click(function() {
        Iam = jQuery(this).closest('.JS_Section-Table').find('.JS_Section-El.active:last .JS_Button:first');
        GetCurrentLineAndIndex();
        currentLine.removeClass('active splash').addClass('hide');
        ProgramsElements.ElementInModal1.ResetToZeroLinesInfo();
        PrinterModal();
    })

    function DirectorModal() {
        DirectorLine();
        PrinterModal();
    }


    //================все функции DirectorLine=====================
    function DirectorLine() {
        GetCurrentLineAndIndex();
        GetLineName();
        ProgramsElements.ElementInModal1.MakeLinesInfo();
        PrintLineScores();
        removeClass_Splash();
    }


    function GetCurrentLineAndIndex() {
        currentLine = Iam.closest('.JS_Section-El');
        ProgramsElements.ElementInModal1.currentLine_Index = Iam.closest('.JS_Section-Table').find('.JS_Section-El').index(currentLine);
    }

    function GetLineName() {
        ProgramsElements.ElementInModal1.linename = '';

        currentLine.find('.JS_Button.active').each(function() {
            ProgramsElements.ElementInModal1.linename += jQuery(this).val();
        })
    }

    function removeClass_Splash() {
        if (ProgramsElements.ElementInModal1.CheckValidName() ) {
            currentLine.removeClass('splash');
        }
    }

    function PrintLineScores() {
        currentLine.find('.lineoutput-scores').text(ProgramsElements.ElementInModal1.SendLinesScores().toFixed(2) );
    }
    //================КОНЕЦ все функции DirectorLine=====================

    function PrinterModal() {
        ProgramsElements.ElementInModal1.makeNameOfElement();
        jQuery('#ElementModal .headeroutput-name').text(ProgramsElements.ElementInModal1.nameOfElement);
        jQuery('#ElementModal .headeroutput-scores').text(ProgramsElements.ElementInModal1.calcBaseValue().toFixed(2) );
    }
})
// =====================END ModalCalc.js


// =========================Compiling.js
jQuery(document).ready(function() {

    let IamModal,
        IamSectionTable;
    let arrTemporaryClass = [];
    let arrTemporaryAble = [];
    let arrTemporaryVal = [];

    jQuery('#ElementModal .JS_Save').click(function() {
        IamModal = jQuery(this).closest('.JS_Section-Modal');
        IamSectionTable = IamModal.find('.JS_Section-Tables .JS_Section-Table');
        DirectorCompilingConfig()
    })

    function DirectorCompilingConfig() {
        FindActiveTab();
        GetSectionInfo();
        GetButtonsInfo();
        GetOutputInfo();
    }

    function FindActiveTab() {
        IamModal.find('.tabCalc-links .tabCalc-link').each(function(index) {
            if(jQuery(this).hasClass('active') ) {
                arrActiveTabs[keyOfElement] = index;
                INDEX_ActiveTab = index;
                return;
            }
        })
    }

    function GetSectionInfo() {
        Cleaner_arrTemporaryClass();
        IamSectionTable.eq(INDEX_ActiveTab).find('.JS_Section-El').each(function() {
            arrTemporaryClass.push(jQuery(this).attr('class') )
        })
        arrLinesClass[keyOfElement] = jQuery.extend(true, [], arrTemporaryClass);
    }

    function GetButtonsInfo() {
        Cleaner_arrTemporaryClass();
        Cleaner_arrTemporaryAble();
        Cleaner_arrTemporaryVal();
        IamSectionTable.eq(INDEX_ActiveTab).find('.JS_Button, .JS_RemoveJump, .JS_AddJump').each(function(index) {

            if(jQuery(this).hasClass('activeColor') ) {
                arrTemporaryClass.push('active activeColor');
            }
            else {
                arrTemporaryClass.push('');
            }
            arrTemporaryAble.push(jQuery(this).prop('disabled') );
            arrTemporaryVal.push(jQuery(this).val() );
        })
        arrButtonsClass[keyOfElement] = jQuery.extend(true, [], arrTemporaryClass);
        arrButtonsAbility[keyOfElement] = jQuery.extend(true, [], arrTemporaryAble);
        arrButtonsVal[keyOfElement] = jQuery.extend(true, [], arrTemporaryVal);
    }

    function GetOutputInfo() {
        Cleaner_arrTemporaryVal();
        IamModal.find('.headeroutput-name, .headeroutput-scores, .lineoutput-scores').each(function() {
            arrTemporaryVal.push(jQuery(this).val() );
        })
        arrOutputs[keyOfElement] = jQuery.extend(true, [], arrTemporaryVal);
    }

    function Cleaner_arrTemporaryClass() {
        arrTemporaryClass.splice(0, arrTemporaryClass.length);
    }

    function Cleaner_arrTemporaryAble() {
        arrTemporaryAble.splice(0, arrTemporaryAble.length);
    }

    function Cleaner_arrTemporaryVal() {
        arrTemporaryVal.splice(0, arrTemporaryVal.length);
    }
})
// ======================END Compiling.js


// =======================MainCalc.js
jQuery(document).ready(function() {

    let Iam,
        buttonX,
        buttonGoe,
        section,
        goeOfElement;
    const SECTIONTABLES = jQuery('#ElementModal .JS_Section-Tables .JS_Section-Table');

    jQuery('.boxoutput-name, .JS_X, .JS_Goe').click(function() {
        Iam = jQuery(this);
        buttonX = jQuery(this).closest('.JS_Section-El').find('.JS_X');
        buttonGoe = jQuery(this).closest('.JS_Section-El').find('.JS_Goe');
    })

    jQuery('#ElementModal .JS_Save').click(function() {
        if(INDEX_ActiveTab == 2) {
            goeOfElement = Calc_GoeOfElement();
        }
        else {
            goeOfElement = 0;
        }
        ProgramsElements.ElementInModal1.SendModalInfo(goeOfElement);
        // SendInfoTo_ElementObject();
        DirectorMain();
    })

    function Calc_GoeOfElement() {
        let summ = 0;

        SECTIONTABLES.eq(2).find('.JS_Galka.active, .JS_Edge.active').each(function() {
            summ += listValue_Goe[ jQuery(this).val() ];
        })
        if(summ < -5) {summ = -5}
        return summ;
    }


    jQuery('#ElementModal .JS_Reset').click(function() {
        buttonX.prop('disabled', true).removeClass('active activeColor');
        buttonGoe.removeClass('active activeColor').val(0);
        DirectorMain();
    })

    jQuery('#GoeModal .JS_ButtonModal').click(function() {
        ProgramsElements[keyOfElement].goe = jQuery(this).val();
        Iam.val(ProgramsElements[keyOfElement].goe)
        DirectorMain();
    })

    //Работа с кнопкой Х
    jQuery('.JS_Section-Table .JS_X').click(function() {
        jQuery(this).toggleClass('active activeColor');
        jQuery(this).hasClass('active') ? ProgramsElements[keyOfElement].halfPartBonus = 1.1 : ProgramsElements[keyOfElement].halfPartBonus = 1;
        DirectorMain();
    })


    function DirectorMain() {
        ProgramsElements[keyOfElement].makeNameOfElement();
        ProgramsElements[keyOfElement].calcValueOfElement();
        RenderingLine();
        RenderingFullScores();
    }

    function RenderingLine() {
        section = Iam.closest('.JS_Section-El')
        section.find('.lineoutput-name').text(ProgramsElements[keyOfElement].nameOfElement);
        section.find('.lineoutput-scores').text(ProgramsElements[keyOfElement].valueOfElement.toFixed(2) );
        buttonGoe.val(ProgramsElements[keyOfElement].goe);
        ProgramsElements[keyOfElement].goe == 0 ? buttonGoe.removeClass('active activeColor') : buttonGoe.addClass('active activeColor');
        if(ProgramsElements[keyOfElement].index_active_tab == 2) {
            buttonX.prop('disabled', false);
        }
        else {
            buttonX.prop('disabled', true).removeClass('active activeColor');
            ProgramsElements[keyOfElement].halfPartBonus = 1;
        }
    }

    function CalcFullScores() {
        let fullscores = 0;

        jQuery('#MainTable').find('.JS_Section-El').each(function(index) {
            fullscores += ProgramsElements[`Element${index+1}`].valueOfElement;
        })
        return fullscores;
    }

    function RenderingFullScores() {
        jQuery('#MainTable').find('.tableoutput-scores').text(CalcFullScores().toFixed(2) );
    }
})
// ================END MainCalc.js


// ====================Set.js
jQuery(document).ready(function() {

      let IndexT;
    const TABLINKS = jQuery('#ElementModal .tabCalc-links .tabCalc-link'),
          SECTIONTABLES = jQuery('#ElementModal .JS_Section-Tables .JS_Section-Table');

    jQuery('.boxoutput-name').click(function() {
        DirectorSetConfig();
    })


    function DirectorSetConfig() {
        if(CheckAvailabilityInfo() ) {
            SetActiveTab();
            SetLines();
            SetButtons();
            SetOutputs();
        }
        else {
            jQuery('.JS_AddJump').removeClass('splash');
            SECTIONTABLES.each(function() {
                jQuery(this).find('.JS_Section-El:first').addClass('splash');
            })
            SwitchTabsInModal(TABLINKS.eq(2) );
        }
    }

    function CheckAvailabilityInfo() {
        return arrActiveTabs[keyOfElement] == undefined ? false : true;
    }

    function SetActiveTab() {
        IndexT = arrActiveTabs[keyOfElement];
        SwitchTabsInModal(TABLINKS.eq(IndexT) );
    }

    function SetLines() {
        SECTIONTABLES.eq(IndexT).find('.JS_Section-El').each(function(index) {
            jQuery(this).addClass(arrLinesClass[keyOfElement][index]);
        })
        SECTIONTABLES.eq(IndexT).find('.JS_Section-El:first').removeClass('splash');
    }

    function SetButtons() {
        SECTIONTABLES.eq(IndexT).find('.JS_Button, .JS_RemoveJump, .JS_AddJump').each(function(index) {
            jQuery(this).addClass(arrButtonsClass[keyOfElement][index]);
            jQuery(this).val(arrButtonsVal[keyOfElement][index]);
            jQuery(this).prop('disabled', arrButtonsAbility[keyOfElement][index]);
        })
    }

    function SetOutputs() {
        jQuery('#ElementModal').find('.headeroutput-name, .headeroutput-scores, .lineoutput-scores').each(function(index) {
            jQuery(this).text(arrOutputs[keyOfElement][index]);
        })
    }
})
// ==================END Set.js


// =========================GalleryControl.js
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
}) // ===========END GalleryControl.js

})
