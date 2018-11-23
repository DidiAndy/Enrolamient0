import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';
var DomChangeDirective = /** @class */ (function () {
    function DomChangeDirective(elementRef) {
        var _this = this;
        this.elementRef = elementRef;
        this.domChange = new EventEmitter();
        var element = this.elementRef.nativeElement;
        this.changes = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) { return _this.domChange.emit(mutation); });
        });
        this.changes.observe(element, {
            attributes: true,
            childList: true,
            characterData: true
        });
    }
    DomChangeDirective.prototype.ngOnDestroy = function () {
        this.changes.disconnect();
    };
    DomChangeDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[domChange]'
                },] },
    ];
    /** @nocollapse */
    DomChangeDirective.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    DomChangeDirective.propDecorators = {
        'domChange': [{ type: Output },],
    };
    return DomChangeDirective;
}());
export { DomChangeDirective };
//# sourceMappingURL=dom-change.directive.js.map