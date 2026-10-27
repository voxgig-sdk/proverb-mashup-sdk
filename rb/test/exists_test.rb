# ProverbMashup SDK exists test

require "minitest/autorun"
require_relative "../ProverbMashup_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = ProverbMashupSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
