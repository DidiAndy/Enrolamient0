import { Directive, Input, SimpleChanges, Attribute } from '@angular/core';
import { Validator, AbstractControl } from '@angular/forms';
import { NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[identificationNumber]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: IdentificationPatternDirective, multi: true }
    ]
})

export class IdentificationPatternDirective implements Validator {

    private _onChange: () => void;
    hasErrors = 0;
    constructor() {
    }
    validate(c: AbstractControl) {
        const value = c.value;
        if (!value) {
            return {
                required: true
            };
        }
        if (value && value.length == 10) {
            
            if (value.startsWith('01') || value.startsWith('02') || value.startsWith('03')
                || value.startsWith('04') || value.startsWith('05') || value.startsWith('06')
                || value.startsWith('07') || value.startsWith('08') || value.startsWith('09')
                || value.startsWith('10') || value.startsWith('11') || value.startsWith('12')
                || value.startsWith('13') || value.startsWith('14') || value.startsWith('15')
                || value.startsWith('16') || value.startsWith('17') || value.startsWith('18')
                || value.startsWith('19') || value.startsWith('20') || value.startsWith('21')
                || value.startsWith('22') || value.startsWith('23') || value.startsWith('24')
                || value.startsWith('30')) {
                if (this.luhnAlgorithm(value) === true) {
                    return null;
                } else {
                    return {
                        pattern: true
                    };
                }
            } else {
                return {
                    pattern: true
                };
            }
        } else {
            return {
                pattern: true
            };
        }
        
    }

    registerOnValidatorChange(fn: () => void): void {
        this._onChange = fn;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('requiredIfPattern' in changes) {
            if (this._onChange) {
                this._onChange();
            }
        }
    }

    luhnAlgorithm(identification: string) {
        let nCheck = 0;
        let nDigit = 0;
        let bEven = false;
        identification = identification.replace(/\D/g, '');

        for (let n = identification.length - 1; n >= 0; n--) {
            const cDigit = identification.charAt(n);
            nDigit = parseInt(cDigit, 10);

            if (bEven) {
                if ((nDigit *= 2) > 9) {
                    nDigit -= 9;
                }
            }
            nCheck += nDigit;
            bEven = !bEven;
        }

        return (nCheck % 10) == 0;
    }
}