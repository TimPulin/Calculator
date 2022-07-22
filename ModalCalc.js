// ModalCalc.js
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
// END ModalCalc.js
