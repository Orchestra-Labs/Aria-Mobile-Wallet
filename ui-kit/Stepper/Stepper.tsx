import { ClassValue } from 'clsx';
import React, { Children } from 'react';

import { cn } from '@/helpers/utils';

type StepperProps = {
  children: React.ReactNode;
  active: number;
  containerClass?: ClassValue | string;
  progressBarClass?: ClassValue | string;
  labels: string[];
};

export const Stepper: React.FC<StepperProps> = ({
  children,
  active,
  containerClass,
  progressBarClass,
  labels,
}) => {
  const childrenArray = Children.toArray(children);
  const steps = childrenArray.filter((item) => {
    if (React.isValidElement(item)) {
      return !item.props['data-hidden'];
    }

    return false;
  });

  return (
    <div
      className={cn(
        'flex items-center flex-col',
        containerClass as ClassValue | string,
      )}
    >
      {active < steps.length && (
        <ol
          className={cn(
            'flex items-center w-full mb-2',
            progressBarClass as ClassValue | string,
          )}
        >
          {steps.map((_, index) => {
            const lastElement = index === steps.length - 1;
            return (
              <li
                key={`step-${index}`}
                className={cn(
                  'flex items-center w-full relative text-indigo-600',
                  'last:w-auto',
                )}
              >
                {!lastElement && (
                  <div
                    className={cn(
                      'absolute top-[15px] left-[67px] right-[-12px] h-1.5 bg-neutral-2 inline-block rounded-full',
                      active > index && 'not-last:after:bg-blue',
                    )}
                  />
                )}
                <div
                  className={cn(
                    'whitespace-nowrap max-w-20 w-full z-10 flex flex-col items-center text-white',
                    active >= index && 'text-blue',
                  )}
                >
                  <span
                    className={cn(
                      'w-7 h-7 bg-neutral-2 rounded-full flex justify-center items-center text-sm text-white',
                      active === index &&
                        'border border-blue text-blue bg-transparent',
                      active > index && 'bg-blue text-black',
                    )}
                  >
                    {index + 1}
                  </span>{' '}
                  <p className={cn('mt-2 text-xs text-nowrap')}>
                    {labels[index]}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      )}
      {childrenArray[active]}
    </div>
  );
};
