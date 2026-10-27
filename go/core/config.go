package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "ProverbMashup",
			"slug": "proverb-mashup",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api.tasta.space/v1",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"mashup": map[string]any{},
				"proverb": map[string]any{},
				"random": map[string]any{},
				"today": map[string]any{},
			},
		},
		"entity": map[string]any{
			"mashup": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "card",
						"title": "Card",
						"type": "`$STRING`",
						"req": true,
						"short": "Link to a 1200x630 share card (PNG, or format=svg).",
					},
					map[string]any{
						"name": "from",
						"title": "From",
						"type": "`$ARRAY`",
						"req": true,
						"short": "The two real proverbs it came from: the one that gave the first half, then the one that gave the second.",
					},
					map[string]any{
						"name": "halves",
						"title": "Halves",
						"type": "`$ARRAY`",
						"req": true,
						"short": "The two halves, first then second.",
					},
					map[string]any{
						"name": "join",
						"title": "Join",
						"type": "`$STRING`",
						"req": true,
						"short": "The join kind both halves share (see /proverbs meta.joins).",
					},
					map[string]any{
						"name": "lang",
						"title": "Lang",
						"type": "`$STRING`",
						"req": true,
						"short": "Language of the mashup.",
					},
					map[string]any{
						"name": "mashup",
						"title": "Mashup",
						"type": "`$STRING`",
						"req": true,
						"short": "The mashup: the two halves joined by one space.",
					},
					map[string]any{
						"name": "permalink",
						"title": "Permalink",
						"type": "`$STRING`",
						"req": true,
						"short": "Link that reproduces this mashup.",
					},
					map[string]any{
						"name": "seed",
						"title": "Seed",
						"type": "`$STRING`",
						"req": true,
						"short": "The seed; the same seed and lang always give the same mashup.",
					},
				},
				"name": "mashup",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/proverbs/mashup",
								"segments": []any{
									map[string]any{
										"lit": "proverbs",
									},
									map[string]any{
										"lit": "mashup",
									},
								},
								"parts": []any{
									"proverbs",
									"mashup",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
											"kind": "query",
											"example": "en",
											"field": true,
										},
										map[string]any{
											"name": "seed",
											"orig": "seed",
											"type": "`$STRING`",
											"kind": "query",
											"example": "k3f9",
											"field": true,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"proverb": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "first",
						"title": "First",
						"type": "`$STRING`",
						"req": true,
						"short": "Its first half, cut at the natural joint.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Id within its language (1 to 227 for ro, 1 to 335 for en on 2026-10-23).",
					},
					map[string]any{
						"name": "join",
						"title": "Join",
						"type": "`$STRING`",
						"req": true,
						"short": "The join kind of the cut.",
					},
					map[string]any{
						"name": "lang",
						"title": "Lang",
						"type": "`$STRING`",
						"req": true,
						"short": "Language.",
					},
					map[string]any{
						"name": "proverb-mashup_id",
						"title": "Proverb Mashup Id",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Id within its language (1 to 227 for ro, 1 to 335 for en on 2026-10-23).",
					},
					map[string]any{
						"name": "second",
						"title": "Second",
						"type": "`$STRING`",
						"req": true,
						"short": "Its second half.",
					},
					map[string]any{
						"name": "source",
						"title": "Source",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Where the wording comes from.",
					},
					map[string]any{
						"name": "text",
						"title": "Text",
						"type": "`$STRING`",
						"req": true,
						"short": "The proverb, worded exactly as its source has it.",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"req": true,
						"short": "Link to this proverb.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"from": map[string]any{
						"id": "id",
						"lang": "lang",
					},
					"name": "id",
					"parts": []any{
						"lang",
						"id",
					},
					"sep": "/",
				},
				"name": "proverb",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/proverbs",
								"segments": []any{
									map[string]any{
										"lit": "proverbs",
									},
								},
								"parts": []any{
									"proverbs",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "join",
											"orig": "join",
											"type": "`$STRING`",
											"kind": "query",
											"example": "cine",
											"field": true,
										},
										map[string]any{
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
											"kind": "query",
											"example": "en",
											"field": true,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 2,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/proverbs/{lang}/{id}",
								"segments": []any{
									map[string]any{
										"lit": "proverbs",
									},
									map[string]any{
										"var": "lang",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"proverbs",
									"{lang}",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 88,
										},
										map[string]any{
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "ro",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"lang",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"random": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "first",
						"title": "First",
						"type": "`$STRING`",
						"req": true,
						"short": "Its first half, cut at the natural joint.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Id within its language (1 to 227 for ro, 1 to 335 for en on 2026-10-23).",
					},
					map[string]any{
						"name": "join",
						"title": "Join",
						"type": "`$STRING`",
						"req": true,
						"short": "The join kind of the cut.",
					},
					map[string]any{
						"name": "lang",
						"title": "Lang",
						"type": "`$STRING`",
						"req": true,
						"short": "Language.",
					},
					map[string]any{
						"name": "second",
						"title": "Second",
						"type": "`$STRING`",
						"req": true,
						"short": "Its second half.",
					},
					map[string]any{
						"name": "source",
						"title": "Source",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Where the wording comes from.",
					},
					map[string]any{
						"name": "text",
						"title": "Text",
						"type": "`$STRING`",
						"req": true,
						"short": "The proverb, worded exactly as its source has it.",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"req": true,
						"short": "Link to this proverb.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "random",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/proverbs/random",
								"segments": []any{
									map[string]any{
										"lit": "proverbs",
									},
									map[string]any{
										"lit": "random",
									},
								},
								"parts": []any{
									"proverbs",
									"random",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
											"kind": "query",
											"example": "en",
											"field": true,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"today": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "card",
						"title": "Card",
						"type": "`$STRING`",
						"req": true,
						"short": "Link to a 1200x630 share card (PNG, or format=svg).",
					},
					map[string]any{
						"name": "from",
						"title": "From",
						"type": "`$ARRAY`",
						"req": true,
						"short": "The two real proverbs it came from: the one that gave the first half, then the one that gave the second.",
					},
					map[string]any{
						"name": "halves",
						"title": "Halves",
						"type": "`$ARRAY`",
						"req": true,
						"short": "The two halves, first then second.",
					},
					map[string]any{
						"name": "join",
						"title": "Join",
						"type": "`$STRING`",
						"req": true,
						"short": "The join kind both halves share (see /proverbs meta.joins).",
					},
					map[string]any{
						"name": "lang",
						"title": "Lang",
						"type": "`$STRING`",
						"req": true,
						"short": "Language of the mashup.",
					},
					map[string]any{
						"name": "mashup",
						"title": "Mashup",
						"type": "`$STRING`",
						"req": true,
						"short": "The mashup: the two halves joined by one space.",
					},
					map[string]any{
						"name": "permalink",
						"title": "Permalink",
						"type": "`$STRING`",
						"req": true,
						"short": "Link that reproduces this mashup.",
					},
					map[string]any{
						"name": "seed",
						"title": "Seed",
						"type": "`$STRING`",
						"req": true,
						"short": "The seed; the same seed and lang always give the same mashup.",
					},
				},
				"name": "today",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/proverbs/today",
								"segments": []any{
									map[string]any{
										"lit": "proverbs",
									},
									map[string]any{
										"lit": "today",
									},
								},
								"parts": []any{
									"proverbs",
									"today",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
											"kind": "query",
											"example": "en",
											"field": true,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
