import type { ReactNode } from 'react';
import InputError from '@/components/input-error';
import { cn } from '@/lib/utils';

export const inputClassName =
    'block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-navy-950 shadow-xs transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 focus:outline-none aria-invalid:border-red-400 sm:text-sm';

type FormFieldProps = {
    label: string;
    htmlFor?: string;
    required?: boolean;
    error?: string;
    hint?: string;
    className?: string;
    children: ReactNode;
};

export default function FormField({
    label,
    htmlFor,
    required = false,
    error,
    hint,
    className,
    children,
}: FormFieldProps) {
    return (
        <div className={cn('grid content-start gap-2', className)}>
            <label
                htmlFor={htmlFor}
                className="text-sm font-semibold text-navy-950"
            >
                {label}
                {required && <span className="ml-0.5 text-brand-600">*</span>}
            </label>
            {children}
            {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
            <InputError message={error} />
        </div>
    );
}

export const fileInputClassName =
    'block w-full rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3 text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-brand-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-brand-600';

type ChoiceOption = { value: string; label: string };

function toChoiceOption(option: string | ChoiceOption): ChoiceOption {
    return typeof option === 'string'
        ? { value: option, label: option }
        : option;
}

export function CheckboxGroup({
    name,
    options,
    requireOne = false,
    className,
}: {
    name: string;
    options: (string | ChoiceOption)[];
    requireOne?: boolean;
    className?: string;
}) {
    return (
        <div
            data-require-one={requireOne || undefined}
            className={cn('grid gap-2 sm:grid-cols-2', className)}
        >
            {options.map(toChoiceOption).map((option) => (
                <label
                    key={option.value}
                    className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-700 transition hover:border-brand-300 has-checked:border-brand-500 has-checked:bg-brand-50"
                >
                    <input
                        type="checkbox"
                        name={name}
                        value={option.value}
                        className="mt-0.5 size-4 shrink-0 accent-brand-500"
                    />
                    {option.label}
                </label>
            ))}
        </div>
    );
}

export function RadioGroup({
    name,
    options,
    defaultValue,
    required = false,
    onValueChange,
}: {
    name: string;
    options: (string | ChoiceOption)[];
    defaultValue?: string;
    required?: boolean;
    onValueChange?: (value: string) => void;
}) {
    return (
        <div className="flex flex-wrap gap-2">
            {options.map(toChoiceOption).map((option) => (
                <label
                    key={option.value}
                    className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-300 has-checked:border-brand-500 has-checked:bg-brand-50 has-checked:text-brand-800"
                >
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        required={required}
                        defaultChecked={option.value === defaultValue}
                        onChange={(event) =>
                            onValueChange?.(event.currentTarget.value)
                        }
                        className="accent-brand-500"
                    />
                    {option.label}
                </label>
            ))}
        </div>
    );
}

export const yesNoOptions: ChoiceOption[] = [
    { value: '1', label: 'Yes' },
    { value: '0', label: 'No' },
];

export function AgreementCheckbox({
    name,
    error,
    children,
}: {
    name: string;
    error?: string;
    children: ReactNode;
}) {
    return (
        <div className="grid gap-2">
            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-700 transition hover:border-brand-300 has-checked:border-brand-500 has-checked:bg-brand-50">
                <input
                    type="checkbox"
                    name={name}
                    value="1"
                    required
                    className="mt-0.5 size-4 shrink-0 accent-brand-500"
                />
                <span>{children}</span>
            </label>
            <InputError message={error} />
        </div>
    );
}
