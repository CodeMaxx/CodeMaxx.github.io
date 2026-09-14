---
title: "The Windows Runtime Attestation Report API and package format"
layout: post
tags:
- Security
- Windows
- VBS
- Runtime Attestation
blog: true
description: "Calling GetRuntimeAttestationReport and parsing the returned Runtime Attestation Report package."
---

## Calling `GetRuntimeAttestationReport`

### The package size can change between calls

The API has one quirk worth knowing. You don't know how big the package is up
front, so you normally call it twice: once with a `NULL` buffer to learn the
size, then again with a buffer that big to fetch it. There's a wrinkle, though:
the package can grow between those two calls. A hotpatch could land, for
example, or the state for another requested report type could change.

If the second call still returns `ERROR_INSUFFICIENT_BUFFER`, resize the buffer
and try again. The companion sample wraps this in a retry loop and checks every
return value.

You can also pass a buffer you're confident is big enough in one call. That
trades some unused memory for one call instead of two and avoids the
grow-between-calls window. The report size is still dynamic, though, so don't
hardcode a fixed size. Check for `ERROR_INSUFFICIENT_BUFFER` and grow the buffer
if your initial guess is too small.
