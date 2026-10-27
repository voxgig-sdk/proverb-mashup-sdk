

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ProverbMashupSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('ProverbEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when PROVERB_MASHUP_TEST_LIVE=TRUE.
  afterEach(liveDelay('PROVERB_MASHUP_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ProverbMashupSDK.test()
    const ent = testsdk.Proverb()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('proverb hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of ProverbMashupSDK.test(offline).Proverb().stream('list')) { }
    }, /offline/)

    for await (const _item of ProverbMashupSDK.test(offline).Proverb()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = ProverbMashupSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Proverb().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of ProverbMashupSDK.test().Proverb().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new ProverbMashupSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Proverb().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Proverb().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ProverbMashupSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Proverb().list({"join":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PROVERB_MASHUP_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'proverb.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{"proverb-mashup_id":"id"}},"fields":{"first":{"a":true,"h":"First","n":"first","r":true,"sh":"Its first half, cut at the natural joint.","t":"`$STRING`","key$":"first","index$":0},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"Id within its language (1 to 227 for ro, 1 to 335 for en on 2026-10-23).","t":"`$STRING`","key$":"id","index$":1},"join":{"a":true,"h":"Join","n":"join","r":true,"sh":"The join kind of the cut.","t":"`$STRING`","key$":"join","index$":2},"lang":{"a":true,"h":"Lang","n":"lang","r":true,"sh":"Language.","t":"`$STRING`","key$":"lang","index$":3},"proverb-mashup_id":{"a":true,"h":"Proverb Mashup Id","n":"proverb-mashup_id","r":true,"sh":"Id within its language (1 to 227 for ro, 1 to 335 for en on 2026-10-23).","t":"`$INTEGER`","key$":"proverb-mashup_id","index$":4},"second":{"a":true,"h":"Second","n":"second","r":true,"sh":"Its second half.","t":"`$STRING`","key$":"second","index$":5},"source":{"a":true,"h":"Source","n":"source","r":true,"sh":"Where the wording comes from.","t":"`$OBJECT`","key$":"source","index$":6},"text":{"a":true,"h":"Text","n":"text","r":true,"sh":"The proverb, worded exactly as its source has it.","t":"`$STRING`","key$":"text","index$":7},"url":{"a":true,"h":"Url","n":"url","r":true,"sh":"Link to this proverb.","t":"`$STRING`","key$":"url","index$":8}},"id":{"field":"id","from":{"id":"id","lang":"lang"},"name":"id","parts":["lang","id"],"sep":"/"},"name":"proverb","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /proverbs","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"cine","k":"query","n":"join","or":"join","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"en","k":"query","n":"lang","or":"lang","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":2,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"ex":20,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":3}]},"k":"http","m":"GET","o":"/proverbs","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"proverbs"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /proverbs/{lang}/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":88,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0},{"a":true,"ex":"ro","k":"param","n":"lang","or":"lang","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/proverbs/{lang}/{id}","q":{"exist":["id","lang"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"proverbs"},{"var":"lang"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"proverb","name__orig":"proverb","Name":"Proverb","name_":"proverb","name-":"proverb","NAME":"PROVERB","index$":1}, {"active":true,"entity":"proverb","key$":"BasicProverbFlow","kind":"basic","name":"BasicProverbFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"proverb_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"proverb_ref01","srcdatavar":"proverb_ref01_data","suffix":"_dt0"},"m":{"id":"proverb01","lang":"lang01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-proverb_ref01"}}],"index$":1,"route":"GET /proverbs/{lang}/{id}","record":{"lang":"lang"}}]}, 'Proverb', {"GET /proverbs":{"protocol":"http","parameters":[{"name":"lang","in":"query","required":false,"description":"Only this language; left out, both.","schema":{"type":"string","enum":["ro","en"]},"example":"en","index$":0},{"name":"join","in":"query","required":false,"description":"Only this join kind.","schema":{"type":"string","enum":["cine","ce","noun","plural","cond","imp","pair","verbless","decat","front","subject","who","condition","adverbial","than","there","imperative","the_more","as_so"]},"example":"cine","index$":1},{"name":"page","in":"query","required":false,"description":"Page number, from 1.","schema":{"type":"integer","minimum":1,"default":1},"example":2,"index$":2},{"name":"per_page","in":"query","required":false,"description":"Proverbs per page, 1 to 100.","schema":{"type":"integer","minimum":1,"maximum":100,"default":50},"example":20,"index$":3}]},"GET /proverbs/{lang}/{id}":{"protocol":"http","parameters":[{"name":"lang","in":"path","required":true,"description":"Language: ro or en.","schema":{"type":"string","enum":["ro","en"]},"example":"ro","index$":0},{"name":"id","in":"path","required":true,"description":"Proverb id within that language.","schema":{"type":"integer","minimum":1},"example":88,"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let proverb_ref01_data = Object.values(setup.data.existing.proverb)[0] as any

    // LIST
    const proverb_ref01_ent = client.Proverb()
    const proverb_ref01_match: any = {}

    const proverb_ref01_list = (await proverb_ref01_ent.list(proverb_ref01_match)).map((e: any) => e.data())


    // LOAD
    const proverb_ref01_match_dt0: any = {}
    proverb_ref01_match_dt0.id = proverb_ref01_data.id
    proverb_ref01_match_dt0['lang'] = ['string', 'number', 'boolean'].includes(typeof proverb_ref01_data['lang']) ?
      proverb_ref01_data['lang'] : setup.idmap['lang'] ?? setup.idmap['lang01']
    const proverb_ref01_data_dt0 = (await proverb_ref01_ent.load(proverb_ref01_match_dt0)).data()
    assert(proverb_ref01_data_dt0.id === proverb_ref01_data.id)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/proverb/ProverbTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = ProverbMashupSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['proverb01','proverb02','proverb03','lang01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'PROVERB_MASHUP_TEST_PROVERB_ENTID': idmap,
    'PROVERB_MASHUP_TEST_LIVE': 'FALSE',
    'PROVERB_MASHUP_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['PROVERB_MASHUP_TEST_PROVERB_ENTID']

  const live = 'TRUE' === env.PROVERB_MASHUP_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['PROVERB_MASHUP_TEST_PROVERB_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new ProverbMashupSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
