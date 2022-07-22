// MainCalc.js
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
// END MainCalc.js
