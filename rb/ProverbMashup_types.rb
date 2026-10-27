# frozen_string_literal: true

# Typed models for the ProverbMashup SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Mashup entity data model.
#
# @!attribute [rw] card
#   @return [String]
#
# @!attribute [rw] from
#   @return [Array]
#
# @!attribute [rw] halves
#   @return [Array]
#
# @!attribute [rw] join
#   @return [String]
#
# @!attribute [rw] lang
#   @return [String]
#
# @!attribute [rw] mashup
#   @return [String]
#
# @!attribute [rw] permalink
#   @return [String]
#
# @!attribute [rw] seed
#   @return [String]
Mashup = Struct.new(
  :card,
  :from,
  :halves,
  :join,
  :lang,
  :mashup,
  :permalink,
  :seed,
  keyword_init: true
)

# Request payload for Mashup#load.
#
# @!attribute [rw] lang
#   @return [String, nil]
#
# @!attribute [rw] seed
#   @return [String, nil]
MashupLoadMatch = Struct.new(
  :lang,
  :seed,
  keyword_init: true
)

# Proverb entity data model.
#
# @!attribute [rw] first
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] join
#   @return [String]
#
# @!attribute [rw] lang
#   @return [String]
#
# @!attribute [rw] proverb-mashup_id
#   @return [Integer]
#
# @!attribute [rw] second
#   @return [String]
#
# @!attribute [rw] source
#   @return [Hash]
#
# @!attribute [rw] text
#   @return [String]
#
# @!attribute [rw] url
#   @return [String]
Proverb = Struct.new(
  :first,
  :id,
  :join,
  :lang,
  :"proverb-mashup_id",
  :second,
  :source,
  :text,
  :url,
  keyword_init: true
)

# Request payload for Proverb#load.
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] lang
#   @return [String]
ProverbLoadMatch = Struct.new(
  :id,
  :lang,
  keyword_init: true
)

# Request payload for Proverb#list.
#
# @!attribute [rw] join
#   @return [String, nil]
#
# @!attribute [rw] lang
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
ProverbListMatch = Struct.new(
  :join,
  :lang,
  :page,
  :per_page,
  keyword_init: true
)

# Random entity data model.
#
# @!attribute [rw] first
#   @return [String]
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] join
#   @return [String]
#
# @!attribute [rw] lang
#   @return [String]
#
# @!attribute [rw] second
#   @return [String]
#
# @!attribute [rw] source
#   @return [Hash]
#
# @!attribute [rw] text
#   @return [String]
#
# @!attribute [rw] url
#   @return [String]
RandomType = Struct.new(
  :first,
  :id,
  :join,
  :lang,
  :second,
  :source,
  :text,
  :url,
  keyword_init: true
)

# Request payload for Random#load.
#
# @!attribute [rw] lang
#   @return [String, nil]
RandomLoadMatch = Struct.new(
  :lang,
  keyword_init: true
)

# Today entity data model.
#
# @!attribute [rw] card
#   @return [String]
#
# @!attribute [rw] from
#   @return [Array]
#
# @!attribute [rw] halves
#   @return [Array]
#
# @!attribute [rw] join
#   @return [String]
#
# @!attribute [rw] lang
#   @return [String]
#
# @!attribute [rw] mashup
#   @return [String]
#
# @!attribute [rw] permalink
#   @return [String]
#
# @!attribute [rw] seed
#   @return [String]
Today = Struct.new(
  :card,
  :from,
  :halves,
  :join,
  :lang,
  :mashup,
  :permalink,
  :seed,
  keyword_init: true
)

# Request payload for Today#load.
#
# @!attribute [rw] lang
#   @return [String, nil]
TodayLoadMatch = Struct.new(
  :lang,
  keyword_init: true
)

