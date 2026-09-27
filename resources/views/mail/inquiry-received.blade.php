<x-mail::message>
# New {{ $inquiry->type->label() }}

**Name:** {{ $inquiry->name }}<br>
**Email:** {{ $inquiry->email }}<br>
@if ($inquiry->phone)
**Phone:** {{ $inquiry->phone }}<br>
@endif
@foreach ($inquiry->details ?? [] as $label => $value)
**{{ $label }}:** {{ $value }}<br>
@endforeach

@if ($inquiry->message)
<x-mail::panel>
{{ $inquiry->message }}
</x-mail::panel>
@endif

@if ($inquiry->attachment_path)
The applicant's resume is attached to this email.
@endif

Reply directly to this email to respond to {{ $inquiry->name }}.
</x-mail::message>
