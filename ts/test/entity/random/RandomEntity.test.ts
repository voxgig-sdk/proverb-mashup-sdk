

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


describe('RandomEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when PROVERB_MASHUP_TEST_LIVE=TRUE.
  afterEach(liveDelay('PROVERB_MASHUP_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ProverbMashupSDK.test()
    const ent = testsdk.Random()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ProverbMashupSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Random().load({"lang":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PROVERB_MASHUP_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'random.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"first":{"a":true,"h":"First","n":"first","r":true,"sh":"Its first half, cut at the natural joint.","t":"`$STRING`","key$":"first","index$":0},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"Id within its language (1 to 227 for ro, 1 to 335 for en on 2026-10-23).","t":"`$INTEGER`","key$":"id","index$":1},"join":{"a":true,"h":"Join","n":"join","r":true,"sh":"The join kind of the cut.","t":"`$STRING`","key$":"join","index$":2},"lang":{"a":true,"h":"Lang","n":"lang","r":true,"sh":"Language.","t":"`$STRING`","key$":"lang","index$":3},"second":{"a":true,"h":"Second","n":"second","r":true,"sh":"Its second half.","t":"`$STRING`","key$":"second","index$":4},"source":{"a":true,"h":"Source","n":"source","r":true,"sh":"Where the wording comes from.","t":"`$OBJECT`","key$":"source","index$":5},"text":{"a":true,"h":"Text","n":"text","r":true,"sh":"The proverb, worded exactly as its source has it.","t":"`$STRING`","key$":"text","index$":6},"url":{"a":true,"h":"Url","n":"url","r":true,"sh":"Link to this proverb.","t":"`$STRING`","key$":"url","index$":7}},"id":{"field":"id","name":"id"},"name":"random","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /proverbs/random","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"en","k":"query","n":"lang","or":"lang","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/proverbs/random","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"proverbs"},{"lit":"random"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"random","name__orig":"random","Name":"Random","name_":"random","name-":"random","NAME":"RANDOM","index$":2}, {"active":true,"entity":"random","key$":"BasicRandomFlow","kind":"basic","name":"BasicRandomFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"random_ref01","srcdatavar":"random_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-random_ref01"}}],"index$":0}]}, 'Random', {"GET /proverbs/random":{"protocol":"http","parameters":[{"name":"lang","in":"query","required":false,"description":"ro or en; left out, either.","schema":{"type":"string","enum":["ro","en"]},"example":"en","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let random_ref01_data = Object.values(setup.data.existing.random)[0] as any

    // LOAD
    const random_ref01_ent = client.Random()
    const random_ref01_match_dt0: any = {}
    random_ref01_match_dt0.id = random_ref01_data.id
    const random_ref01_data_dt0 = (await random_ref01_ent.load(random_ref01_match_dt0)).data()
    assert(random_ref01_data_dt0.id === random_ref01_data.id)


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
      '../../../../.sdk/test/entity/random/RandomTestData.json')

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
    ['random01','random02','random03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'PROVERB_MASHUP_TEST_RANDOM_ENTID': idmap,
    'PROVERB_MASHUP_TEST_LIVE': 'FALSE',
    'PROVERB_MASHUP_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['PROVERB_MASHUP_TEST_RANDOM_ENTID']

  const live = 'TRUE' === env.PROVERB_MASHUP_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['PROVERB_MASHUP_TEST_RANDOM_ENTID']
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
  
