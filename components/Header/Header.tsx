import { Position, ROUTES } from '@/constants';
import { ArrowLeft, X } from 'lucide-react';
import React from 'react';
import { Separator } from '../../ui-kit/Separator';
import { Tooltip } from '../Tooltip/Tooltip';
import { Link } from 'expo-router';

interface HeaderProps {
  title: string;
  onClose?: () => void;
  useArrow?: boolean;
  showTooltip?: boolean;
  tooltipText?: string;
  tooltipPosition?: Position;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onClose = () => {},
  useArrow = false,
  showTooltip = false,
  tooltipText = '',
  tooltipPosition = Position.TOP,
}) => {
  return (
    <>
      <div className="flex justify-between items-center w-full p-5">
        <Link
          href={ROUTES.APP.ROOT}
          className="flex items-center justify-center max-w-5 max-h-5 p-0.5"
          onClick={onClose}
        >
          {useArrow ? (
            <ArrowLeft className="w-full h-full text-white" />
          ) : (
            <X className="w-full h-full text-white" />
          )}
        </Link>

        {showTooltip ? (
          <Tooltip tooltipText={tooltipText} position={tooltipPosition}>
            <h1 className="text-h5 text-white font-bold">{title}</h1>
          </Tooltip>
        ) : (
          <h1 className="text-h5 text-white font-bold">{title}</h1>
        )}

        <div className="max-w-5 w-full max-h-5" />
      </div>

      <Separator />
    </>
  );
};
