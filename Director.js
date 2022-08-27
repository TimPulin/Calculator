// Director.js
//======================ГЛОБАЛЬНЫЕ служебные функции======================

let ID,
    INDEX_ActiveTab,
    keyOfElement,
    durationOfClickTabLink = 0;

let arrActiveTabs = {},
    arrButtonsClass = {},
    arrButtonsVal = {},
    arrLinesClass = {},
    arrButtonsAbility = {},
    arrOutputs = {};

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

jQuery(document).ready(function() {
    const BOX = jQuery('#ElementModal .JS_DragScroll');
    let startClick = 0,
        currentDate = () => Date.now();

    BOX.mousedown(function() {
        GetDurationClick()
    })

    function GetDurationClick() {
        startClick = currentDate();
        BOX.mouseup(function() {
            durationOfClickTabLink = currentDate() - startClick;
        })
    }
})

function SwitchTabsInModal(Iam) {
        let Index,
            Title_Modal,
            section = item => Iam.closest(item);

        Index = Iam.closest('.tabCalc-links').find('.tabCalc-link').index(Iam);
        Title_Modal = Iam.val();

        if (durationOfClickTabLink < 500) {
            AddRemove_Active();
            RenderingCoolTab(Iam);
            ResetModal(Iam);
            ShowHide_tabel ();
            ShowHeader();
            Print_Title_Modal();
        }

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
// END Director.js
