# ProverbMashup Python SDK Reference

Complete API reference for the ProverbMashup Python SDK.


## ProverbMashupSDK

### Constructor

```python
from proverbmashup_sdk import ProverbMashupSDK

client = ProverbMashupSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ProverbMashupSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = ProverbMashupSDK.test()
```


### Instance Methods

#### `Mashup(data=None)`

Create a new `MashupEntity` instance. Pass `None` for no initial data.

#### `Proverb(data=None)`

Create a new `ProverbEntity` instance. Pass `None` for no initial data.

#### `Random(data=None)`

Create a new `RandomEntity` instance. Pass `None` for no initial data.

#### `Today(data=None)`

Create a new `TodayEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## MashupEntity

```python
mashup = client.Mashup()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `card` | `str` | Yes | Link to a 1200x630 share card (PNG, or format=svg). |
| `from` | `list` | Yes | The two real proverbs it came from: the one that gave the first half, then the one that gave the second. |
| `halves` | `list` | Yes | The two halves, first then second. |
| `join` | `str` | Yes | The join kind both halves share (see /proverbs meta.joins). |
| `lang` | `str` | Yes | Language of the mashup. |
| `mashup` | `str` | Yes | The mashup: the two halves joined by one space. |
| `permalink` | `str` | Yes | Link that reproduces this mashup. |
| `seed` | `str` | Yes | The seed; the same seed and lang always give the same mashup. |

### Operations

#### `load(reqmatch, ctrl=None) -> MashupEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Mashup().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MashupEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProverbEntity

```python
proverb = client.Proverb()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `first` | `str` | Yes | Its first half, cut at the natural joint. |
| `id` | `str` | Yes | Id within its language (1 to 227 for ro, 1 to 335 for en on 2026-10-23). |
| `join` | `str` | Yes | The join kind of the cut. |
| `lang` | `str` | Yes | Language. |
| `proverb-mashup_id` | `int` | Yes | Id within its language (1 to 227 for ro, 1 to 335 for en on 2026-10-23). |
| `second` | `str` | Yes | Its second half. |
| `source` | `dict` | Yes | Where the wording comes from. |
| `text` | `str` | Yes | The proverb, worded exactly as its source has it. |
| `url` | `str` | Yes | Link to this proverb. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ProverbEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Proverb().list()
for proverb in results:
    print(proverb.data_get())
```

#### `load(reqmatch, ctrl=None) -> ProverbEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Proverb().load({"id": 1, "lang": "lang"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProverbEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RandomEntity

```python
random = client.Random()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `first` | `str` | Yes | Its first half, cut at the natural joint. |
| `id` | `int` | Yes | Id within its language (1 to 227 for ro, 1 to 335 for en on 2026-10-23). |
| `join` | `str` | Yes | The join kind of the cut. |
| `lang` | `str` | Yes | Language. |
| `second` | `str` | Yes | Its second half. |
| `source` | `dict` | Yes | Where the wording comes from. |
| `text` | `str` | Yes | The proverb, worded exactly as its source has it. |
| `url` | `str` | Yes | Link to this proverb. |

### Operations

#### `load(reqmatch, ctrl=None) -> RandomEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Random().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RandomEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TodayEntity

```python
today = client.Today()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `card` | `str` | Yes | Link to a 1200x630 share card (PNG, or format=svg). |
| `from` | `list` | Yes | The two real proverbs it came from: the one that gave the first half, then the one that gave the second. |
| `halves` | `list` | Yes | The two halves, first then second. |
| `join` | `str` | Yes | The join kind both halves share (see /proverbs meta.joins). |
| `lang` | `str` | Yes | Language of the mashup. |
| `mashup` | `str` | Yes | The mashup: the two halves joined by one space. |
| `permalink` | `str` | Yes | Link that reproduces this mashup. |
| `seed` | `str` | Yes | The seed; the same seed and lang always give the same mashup. |

### Operations

#### `load(reqmatch, ctrl=None) -> TodayEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Today().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TodayEntity` instance with the same options.

#### `get_name() -> str`

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

```python
client = ProverbMashupSDK({
    "feature": {
        "ratelimit": {"active": True},
        "retry": {"active": True},
        "test": {"active": True},
        "timeout": {"active": True},
    },
})
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

