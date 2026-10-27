# Typed models for the ProverbMashup SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


Mashup = TypedDict('Mashup', {
    "card": str,
    "from": list,
    "halves": list,
    "join": str,
    "lang": str,
    "mashup": str,
    "permalink": str,
    "seed": str,
})


class MashupLoadMatch(TypedDict, total=False):
    lang: str
    seed: str


Proverb = TypedDict('Proverb', {
    "first": str,
    "id": str,
    "join": str,
    "lang": str,
    "proverb-mashup_id": int,
    "second": str,
    "source": dict,
    "text": str,
    "url": str,
})


class ProverbLoadMatch(TypedDict):
    id: int
    lang: str


class ProverbListMatch(TypedDict, total=False):
    join: str
    lang: str
    page: int
    per_page: int


class Random(TypedDict):
    first: str
    id: int
    join: str
    lang: str
    second: str
    source: dict
    text: str
    url: str


class RandomLoadMatch(TypedDict, total=False):
    lang: str


Today = TypedDict('Today', {
    "card": str,
    "from": list,
    "halves": list,
    "join": str,
    "lang": str,
    "mashup": str,
    "permalink": str,
    "seed": str,
})


class TodayLoadMatch(TypedDict, total=False):
    lang: str
