// Typed models for the ProverbMashup SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/proverb-mashup-sdk/go/core"
)

// Mashup is the typed data model for the mashup entity.
type Mashup struct {
}

// MashupLoadMatch is the typed request payload for Mashup.LoadTyped.
type MashupLoadMatch struct {
	Lang *string `json:"lang,omitempty"`
	Seed *string `json:"seed,omitempty"`
}

// Proverb is the typed data model for the proverb entity.
type Proverb struct {
}

// ProverbLoadMatch is the typed request payload for Proverb.LoadTyped.
type ProverbLoadMatch struct {
	Id int `json:"id"`
	Lang string `json:"lang"`
}

// ProverbListMatch is the typed request payload for Proverb.ListTyped.
type ProverbListMatch struct {
	Join *string `json:"join,omitempty"`
	Lang *string `json:"lang,omitempty"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
}

// Random is the typed data model for the random entity.
type Random struct {
}

// RandomLoadMatch is the typed request payload for Random.LoadTyped.
type RandomLoadMatch struct {
	Lang *string `json:"lang,omitempty"`
}

// Today is the typed data model for the today entity.
type Today struct {
}

// TodayLoadMatch is the typed request payload for Today.LoadTyped.
type TodayLoadMatch struct {
	Lang *string `json:"lang,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
