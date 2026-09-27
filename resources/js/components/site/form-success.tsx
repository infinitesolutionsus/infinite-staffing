import { CircleCheck } from 'lucide-react';

export default function FormSuccess({
    title,
    message,
}: {
    title: string;
    message: string;
}) {
    return (
        <div
            role="status"
            className="flex gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5"
        >
            <CircleCheck className="size-6 shrink-0 text-emerald-600" />
            <div>
                <p className="font-semibold text-emerald-900">{title}</p>
                <p className="mt-1 text-sm text-emerald-800">{message}</p>
            </div>
        </div>
    );
}
