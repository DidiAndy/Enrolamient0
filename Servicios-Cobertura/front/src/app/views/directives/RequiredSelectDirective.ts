import { Directive, Input, SimpleChanges, Attribute } from '@angular/core';
import { Validator, AbstractControl } from '@angular/forms';
import { NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[RequiredSelect]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: RequiredSelectDirective, multi: true }
    ]
})

export class RequiredSelectDirective implements Validator {
    
    private _onChange: () => void;
    constructor() {
    }
    validate(c: AbstractControl) {
        const value = c.value;
        if (value && value === 0) {
            return {
                required: true
            };
        }
        if (!value) {
            return {
                required: true
            };
        }

        return null;
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
}