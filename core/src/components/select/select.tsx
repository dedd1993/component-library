import { Component, Element, Event, EventEmitter, h, Host, Listen, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'ibk-select',
  styleUrl: 'select.scss',
  shadow: false,
  scoped: true
})
export class IbkSelect {
  private options: Array<HTMLOptionElement> = [];

  panelOpen = false;

  formControlValue: string;

  @Element() private element: HTMLElement;

  @Event({ bubbles: true, composed: true }) openedChange: EventEmitter<boolean>

  @Event({ bubbles: true, composed: true }) selectionChange: EventEmitter<any>;

  @Prop({ mutable: true, reflect: true }) value: any;

  @Prop({ mutable: false, reflect: true }) placeholder: string;

  @Prop({ mutable: false, reflect: true }) disabled = false;

  @Watch('value')
  valueChanged() {
    this.displayNewValueLabel();
  }

  @Listen('click', { target: 'window' })
  public click(event: Event) {
    if (this.panelOpen === true) {
      event.preventDefault();
      event.stopPropagation();
      this.closeOverlayPanel();
    }
  }

  componentWillLoad() {
    this.options = Array.from(this.element.getElementsByTagName('option'));
    this.element.querySelectorAll('option').forEach(n => n.remove());
  }

  componentDidLoad() {
    this.displayNewValueLabel();
  }

  render() {
    return (
      <Host
        class={{
          'select': true
        }}
      >
        <button class="select__button" disabled={this.disabled} onClick={(e) => this.onClickAtDropdownInput(e)}>
          <span class={{ 'placeholder': !this.formControlValue }}>
            { this.formControlValue || this.placeholder }
          </span>
          <ibk-icon name="arrow-down"></ibk-icon>
        </button>
        <ul class="select__list">
          {this.options.map((option) =>
            <li class="select__list-item" data-value={option.value} onClick={(e) => this.onClickAnOption(e, option)}>{option.label}</li>
          )}
        </ul>
      </Host>
    );
  }

  private onClickAtDropdownInput(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    if (this.panelOpen === true) {
      this.closeOverlayPanel();
    } else {
      this.openOverlayPanel();
    }
  }

  private onClickAnOption(e: Event, option: HTMLOptionElement) {
    e.preventDefault();
    e.stopPropagation();
    if (this.value !== option.value) { // user clicks a new option
      this.value = option.value; // this will activate @Watch to display value at dropdown input
      this.selectionChange.emit(option.value);
    } else { // user clicks the current selected option
      this.closeOverlayPanel();
    }
  }

  private openOverlayPanel() {
    this.panelOpen = true;
    this.openedChange.emit(true);
    this.element.classList.add('active');
  }

  private closeOverlayPanel() {
    if (this.panelOpen === true) {
      this.panelOpen = false;
      this.openedChange.emit(false);
    }
    this.element.classList.remove('active');
  }

  private displayNewValueLabel() {
    const selectedOption = this.options.find(o => o.value === this.value);

    if (selectedOption) {
      this.closeOverlayPanel();
      this.formControlValue = selectedOption.label;
    } else {
      this.formControlValue = null;
    }
  }
}
