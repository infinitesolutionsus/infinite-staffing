@props(['url'])
<tr>
<td class="header">
<table class="header-inner" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
<tr>
<td class="header-logo" align="left" valign="middle">
<a href="{{ $url }}" style="display: inline-block;">
<img src="{{ asset('images/logo.png') }}" class="logo" width="90" alt="{{ config('app.name') }}">
</a>
</td>
<td class="header-tagline" align="right" valign="middle">
<p class="tagline">Supplying Excellence,<br>Growing Expertise</p>
</td>
</tr>
</table>
</td>
</tr>
