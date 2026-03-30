import {
  WaitlistService
} from "./chunk-V27HT2EO.js";
import {
  EventService
} from "./chunk-EYXM5OOP.js";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-QJEQDSFC.js";
import {
  AuthService
} from "./chunk-5CWASPTV.js";
import {
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  NgModel
} from "./chunk-XPY4B3TJ.js";
import {
  OrderService
} from "./chunk-H334S5XS.js";
import {
  MatDivider,
  MatDividerModule
} from "./chunk-B3VC7F6K.js";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-2MT4FJQU.js";
import {
  PaymentMethod
} from "./chunk-ETZDFFQU.js";
import "./chunk-4CH56522.js";
import {
  UniqueSelectionDispatcher
} from "./chunk-NP2OLDGZ.js";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle,
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-5GAUGJ64.js";
import {
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-7C6TSSWH.js";
import {
  FocusMonitor,
  HttpClient,
  MatButton,
  MatButtonModule,
  MatCommonModule,
  MatIcon,
  MatIconModule,
  MatOption,
  MatRipple,
  MatRippleModule,
  _MatInternalFormField
} from "./chunk-NW3FCLJU.js";
import "./chunk-6UWFS5XU.js";
import {
  ANIMATION_MODULE_TYPE,
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  CommonModule,
  Component,
  ContentChildren,
  CurrencyPipe,
  DatePipe,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  InputFlags,
  NgIf,
  NgModule,
  Optional,
  Output,
  ViewChild,
  ViewEncapsulation$1,
  booleanAttribute,
  forwardRef,
  inject,
  numberAttribute,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵInputTransformsFeature,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵinjectAttribute,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵpipeBind4,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-L24MRG7B.js";

// node_modules/@angular/material/fesm2022/radio.mjs
var _c0 = ["input"];
var _c1 = ["formField"];
var _c2 = ["*"];
var nextUniqueId = 0;
var MatRadioChange = class {
  constructor(source, value) {
    this.source = source;
    this.value = value;
  }
};
var MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MatRadioGroup),
  multi: true
};
var MAT_RADIO_GROUP = new InjectionToken("MatRadioGroup");
var MAT_RADIO_DEFAULT_OPTIONS = new InjectionToken("mat-radio-default-options", {
  providedIn: "root",
  factory: MAT_RADIO_DEFAULT_OPTIONS_FACTORY
});
function MAT_RADIO_DEFAULT_OPTIONS_FACTORY() {
  return {
    color: "accent"
  };
}
var MatRadioGroup = class _MatRadioGroup {
  /** Name of the radio button group. All radio buttons inside this group will use this name. */
  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
    this._updateRadioButtonNames();
  }
  /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
  get labelPosition() {
    return this._labelPosition;
  }
  set labelPosition(v) {
    this._labelPosition = v === "before" ? "before" : "after";
    this._markRadiosForCheck();
  }
  /**
   * Value for the radio-group. Should equal the value of the selected radio button if there is
   * a corresponding radio button with a matching value. If there is not such a corresponding
   * radio button, this value persists to be applied in case a new radio button is added with a
   * matching value.
   */
  get value() {
    return this._value;
  }
  set value(newValue) {
    if (this._value !== newValue) {
      this._value = newValue;
      this._updateSelectedRadioFromValue();
      this._checkSelectedRadioButton();
    }
  }
  _checkSelectedRadioButton() {
    if (this._selected && !this._selected.checked) {
      this._selected.checked = true;
    }
  }
  /**
   * The currently selected radio button. If set to a new radio button, the radio group value
   * will be updated to match the new selected button.
   */
  get selected() {
    return this._selected;
  }
  set selected(selected) {
    this._selected = selected;
    this.value = selected ? selected.value : null;
    this._checkSelectedRadioButton();
  }
  /** Whether the radio group is disabled */
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = value;
    this._markRadiosForCheck();
  }
  /** Whether the radio group is required */
  get required() {
    return this._required;
  }
  set required(value) {
    this._required = value;
    this._markRadiosForCheck();
  }
  constructor(_changeDetector) {
    this._changeDetector = _changeDetector;
    this._value = null;
    this._name = `mat-radio-group-${nextUniqueId++}`;
    this._selected = null;
    this._isInitialized = false;
    this._labelPosition = "after";
    this._disabled = false;
    this._required = false;
    this._controlValueAccessorChangeFn = () => {
    };
    this.onTouched = () => {
    };
    this.change = new EventEmitter();
  }
  /**
   * Initialize properties once content children are available.
   * This allows us to propagate relevant attributes to associated buttons.
   */
  ngAfterContentInit() {
    this._isInitialized = true;
    this._buttonChanges = this._radios.changes.subscribe(() => {
      if (this.selected && !this._radios.find((radio) => radio === this.selected)) {
        this._selected = null;
      }
    });
  }
  ngOnDestroy() {
    this._buttonChanges?.unsubscribe();
  }
  /**
   * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
   * radio buttons upon their blur.
   */
  _touch() {
    if (this.onTouched) {
      this.onTouched();
    }
  }
  _updateRadioButtonNames() {
    if (this._radios) {
      this._radios.forEach((radio) => {
        radio.name = this.name;
        radio._markForCheck();
      });
    }
  }
  /** Updates the `selected` radio button from the internal _value state. */
  _updateSelectedRadioFromValue() {
    const isAlreadySelected = this._selected !== null && this._selected.value === this._value;
    if (this._radios && !isAlreadySelected) {
      this._selected = null;
      this._radios.forEach((radio) => {
        radio.checked = this.value === radio.value;
        if (radio.checked) {
          this._selected = radio;
        }
      });
    }
  }
  /** Dispatch change event with current selection and group value. */
  _emitChangeEvent() {
    if (this._isInitialized) {
      this.change.emit(new MatRadioChange(this._selected, this._value));
    }
  }
  _markRadiosForCheck() {
    if (this._radios) {
      this._radios.forEach((radio) => radio._markForCheck());
    }
  }
  /**
   * Sets the model value. Implemented as part of ControlValueAccessor.
   * @param value
   */
  writeValue(value) {
    this.value = value;
    this._changeDetector.markForCheck();
  }
  /**
   * Registers a callback to be triggered when the model value changes.
   * Implemented as part of ControlValueAccessor.
   * @param fn Callback to be registered.
   */
  registerOnChange(fn) {
    this._controlValueAccessorChangeFn = fn;
  }
  /**
   * Registers a callback to be triggered when the control is touched.
   * Implemented as part of ControlValueAccessor.
   * @param fn Callback to be registered.
   */
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  /**
   * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
   * @param isDisabled Whether the control should be disabled.
   */
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
    this._changeDetector.markForCheck();
  }
  static {
    this.\u0275fac = function MatRadioGroup_Factory(t) {
      return new (t || _MatRadioGroup)(\u0275\u0275directiveInject(ChangeDetectorRef));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MatRadioGroup,
      selectors: [["mat-radio-group"]],
      contentQueries: function MatRadioGroup_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          \u0275\u0275contentQuery(dirIndex, MatRadioButton, 5);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._radios = _t);
        }
      },
      hostAttrs: ["role", "radiogroup", 1, "mat-mdc-radio-group"],
      inputs: {
        color: "color",
        name: "name",
        labelPosition: "labelPosition",
        value: "value",
        selected: "selected",
        disabled: [InputFlags.HasDecoratorInputTransform, "disabled", "disabled", booleanAttribute],
        required: [InputFlags.HasDecoratorInputTransform, "required", "required", booleanAttribute]
      },
      outputs: {
        change: "change"
      },
      exportAs: ["matRadioGroup"],
      standalone: true,
      features: [\u0275\u0275ProvidersFeature([MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR, {
        provide: MAT_RADIO_GROUP,
        useExisting: _MatRadioGroup
      }]), \u0275\u0275InputTransformsFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatRadioGroup, [{
    type: Directive,
    args: [{
      selector: "mat-radio-group",
      exportAs: "matRadioGroup",
      providers: [MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR, {
        provide: MAT_RADIO_GROUP,
        useExisting: MatRadioGroup
      }],
      host: {
        "role": "radiogroup",
        "class": "mat-mdc-radio-group"
      },
      standalone: true
    }]
  }], () => [{
    type: ChangeDetectorRef
  }], {
    change: [{
      type: Output
    }],
    _radios: [{
      type: ContentChildren,
      args: [forwardRef(() => MatRadioButton), {
        descendants: true
      }]
    }],
    color: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    labelPosition: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    selected: [{
      type: Input
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    required: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var MatRadioButton = class _MatRadioButton {
  /** Whether this radio button is checked. */
  get checked() {
    return this._checked;
  }
  set checked(value) {
    if (this._checked !== value) {
      this._checked = value;
      if (value && this.radioGroup && this.radioGroup.value !== this.value) {
        this.radioGroup.selected = this;
      } else if (!value && this.radioGroup && this.radioGroup.value === this.value) {
        this.radioGroup.selected = null;
      }
      if (value) {
        this._radioDispatcher.notify(this.id, this.name);
      }
      this._changeDetector.markForCheck();
    }
  }
  /** The value of this radio button. */
  get value() {
    return this._value;
  }
  set value(value) {
    if (this._value !== value) {
      this._value = value;
      if (this.radioGroup !== null) {
        if (!this.checked) {
          this.checked = this.radioGroup.value === value;
        }
        if (this.checked) {
          this.radioGroup.selected = this;
        }
      }
    }
  }
  /** Whether the label should appear after or before the radio button. Defaults to 'after' */
  get labelPosition() {
    return this._labelPosition || this.radioGroup && this.radioGroup.labelPosition || "after";
  }
  set labelPosition(value) {
    this._labelPosition = value;
  }
  /** Whether the radio button is disabled. */
  get disabled() {
    return this._disabled || this.radioGroup !== null && this.radioGroup.disabled;
  }
  set disabled(value) {
    this._setDisabled(value);
  }
  /** Whether the radio button is required. */
  get required() {
    return this._required || this.radioGroup && this.radioGroup.required;
  }
  set required(value) {
    this._required = value;
  }
  /** Theme color of the radio button. */
  get color() {
    return this._color || this.radioGroup && this.radioGroup.color || this._providerOverride && this._providerOverride.color || "accent";
  }
  set color(newValue) {
    this._color = newValue;
  }
  /** ID of the native input element inside `<mat-radio-button>` */
  get inputId() {
    return `${this.id || this._uniqueId}-input`;
  }
  constructor(radioGroup, _elementRef, _changeDetector, _focusMonitor, _radioDispatcher, animationMode, _providerOverride, tabIndex) {
    this._elementRef = _elementRef;
    this._changeDetector = _changeDetector;
    this._focusMonitor = _focusMonitor;
    this._radioDispatcher = _radioDispatcher;
    this._providerOverride = _providerOverride;
    this._uniqueId = `mat-radio-${++nextUniqueId}`;
    this.id = this._uniqueId;
    this.disableRipple = false;
    this.tabIndex = 0;
    this.change = new EventEmitter();
    this._checked = false;
    this._value = null;
    this._removeUniqueSelectionListener = () => {
    };
    this.radioGroup = radioGroup;
    this._noopAnimations = animationMode === "NoopAnimations";
    if (tabIndex) {
      this.tabIndex = numberAttribute(tabIndex, 0);
    }
  }
  /** Focuses the radio button. */
  focus(options, origin) {
    if (origin) {
      this._focusMonitor.focusVia(this._inputElement, origin, options);
    } else {
      this._inputElement.nativeElement.focus(options);
    }
  }
  /**
   * Marks the radio button as needing checking for change detection.
   * This method is exposed because the parent radio group will directly
   * update bound properties of the radio button.
   */
  _markForCheck() {
    this._changeDetector.markForCheck();
  }
  ngOnInit() {
    if (this.radioGroup) {
      this.checked = this.radioGroup.value === this._value;
      if (this.checked) {
        this.radioGroup.selected = this;
      }
      this.name = this.radioGroup.name;
    }
    this._removeUniqueSelectionListener = this._radioDispatcher.listen((id, name) => {
      if (id !== this.id && name === this.name) {
        this.checked = false;
      }
    });
  }
  ngDoCheck() {
    this._updateTabIndex();
  }
  ngAfterViewInit() {
    this._updateTabIndex();
    this._focusMonitor.monitor(this._elementRef, true).subscribe((focusOrigin) => {
      if (!focusOrigin && this.radioGroup) {
        this.radioGroup._touch();
      }
    });
  }
  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._elementRef);
    this._removeUniqueSelectionListener();
  }
  /** Dispatch change event with current value. */
  _emitChangeEvent() {
    this.change.emit(new MatRadioChange(this, this._value));
  }
  _isRippleDisabled() {
    return this.disableRipple || this.disabled;
  }
  _onInputClick(event) {
    event.stopPropagation();
  }
  /** Triggered when the radio button receives an interaction from the user. */
  _onInputInteraction(event) {
    event.stopPropagation();
    if (!this.checked && !this.disabled) {
      const groupValueChanged = this.radioGroup && this.value !== this.radioGroup.value;
      this.checked = true;
      this._emitChangeEvent();
      if (this.radioGroup) {
        this.radioGroup._controlValueAccessorChangeFn(this.value);
        if (groupValueChanged) {
          this.radioGroup._emitChangeEvent();
        }
      }
    }
  }
  /** Triggered when the user clicks on the touch target. */
  _onTouchTargetClick(event) {
    this._onInputInteraction(event);
    if (!this.disabled) {
      this._inputElement.nativeElement.focus();
    }
  }
  /** Sets the disabled state and marks for check if a change occurred. */
  _setDisabled(value) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._changeDetector.markForCheck();
    }
  }
  /** Gets the tabindex for the underlying input element. */
  _updateTabIndex() {
    const group = this.radioGroup;
    let value;
    if (!group || !group.selected || this.disabled) {
      value = this.tabIndex;
    } else {
      value = group.selected === this ? this.tabIndex : -1;
    }
    if (value !== this._previousTabIndex) {
      const input = this._inputElement?.nativeElement;
      if (input) {
        input.setAttribute("tabindex", value + "");
        this._previousTabIndex = value;
      }
    }
  }
  static {
    this.\u0275fac = function MatRadioButton_Factory(t) {
      return new (t || _MatRadioButton)(\u0275\u0275directiveInject(MAT_RADIO_GROUP, 8), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(FocusMonitor), \u0275\u0275directiveInject(UniqueSelectionDispatcher), \u0275\u0275directiveInject(ANIMATION_MODULE_TYPE, 8), \u0275\u0275directiveInject(MAT_RADIO_DEFAULT_OPTIONS, 8), \u0275\u0275injectAttribute("tabindex"));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatRadioButton,
      selectors: [["mat-radio-button"]],
      viewQuery: function MatRadioButton_Query(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275viewQuery(_c0, 5);
          \u0275\u0275viewQuery(_c1, 7, ElementRef);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._inputElement = _t.first);
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._rippleTrigger = _t.first);
        }
      },
      hostAttrs: [1, "mat-mdc-radio-button"],
      hostVars: 15,
      hostBindings: function MatRadioButton_HostBindings(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275listener("focus", function MatRadioButton_focus_HostBindingHandler() {
            return ctx._inputElement.nativeElement.focus();
          });
        }
        if (rf & 2) {
          \u0275\u0275attribute("id", ctx.id)("tabindex", null)("aria-label", null)("aria-labelledby", null)("aria-describedby", null);
          \u0275\u0275classProp("mat-primary", ctx.color === "primary")("mat-accent", ctx.color === "accent")("mat-warn", ctx.color === "warn")("mat-mdc-radio-checked", ctx.checked)("_mat-animation-noopable", ctx._noopAnimations);
        }
      },
      inputs: {
        id: "id",
        name: "name",
        ariaLabel: [InputFlags.None, "aria-label", "ariaLabel"],
        ariaLabelledby: [InputFlags.None, "aria-labelledby", "ariaLabelledby"],
        ariaDescribedby: [InputFlags.None, "aria-describedby", "ariaDescribedby"],
        disableRipple: [InputFlags.HasDecoratorInputTransform, "disableRipple", "disableRipple", booleanAttribute],
        tabIndex: [InputFlags.HasDecoratorInputTransform, "tabIndex", "tabIndex", (value) => value == null ? 0 : numberAttribute(value)],
        checked: [InputFlags.HasDecoratorInputTransform, "checked", "checked", booleanAttribute],
        value: "value",
        labelPosition: "labelPosition",
        disabled: [InputFlags.HasDecoratorInputTransform, "disabled", "disabled", booleanAttribute],
        required: [InputFlags.HasDecoratorInputTransform, "required", "required", booleanAttribute],
        color: "color"
      },
      outputs: {
        change: "change"
      },
      exportAs: ["matRadioButton"],
      standalone: true,
      features: [\u0275\u0275InputTransformsFeature, \u0275\u0275StandaloneFeature],
      ngContentSelectors: _c2,
      decls: 13,
      vars: 16,
      consts: [["formField", ""], ["input", ""], ["mat-internal-form-field", "", 3, "labelPosition"], [1, "mdc-radio"], [1, "mat-mdc-radio-touch-target", 3, "click"], ["type", "radio", 1, "mdc-radio__native-control", 3, "change", "id", "checked", "disabled", "required"], [1, "mdc-radio__background"], [1, "mdc-radio__outer-circle"], [1, "mdc-radio__inner-circle"], ["mat-ripple", "", 1, "mat-radio-ripple", "mat-mdc-focus-indicator", 3, "matRippleTrigger", "matRippleDisabled", "matRippleCentered"], [1, "mat-ripple-element", "mat-radio-persistent-ripple"], [1, "mdc-label", 3, "for"]],
      template: function MatRadioButton_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = \u0275\u0275getCurrentView();
          \u0275\u0275projectionDef();
          \u0275\u0275elementStart(0, "div", 2, 0)(2, "div", 3)(3, "div", 4);
          \u0275\u0275listener("click", function MatRadioButton_Template_div_click_3_listener($event) {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._onTouchTargetClick($event));
          });
          \u0275\u0275elementEnd();
          \u0275\u0275elementStart(4, "input", 5, 1);
          \u0275\u0275listener("change", function MatRadioButton_Template_input_change_4_listener($event) {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._onInputInteraction($event));
          });
          \u0275\u0275elementEnd();
          \u0275\u0275elementStart(6, "div", 6);
          \u0275\u0275element(7, "div", 7)(8, "div", 8);
          \u0275\u0275elementEnd();
          \u0275\u0275elementStart(9, "div", 9);
          \u0275\u0275element(10, "div", 10);
          \u0275\u0275elementEnd()();
          \u0275\u0275elementStart(11, "label", 11);
          \u0275\u0275projection(12);
          \u0275\u0275elementEnd()();
        }
        if (rf & 2) {
          \u0275\u0275property("labelPosition", ctx.labelPosition);
          \u0275\u0275advance(2);
          \u0275\u0275classProp("mdc-radio--disabled", ctx.disabled);
          \u0275\u0275advance(2);
          \u0275\u0275property("id", ctx.inputId)("checked", ctx.checked)("disabled", ctx.disabled)("required", ctx.required);
          \u0275\u0275attribute("name", ctx.name)("value", ctx.value)("aria-label", ctx.ariaLabel)("aria-labelledby", ctx.ariaLabelledby)("aria-describedby", ctx.ariaDescribedby);
          \u0275\u0275advance(5);
          \u0275\u0275property("matRippleTrigger", ctx._rippleTrigger.nativeElement)("matRippleDisabled", ctx._isRippleDisabled())("matRippleCentered", true);
          \u0275\u0275advance(2);
          \u0275\u0275property("for", ctx.inputId);
        }
      },
      dependencies: [MatRipple, _MatInternalFormField],
      styles: ['.mdc-radio{display:inline-block;position:relative;flex:0 0 auto;box-sizing:content-box;width:20px;height:20px;cursor:pointer;will-change:opacity,transform,border-color,color}.mdc-radio[hidden]{display:none}.mdc-radio__background{display:inline-block;position:relative;box-sizing:border-box;width:20px;height:20px}.mdc-radio__background::before{position:absolute;transform:scale(0, 0);border-radius:50%;opacity:0;pointer-events:none;content:"";transition:opacity 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__outer-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;border-width:2px;border-style:solid;border-radius:50%;transition:border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__inner-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;transform:scale(0, 0);border-width:10px;border-style:solid;border-radius:50%;transition:transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit;z-index:1}.mdc-radio--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-radio--touch .mdc-radio__native-control{top:calc((40px - 48px) / 2);right:calc((40px - 48px) / 2);left:calc((40px - 48px) / 2);width:48px;height:48px}.mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring,.mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring{pointer-events:none;border:2px solid rgba(0,0,0,0);border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:100%;width:100%}@media screen and (forced-colors: active){.mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring,.mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring{border-color:CanvasText}}.mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring::after,.mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring::after{content:"";border:2px solid rgba(0,0,0,0);border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring::after,.mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring::after{border-color:CanvasText}}.mdc-radio__native-control:checked+.mdc-radio__background,.mdc-radio__native-control:disabled+.mdc-radio__background{transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__outer-circle{transition:border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle,.mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio--disabled{cursor:default;pointer-events:none}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle{transform:scale(0.5);transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:disabled+.mdc-radio__background,[aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background{cursor:default}.mdc-radio__native-control:focus+.mdc-radio__background::before{transform:scale(1);opacity:.12;transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-radio-button{-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-radio-button .mdc-radio{padding:calc((var(--mdc-radio-state-layer-size) - 20px) / 2)}.mat-mdc-radio-button .mdc-radio [aria-disabled=true] .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:disabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-disabled-selected-icon-color)}.mat-mdc-radio-button .mdc-radio [aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--mdc-radio-disabled-selected-icon-color)}.mat-mdc-radio-button .mdc-radio [aria-disabled=true] .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:disabled:checked+.mdc-radio__background .mdc-radio__outer-circle{opacity:var(--mdc-radio-disabled-selected-icon-opacity)}.mat-mdc-radio-button .mdc-radio [aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{opacity:var(--mdc-radio-disabled-selected-icon-opacity)}.mat-mdc-radio-button .mdc-radio [aria-disabled=true] .mdc-radio__native-control:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:disabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-disabled-unselected-icon-color)}.mat-mdc-radio-button .mdc-radio [aria-disabled=true] .mdc-radio__native-control:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:disabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{opacity:var(--mdc-radio-disabled-unselected-icon-opacity)}.mat-mdc-radio-button .mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button .mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-selected-focus-icon-color)}.mat-mdc-radio-button .mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-radio-button .mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--mdc-radio-selected-focus-icon-color)}.mat-mdc-radio-button .mdc-radio:hover .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-selected-hover-icon-color)}.mat-mdc-radio-button .mdc-radio:hover .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--mdc-radio-selected-hover-icon-color)}.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-selected-icon-color)}.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--mdc-radio-selected-icon-color)}.mat-mdc-radio-button .mdc-radio:not(:disabled):active .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-selected-pressed-icon-color)}.mat-mdc-radio-button .mdc-radio:not(:disabled):active .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--mdc-radio-selected-pressed-icon-color)}.mat-mdc-radio-button .mdc-radio:hover .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-unselected-hover-icon-color)}.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-unselected-icon-color)}.mat-mdc-radio-button .mdc-radio:not(:disabled):active .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-unselected-pressed-icon-color)}.mat-mdc-radio-button .mdc-radio .mdc-radio__background::before{top:calc(-1 * (var(--mdc-radio-state-layer-size) - 20px) / 2);left:calc(-1 * (var(--mdc-radio-state-layer-size) - 20px) / 2);width:var(--mdc-radio-state-layer-size);height:var(--mdc-radio-state-layer-size)}.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control{top:calc((var(--mdc-radio-state-layer-size) - var(--mdc-radio-state-layer-size)) / 2);right:calc((var(--mdc-radio-state-layer-size) - var(--mdc-radio-state-layer-size)) / 2);left:calc((var(--mdc-radio-state-layer-size) - var(--mdc-radio-state-layer-size)) / 2);width:var(--mdc-radio-state-layer-size);height:var(--mdc-radio-state-layer-size)}.mat-mdc-radio-button .mdc-radio .mdc-radio__background::before{background-color:var(--mat-radio-ripple-color)}.mat-mdc-radio-button .mdc-radio:hover .mdc-radio__native-control:not([disabled]):not(:focus)~.mdc-radio__background::before{opacity:.04;transform:scale(1)}.mat-mdc-radio-button.mat-mdc-radio-checked .mdc-radio__background::before{background-color:var(--mat-radio-checked-ripple-color)}.mat-mdc-radio-button.mat-mdc-radio-checked .mat-ripple-element{background-color:var(--mat-radio-checked-ripple-color)}.mat-mdc-radio-button .mdc-radio--disabled+label{color:var(--mat-radio-disabled-label-color)}.mat-mdc-radio-button .mat-radio-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:50%}.mat-mdc-radio-button .mat-radio-ripple .mat-ripple-element{opacity:.14}.mat-mdc-radio-button .mat-radio-ripple::before{border-radius:50%}.mat-mdc-radio-button._mat-animation-noopable .mdc-radio__background::before,.mat-mdc-radio-button._mat-animation-noopable .mdc-radio__outer-circle,.mat-mdc-radio-button._mat-animation-noopable .mdc-radio__inner-circle{transition:none !important}.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:focus:enabled:not(:checked)~.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-unselected-focus-icon-color, black)}.mat-mdc-radio-button.cdk-focused .mat-mdc-focus-indicator::before{content:""}.mat-mdc-radio-touch-target{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%);display:var(--mat-radio-touch-target-display)}[dir=rtl] .mat-mdc-radio-touch-target{left:0;right:50%;transform:translate(50%, -50%)}'],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatRadioButton, [{
    type: Component,
    args: [{
      selector: "mat-radio-button",
      host: {
        "class": "mat-mdc-radio-button",
        "[attr.id]": "id",
        "[class.mat-primary]": 'color === "primary"',
        "[class.mat-accent]": 'color === "accent"',
        "[class.mat-warn]": 'color === "warn"',
        "[class.mat-mdc-radio-checked]": "checked",
        "[class._mat-animation-noopable]": "_noopAnimations",
        // Needs to be removed since it causes some a11y issues (see #21266).
        "[attr.tabindex]": "null",
        "[attr.aria-label]": "null",
        "[attr.aria-labelledby]": "null",
        "[attr.aria-describedby]": "null",
        // Note: under normal conditions focus shouldn't land on this element, however it may be
        // programmatically set, for example inside of a focus trap, in this case we want to forward
        // the focus to the native element.
        "(focus)": "_inputElement.nativeElement.focus()"
      },
      exportAs: "matRadioButton",
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [MatRipple, _MatInternalFormField],
      template: '<div mat-internal-form-field [labelPosition]="labelPosition" #formField>\n  <div class="mdc-radio" [class.mdc-radio--disabled]="disabled">\n    <!-- Render this element first so the input is on top. -->\n    <div class="mat-mdc-radio-touch-target" (click)="_onTouchTargetClick($event)"></div>\n    <input #input class="mdc-radio__native-control" type="radio"\n           [id]="inputId"\n           [checked]="checked"\n           [disabled]="disabled"\n           [attr.name]="name"\n           [attr.value]="value"\n           [required]="required"\n           [attr.aria-label]="ariaLabel"\n           [attr.aria-labelledby]="ariaLabelledby"\n           [attr.aria-describedby]="ariaDescribedby"\n           (change)="_onInputInteraction($event)">\n    <div class="mdc-radio__background">\n      <div class="mdc-radio__outer-circle"></div>\n      <div class="mdc-radio__inner-circle"></div>\n    </div>\n    <div mat-ripple class="mat-radio-ripple mat-mdc-focus-indicator"\n         [matRippleTrigger]="_rippleTrigger.nativeElement"\n         [matRippleDisabled]="_isRippleDisabled()"\n         [matRippleCentered]="true">\n      <div class="mat-ripple-element mat-radio-persistent-ripple"></div>\n    </div>\n  </div>\n  <label class="mdc-label" [for]="inputId">\n    <ng-content></ng-content>\n  </label>\n</div>\n',
      styles: ['.mdc-radio{display:inline-block;position:relative;flex:0 0 auto;box-sizing:content-box;width:20px;height:20px;cursor:pointer;will-change:opacity,transform,border-color,color}.mdc-radio[hidden]{display:none}.mdc-radio__background{display:inline-block;position:relative;box-sizing:border-box;width:20px;height:20px}.mdc-radio__background::before{position:absolute;transform:scale(0, 0);border-radius:50%;opacity:0;pointer-events:none;content:"";transition:opacity 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__outer-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;border-width:2px;border-style:solid;border-radius:50%;transition:border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__inner-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;transform:scale(0, 0);border-width:10px;border-style:solid;border-radius:50%;transition:transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit;z-index:1}.mdc-radio--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-radio--touch .mdc-radio__native-control{top:calc((40px - 48px) / 2);right:calc((40px - 48px) / 2);left:calc((40px - 48px) / 2);width:48px;height:48px}.mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring,.mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring{pointer-events:none;border:2px solid rgba(0,0,0,0);border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:100%;width:100%}@media screen and (forced-colors: active){.mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring,.mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring{border-color:CanvasText}}.mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring::after,.mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring::after{content:"";border:2px solid rgba(0,0,0,0);border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring::after,.mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring::after{border-color:CanvasText}}.mdc-radio__native-control:checked+.mdc-radio__background,.mdc-radio__native-control:disabled+.mdc-radio__background{transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__outer-circle{transition:border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle,.mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio--disabled{cursor:default;pointer-events:none}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle{transform:scale(0.5);transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:disabled+.mdc-radio__background,[aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background{cursor:default}.mdc-radio__native-control:focus+.mdc-radio__background::before{transform:scale(1);opacity:.12;transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-radio-button{-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-radio-button .mdc-radio{padding:calc((var(--mdc-radio-state-layer-size) - 20px) / 2)}.mat-mdc-radio-button .mdc-radio [aria-disabled=true] .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:disabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-disabled-selected-icon-color)}.mat-mdc-radio-button .mdc-radio [aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--mdc-radio-disabled-selected-icon-color)}.mat-mdc-radio-button .mdc-radio [aria-disabled=true] .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:disabled:checked+.mdc-radio__background .mdc-radio__outer-circle{opacity:var(--mdc-radio-disabled-selected-icon-opacity)}.mat-mdc-radio-button .mdc-radio [aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{opacity:var(--mdc-radio-disabled-selected-icon-opacity)}.mat-mdc-radio-button .mdc-radio [aria-disabled=true] .mdc-radio__native-control:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:disabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-disabled-unselected-icon-color)}.mat-mdc-radio-button .mdc-radio [aria-disabled=true] .mdc-radio__native-control:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:disabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{opacity:var(--mdc-radio-disabled-unselected-icon-opacity)}.mat-mdc-radio-button .mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button .mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-selected-focus-icon-color)}.mat-mdc-radio-button .mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-radio-button .mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--mdc-radio-selected-focus-icon-color)}.mat-mdc-radio-button .mdc-radio:hover .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-selected-hover-icon-color)}.mat-mdc-radio-button .mdc-radio:hover .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--mdc-radio-selected-hover-icon-color)}.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-selected-icon-color)}.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--mdc-radio-selected-icon-color)}.mat-mdc-radio-button .mdc-radio:not(:disabled):active .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-selected-pressed-icon-color)}.mat-mdc-radio-button .mdc-radio:not(:disabled):active .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--mdc-radio-selected-pressed-icon-color)}.mat-mdc-radio-button .mdc-radio:hover .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-unselected-hover-icon-color)}.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-unselected-icon-color)}.mat-mdc-radio-button .mdc-radio:not(:disabled):active .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-unselected-pressed-icon-color)}.mat-mdc-radio-button .mdc-radio .mdc-radio__background::before{top:calc(-1 * (var(--mdc-radio-state-layer-size) - 20px) / 2);left:calc(-1 * (var(--mdc-radio-state-layer-size) - 20px) / 2);width:var(--mdc-radio-state-layer-size);height:var(--mdc-radio-state-layer-size)}.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control{top:calc((var(--mdc-radio-state-layer-size) - var(--mdc-radio-state-layer-size)) / 2);right:calc((var(--mdc-radio-state-layer-size) - var(--mdc-radio-state-layer-size)) / 2);left:calc((var(--mdc-radio-state-layer-size) - var(--mdc-radio-state-layer-size)) / 2);width:var(--mdc-radio-state-layer-size);height:var(--mdc-radio-state-layer-size)}.mat-mdc-radio-button .mdc-radio .mdc-radio__background::before{background-color:var(--mat-radio-ripple-color)}.mat-mdc-radio-button .mdc-radio:hover .mdc-radio__native-control:not([disabled]):not(:focus)~.mdc-radio__background::before{opacity:.04;transform:scale(1)}.mat-mdc-radio-button.mat-mdc-radio-checked .mdc-radio__background::before{background-color:var(--mat-radio-checked-ripple-color)}.mat-mdc-radio-button.mat-mdc-radio-checked .mat-ripple-element{background-color:var(--mat-radio-checked-ripple-color)}.mat-mdc-radio-button .mdc-radio--disabled+label{color:var(--mat-radio-disabled-label-color)}.mat-mdc-radio-button .mat-radio-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:50%}.mat-mdc-radio-button .mat-radio-ripple .mat-ripple-element{opacity:.14}.mat-mdc-radio-button .mat-radio-ripple::before{border-radius:50%}.mat-mdc-radio-button._mat-animation-noopable .mdc-radio__background::before,.mat-mdc-radio-button._mat-animation-noopable .mdc-radio__outer-circle,.mat-mdc-radio-button._mat-animation-noopable .mdc-radio__inner-circle{transition:none !important}.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:focus:enabled:not(:checked)~.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-unselected-focus-icon-color, black)}.mat-mdc-radio-button.cdk-focused .mat-mdc-focus-indicator::before{content:""}.mat-mdc-radio-touch-target{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%);display:var(--mat-radio-touch-target-display)}[dir=rtl] .mat-mdc-radio-touch-target{left:0;right:50%;transform:translate(50%, -50%)}']
    }]
  }], () => [{
    type: MatRadioGroup,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [MAT_RADIO_GROUP]
    }]
  }, {
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }, {
    type: FocusMonitor
  }, {
    type: UniqueSelectionDispatcher
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [ANIMATION_MODULE_TYPE]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [MAT_RADIO_DEFAULT_OPTIONS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Attribute,
      args: ["tabindex"]
    }]
  }], {
    id: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input,
      args: ["aria-label"]
    }],
    ariaLabelledby: [{
      type: Input,
      args: ["aria-labelledby"]
    }],
    ariaDescribedby: [{
      type: Input,
      args: ["aria-describedby"]
    }],
    disableRipple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    tabIndex: [{
      type: Input,
      args: [{
        transform: (value) => value == null ? 0 : numberAttribute(value)
      }]
    }],
    checked: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    value: [{
      type: Input
    }],
    labelPosition: [{
      type: Input
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    required: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    color: [{
      type: Input
    }],
    change: [{
      type: Output
    }],
    _inputElement: [{
      type: ViewChild,
      args: ["input"]
    }],
    _rippleTrigger: [{
      type: ViewChild,
      args: ["formField", {
        read: ElementRef,
        static: true
      }]
    }]
  });
})();
var MatRadioModule = class _MatRadioModule {
  static {
    this.\u0275fac = function MatRadioModule_Factory(t) {
      return new (t || _MatRadioModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: _MatRadioModule
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
      imports: [MatCommonModule, CommonModule, MatRippleModule, MatRadioButton, MatCommonModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatRadioModule, [{
    type: NgModule,
    args: [{
      imports: [MatCommonModule, CommonModule, MatRippleModule, MatRadioGroup, MatRadioButton],
      exports: [MatCommonModule, MatRadioGroup, MatRadioButton]
    }]
  }], null, null);
})();

// src/app/core/services/social-proof.service.ts
var SocialProofService = class _SocialProofService {
  constructor(http) {
    this.http = http;
    this.BASE_URL = "/SocialProof";
  }
  trackView(eventId) {
    return this.http.post(`${this.BASE_URL}/events/${eventId}/view`, {});
  }
  getSocialProof(eventId) {
    return this.http.get(`${this.BASE_URL}/events/${eventId}`);
  }
  static {
    this.\u0275fac = function SocialProofService_Factory(t) {
      return new (t || _SocialProofService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SocialProofService, factory: _SocialProofService.\u0275fac, providedIn: "root" });
  }
};

// src/app/features/events/event-detail/event-detail.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.ticketType.id;
function EventDetailComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "mat-progress-spinner", 1);
    \u0275\u0275elementEnd();
  }
}
function EventDetailComponent_Conditional_1_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.event.category);
  }
}
function EventDetailComponent_Conditional_1_Conditional_20_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span")(1, "mat-icon");
    \u0275\u0275text(2, "visibility");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.socialProof.viewersNow, " pessoas vendo agora");
  }
}
function EventDetailComponent_Conditional_1_Conditional_20_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span")(1, "mat-icon");
    \u0275\u0275text(2, "local_fire_department");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.socialProof.ticketsSoldLastHour, " ingressos vendidos na \xFAltima hora");
  }
}
function EventDetailComponent_Conditional_1_Conditional_20_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17)(1, "mat-icon");
    \u0275\u0275text(2, "warning");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.socialProof.urgencyMessage, "");
  }
}
function EventDetailComponent_Conditional_1_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275template(1, EventDetailComponent_Conditional_1_Conditional_20_Conditional_1_Template, 4, 1, "span")(2, EventDetailComponent_Conditional_1_Conditional_20_Conditional_2_Template, 4, 1, "span")(3, EventDetailComponent_Conditional_1_Conditional_20_Conditional_3_Template, 4, 1, "span", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(1, ctx_r1.socialProof.viewersNow > 1 ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(2, ctx_r1.socialProof.ticketsSoldLastHour > 0 ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(3, ctx_r1.socialProof.urgencyMessage ? 3 : -1);
  }
}
function EventDetailComponent_Conditional_1_For_41_Conditional_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tt_r4 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tt_r4.description);
  }
}
function EventDetailComponent_Conditional_1_For_41_Conditional_0_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 21);
    \u0275\u0275text(1, "GRATUITO");
    \u0275\u0275elementEnd();
  }
}
function EventDetailComponent_Conditional_1_For_41_Conditional_0_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 26);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tt_r4 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, tt_r4.price, "BRL"));
  }
}
function EventDetailComponent_Conditional_1_For_41_Conditional_0_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const n_r5 = ctx.$implicit;
    \u0275\u0275property("value", n_r5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(n_r5);
  }
}
function EventDetailComponent_Conditional_1_For_41_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 19)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, EventDetailComponent_Conditional_1_For_41_Conditional_0_Conditional_4_Template, 2, 1, "p");
    \u0275\u0275elementStart(5, "div", 20);
    \u0275\u0275template(6, EventDetailComponent_Conditional_1_For_41_Conditional_0_Conditional_6_Template, 2, 0, "span", 21)(7, EventDetailComponent_Conditional_1_For_41_Conditional_0_Conditional_7_Template, 3, 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "small", 22);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "mat-form-field", 23)(11, "mat-label");
    \u0275\u0275text(12, "Qtd");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "mat-select", 24);
    \u0275\u0275twoWayListener("ngModelChange", function EventDetailComponent_Conditional_1_For_41_Conditional_0_Template_mat_select_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r3);
      const tt_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.quantities[tt_r4.id], $event) || (ctx_r1.quantities[tt_r4.id] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275repeaterCreate(14, EventDetailComponent_Conditional_1_For_41_Conditional_0_For_15_Template, 2, 2, "mat-option", 25, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(16, "mat-divider");
  }
  if (rf & 2) {
    const tt_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(tt_r4.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(4, tt_r4.description ? 4 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(6, tt_r4.price === 0 ? 6 : 7);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", tt_r4.quantityAvailable, " dispon\xEDveis");
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.quantities[tt_r4.id]);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.getQuantityOptions(tt_r4.quantityAvailable));
  }
}
function EventDetailComponent_Conditional_1_For_41_Conditional_1_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-spinner", 30);
  }
}
function EventDetailComponent_Conditional_1_For_41_Conditional_1_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "hourglass_top");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Lista de Espera ");
  }
}
function EventDetailComponent_Conditional_1_For_41_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 27)(1, "div", 19)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 28);
    \u0275\u0275text(5, "ESGOTADO");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 29);
    \u0275\u0275listener("click", function EventDetailComponent_Conditional_1_For_41_Conditional_1_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r6);
      const tt_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.joinWaitlist(tt_r4));
    });
    \u0275\u0275template(7, EventDetailComponent_Conditional_1_For_41_Conditional_1_Conditional_7_Template, 1, 0, "mat-progress-spinner", 30)(8, EventDetailComponent_Conditional_1_For_41_Conditional_1_Conditional_8_Template, 3, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(9, "mat-divider");
  }
  if (rf & 2) {
    const tt_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(tt_r4.name);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.joiningWaitlist === tt_r4.id);
    \u0275\u0275advance();
    \u0275\u0275conditional(7, ctx_r1.joiningWaitlist === tt_r4.id ? 7 : 8);
  }
}
function EventDetailComponent_Conditional_1_For_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, EventDetailComponent_Conditional_1_For_41_Conditional_0_Template, 17, 5)(1, EventDetailComponent_Conditional_1_For_41_Conditional_1_Template, 10, 3);
  }
  if (rf & 2) {
    const tt_r4 = ctx.$implicit;
    \u0275\u0275conditional(0, tt_r4.isActive && tt_r4.quantityAvailable > 0 ? 0 : tt_r4.isActive && tt_r4.quantityAvailable === 0 ? 1 : -1);
  }
}
function EventDetailComponent_Conditional_1_Conditional_42_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r8 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", item_r8.quantity, "x ", item_r8.ticketType.name, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 3, item_r8.ticketType.price * item_r8.quantity, "BRL"));
  }
}
function EventDetailComponent_Conditional_1_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 31)(1, "strong");
    \u0275\u0275text(2, "Resumo:");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, EventDetailComponent_Conditional_1_Conditional_42_For_4_Template, 6, 6, "div", 32, _forTrack1);
    \u0275\u0275element(5, "mat-divider");
    \u0275\u0275elementStart(6, "div", 33)(7, "strong");
    \u0275\u0275text(8, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "strong");
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "currency");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 34)(13, "p")(14, "strong");
    \u0275\u0275text(15, "Forma de Pagamento:");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "mat-radio-group", 35);
    \u0275\u0275twoWayListener("ngModelChange", function EventDetailComponent_Conditional_1_Conditional_42_Template_mat_radio_group_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.selectedPaymentMethod, $event) || (ctx_r1.selectedPaymentMethod = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(17, "mat-radio-button", 25)(18, "mat-icon");
    \u0275\u0275text(19, "credit_card");
    \u0275\u0275elementEnd();
    \u0275\u0275text(20, " Cart\xE3o ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "mat-radio-button", 25)(22, "mat-icon");
    \u0275\u0275text(23, "pix");
    \u0275\u0275elementEnd();
    \u0275\u0275text(24, " PIX ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.cartItems);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(11, 4, ctx_r1.totalAmount, "BRL"));
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.selectedPaymentMethod);
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r1.PaymentMethod.Card);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r1.PaymentMethod.Pix);
  }
}
function EventDetailComponent_Conditional_1_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-spinner", 14);
  }
}
function EventDetailComponent_Conditional_1_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "shopping_cart");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Comprar Ingressos ");
  }
}
function EventDetailComponent_Conditional_1_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 15)(1, "a", 36);
    \u0275\u0275text(2, "Entre");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " ou ");
    \u0275\u0275elementStart(4, "a", 37);
    \u0275\u0275text(5, "cadastre-se");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " para comprar ");
    \u0275\u0275elementEnd();
  }
}
function EventDetailComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "div", 4);
    \u0275\u0275template(3, EventDetailComponent_Conditional_1_span_3_Template, 2, 1, "span", 5);
    \u0275\u0275elementStart(4, "h1");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 6)(7, "span")(8, "mat-icon");
    \u0275\u0275text(9, "calendar_today");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span")(13, "mat-icon");
    \u0275\u0275text(14, "location_on");
    \u0275\u0275elementEnd();
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span")(17, "mat-icon");
    \u0275\u0275text(18, "person");
    \u0275\u0275elementEnd();
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275template(20, EventDetailComponent_Conditional_1_Conditional_20_Template, 4, 3, "div", 7);
    \u0275\u0275elementStart(21, "div", 8)(22, "div", 9)(23, "div", 10)(24, "h2");
    \u0275\u0275text(25, "Sobre o Evento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "p");
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "h3");
    \u0275\u0275text(29, "Local");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "p")(31, "mat-icon");
    \u0275\u0275text(32, "location_on");
    \u0275\u0275elementEnd();
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 11)(35, "mat-card", 12)(36, "mat-card-header")(37, "mat-card-title");
    \u0275\u0275text(38, "Ingressos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "mat-card-content");
    \u0275\u0275repeaterCreate(40, EventDetailComponent_Conditional_1_For_41_Template, 2, 1, null, null, _forTrack0);
    \u0275\u0275template(42, EventDetailComponent_Conditional_1_Conditional_42_Template, 25, 7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "mat-card-actions")(44, "button", 13);
    \u0275\u0275listener("click", function EventDetailComponent_Conditional_1_Template_button_click_44_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.buyTickets());
    });
    \u0275\u0275template(45, EventDetailComponent_Conditional_1_Conditional_45_Template, 1, 0, "mat-progress-spinner", 14)(46, EventDetailComponent_Conditional_1_Conditional_46_Template, 3, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275template(47, EventDetailComponent_Conditional_1_Conditional_47_Template, 7, 0, "p", 15);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("background-image", "url(" + (ctx_r1.event.imageUrl || "assets/default-event.jpg") + ")");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.event.category);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.event.title);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind4(11, 18, ctx_r1.event.dateTime, "EEEE, dd/MM/yyyy - HH:mm", "", "pt"), "");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate3(" ", ctx_r1.event.venue, ", ", ctx_r1.event.city, "/", ctx_r1.event.state, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" Organizado por ", ctx_r1.event.organizerName, "");
    \u0275\u0275advance();
    \u0275\u0275conditional(20, ctx_r1.socialProof && (ctx_r1.socialProof.viewersNow > 1 || ctx_r1.socialProof.ticketsSoldLastHour > 0) ? 20 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.event.description);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate3(" ", ctx_r1.event.address, ", ", ctx_r1.event.city, "/", ctx_r1.event.state, "");
    \u0275\u0275advance(7);
    \u0275\u0275repeater(ctx_r1.event.ticketTypes);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(42, ctx_r1.totalItems > 0 ? 42 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.totalItems === 0 || ctx_r1.buying);
    \u0275\u0275advance();
    \u0275\u0275conditional(45, ctx_r1.buying ? 45 : 46);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(47, !ctx_r1.authService.isAuthenticated() ? 47 : -1);
  }
}
var EventDetailComponent = class _EventDetailComponent {
  constructor() {
    this.eventService = inject(EventService);
    this.orderService = inject(OrderService);
    this.socialProofService = inject(SocialProofService);
    this.waitlistService = inject(WaitlistService);
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
    this.snackBar = inject(MatSnackBar);
    this.authService = inject(AuthService);
    this.event = null;
    this.socialProof = null;
    this.loading = true;
    this.buying = false;
    this.joiningWaitlist = null;
    this.quantities = {};
    this.selectedPaymentMethod = PaymentMethod.Card;
    this.PaymentMethod = PaymentMethod;
  }
  ngOnInit() {
    const id = Number(this.route.snapshot.params["id"]);
    this.eventService.getEventById(id).subscribe({
      next: (event) => {
        this.event = event;
        event.ticketTypes.forEach((tt) => this.quantities[tt.id] = 0);
        this.loading = false;
        this.socialProofService.trackView(id).subscribe();
        this.socialProofService.getSocialProof(id).subscribe({
          next: (sp) => {
            this.socialProof = sp;
          }
        });
      },
      error: () => {
        this.loading = false;
        this.router.navigate(["/events"]);
      }
    });
  }
  joinWaitlist(tt) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(["/login"], { queryParams: { returnUrl: this.router.url } });
      return;
    }
    this.joiningWaitlist = tt.id;
    this.waitlistService.joinWaitlist({ ticketTypeId: tt.id, quantity: 1 }).subscribe({
      next: () => {
        this.joiningWaitlist = null;
        this.snackBar.open("Voc\xEA entrou na lista de espera! Avisaremos quando houver vagas.", "OK", { duration: 5e3, panelClass: "success-snackbar" });
      },
      error: (err) => {
        this.joiningWaitlist = null;
        this.snackBar.open(err.error?.error || "Erro ao entrar na fila", "Fechar", { duration: 3e3 });
      }
    });
  }
  get cartItems() {
    if (!this.event)
      return [];
    return this.event.ticketTypes.filter((tt) => this.quantities[tt.id] > 0).map((tt) => ({ ticketType: tt, quantity: this.quantities[tt.id] }));
  }
  get totalItems() {
    return this.cartItems.reduce((sum, i) => sum + i.quantity, 0);
  }
  get totalAmount() {
    return this.cartItems.reduce((sum, i) => sum + i.ticketType.price * i.quantity, 0);
  }
  getQuantityOptions(max) {
    return Array.from({ length: Math.min(max, 10) + 1 }, (_, i) => i);
  }
  buyTickets() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(["/login"], { queryParams: { returnUrl: this.router.url } });
      return;
    }
    const items = this.cartItems.map((i) => ({
      ticketTypeId: i.ticketType.id,
      quantity: i.quantity
    }));
    this.buying = true;
    this.orderService.createOrder({ items, paymentMethod: this.selectedPaymentMethod }).subscribe({
      next: (order) => {
        this.buying = false;
        this.router.navigate(["/checkout", order.id]);
      },
      error: (err) => {
        this.buying = false;
        this.snackBar.open(err.error?.error || "Erro ao criar pedido", "Fechar", { duration: 4e3, panelClass: "error-snackbar" });
      }
    });
  }
  static {
    this.\u0275fac = function EventDetailComponent_Factory(t) {
      return new (t || _EventDetailComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EventDetailComponent, selectors: [["app-event-detail"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 2, vars: 1, consts: [[1, "loading-overlay", 2, "min-height", "100vh"], ["mode", "indeterminate"], [1, "event-banner"], [1, "banner-overlay"], [1, "container"], ["class", "category-badge", 4, "ngIf"], [1, "event-meta-list"], [1, "social-proof-bar"], [1, "container", "event-content"], [1, "event-layout"], [1, "event-description-section"], [1, "ticket-section"], [1, "ticket-card"], ["mat-raised-button", "", "color", "primary", 1, "full-width", "buy-btn", 3, "click", "disabled"], ["diameter", "20", "mode", "indeterminate"], [1, "login-hint"], [1, "category-badge"], [1, "urgency"], [1, "ticket-type"], [1, "ticket-info"], [1, "ticket-price"], [1, "price-free"], [1, "availability"], ["appearance", "outline", 1, "qty-select"], [3, "ngModelChange", "ngModel"], [3, "value"], [1, "price"], [1, "ticket-type", "sold-out"], [1, "sold-out-badge"], ["mat-stroked-button", "", "color", "accent", 3, "click", "disabled"], ["diameter", "16", "mode", "indeterminate"], [1, "order-summary"], [1, "summary-line"], [1, "summary-total"], [1, "payment-method"], [1, "radio-group", 3, "ngModelChange", "ngModel"], ["routerLink", "/login"], ["routerLink", "/register"]], template: function EventDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, EventDetailComponent_Conditional_0_Template, 2, 0, "div", 0)(1, EventDetailComponent_Conditional_1_Template, 48, 23);
      }
      if (rf & 2) {
        \u0275\u0275conditional(0, ctx.loading ? 0 : ctx.event ? 1 : -1);
      }
    }, dependencies: [
      CommonModule,
      NgIf,
      CurrencyPipe,
      DatePipe,
      RouterLink,
      FormsModule,
      NgControlStatus,
      NgModel,
      MatButtonModule,
      MatButton,
      MatCardModule,
      MatCard,
      MatCardActions,
      MatCardContent,
      MatCardHeader,
      MatCardTitle,
      MatIconModule,
      MatIcon,
      MatProgressSpinnerModule,
      MatProgressSpinner,
      MatSnackBarModule,
      MatDividerModule,
      MatDivider,
      MatRadioModule,
      MatRadioGroup,
      MatRadioButton,
      MatSelectModule,
      MatFormField,
      MatLabel,
      MatSelect,
      MatOption,
      MatFormFieldModule
    ], styles: ["\n\n.event-banner[_ngcontent-%COMP%] {\n  height: 400px;\n  background-size: cover;\n  background-position: center;\n  position: relative;\n}\n.banner-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      to bottom,\n      rgba(0, 0, 0, 0.3),\n      rgba(0, 0, 0, 0.7));\n  display: flex;\n  align-items: flex-end;\n  padding-bottom: 32px;\n  color: white;\n}\n.banner-overlay[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 700;\n  margin: 8px 0;\n}\n.event-meta-list[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.event-meta-list[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.event-content[_ngcontent-%COMP%] {\n  padding: 32px 16px;\n}\n.event-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 380px;\n  gap: 32px;\n}\n@media (max-width: 900px) {\n  .event-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.ticket-card[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 80px;\n}\n.ticket-type[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  padding: 16px 0;\n}\n.ticket-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.ticket-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #616161;\n  font-size: 0.9rem;\n  margin: 4px 0;\n}\n.availability[_ngcontent-%COMP%] {\n  color: #757575;\n}\n.qty-select[_ngcontent-%COMP%] {\n  width: 100px;\n  margin-left: 16px;\n}\n.order-summary[_ngcontent-%COMP%] {\n  padding: 16px 0;\n}\n.summary-line[_ngcontent-%COMP%], .summary-total[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding: 4px 0;\n}\n.summary-total[_ngcontent-%COMP%] {\n  padding-top: 8px;\n}\n.payment-method[_ngcontent-%COMP%] {\n  padding: 16px 0;\n}\n.radio-group[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n}\n.buy-btn[_ngcontent-%COMP%] {\n  height: 48px;\n  font-size: 1rem;\n}\n.login-hint[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 0.9rem;\n  color: #757575;\n  margin-top: 8px;\n}\n.login-hint[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #6200ea;\n}\n.category-badge[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.2);\n  color: white;\n  padding: 4px 12px;\n  border-radius: 16px;\n  font-size: 0.85rem;\n}\n.social-proof-bar[_ngcontent-%COMP%] {\n  background: #1a1a2e;\n  color: white;\n  padding: 10px 24px;\n  display: flex;\n  gap: 24px;\n  flex-wrap: wrap;\n  font-size: 0.88rem;\n}\n.social-proof-bar[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.social-proof-bar[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n}\n.social-proof-bar[_ngcontent-%COMP%]   .urgency[_ngcontent-%COMP%] {\n  color: #ff6d00;\n  font-weight: 600;\n}\n.sold-out[_ngcontent-%COMP%] {\n  opacity: 0.7;\n}\n.sold-out-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  background: #e53935;\n  color: white;\n  font-size: 0.75rem;\n  padding: 2px 8px;\n  border-radius: 4px;\n  margin-top: 4px;\n}\n/*# sourceMappingURL=event-detail.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EventDetailComponent, { className: "EventDetailComponent", filePath: "src\\app\\features\\events\\event-detail\\event-detail.component.ts", lineNumber: 208 });
})();
export {
  EventDetailComponent
};
//# sourceMappingURL=chunk-KM4ZYNAW.js.map
