# Proverb Mashup

> Mashups made by gluing the first half of one real proverb to the second half of another (halves only meet halves of the same join kind), plus the 227 Romanian and 335 English real proverbs themselves, each with its source, from the `api.tasta.space` hub. Proverb wording comes from Wikiquote and Wiktionary under CC BY-SA 4.0. GET only, JSON in a &#123;&quot;data&quot;: ...&#125; envelope, no key needed (anonymous callers get 30 requests a minute and 1,000 a day per IP, shared across every API on the hub).
>
> Sources: the documentation page https://api.tasta.space/proverbs and the hub rules at https://api.tasta.space/docs, with every modelled endpoint probed live on 2026-10-23 (random and seeded mashups, today&#39;s mashup with and without lang, a random proverb, ro/88, a 404 id, the list filtered by lang and by join kind with paging).
>
> Not modelled: format=text (one plain-text line, on mashup, today, random and &#123;lang&#125;/&#123;id&#125;) and /proverbs/mashup/card, which returns a PNG or SVG image rather than JSON.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 4 entities and 5 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Mashup

Results: The mashup.

SDK operations: `load`.

Key fields to recognise:

- `card`: Link to a 1200x630 share card (PNG, or format=svg). Not a JSON endpoint.
- `from`: The two real proverbs it came from: the one that gave the first half, then the one that gave the second.
- `halves`: The two halves, first then second.
- `join`: The join kind both halves share (see /proverbs meta.joins).
- `lang`: Language of the mashup.

### Proverb

Results: A page of proverbs.; The proverb.

SDK operations: `list`, `load`.

Key fields to recognise:

- `first`: Its first half, cut at the natural joint.
- `id`: Id within its language (1 to 227 for ro, 1 to 335 for en on 2026-10-23).
- `join`: The join kind of the cut.
- `lang`: Language.
- `proverb-mashup_id`: Id within its language (1 to 227 for ro, 1 to 335 for en on 2026-10-23).

### Random

Results: The proverb.

SDK operations: `load`.

Key fields to recognise:

- `first`: Its first half, cut at the natural joint.
- `id`: Id within its language (1 to 227 for ro, 1 to 335 for en on 2026-10-23).
- `join`: The join kind of the cut.
- `lang`: Language.
- `second`: Its second half.

### Today

Results: Today&#39;s mashup.

SDK operations: `load`.

Key fields to recognise:

- `card`: Link to a 1200x630 share card (PNG, or format=svg). Not a JSON endpoint.
- `from`: The two real proverbs it came from: the one that gave the first half, then the one that gave the second.
- `halves`: The two halves, first then second.
- `join`: The join kind both halves share (see /proverbs meta.joins).
- `lang`: Language of the mashup.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Mashup | `load` | `GET /proverbs/mashup` | See reference |
| Proverb | `list` | `GET /proverbs` | See reference |
| Proverb | `load` | `GET /proverbs/{lang}/{id}` | See reference |
| Random | `load` | `GET /proverbs/random` | See reference |
| Today | `load` | `GET /proverbs/today` | See reference |

## Connect to the API

- API server: `https://api.tasta.space/v1`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `proverb-mashup_list`: List records for an entity. Supported entities: `proverb`.
- `proverb-mashup_load`: Load one record for an entity. Supported entities: `mashup`, `proverb`, `random`, `today`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

