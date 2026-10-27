# ProverbMashup SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "ProverbMashup",
            "slug": "proverb-mashup",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "now": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api.tasta.space/v1",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "mashup": {},
                "proverb": {},
                "random": {},
                "today": {},
            },
        },
        "entity": {
      "mashup": {
        "fields": [
          {
            "name": "card",
            "title": "Card",
            "type": "`$STRING`",
            "req": True,
            "short": "Link to a 1200x630 share card (PNG, or format=svg).",
          },
          {
            "name": "from",
            "title": "From",
            "type": "`$ARRAY`",
            "req": True,
            "short": "The two real proverbs it came from: the one that gave the first half, then the one that gave the second.",
          },
          {
            "name": "halves",
            "title": "Halves",
            "type": "`$ARRAY`",
            "req": True,
            "short": "The two halves, first then second.",
          },
          {
            "name": "join",
            "title": "Join",
            "type": "`$STRING`",
            "req": True,
            "short": "The join kind both halves share (see /proverbs meta.joins).",
          },
          {
            "name": "lang",
            "title": "Lang",
            "type": "`$STRING`",
            "req": True,
            "short": "Language of the mashup.",
          },
          {
            "name": "mashup",
            "title": "Mashup",
            "type": "`$STRING`",
            "req": True,
            "short": "The mashup: the two halves joined by one space.",
          },
          {
            "name": "permalink",
            "title": "Permalink",
            "type": "`$STRING`",
            "req": True,
            "short": "Link that reproduces this mashup.",
          },
          {
            "name": "seed",
            "title": "Seed",
            "type": "`$STRING`",
            "req": True,
            "short": "The seed; the same seed and lang always give the same mashup.",
          },
        ],
        "name": "mashup",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/proverbs/mashup",
                "segments": [
                  {
                    "lit": "proverbs",
                  },
                  {
                    "lit": "mashup",
                  },
                ],
                "parts": [
                  "proverbs",
                  "mashup",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "en",
                      "field": True,
                    },
                    {
                      "name": "seed",
                      "orig": "seed",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "k3f9",
                      "field": True,
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "proverb": {
        "fields": [
          {
            "name": "first",
            "title": "First",
            "type": "`$STRING`",
            "req": True,
            "short": "Its first half, cut at the natural joint.",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Id within its language (1 to 227 for ro, 1 to 335 for en on 2026-10-23).",
          },
          {
            "name": "join",
            "title": "Join",
            "type": "`$STRING`",
            "req": True,
            "short": "The join kind of the cut.",
          },
          {
            "name": "lang",
            "title": "Lang",
            "type": "`$STRING`",
            "req": True,
            "short": "Language.",
          },
          {
            "name": "proverb-mashup_id",
            "title": "Proverb Mashup Id",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Id within its language (1 to 227 for ro, 1 to 335 for en on 2026-10-23).",
          },
          {
            "name": "second",
            "title": "Second",
            "type": "`$STRING`",
            "req": True,
            "short": "Its second half.",
          },
          {
            "name": "source",
            "title": "Source",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Where the wording comes from.",
          },
          {
            "name": "text",
            "title": "Text",
            "type": "`$STRING`",
            "req": True,
            "short": "The proverb, worded exactly as its source has it.",
          },
          {
            "name": "url",
            "title": "Url",
            "type": "`$STRING`",
            "req": True,
            "short": "Link to this proverb.",
          },
        ],
        "id": {
          "field": "id",
          "from": {
            "id": "id",
            "lang": "lang",
          },
          "name": "id",
          "parts": [
            "lang",
            "id",
          ],
          "sep": "/",
        },
        "name": "proverb",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/proverbs",
                "segments": [
                  {
                    "lit": "proverbs",
                  },
                ],
                "parts": [
                  "proverbs",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "join",
                      "orig": "join",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "cine",
                      "field": True,
                    },
                    {
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "en",
                      "field": True,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 2,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/proverbs/{lang}/{id}",
                "segments": [
                  {
                    "lit": "proverbs",
                  },
                  {
                    "var": "lang",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "proverbs",
                  "{lang}",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": 88,
                    },
                    {
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "ro",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "lang",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "random": {
        "fields": [
          {
            "name": "first",
            "title": "First",
            "type": "`$STRING`",
            "req": True,
            "short": "Its first half, cut at the natural joint.",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Id within its language (1 to 227 for ro, 1 to 335 for en on 2026-10-23).",
          },
          {
            "name": "join",
            "title": "Join",
            "type": "`$STRING`",
            "req": True,
            "short": "The join kind of the cut.",
          },
          {
            "name": "lang",
            "title": "Lang",
            "type": "`$STRING`",
            "req": True,
            "short": "Language.",
          },
          {
            "name": "second",
            "title": "Second",
            "type": "`$STRING`",
            "req": True,
            "short": "Its second half.",
          },
          {
            "name": "source",
            "title": "Source",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Where the wording comes from.",
          },
          {
            "name": "text",
            "title": "Text",
            "type": "`$STRING`",
            "req": True,
            "short": "The proverb, worded exactly as its source has it.",
          },
          {
            "name": "url",
            "title": "Url",
            "type": "`$STRING`",
            "req": True,
            "short": "Link to this proverb.",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "random",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/proverbs/random",
                "segments": [
                  {
                    "lit": "proverbs",
                  },
                  {
                    "lit": "random",
                  },
                ],
                "parts": [
                  "proverbs",
                  "random",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "en",
                      "field": True,
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "today": {
        "fields": [
          {
            "name": "card",
            "title": "Card",
            "type": "`$STRING`",
            "req": True,
            "short": "Link to a 1200x630 share card (PNG, or format=svg).",
          },
          {
            "name": "from",
            "title": "From",
            "type": "`$ARRAY`",
            "req": True,
            "short": "The two real proverbs it came from: the one that gave the first half, then the one that gave the second.",
          },
          {
            "name": "halves",
            "title": "Halves",
            "type": "`$ARRAY`",
            "req": True,
            "short": "The two halves, first then second.",
          },
          {
            "name": "join",
            "title": "Join",
            "type": "`$STRING`",
            "req": True,
            "short": "The join kind both halves share (see /proverbs meta.joins).",
          },
          {
            "name": "lang",
            "title": "Lang",
            "type": "`$STRING`",
            "req": True,
            "short": "Language of the mashup.",
          },
          {
            "name": "mashup",
            "title": "Mashup",
            "type": "`$STRING`",
            "req": True,
            "short": "The mashup: the two halves joined by one space.",
          },
          {
            "name": "permalink",
            "title": "Permalink",
            "type": "`$STRING`",
            "req": True,
            "short": "Link that reproduces this mashup.",
          },
          {
            "name": "seed",
            "title": "Seed",
            "type": "`$STRING`",
            "req": True,
            "short": "The seed; the same seed and lang always give the same mashup.",
          },
        ],
        "name": "today",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/proverbs/today",
                "segments": [
                  {
                    "lit": "proverbs",
                  },
                  {
                    "lit": "today",
                  },
                ],
                "parts": [
                  "proverbs",
                  "today",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "en",
                      "field": True,
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
