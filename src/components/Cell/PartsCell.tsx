import { IcEditLine } from '@yourssu/design-system-react';
import { GenericDialog } from '@/components/dialog/GenericDialog.tsx';
import { PropsWithChildren } from 'react';
import {
  StyledContainer,
  StyledEditIcon,
} from '@/components/Cell/Cell.style.ts';
import { Tooltip } from '@/components/Tooltip/Tooltip.tsx';
import { useElementWidth } from '@/hooks/useElementWidth.ts';
import { useSuspenseQuery } from '@tanstack/react-query';
import { partOptions } from '@/query/part/options.ts';

interface PartsCellProps extends PropsWithChildren {
  onSelect: (value: string) => void;
  tooltipContent: string;
}

const PartsCell = ({ tooltipContent, children, onSelect }: PartsCellProps) => {
  const { data: parts } = useSuspenseQuery(partOptions());
  const options = parts.map((part) => ({ label: part.partName }));
  const { width, ref } = useElementWidth();

  return (
    <GenericDialog width={width} options={options} onSelect={onSelect}>
      {(triggerProps) => (
        <StyledContainer $bold={false} $editable={true} ref={ref}>
          {children}
          <StyledEditIcon {...triggerProps}>
            <Tooltip content={tooltipContent}>
              <IcEditLine width={20} height={20} />
            </Tooltip>
          </StyledEditIcon>
        </StyledContainer>
      )}
    </GenericDialog>
  );
};

export default PartsCell;
