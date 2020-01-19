import { Component, h, Host, Element, Prop } from '@stencil/core';

@Component({
  tag: 'ibk-select',
  styleUrl: 'select.scss',
  shadow: false
})
export class IbkSelect {
  @Element() private element: HTMLElement;
  @Prop({ mutable: true, reflect: true }) value;

  private options: Array<HTMLOptionElement> = [];

  componentWillLoad() {
    this.options = Array.from(this.element.getElementsByTagName('option'));
    this.element.querySelectorAll('option').forEach(n => n.remove());
  }

  componentDidLoad() {
    this.selectAnOptionFromHost();
  }

  componentDidUpdate() {
    this.selectAnOptionFromHost();
  }

  render() {
    return (
      <Host
        class={{
          'select': true
        }}
      >
        <div class="select-dropdown">
          <button class="select-dropdown__button" onClick={(e) => this.toggleOptions(e)}>
            <span class="select-dropdown">Select Items</span>
            <i class="zmdi zmdi-chevron-down"></i>
          </button>
          <ul class="select-dropdown__list">
            {this.options.map((option) =>
              <li class="select-dropdown__list-item" data-value={option.value} onClick={() => this.selectAnOption(option)}>{option.label}</li>
            )}
          </ul>
        </div>
      </Host>
    );
  }

  private toggleOptions(e: Event) {
    e.preventDefault();
    this.element.querySelector('div ul').classList.toggle('active');
  }

  private selectAnOption(option: HTMLOptionElement) {
    this.element.querySelector('div ul').classList.remove('active');
    this.element.querySelector('div button span').textContent = option.label;
    this.value = option.value;
  }

  private selectAnOptionFromHost() {
    const selectedOption = this.options.find(o => o.value === this.value);
    if (selectedOption) {
      this.selectAnOption(selectedOption);
    }
  }
}
