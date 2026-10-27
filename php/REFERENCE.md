# ProverbMashup PHP SDK Reference

Complete API reference for the ProverbMashup PHP SDK.


## ProverbMashupSDK

### Constructor

```php
require_once __DIR__ . '/proverbmashup_sdk.php';

$client = new ProverbMashupSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ProverbMashupSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = ProverbMashupSDK::test();
```


### Instance Methods

#### `Mashup($data = null)`

Create a new `MashupEntity` instance. Pass `null` for no initial data.

#### `Proverb($data = null)`

Create a new `ProverbEntity` instance. Pass `null` for no initial data.

#### `Random($data = null)`

Create a new `RandomEntity` instance. Pass `null` for no initial data.

#### `Today($data = null)`

Create a new `TodayEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): ProverbMashupUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## MashupEntity

```php
$mashup = $client->Mashup();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `card` | `string` | Yes | Link to a 1200x630 share card (PNG, or format=svg). |
| `from` | `array` | Yes | The two real proverbs it came from: the one that gave the first half, then the one that gave the second. |
| `halves` | `array` | Yes | The two halves, first then second. |
| `join` | `string` | Yes | The join kind both halves share (see /proverbs meta.joins). |
| `lang` | `string` | Yes | Language of the mashup. |
| `mashup` | `string` | Yes | The mashup: the two halves joined by one space. |
| `permalink` | `string` | Yes | Link that reproduces this mashup. |
| `seed` | `string` | Yes | The seed; the same seed and lang always give the same mashup. |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Mashup()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MashupEntity`

Create a new `MashupEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ProverbEntity

```php
$proverb = $client->Proverb();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `first` | `string` | Yes | Its first half, cut at the natural joint. |
| `id` | `string` | Yes | Id within its language (1 to 227 for ro, 1 to 335 for en on 2026-10-23). |
| `join` | `string` | Yes | The join kind of the cut. |
| `lang` | `string` | Yes | Language. |
| `proverb-mashup_id` | `int` | Yes | Id within its language (1 to 227 for ro, 1 to 335 for en on 2026-10-23). |
| `second` | `string` | Yes | Its second half. |
| `source` | `array` | Yes | Where the wording comes from. |
| `text` | `string` | Yes | The proverb, worded exactly as its source has it. |
| `url` | `string` | Yes | Link to this proverb. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Proverb()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Proverb()->load(["id" => 1, "lang" => "lang"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ProverbEntity`

Create a new `ProverbEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RandomEntity

```php
$random = $client->Random();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `first` | `string` | Yes | Its first half, cut at the natural joint. |
| `id` | `int` | Yes | Id within its language (1 to 227 for ro, 1 to 335 for en on 2026-10-23). |
| `join` | `string` | Yes | The join kind of the cut. |
| `lang` | `string` | Yes | Language. |
| `second` | `string` | Yes | Its second half. |
| `source` | `array` | Yes | Where the wording comes from. |
| `text` | `string` | Yes | The proverb, worded exactly as its source has it. |
| `url` | `string` | Yes | Link to this proverb. |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Random()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RandomEntity`

Create a new `RandomEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TodayEntity

```php
$today = $client->Today();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `card` | `string` | Yes | Link to a 1200x630 share card (PNG, or format=svg). |
| `from` | `array` | Yes | The two real proverbs it came from: the one that gave the first half, then the one that gave the second. |
| `halves` | `array` | Yes | The two halves, first then second. |
| `join` | `string` | Yes | The join kind both halves share (see /proverbs meta.joins). |
| `lang` | `string` | Yes | Language of the mashup. |
| `mashup` | `string` | Yes | The mashup: the two halves joined by one space. |
| `permalink` | `string` | Yes | Link that reproduces this mashup. |
| `seed` | `string` | Yes | The seed; the same seed and lang always give the same mashup. |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Today()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TodayEntity`

Create a new `TodayEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```php
$client = new ProverbMashupSDK([
  "feature" => [
    "ratelimit" => ["active" => true],
    "retry" => ["active" => true],
    "test" => ["active" => true],
    "timeout" => ["active" => true],
  ],
]);
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `now` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

