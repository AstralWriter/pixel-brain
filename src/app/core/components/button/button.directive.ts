import { Directive, Input, computed, input, signal } from '@angular/core';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

type ButtonVariant = 'default' | 'cta';

const buttonClassVariants = cva(
  'flex gap-4 rounded-lg justify-center items-center p-4 m-6 absolute left-0 h-16 text-white font-size-[18px] font-semibold',
  {
    variants: {
      variant: {
        default: 'bg-gray-900 b-gray-800 hover:bg-gray-800 hover:border-gray-700 disabled:opacity-50',
        cta: 'bg-white b-gray-100 text-gray-950 hover:bg-gray-300 hover:b-gray-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

@Directive({
  selector: '[app-button]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  }
})
export class PbButtonDirective {
  public readonly userClass = input<string>('', { alias: 'class' });

  protected _computedClass = computed(() =>
    twMerge(buttonClassVariants({ variant: this._variant() }), this.userClass()),
  );

  private readonly _variant = signal<ButtonVariant>('default');
  @Input()
  set variant(variant: ButtonVariant) {
    this._variant.set(variant);
  }
}

