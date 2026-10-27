"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "mashup",
        "accessor": "Mashup",
        "op": "load",
        "method": "GET",
        "path": "/proverbs/mashup",
        "args": [],
        "select": {
            "lang": "en",
            "seed": "k3f9"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "lang",
            "seed"
        ],
        "queryArgs": [
            {
                "name": "lang",
                "wire": "lang"
            },
            {
                "name": "seed",
                "wire": "seed"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "data": {
                "lang": "en",
                "mashup": "As the old cock crows, so shall you reap.",
                "halves": [
                    "x"
                ],
                "join": "as_so",
                "from": [
                    {
                        "id": 298,
                        "text": "As the old cock crows, so crows the young.",
                        "half": "first",
                        "url": "https://api.tasta.space/v1/proverbs/en/298",
                        "source": "https://en.wikiquote.org/wiki/English_proverbs_(alphabetically_by_proverb)#A"
                    }
                ],
                "seed": "k3f9",
                "permalink": "https://api.tasta.space/v1/proverbs/mashup?lang=en&seed=k3f9",
                "card": "https://api.tasta.space/v1/proverbs/mashup/card?lang=en&seed=k3f9&format=png"
            }
        },
        "idField": "id"
    },
    {
        "entity": "proverb",
        "accessor": "Proverb",
        "op": "list",
        "method": "GET",
        "path": "/proverbs",
        "args": [],
        "select": {
            "join": "cine",
            "lang": "en",
            "page": 2,
            "per_page": 20
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "lang",
            "join",
            "page",
            "per_page"
        ],
        "queryArgs": [
            {
                "name": "join",
                "wire": "join"
            },
            {
                "name": "lang",
                "wire": "lang"
            },
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "per_page",
                "wire": "per_page"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": 88,
                    "lang": "ro",
                    "text": "Mielul blând suge la două oi.",
                    "first": "Mielul blând",
                    "second": "suge la două oi.",
                    "join": "noun",
                    "source": {
                        "name": "Wikiquote (ro)",
                        "url": "https://ro.wikiquote.org/wiki/Proverbe_rom%C3%A2ne%C8%99ti#M",
                        "licence": "CC BY-SA 4.0"
                    },
                    "url": "https://api.tasta.space/v1/proverbs/ro/88"
                }
            ],
            "meta": {
                "page": 2,
                "per_page": 20,
                "total": 335,
                "last_page": 17,
                "filters": {
                    "lang": "en",
                    "join": "cine"
                },
                "joins": {},
                "licence": "CC BY-SA 4.0, like the pages they come from. Each proverb names its source."
            },
            "links": {
                "next": "x",
                "prev": "x"
            }
        },
        "idField": "id"
    },
    {
        "entity": "proverb",
        "accessor": "Proverb",
        "op": "load",
        "method": "GET",
        "path": "/proverbs/{lang}/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": 88
            },
            {
                "name": "lang",
                "wire": "lang",
                "value": "ro"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "data": {
                "id": 88,
                "lang": "ro",
                "text": "Mielul blând suge la două oi.",
                "first": "Mielul blând",
                "second": "suge la două oi.",
                "join": "noun",
                "source": {
                    "name": "Wikiquote (ro)",
                    "url": "https://ro.wikiquote.org/wiki/Proverbe_rom%C3%A2ne%C8%99ti#M",
                    "licence": "CC BY-SA 4.0"
                },
                "url": "https://api.tasta.space/v1/proverbs/ro/88"
            }
        },
        "idField": "id"
    },
    {
        "entity": "random",
        "accessor": "Random",
        "op": "load",
        "method": "GET",
        "path": "/proverbs/random",
        "args": [],
        "select": {
            "lang": "en"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "lang"
        ],
        "queryArgs": [
            {
                "name": "lang",
                "wire": "lang"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "data": {
                "id": 88,
                "lang": "ro",
                "text": "Mielul blând suge la două oi.",
                "first": "Mielul blând",
                "second": "suge la două oi.",
                "join": "noun",
                "source": {
                    "name": "Wikiquote (ro)",
                    "url": "https://ro.wikiquote.org/wiki/Proverbe_rom%C3%A2ne%C8%99ti#M",
                    "licence": "CC BY-SA 4.0"
                },
                "url": "https://api.tasta.space/v1/proverbs/ro/88"
            }
        },
        "idField": "id"
    },
    {
        "entity": "today",
        "accessor": "Today",
        "op": "load",
        "method": "GET",
        "path": "/proverbs/today",
        "args": [],
        "select": {
            "lang": "en"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "lang"
        ],
        "queryArgs": [
            {
                "name": "lang",
                "wire": "lang"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "data": {
                "lang": "en",
                "mashup": "As the old cock crows, so shall you reap.",
                "halves": [
                    "x"
                ],
                "join": "as_so",
                "from": [
                    {
                        "id": 298,
                        "text": "As the old cock crows, so crows the young.",
                        "half": "first",
                        "url": "https://api.tasta.space/v1/proverbs/en/298",
                        "source": "https://en.wikiquote.org/wiki/English_proverbs_(alphabetically_by_proverb)#A"
                    }
                ],
                "seed": "k3f9",
                "permalink": "https://api.tasta.space/v1/proverbs/mashup?lang=en&seed=k3f9",
                "card": "https://api.tasta.space/v1/proverbs/mashup/card?lang=en&seed=k3f9&format=png"
            },
            "meta": {
                "day": "2026-10-23",
                "timezone": "Europe/Bucharest"
            }
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map