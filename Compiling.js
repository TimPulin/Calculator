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
// END Compiling.js
