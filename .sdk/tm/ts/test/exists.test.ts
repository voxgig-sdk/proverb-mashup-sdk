
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ProverbMashupSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = ProverbMashupSDK.test()
    equal(testsdk instanceof ProverbMashupSDK, true,
      'ProverbMashupSDK.test() must return a client synchronously')
  })

})
