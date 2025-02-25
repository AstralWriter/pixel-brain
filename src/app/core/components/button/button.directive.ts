import { Directive, computed, input } from '@angular/core';
import { cva, VariantProps} from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const buttonClassVariants = cva(
  'flex gap-4 rounded-lg justify-center items-center p-4 h-16 text-white font-size-[18px] font-semibold border',
  {
    variants: {
      variant: {
        default: 'bg-gray-900 border-gray-800 enabled:hover:bg-gray-800 enabled:hover:border-gray-700 disabled:opacity-50',
        cta: 'bg-white border-gray-100 text-gray-950 hover:bg-gray-300 hover:border-gray-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);
type ButtonVariants = VariantProps<typeof buttonClassVariants>;

@Directive({
  selector: '[pb-button]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class PbButtonDirective {
  public readonly userClass = input<string>('', { alias: 'class' });

  protected _computedClass = computed(() =>
    twMerge(buttonClassVariants({ variant: this.variant() }), this.userClass()),
  );

  readonly variant = input<ButtonVariants['variant']>('default');
}
