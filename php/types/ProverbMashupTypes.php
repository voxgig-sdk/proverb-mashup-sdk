<?php
declare(strict_types=1);

// Typed models for the ProverbMashup SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Mashup entity data model. */
class Mashup
{
    public string $card;
    public array $from;
    public array $halves;
    public string $join;
    public string $lang;
    public string $mashup;
    public string $permalink;
    public string $seed;
}

/** Request payload for Mashup#load. */
class MashupLoadMatch
{
    public ?string $lang = null;
    public ?string $seed = null;
}

/** Proverb entity data model. */
class Proverb
{
    public string $first;
    public string $id;
    public string $join;
    public string $lang;
    public string $second;
    public array $source;
    public string $text;
    public string $url;
}

/** Request payload for Proverb#load. */
class ProverbLoadMatch
{
    public int $id;
    public string $lang;
}

/** Request payload for Proverb#list. */
class ProverbListMatch
{
    public ?string $join = null;
    public ?string $lang = null;
    public ?int $page = null;
    public ?int $per_page = null;
}

/** Random entity data model. */
class Random
{
    public string $first;
    public int $id;
    public string $join;
    public string $lang;
    public string $second;
    public array $source;
    public string $text;
    public string $url;
}

/** Request payload for Random#load. */
class RandomLoadMatch
{
    public ?string $lang = null;
}

/** Today entity data model. */
class Today
{
    public string $card;
    public array $from;
    public array $halves;
    public string $join;
    public string $lang;
    public string $mashup;
    public string $permalink;
    public string $seed;
}

/** Request payload for Today#load. */
class TodayLoadMatch
{
    public ?string $lang = null;
}

