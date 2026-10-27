

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


describe('MashupEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when PROVERB_MASHUP_TEST_LIVE=TRUE.
  afterEach(liveDelay('PROVERB_MASHUP_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ProverbMashupSDK.test()
    const ent = testsdk.Mashup()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ProverbMashupSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Mashup().load({"lang":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PROVERB_MASHUP_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'mashup.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"card":{"a":true,"h":"Card","n":"card","r":true,"sh":"Link to a 1200x630 share card (PNG, or format=svg).","t":"`$STRING`","key$":"card","index$":0},"from":{"a":true,"h":"From","n":"from","r":true,"sh":"The two real proverbs it came from: the one that gave the first half, then the one that gave the second.","t":"`$ARRAY`","key$":"from","index$":1},"halves":{"a":true,"h":"Halves","n":"halves","r":true,"sh":"The two halves, first then second.","t":"`$ARRAY`","key$":"halves","index$":2},"join":{"a":true,"h":"Join","n":"join","r":true,"sh":"The join kind both halves share (see /proverbs meta.joins).","t":"`$STRING`","key$":"join","index$":3},"lang":{"a":true,"h":"Lang","n":"lang","r":true,"sh":"Language of the mashup.","t":"`$STRING`","key$":"lang","index$":4},"mashup":{"a":true,"h":"Mashup","n":"mashup","r":true,"sh":"The mashup: the two halves joined by one space.","t":"`$STRING`","key$":"mashup","index$":5},"permalink":{"a":true,"h":"Permalink","n":"permalink","r":true,"sh":"Link that reproduces this mashup.","t":"`$STRING`","key$":"permalink","index$":6},"seed":{"a":true,"h":"Seed","n":"seed","r":true,"sh":"The seed; the same seed and lang always give the same mashup.","t":"`$STRING`","key$":"seed","index$":7}},"name":"mashup","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /proverbs/mashup","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"en","k":"query","n":"lang","or":"lang","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"k3f9","k":"query","n":"seed","or":"seed","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/proverbs/mashup","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"proverbs"},{"lit":"mashup"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"mashup","name__orig":"mashup","Name":"Mashup","name_":"mashup","name-":"mashup","NAME":"MASHUP","index$":0}, {"active":true,"entity":"mashup","key$":"BasicMashupFlow","kind":"basic","name":"BasicMashupFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"mashup_ref01","srcdatavar":"mashup_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-mashup_ref01"}}],"index$":0}]}, 'Mashup', {"GET /proverbs/mashup":{"protocol":"http","parameters":[{"name":"lang","in":"query","required":false,"description":"ro or en. Left out, the seed (or chance) picks one.","schema":{"type":"string","enum":["ro","en"]},"example":"en","index$":0},{"name":"seed","in":"query","required":false,"description":"1 to 64 letters, digits, - or _. The same seed gives the same mashup on every call. Left out, a new one is made and echoed back.","schema":{"type":"string","pattern":"^[A-Za-z0-9_-]{1,64}$"},"example":"k3f9","index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let mashup_ref01_data = Object.values(setup.data.existing.mashup)[0] as any

    // LOAD
    const mashup_ref01_ent = client.Mashup()
    const mashup_ref01_match_dt0: any = {}
    const mashup_ref01_data_dt0 = (await mashup_ref01_ent.load(mashup_ref01_match_dt0)).data()
    assert(null != mashup_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/mashup/MashupTestData.json')

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
    ['mashup01','mashup02','mashup03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'PROVERB_MASHUP_TEST_MASHUP_ENTID': idmap,
    'PROVERB_MASHUP_TEST_LIVE': 'FALSE',
    'PROVERB_MASHUP_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['PROVERB_MASHUP_TEST_MASHUP_ENTID']

  const live = 'TRUE' === env.PROVERB_MASHUP_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['PROVERB_MASHUP_TEST_MASHUP_ENTID']
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
  
