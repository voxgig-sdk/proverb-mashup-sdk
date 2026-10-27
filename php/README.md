# ProverbMashup PHP SDK



The PHP SDK for the ProverbMashup API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Mashup()` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/proverb-mashup-sdk/tags)), or
from a clone as a Composer path repository:

```bash
git clone https://github.com/voxgig-sdk/proverb-mashup-sdk
composer config repositories.proverb-mashup-sdk path ./proverb-mashup-sdk/php
composer require voxgig-sdk/proverb-mashup-sdk:@dev
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'proverbmashup_sdk.php';

$client = new ProverbMashupSDK();
```

### 3. Load a mashup

```php
try {
    // load() returns the ENTITY — call data_get() for the Mashup record (throws on error).
    $mashup = $client->Mashup()->load();
    print_r($mashup->data_get());
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $mashup = $client->Mashup()->load();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = ProverbMashupSDK::test([
    "entity" => ["proverb" => ["test01" => ["id" => "test01"]]],
]);

// list() returns entity instances (throws on error);
// call data_get() for the mock record.
$proverb = $client->Proverb()->list();
print_r(array_map(fn($item) => $item->data_get(), $proverb));
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new ProverbMashupSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
PROVERB_MASHUP_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### ProverbMashupSDK

```php
require_once 'proverbmashup_sdk.php';
$client = new ProverbMashupSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = ProverbMashupSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### ProverbMashupSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Mashup` | `($data): MashupEntity` | Create a Mashup entity instance. |
| `Proverb` | `($data): ProverbEntity` | Create a Proverb entity instance. |
| `Random` | `($data): RandomEntity` | Create a Random entity instance. |
| `Today` | `($data): TodayEntity` | Create a Today entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): mixed` | Load a single entity by match criteria, and return it. |
| `list` | `(?array $reqmatch = null, $ctrl): mixed` | List entities matching the criteria (call with no argument to list all), one per record. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `array` of entities, one
per record; an entity's `data_get()` reads its record (an `array`). They
throw on error, so wrap calls in `try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### Mashup

| Field | Description |
| --- | --- |
| `card` | Link to a 1200x630 share card (PNG, or format=svg). |
| `from` | The two real proverbs it came from: the one that gave the first half, then the one that gave the second. |
| `halves` | The two halves, first then second. |
| `join` | The join kind both halves share (see /proverbs meta.joins). |
| `lang` | Language of the mashup. |
| `mashup` | The mashup: the two halves joined by one space. |
| `permalink` | Link that reproduces this mashup. |
| `seed` | The seed; the same seed and lang always give the same mashup. |

Operations: Load.

API path: `/proverbs/mashup`

#### Proverb

| Field | Description |
| --- | --- |
| `first` | Its first half, cut at the natural joint. |
| `id` | Id within its language (1 to 227 for ro, 1 to 335 for en on 2026-10-23). |
| `join` | The join kind of the cut. |
| `lang` | Language. |
| `proverb-mashup_id` | Id within its language (1 to 227 for ro, 1 to 335 for en on 2026-10-23). |
| `second` | Its second half. |
| `source` | Where the wording comes from. |
| `text` | The proverb, worded exactly as its source has it. |
| `url` | Link to this proverb. |

Operations: List, Load.

API path: `/proverbs`

#### Random

| Field | Description |
| --- | --- |
| `first` | Its first half, cut at the natural joint. |
| `id` | Id within its language (1 to 227 for ro, 1 to 335 for en on 2026-10-23). |
| `join` | The join kind of the cut. |
| `lang` | Language. |
| `second` | Its second half. |
| `source` | Where the wording comes from. |
| `text` | The proverb, worded exactly as its source has it. |
| `url` | Link to this proverb. |

Operations: Load.

API path: `/proverbs/random`

#### Today

| Field | Description |
| --- | --- |
| `card` | Link to a 1200x630 share card (PNG, or format=svg). |
| `from` | The two real proverbs it came from: the one that gave the first half, then the one that gave the second. |
| `halves` | The two halves, first then second. |
| `join` | The join kind both halves share (see /proverbs meta.joins). |
| `lang` | Language of the mashup. |
| `mashup` | The mashup: the two halves joined by one space. |
| `permalink` | Link that reproduces this mashup. |
| `seed` | The seed; the same seed and lang always give the same mashup. |

Operations: Load.

API path: `/proverbs/today`



## Entities


### Mashup

Create an instance: `$mashup = $client->Mashup();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `card` | `string` | Link to a 1200x630 share card (PNG, or format=svg). |
| `from` | `array` | The two real proverbs it came from: the one that gave the first half, then the one that gave the second. |
| `halves` | `array` | The two halves, first then second. |
| `join` | `string` | The join kind both halves share (see /proverbs meta.joins). |
| `lang` | `string` | Language of the mashup. |
| `mashup` | `string` | The mashup: the two halves joined by one space. |
| `permalink` | `string` | Link that reproduces this mashup. |
| `seed` | `string` | The seed; the same seed and lang always give the same mashup. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Mashup record (throws on error).
$mashup = $client->Mashup()->load();
```


### Proverb

Create an instance: `$proverb = $client->Proverb();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `first` | `string` | Its first half, cut at the natural joint. |
| `id` | `string` | Id within its language (1 to 227 for ro, 1 to 335 for en on 2026-10-23). |
| `join` | `string` | The join kind of the cut. |
| `lang` | `string` | Language. |
| `proverb-mashup_id` | `int` | Id within its language (1 to 227 for ro, 1 to 335 for en on 2026-10-23). |
| `second` | `string` | Its second half. |
| `source` | `array` | Where the wording comes from. |
| `text` | `string` | The proverb, worded exactly as its source has it. |
| `url` | `string` | Link to this proverb. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Proverb record (throws on error).
$proverb = $client->Proverb()->load(["id" => 1, "lang" => "lang"]);
```

#### Example: List

```php
// list() returns an array of Proverb entities, one per record (throws on error).
$proverbs = $client->Proverb()->list();
```


### Random

Create an instance: `$random = $client->Random();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `first` | `string` | Its first half, cut at the natural joint. |
| `id` | `int` | Id within its language (1 to 227 for ro, 1 to 335 for en on 2026-10-23). |
| `join` | `string` | The join kind of the cut. |
| `lang` | `string` | Language. |
| `second` | `string` | Its second half. |
| `source` | `array` | Where the wording comes from. |
| `text` | `string` | The proverb, worded exactly as its source has it. |
| `url` | `string` | Link to this proverb. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Random record (throws on error).
$random = $client->Random()->load();
```


### Today

Create an instance: `$today = $client->Today();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `card` | `string` | Link to a 1200x630 share card (PNG, or format=svg). |
| `from` | `array` | The two real proverbs it came from: the one that gave the first half, then the one that gave the second. |
| `halves` | `array` | The two halves, first then second. |
| `join` | `string` | The join kind both halves share (see /proverbs meta.joins). |
| `lang` | `string` | Language of the mashup. |
| `mashup` | `string` | The mashup: the two halves joined by one space. |
| `permalink` | `string` | Link that reproduces this mashup. |
| `seed` | `string` | The seed; the same seed and lang always give the same mashup. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Today record (throws on error).
$today = $client->Today()->load();
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── proverbmashup_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── schema.php                     -- Generated option + entity specs
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`proverbmashup_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$mashup = $client->Mashup();
$mashup->load();

// $mashup->data_get() now returns the mashup data from the last load
// $mashup->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
