"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('RandomEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when PROVERB_MASHUP_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('PROVERB_MASHUP_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ProverbMashupSDK.test();
        const ent = testsdk.Random();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ProverbMashupSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Random().load({ "lang": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.PROVERB_MASHUP_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'random.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "first": { "a": true, "h": "First", "n": "first", "r": true, "sh": "Its first half, cut at the natural joint.", "t": "`$STRING`", "key$": "first", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "Id within its language (1 to 227 for ro, 1 to 335 for en on 2026-10-23).", "t": "`$INTEGER`", "key$": "id", "index$": 1 }, "join": { "a": true, "h": "Join", "n": "join", "r": true, "sh": "The join kind of the cut.", "t": "`$STRING`", "key$": "join", "index$": 2 }, "lang": { "a": true, "h": "Lang", "n": "lang", "r": true, "sh": "Language.", "t": "`$STRING`", "key$": "lang", "index$": 3 }, "second": { "a": true, "h": "Second", "n": "second", "r": true, "sh": "Its second half.", "t": "`$STRING`", "key$": "second", "index$": 4 }, "source": { "a": true, "h": "Source", "n": "source", "r": true, "sh": "Where the wording comes from.", "t": "`$OBJECT`", "key$": "source", "index$": 5 }, "text": { "a": true, "h": "Text", "n": "text", "r": true, "sh": "The proverb, worded exactly as its source has it.", "t": "`$STRING`", "key$": "text", "index$": 6 }, "url": { "a": true, "h": "Url", "n": "url", "r": true, "sh": "Link to this proverb.", "t": "`$STRING`", "key$": "url", "index$": 7 } }, "id": { "field": "id", "name": "id" }, "name": "random", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /proverbs/random", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "en", "k": "query", "n": "lang", "or": "lang", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/proverbs/random", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "proverbs" }, { "lit": "random" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "random", "name__orig": "random", "Name": "Random", "name_": "random", "name-": "random", "NAME": "RANDOM", "index$": 2 }, { "active": true, "entity": "random", "key$": "BasicRandomFlow", "kind": "basic", "name": "BasicRandomFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "random_ref01", "srcdatavar": "random_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-random_ref01" } }], "index$": 0 }] }, 'Random', { "GET /proverbs/random": { "protocol": "http", "parameters": [{ "name": "lang", "in": "query", "required": false, "description": "ro or en; left out, either.", "schema": { "type": "string", "enum": ["ro", "en"] }, "example": "en", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let random_ref01_data = Object.values(setup.data.existing.random)[0];
        // LOAD
        const random_ref01_ent = client.Random();
        const random_ref01_match_dt0 = {};
        random_ref01_match_dt0.id = random_ref01_data.id;
        const random_ref01_data_dt0 = (await random_ref01_ent.load(random_ref01_match_dt0)).data();
        (0, node_assert_1.default)(random_ref01_data_dt0.id === random_ref01_data.id);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/random/RandomTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ProverbMashupSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['random01', 'random02', 'random03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'PROVERB_MASHUP_TEST_RANDOM_ENTID': idmap,
        'PROVERB_MASHUP_TEST_LIVE': 'FALSE',
        'PROVERB_MASHUP_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['PROVERB_MASHUP_TEST_RANDOM_ENTID'];
    const live = 'TRUE' === env.PROVERB_MASHUP_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['PROVERB_MASHUP_TEST_RANDOM_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.ProverbMashupSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.PROVERB_MASHUP_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=RandomEntity.test.js.map