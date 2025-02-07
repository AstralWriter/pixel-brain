import {Component, computed, input, signal} from '@angular/core';
import {cva, VariantProps} from "class-variance-authority";
import {twMerge} from 'tailwind-merge';

const optionVariant = cva(
  'flex gap-4 rounded-lg justify-center items-center p-4 h-16 text-white font-size-[18px] font-semibold cursor-pointer border',
  {
    variants: {
      variant: {
        default: 'bg-gray-900 border-gray-800 hover:bg-gray-800 hover:border-gray-700 disabled:opacity-50',
        selected: 'bg-blue-800 border-blue-700 bg-blue-800 border-blue-700 disabled:opacity-50',
        correct: 'bg-green-800 border-green-700 disabled:opacity-50',
        incorrect: 'bg-red-800 border-red-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);
type OptionVariants = VariantProps<typeof optionVariant>;

@Component({
  selector: 'pb-option',
  standalone: true,
  imports: [],
  template: `
    <button class="flex justify-between items-center w-full text-[18px] font-semibold">
      <div class="flex w-8 h-8 justify-center items-center bg-gray-600 rounded-full">
        {{ questionNumber() }}
      </div>
      <div class="flex-1 flex justify-center items-center text-center">
        {{ question() }}
      </div>
    </button>
  `,
  host: {
    '[class]': '_computedClass()',
  },
  styleUrl: './option.component.less'
})
export class OptionComponent {
  public readonly userClass = input<string>('', { alias: 'class' });
  public readonly question = input.required<string>();
  public readonly questionNumber = input.required<string>();

  protected _computedClass = computed(() =>
    twMerge(optionVariant({ variant: this.variant() }), this.userClass()),
  );

  readonly variant = input<OptionVariants['variant']>('default');
}
