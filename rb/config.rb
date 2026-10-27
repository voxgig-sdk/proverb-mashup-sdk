# ProverbMashup SDK configuration

module ProverbMashupConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "ProverbMashup",
        "slug" => "proverb-mashup",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "now" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://api.tasta.space/v1",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "mashup" => {},
          "proverb" => {},
          "random" => {},
          "today" => {},
        },
      },
      "entity" => {
        "mashup" => {
          "fields" => [
            {
              "name" => "card",
              "title" => "Card",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Link to a 1200x630 share card (PNG, or format=svg).",
            },
            {
              "name" => "from",
              "title" => "From",
              "type" => "`$ARRAY`",
              "req" => true,
              "short" => "The two real proverbs it came from: the one that gave the first half, then the one that gave the second.",
            },
            {
              "name" => "halves",
              "title" => "Halves",
              "type" => "`$ARRAY`",
              "req" => true,
              "short" => "The two halves, first then second.",
            },
            {
              "name" => "join",
              "title" => "Join",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "The join kind both halves share (see /proverbs meta.joins).",
            },
            {
              "name" => "lang",
              "title" => "Lang",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Language of the mashup.",
            },
            {
              "name" => "mashup",
              "title" => "Mashup",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "The mashup: the two halves joined by one space.",
            },
            {
              "name" => "permalink",
              "title" => "Permalink",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Link that reproduces this mashup.",
            },
            {
              "name" => "seed",
              "title" => "Seed",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "The seed; the same seed and lang always give the same mashup.",
            },
          ],
          "name" => "mashup",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/proverbs/mashup",
                  "segments" => [
                    {
                      "lit" => "proverbs",
                    },
                    {
                      "lit" => "mashup",
                    },
                  ],
                  "parts" => [
                    "proverbs",
                    "mashup",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "lang",
                        "orig" => "lang",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "en",
                        "field" => true,
                      },
                      {
                        "name" => "seed",
                        "orig" => "seed",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "k3f9",
                        "field" => true,
                      },
                    ],
                  },
                  "select" => {},
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "proverb" => {
          "fields" => [
            {
              "name" => "first",
              "title" => "First",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Its first half, cut at the natural joint.",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Id within its language (1 to 227 for ro, 1 to 335 for en on 2026-10-23).",
            },
            {
              "name" => "join",
              "title" => "Join",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "The join kind of the cut.",
            },
            {
              "name" => "lang",
              "title" => "Lang",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Language.",
            },
            {
              "name" => "proverb-mashup_id",
              "title" => "Proverb Mashup Id",
              "type" => "`$INTEGER`",
              "req" => true,
              "short" => "Id within its language (1 to 227 for ro, 1 to 335 for en on 2026-10-23).",
            },
            {
              "name" => "second",
              "title" => "Second",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Its second half.",
            },
            {
              "name" => "source",
              "title" => "Source",
              "type" => "`$OBJECT`",
              "req" => true,
              "short" => "Where the wording comes from.",
            },
            {
              "name" => "text",
              "title" => "Text",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "The proverb, worded exactly as its source has it.",
            },
            {
              "name" => "url",
              "title" => "Url",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Link to this proverb.",
            },
          ],
          "id" => {
            "field" => "id",
            "from" => {
              "id" => "id",
              "lang" => "lang",
            },
            "name" => "id",
            "parts" => [
              "lang",
              "id",
            ],
            "sep" => "/",
          },
          "name" => "proverb",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/proverbs",
                  "segments" => [
                    {
                      "lit" => "proverbs",
                    },
                  ],
                  "parts" => [
                    "proverbs",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "join",
                        "orig" => "join",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "cine",
                        "field" => true,
                      },
                      {
                        "name" => "lang",
                        "orig" => "lang",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "en",
                        "field" => true,
                      },
                      {
                        "name" => "page",
                        "orig" => "page",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 2,
                      },
                      {
                        "name" => "per_page",
                        "orig" => "per_page",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 20,
                      },
                    ],
                  },
                  "select" => {},
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/proverbs/{lang}/{id}",
                  "segments" => [
                    {
                      "lit" => "proverbs",
                    },
                    {
                      "var" => "lang",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "proverbs",
                    "{lang}",
                    "{id}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => 88,
                      },
                      {
                        "name" => "lang",
                        "orig" => "lang",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "ro",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                      "lang",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "random" => {
          "fields" => [
            {
              "name" => "first",
              "title" => "First",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Its first half, cut at the natural joint.",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$INTEGER`",
              "req" => true,
              "short" => "Id within its language (1 to 227 for ro, 1 to 335 for en on 2026-10-23).",
            },
            {
              "name" => "join",
              "title" => "Join",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "The join kind of the cut.",
            },
            {
              "name" => "lang",
              "title" => "Lang",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Language.",
            },
            {
              "name" => "second",
              "title" => "Second",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Its second half.",
            },
            {
              "name" => "source",
              "title" => "Source",
              "type" => "`$OBJECT`",
              "req" => true,
              "short" => "Where the wording comes from.",
            },
            {
              "name" => "text",
              "title" => "Text",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "The proverb, worded exactly as its source has it.",
            },
            {
              "name" => "url",
              "title" => "Url",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Link to this proverb.",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "random",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/proverbs/random",
                  "segments" => [
                    {
                      "lit" => "proverbs",
                    },
                    {
                      "lit" => "random",
                    },
                  ],
                  "parts" => [
                    "proverbs",
                    "random",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "lang",
                        "orig" => "lang",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "en",
                        "field" => true,
                      },
                    ],
                  },
                  "select" => {},
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "today" => {
          "fields" => [
            {
              "name" => "card",
              "title" => "Card",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Link to a 1200x630 share card (PNG, or format=svg).",
            },
            {
              "name" => "from",
              "title" => "From",
              "type" => "`$ARRAY`",
              "req" => true,
              "short" => "The two real proverbs it came from: the one that gave the first half, then the one that gave the second.",
            },
            {
              "name" => "halves",
              "title" => "Halves",
              "type" => "`$ARRAY`",
              "req" => true,
              "short" => "The two halves, first then second.",
            },
            {
              "name" => "join",
              "title" => "Join",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "The join kind both halves share (see /proverbs meta.joins).",
            },
            {
              "name" => "lang",
              "title" => "Lang",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Language of the mashup.",
            },
            {
              "name" => "mashup",
              "title" => "Mashup",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "The mashup: the two halves joined by one space.",
            },
            {
              "name" => "permalink",
              "title" => "Permalink",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Link that reproduces this mashup.",
            },
            {
              "name" => "seed",
              "title" => "Seed",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "The seed; the same seed and lang always give the same mashup.",
            },
          ],
          "name" => "today",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/proverbs/today",
                  "segments" => [
                    {
                      "lit" => "proverbs",
                    },
                    {
                      "lit" => "today",
                    },
                  ],
                  "parts" => [
                    "proverbs",
                    "today",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "lang",
                        "orig" => "lang",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "en",
                        "field" => true,
                      },
                    ],
                  },
                  "select" => {},
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    ProverbMashupFeatures.make_feature(name)
  end
end
