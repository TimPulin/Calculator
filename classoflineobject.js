// classoflineobject.js
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
// END classoflineobject.js
