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
            durationOfClickTabLink = 0;
            SwitchTabsInModal(TABLINKS.eq(2) );
        }
    }

    function CheckAvailabilityInfo() {
        return arrActiveTabs[keyOfElement] == undefined ? false : true;
    }

    function SetActiveTab() {
        IndexT = arrActiveTabs[keyOfElement];
        durationOfClickTabLink = 0;
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
// END Set.js
