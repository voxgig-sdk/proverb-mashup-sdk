# Today entity test

require "minitest/autorun"
require "json"
require_relative "../ProverbMashup_sdk"
require_relative "runner"

class TodayEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ProverbMashupSDK.test(nil, nil)
    ent = testsdk.Today(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ProverbMashupConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ProverbMashupSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Today(nil).load({ "lang" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = today_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "today." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    today_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.today")))
    today_ref01_data = nil
    if today_ref01_data_raw.length > 0
      today_ref01_data = Helpers.to_map(today_ref01_data_raw[0][1])
    end

    # LOAD
    today_ref01_ent = client.Today(nil)
    today_ref01_match_dt0 = {}
    today_ref01_data_dt0_loaded = today_ref01_ent.load(today_ref01_match_dt0, nil)
    assert !today_ref01_data_dt0_loaded.nil?

  end
end

def today_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "today", "TodayTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ProverbMashupSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["today01", "today02", "today03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["PROVERB_MASHUP_TEST_TODAY_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "PROVERB_MASHUP_TEST_TODAY_ENTID" => idmap,
    "PROVERB_MASHUP_TEST_LIVE" => "FALSE",
    "PROVERB_MASHUP_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["PROVERB_MASHUP_TEST_TODAY_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["PROVERB_MASHUP_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
      },
      extra || {},
    ])
    client = ProverbMashupSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["PROVERB_MASHUP_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["PROVERB_MASHUP_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
