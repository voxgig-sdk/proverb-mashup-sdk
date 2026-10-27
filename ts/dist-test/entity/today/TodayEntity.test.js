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
(0, node_test_1.describe)('TodayEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when PROVERB_MASHUP_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('PROVERB_MASHUP_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ProverbMashupSDK.test();
        const ent = testsdk.Today();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ProverbMashupSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Today().load({ "lang": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.PROVERB_MASHUP_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'today.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "card": { "a": true, "h": "Card", "n": "card", "r": true, "sh": "Link to a 1200x630 share card (PNG, or format=svg).", "t": "`$STRING`", "key$": "card", "index$": 0 }, "from": { "a": true, "h": "From", "n": "from", "r": true, "sh": "The two real proverbs it came from: the one that gave the first half, then the one that gave the second.", "t": "`$ARRAY`", "key$": "from", "index$": 1 }, "halves": { "a": true, "h": "Halves", "n": "halves", "r": true, "sh": "The two halves, first then second.", "t": "`$ARRAY`", "key$": "halves", "index$": 2 }, "join": { "a": true, "h": "Join", "n": "join", "r": true, "sh": "The join kind both halves share (see /proverbs meta.joins).", "t": "`$STRING`", "key$": "join", "index$": 3 }, "lang": { "a": true, "h": "Lang", "n": "lang", "r": true, "sh": "Language of the mashup.", "t": "`$STRING`", "key$": "lang", "index$": 4 }, "mashup": { "a": true, "h": "Mashup", "n": "mashup", "r": true, "sh": "The mashup: the two halves joined by one space.", "t": "`$STRING`", "key$": "mashup", "index$": 5 }, "permalink": { "a": true, "h": "Permalink", "n": "permalink", "r": true, "sh": "Link that reproduces this mashup.", "t": "`$STRING`", "key$": "permalink", "index$": 6 }, "seed": { "a": true, "h": "Seed", "n": "seed", "r": true, "sh": "The seed; the same seed and lang always give the same mashup.", "t": "`$STRING`", "key$": "seed", "index$": 7 } }, "name": "today", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /proverbs/today", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "en", "k": "query", "n": "lang", "or": "lang", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/proverbs/today", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "proverbs" }, { "lit": "today" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "today", "name__orig": "today", "Name": "Today", "name_": "today", "name-": "today", "NAME": "TODAY", "index$": 3 }, { "active": true, "entity": "today", "key$": "BasicTodayFlow", "kind": "basic", "name": "BasicTodayFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "today_ref01", "srcdatavar": "today_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-today_ref01" } }], "index$": 0 }] }, 'Today', { "GET /proverbs/today": { "protocol": "http", "parameters": [{ "name": "lang", "in": "query", "required": false, "description": "ro or en. Left out, the seed (or chance) picks one.", "schema": { "type": "string", "enum": ["ro", "en"] }, "example": "en", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let today_ref01_data = Object.values(setup.data.existing.today)[0];
        // LOAD
        const today_ref01_ent = client.Today();
        const today_ref01_match_dt0 = {};
        const today_ref01_data_dt0 = (await today_ref01_ent.load(today_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != today_ref01_data_dt0);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/today/TodayTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ProverbMashupSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['today01', 'today02', 'today03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'PROVERB_MASHUP_TEST_TODAY_ENTID': idmap,
        'PROVERB_MASHUP_TEST_LIVE': 'FALSE',
        'PROVERB_MASHUP_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['PROVERB_MASHUP_TEST_TODAY_ENTID'];
    const live = 'TRUE' === env.PROVERB_MASHUP_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['PROVERB_MASHUP_TEST_TODAY_ENTID'];
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
//# sourceMappingURL=TodayEntity.test.js.map