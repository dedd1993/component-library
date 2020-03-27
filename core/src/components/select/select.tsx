import { Component, Element, Event, EventEmitter, h, Host, Listen, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'ibk-select',
  styleUrl: 'ibk-select.scss',
  shadow: false,
  scoped: true,
})
export class IbkSelect {

  @Event({ bubbles: true, composed: true }) public openedChange: EventEmitter<boolean>;

  @Event({ bubbles: true, composed: true }) public selectionChange: EventEmitter<any>;

  @Prop({ mutable: true, reflect: true }) public value: any;

  @Prop({ mutable: false, reflect: true }) public placeholder: string;

  @Prop({ mutable: false, reflect: true }) public disabled = false;

  @Element() private element: HTMLElement;

  private options: HTMLOptionElement[] = [];

  private panelOpen = false;

  private formControlValue: string;

  @Watch('value')
  public valueChanged() {
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

  public componentWillLoad() {
    this.options = Array.from(this.element.getElementsByTagName('option'));
    this.element.querySelectorAll('option').forEach((n) => n.remove());

    this.element.addEventListener('focusin', (e) => {
      if (this.disabled) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    });
  }

  public componentDidLoad() {
    this.displayNewValueLabel();
  }

  public render() {
    return (
      <Host
        class={{
          select: true,
        }}
      >
        <div
          class={{
            'select__button': true,
            'select__button--disabled': this.disabled,
          }}
          onKeyDown={(e) => !this.disabled && this.onKeyDownDropdownInput(e)}
          onClick={(e) => !this.disabled && this.onClickAtDropdownInput(e)}
          tabIndex={ this.disabled ? -1 : 0 }
        >
          <span class={{ placeholder : !this.formControlValue }}>
            { this.formControlValue || this.placeholder }
          </span>
          <ibk-icon-v2 name="arrow-down"></ibk-icon-v2>
        </div>
        <ul class="select__list">
          {this.options.map((option) => (
            <li
              class="select__list-item"
              data-value={option.value}
              onClick={(e) => this.onClickAnOption(e, option)}>
              {option.label}
            </li>
          ))}
        </ul>
      </Host>
    );
  }

  private onKeyDownDropdownInput(e: KeyboardEvent) {
    e.stopPropagation();
    if (e.which === 13) {
      this.toogleOverlayPanel();
    }
  }

  private onClickAtDropdownInput(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.toogleOverlayPanel();
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

  private toogleOverlayPanel() {
    if (this.panelOpen === true) {
      this.closeOverlayPanel();
    } else {
      this.openOverlayPanel();
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
    const selectedOption = this.options.find((o) => o.value === this.value);

    if (selectedOption) {
      this.closeOverlayPanel();
      this.formControlValue = selectedOption.label;
    } else {
      this.formControlValue = null;
    }
  }

}
