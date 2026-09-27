import { CircleCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

type CheckListProps = {
    items: string[];
    tone?: 'light' | 'dark';
    className?: string;
};

export default function CheckList({
    items,
    tone = 'light',
    className,
}: CheckListProps) {
    return (
        <ul className={cn('grid gap-3', className)}>
            {items.map((item) => (
                <li key={item} className="flex gap-3">
                    <CircleCheck
                        className={cn(
                            'mt-0.5 size-5 shrink-0',
                            tone === 'light'
                                ? 'text-brand-500'
                                : 'text-brand-300',
                        )}
                    />
                    <span
                        className={cn(
                            'leading-relaxed',
                            tone === 'light'
                                ? 'text-slate-700'
                                : 'text-slate-200',
                        )}
                    >
                        {item}
                    </span>
                </li>
            ))}
        </ul>
    );
}
