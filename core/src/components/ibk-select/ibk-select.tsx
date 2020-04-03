import { Component, Element, Event, EventEmitter, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';

const ARROW_UP = 38;
const ARROW_DOWN = 40;
const ENTER_KEYCODE = 13;

@Component({
  tag: 'ibk-select',
  styleUrl: 'ibk-select.scss',
  shadow: false,
  scoped: true,
})
export class IbkSelect {
  @Prop({ mutable: true, reflect: true }) public value: any;
  @Prop({ mutable: false, reflect: true }) public placeholder: string;
  @Prop({ mutable: false, reflect: true }) public disabled = false;
  @Event({ bubbles: true, composed: true }) public openedChange: EventEmitter<boolean>;
  @Event({ bubbles: true, composed: true }) public selectionChange: EventEmitter<any>;
  @Element() private element: HTMLElement;
  @State() private overlayPanelUp = false;
  private panelOpen = false;
  private formControlValue: string;

  @Watch('value')
  public valueChanged(v) {
    const optionsArray = Array.from(this.ibkOptionsElementList);
    optionsArray.map((option) => {
      if (option.value === v) {
        this.formControlValue = option.textContent;
        option.setAttribute('selected', '');
      } else {
        option.removeAttribute('selected');
      }
    });
  }

  @Listen('scroll', { target: 'window' })
  public handleScroll() {
    this.validatePositionSelector();
  }

  @Method('optionSelected')
  public async optionSelected(v) {
    if (this.value !== v) {
      this.value = v;
      this.selectionChange.emit(v);
    }
    this.closeOverlayPanel();
  }

  public componentWillLoad() {
    const optionsArray = Array.from(this.ibkOptionsElementList);
    const selectedOption = optionsArray.find((o) => (o.value === this.value && !o.disabled));
    if (selectedOption) {
      selectedOption.setAttribute('selected', '');
    }

    this.element.addEventListener('focusin', (e) => {
      if (this.disabled) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    });
  }

  public render() {
    return (
      <Host
        class={{
          select: true,
        }}
        onKeyDown={(e) => !this.disabled && this.onKeyDownDropdownInput(e)}
        onBlur={(e) => this.onBlurDropdownInput(e)}
        tabIndex={ this.disabled ? -1 : 0 }
      >
        <div
          class={{
            'form-control': true,
            'form-control--disabled': this.disabled,
          }}
          onClick={(e) => !this.disabled && this.onClickAtDropdownInput(e)}
        >
          <span class={{ placeholder : !this.formControlValue }}>
            { this.formControlValue || this.placeholder }
          </span>
          <ibk-icon-v2 name="arrow-down"></ibk-icon-v2>
        </div>
        <ul
          class={{
            'overlay-panel': true,
            'overlay-panel--up': this.overlayPanelUp,
          }}
        >
          <slot />
        </ul>
      </Host>
    );
  }

  private get ibkOptionsElementList() {
    return this.element.querySelectorAll('ibk-option');
  }

  private onKeyDownDropdownInput(e: KeyboardEvent) {
    e.stopPropagation();
    switch (e.which) {
      case ENTER_KEYCODE:
        if (this.panelOpen === true) {
          if (this.ibkOptionsElementList.length > 0) {
            const currentOptionHovered: any = this.element.querySelector('.key-hover');
            this.optionSelected((currentOptionHovered).value);
          } else {
            this.closeOverlayPanel();
          }
        } else {
          this.openOverlayPanel();
        }
        break;
      case ARROW_UP:
        e.preventDefault();
        if (this.ibkOptionsElementList.length > 0) {
          this.setNextOptionWithKeyHover(true);
        }
        break;
      case ARROW_DOWN:
        e.preventDefault();
        if (this.ibkOptionsElementList.length > 0) {
          this.setNextOptionWithKeyHover(false);
        }
        break;
      default:
        break;
    }
  }

  private onClickAtDropdownInput(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.toogleOverlayPanel();
  }

  private onBlurDropdownInput(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.closeOverlayPanel();
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
    this.setKeyHoverAtOpeningOverlay();
  }

  private closeOverlayPanel() {
    if (this.panelOpen === true) {
      this.panelOpen = false;
      this.openedChange.emit(false);
    }
    this.element.classList.remove('active');
  }

  private setKeyHoverAtOpeningOverlay() {
    if (this.ibkOptionsElementList.length > 0 ) {
      Array.from(this.ibkOptionsElementList).map((o) => o.classList.remove('key-hover'));
      const currentOptionSelected = this.element.querySelector('ibk-option[selected]');

      if (currentOptionSelected) {
        currentOptionSelected.classList.add('key-hover');
      } else {
        const firstOption = this.element.querySelector('ibk-option');
        firstOption.classList.add('key-hover');
      }
    }
  }

  private setNextOptionWithKeyHover(prev: boolean) {
    const currentOptionWithKeyHover = this.element.querySelector('ibk-option.key-hover');
    let newOptionWithKeyHover: Element;
    let firstIteration = true;
    let optionFound = false;

    do {
      const optionInspected = firstIteration ? currentOptionWithKeyHover : newOptionWithKeyHover;
      newOptionWithKeyHover = prev ? optionInspected.previousElementSibling : optionInspected.nextElementSibling;

      if (newOptionWithKeyHover) {
        optionFound = !newOptionWithKeyHover.hasAttribute('disabled');
      }
      firstIteration = false;

    } while (optionFound === false && newOptionWithKeyHover !== null);

    if (optionFound) {
      currentOptionWithKeyHover.classList.remove('key-hover');
      newOptionWithKeyHover.classList.add('key-hover');
    }
  }

  private validatePositionSelector() {
    const windowHeight = window.innerHeight;
    const minItems = 4;
    const customSelectHeight = 36;
    const ibkOptionsElementsNumber = this.ibkOptionsElementList.length;
    const items = ibkOptionsElementsNumber >= minItems ? minItems : ibkOptionsElementsNumber;
    const menuHeight = this.element.getBoundingClientRect().height;
    let itemsLength: number;
    let instOffsetWithMenu: number;

    itemsLength = items * customSelectHeight;
    instOffsetWithMenu = this.element.getBoundingClientRect().bottom + menuHeight + itemsLength;
    this.overlayPanelUp = instOffsetWithMenu >= windowHeight;
  }

}
