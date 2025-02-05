
import { Directive, Input, computed, input, signal } from '@angular/core';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

type ButtonVariant = 'default' | 'correct' | 'incorrect';
type ButtonSize = 'medium' | 'large';

const buttonClassVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded cursor-pointer font-medium disabled:pointer-events-none outline-none focus-visible:shadow-focus focus-visible:ring-2 focus-visible:ring-blue-500',
  {
    variants: {
      variant: {
        default: 'hover:bg-gray-800 hover:border-gray-700',
        correct: 'bg-blue-500 text-white hover:bg-blue-600 focus-visible:bg-blue-600 focus-visible:bg-blue-600 active:bg-blue-700 disabled:bg-blue-200 dark:disabled:bg-blue-800',
        incorrect: 'bg-default text-alert-error border border-default shadow-subtle hover:border-strong active:bg-canvas disabled:text-disabled',
      },
      size: {
        medium: 'h-10 px-3 text-sm',
        large: 'h-12 px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
    },
  },
);

@Directive({
  selector: '[pb-button]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  }
})
export class AoButtonDirective {
  public readonly userClass = input<string>('', { alias: 'class' });

  protected _computedClass = computed(() =>
    twMerge(buttonClassVariants({ variant: this._variant(), size: this._size() }), this.userClass()),
  );

  private readonly _variant = signal<ButtonVariant>('default');
  @Input()
  set variant(variant: ButtonVariant) {
    this._variant.set(variant);
  }

  private readonly _size = signal<ButtonSize>('medium');
  @Input()
  set size(size: ButtonSize) {
    this._size.set(size);
  }
}

