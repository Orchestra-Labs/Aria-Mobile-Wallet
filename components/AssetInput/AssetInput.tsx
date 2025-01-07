import { cn, getRegexForDecimals } from '@/helpers/utils';
import { Asset } from '@/types';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { GREATER_EXPONENT_DEFAULT } from '@/constants';
import { formatNumberWithCommas, stripNonNumerics } from '@/helpers';
import { Input } from '@/ui-kit';
import { AssetSelectDialog } from '../AssetSelectDialog';

interface AssetInputProps {
  isDisabled?: boolean;
  placeholder: string;
  variant?: 'send' | 'receive' | 'stake';
  assetState: Asset | null;
  amountState: number;
  reducedHeight?: boolean;
  includeBottomMargin?: boolean;
  labelWidth?: string;
  updateAsset?: (newAsset: Asset, propagateChanges?: boolean) => void;
  updateAmount: (newAmount: number, propagateChanges?: boolean) => void;
}

export const AssetInput: React.FC<AssetInputProps> = ({
  isDisabled = false,
  placeholder = '',
  variant = 'stake',
  assetState,
  amountState,
  reducedHeight = false,
  includeBottomMargin = true,
  labelWidth,
  updateAsset,
  updateAmount,
}) => {
  const [localInputValue, setLocalInputValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const prevValueRef = useRef<string>('');
  const currentAsset = assetState;
  const currentExponent = currentAsset?.exponent ?? GREATER_EXPONENT_DEFAULT;

  const onAmountValueChange = (value: number) => {
    const roundedValue = parseFloat(value.toFixed(currentExponent));
    updateAmount(roundedValue, true); // Propagate the change
  };

  useEffect(() => {
    if (!isNaN(amountState) && amountState !== null && amountState !== 0) {
      const formattedNumber = formatNumberWithCommas(amountState || 0);
      setLocalInputValue(formattedNumber);
    } else {
      setLocalInputValue('');
    }
  }, [amountState]);

  // Handle user input change, strip non-numerics, add the new character, and reformat
  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const caretPosition = event.target.selectionStart || 0;
    const regex = getRegexForDecimals(currentExponent);

    // Remove commas and non-numeric characters for accurate processing
    const rawValue = stripNonNumerics(inputValue);

    // Split the input into the integer and decimal parts
    const [integerPart, decimalPart] = rawValue.split('.');

    // Check if decimal part exceeds 6 digits and truncate if necessary
    let processedValue = rawValue;
    if (decimalPart && decimalPart.length > currentExponent) {
      processedValue = `${integerPart}.${decimalPart.slice(0, currentExponent)}`;
    }

    const numericValue = parseFloat(processedValue);

    if (!isNaN(numericValue) || !regex.test(inputValue) || inputValue === '') {
      onAmountValueChange(numericValue);
    } else {
      onAmountValueChange(0);
    }

    // Update the input with the formatted value
    const formattedValue = formatNumberWithCommas(processedValue || 0);
    setLocalInputValue(formattedValue);

    const previousRawValue = stripNonNumerics(prevValueRef.current);
    const previousFormattedValue = formatNumberWithCommas(
      parseFloat(previousRawValue),
    );

    // Reposition the caret
    setTimeout(() => {
      if (inputRef.current) {
        // Compare the previous value with the new one to determine if it's an addition or removal
        let characterWasAdded = false;
        if (rawValue.length > previousRawValue.length) {
          characterWasAdded = true;
        } else if (rawValue.length < previousRawValue.length) {
          characterWasAdded = false;
        } else {
          characterWasAdded = false;
        }

        let newCaretPosition = caretPosition;
        if (characterWasAdded) {
          if (formattedValue.length - rawValue.length > 1) {
            newCaretPosition += 1;
          } else if (
            rawValue.length > previousFormattedValue.length &&
            formattedValue.length !== rawValue.length
          ) {
            newCaretPosition += 1;
          }
        } else if (!characterWasAdded) {
          if (previousFormattedValue.length - formattedValue.length > 1) {
            newCaretPosition -= 1;
          } else if (formattedValue.length === previousRawValue.length) {
            // Do nothing
          }
        }

        prevValueRef.current = processedValue;

        // Ensure caret assignment happens after the DOM is updated
        setTimeout(() => {
          inputRef.current?.setSelectionRange(
            newCaretPosition,
            newCaretPosition,
          );
        }, 0);
      }
    }, 0);
  };

  // Handle formatting the input when the user finishes typing (on blur)
  const handleBlur = () => {
    const value = parseFloat(stripNonNumerics(localInputValue));

    if (!isNaN(value)) {
      setLocalInputValue(formatNumberWithCommas(value));
    }
  };

  return (
    <div
      className={cn(
        variant === 'stake'
          ? ''
          : `flex items-center ${includeBottomMargin ? 'mb-4' : ''} space-x-2`,
      )}
    >
      {variant !== 'stake' && (
        <label
          className={cn(
            `text-sm text-neutral-1 whitespace-nowrap ${labelWidth}`,
          )}
        >
          {variant === 'receive' ? 'Receiving:' : 'Sending:'}
        </label>
      )}
      <div className="flex-grow">
        <Input
          variant="primary"
          type="text"
          ref={inputRef}
          placeholder={placeholder}
          step={currentExponent}
          value={localInputValue || ''}
          onChange={handleAmountChange}
          onBlur={handleBlur}
          disabled={isDisabled}
          icon={
            updateAsset ? (
              <AssetSelectDialog
                isReceiveDialog={variant === 'receive'}
                onClick={updateAsset}
              />
            ) : null
          }
          reducedHeight={reducedHeight}
          className={cn(
            variant === 'stake'
              ? 'text-white mx-2'
              : 'text-white border border-neutral-2 rounded-md w-full h-10',
          )}
        />
      </div>
    </div>
  );
};
