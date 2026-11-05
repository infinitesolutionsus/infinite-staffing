<x-mail::layout>
{{-- Header --}}
<x-slot:header>
<x-mail::header :url="config('app.url')">
{{ config('app.name') }}
</x-mail::header>
</x-slot:header>

{{-- Body --}}
{!! $slot !!}

{{-- Subcopy --}}
@isset($subcopy)
<x-slot:subcopy>
<x-mail::subcopy>
{!! $subcopy !!}
</x-mail::subcopy>
</x-slot:subcopy>
@endisset

{{-- Footer --}}
<x-slot:footer>
<x-mail::footer>
**Infinite Staffing Solutions**<br>
4325 Glencoe Ave Ste C9 9330, Marina Del Rey, CA 90292<br>
[(323) 252-8741](tel:+13232528741) · [info@infinitestaffingsolutions.com](mailto:info@infinitestaffingsolutions.com)

© {{ date('Y') }} Infinite Staffing Solutions. {{ __('All rights reserved.') }}
</x-mail::footer>
</x-slot:footer>
</x-mail::layout>
