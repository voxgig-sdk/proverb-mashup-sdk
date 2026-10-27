-- Typed models for the ProverbMashup SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Mashup
---@field card string
---@field from table
---@field halves table
---@field join string
---@field lang string
---@field mashup string
---@field permalink string
---@field seed string

---@class MashupLoadMatch
---@field lang? string
---@field seed? string

---@class Proverb
---@field first string
---@field id string
---@field join string
---@field lang string
---@field ["proverb-mashup_id"] number
---@field second string
---@field source table
---@field text string
---@field url string

---@class ProverbLoadMatch
---@field id number
---@field lang string

---@class ProverbListMatch
---@field join? string
---@field lang? string
---@field page? number
---@field per_page? number

---@class Random
---@field first string
---@field id number
---@field join string
---@field lang string
---@field second string
---@field source table
---@field text string
---@field url string

---@class RandomLoadMatch
---@field lang? string

---@class Today
---@field card string
---@field from table
---@field halves table
---@field join string
---@field lang string
---@field mashup string
---@field permalink string
---@field seed string

---@class TodayLoadMatch
---@field lang? string

local M = {}

return M
