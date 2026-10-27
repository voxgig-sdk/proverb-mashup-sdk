# ProverbMashup SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module ProverbMashupFeatures
  def self.make_feature(name)
    case name
    when "base"
      ProverbMashupBaseFeature.new
    when "ratelimit"
      ProverbMashupRatelimitFeature.new
    when "retry"
      ProverbMashupRetryFeature.new
    when "test"
      ProverbMashupTestFeature.new
    when "timeout"
      ProverbMashupTimeoutFeature.new
    else
      ProverbMashupBaseFeature.new
    end
  end
end
