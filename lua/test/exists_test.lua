-- ProverbMashup SDK exists test

local sdk = require("proverb-mashup_sdk")

describe("ProverbMashupSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
