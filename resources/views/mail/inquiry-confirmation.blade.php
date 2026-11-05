<x-mail::message>
# Thanks for reaching out, {{ $inquiry->name }}!

We've received your message and a member of our team will get back to you shortly.

Here's a copy of what you sent:

@foreach ($inquiry->details ?? [] as $label => $value)
**{{ $label }}:** {{ $value }}<br>
@endforeach
@if ($inquiry->phone)
**Phone:** {{ $inquiry->phone }}<br>
@endif

@if ($inquiry->message)
<x-mail::panel>
{{ $inquiry->message }}
</x-mail::panel>
@endif

Need to add anything? Just reply to this email.<br>
Or call us at [(323) 252-8741](tel:+13232528741).

Thanks,<br>
The Infinite Staffing Solutions Team
</x-mail::message>
