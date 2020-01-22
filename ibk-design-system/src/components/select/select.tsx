import { Component, h, Host, Element, Prop, Event, EventEmitter, Watch } from '@stencil/core';

@Component({
  tag: 'ibk-select',
  styleUrl: 'select.scss',
  shadow: false
})
export class IbkSelect {
  private options: Array<HTMLOptionElement> = [];

  @Element() private element: HTMLElement;

  @Event({ bubbles: true, composed: true }) selectionChange: EventEmitter<any>;

  @Prop({ mutable: true, reflect: true }) value: any;

  @Prop({ mutable: false, reflect: true }) disabled = false;

  @Watch('value')
  valueChanged() {
    this.displayNewValueLabel();
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
        <div class="select-dropdown">
          <button class="select-dropdown__button" disabled={this.disabled} onClick={(e) => this.onClickAtDropdownInput(e)}>
            <span class="select-dropdown">Select Items</span>
            <i class="zmdi zmdi-chevron-down"></i>
          </button>
          <ul class="select-dropdown__list">
            {this.options.map((option) =>
              <li class="select-dropdown__list-item" data-value={option.value} onClick={() => this.onClickAnOption(option)}>{option.label}</li>
            )}
          </ul>
        </div>
      </Host>
    );
  }

  private onClickAtDropdownInput(e: Event) {
    e.preventDefault();
    this.toggleOptions();
  }

  private onClickAnOption(option: HTMLOptionElement) {
    if (this.value !== option.value) { // user clicks a new option
      this.value = option.value; // this will activate @Watch to display value at dropdown input
      this.selectionChange.emit(option.value);
    } else { // user clicks the current selected option
      this.toggleOptions();
    }
  }

  private toggleOptions() {
    this.element.querySelector('div ul').classList.toggle('active');
  }

  private displayNewValueLabel() {
    const selectedOption = this.options.find(o => o.value === this.value);
    if (selectedOption) {
      this.element.querySelector('div ul').classList.remove('active');
      this.element.querySelector('div button  span').textContent = selectedOption.label;
    }
  }
}
