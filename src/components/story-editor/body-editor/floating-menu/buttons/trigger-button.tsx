import { HiPlus } from 'react-icons/hi2';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import type { ButtonProps } from '@/components/ui/button';

type TriggerButtonProps = ButtonProps & {
    open: boolean;
};

export default function TriggerButton({
    open,
    onClick,
    ...props
}: TriggerButtonProps) {
    return (
        <Button
            onClick={onClick}
            variant="outline-ghost"
            size="icon"
            {...props}
            title={
                open
                    ? 'Закрыть меню'
                    : 'Добавить блок кода, изображение или новую часть...'
            }
            className={cn('duration-50 transition-transform', {
                'rotate-45': open,
            })}
        >
            <HiPlus className="w-5 h-5" />
        </Button>
    );
}
