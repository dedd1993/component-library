import { Component, Element, h, Host, Prop, State } from '@stencil/core';
import { FormFieldState } from './ibk-form-field.enum';

@Component({
  tag: 'ibk-form-field',
  styleUrl: 'ibk-form-field.scss',
  shadow: false,
})
export class IbkFormField {

  @Prop() public state: FormFieldState;

  @Prop({ attribute: 'formControlError' }) public formControlError = false;

  @Prop({ attribute: 'formControlDisabled' }) public formControlDisabled = false;

  @Prop({ attribute: 'displayStateIcon' }) public displayStateIcon = false;

  @State() private isAnInputFormControl: boolean;

  @State() private isFocused = false;

  @Element() private element: HTMLElement;

  public componentDidLoad() {
    const formControl = this.element.querySelector('[slot="input"]');
    formControl.addEventListener('focusin', () => this.isFocused = true );
    formControl.addEventListener('focusout', () => this.isFocused = false );

    this.isAnInputFormControl = (formControl.tagName === 'INPUT') ;
  }

  public render() {
    return (
      <Host
        class={{
          'form-field': true,
          'form-field-focused': this.isFocused,
          'form-field-error': this.formControlError,
          'form-field-disabled': this.formControlDisabled,
          ...this.getFormFieldStatusClass(),
        }}
      >
        <slot name="label" />

        <div
          class={{
            'form-control': true,
            'form-control-input': this.isAnInputFormControl,
          }}
        >
          <slot name="prefix" />

          <slot name="input" />

          <slot name="suffix" />

          { this.displayStateIcon && <ibk-icon-v2 name={this.getStateIconName()}></ibk-icon-v2>}
        </div>

        <slot name="hint" />
      </Host>
    );
  }

  private getFormFieldStatusClass() {
    return this.state ? { [`form-field-${this.state}`]: true } : {};
  }

  private getStateIconName(): string {
    if (this.formControlError) {
      return 'warning';
    }

    switch (this.state) {
      case FormFieldState.informative:
        return 'informative';
      case FormFieldState.error:
        return 'warning';
      default:
        return;
    }
  }
}
