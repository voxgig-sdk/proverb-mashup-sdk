package voxgigproverbmashupsdk

import (
	"github.com/voxgig-sdk/proverb-mashup-sdk/go/core"
	"github.com/voxgig-sdk/proverb-mashup-sdk/go/entity"
	"github.com/voxgig-sdk/proverb-mashup-sdk/go/feature"
	_ "github.com/voxgig-sdk/proverb-mashup-sdk/go/utility"
)

// Type aliases preserve external API.
type ProverbMashupSDK = core.ProverbMashupSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type ProverbMashupEntity = core.ProverbMashupEntity
type StreamItem = core.StreamItem
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type ProverbMashupError = core.ProverbMashupError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewMashupEntityFunc = func(client *core.ProverbMashupSDK, entopts map[string]any) core.ProverbMashupEntity {
		return entity.NewMashupEntity(client, entopts)
	}
	core.NewProverbEntityFunc = func(client *core.ProverbMashupSDK, entopts map[string]any) core.ProverbMashupEntity {
		return entity.NewProverbEntity(client, entopts)
	}
	core.NewRandomEntityFunc = func(client *core.ProverbMashupSDK, entopts map[string]any) core.ProverbMashupEntity {
		return entity.NewRandomEntity(client, entopts)
	}
	core.NewTodayEntityFunc = func(client *core.ProverbMashupSDK, entopts map[string]any) core.ProverbMashupEntity {
		return entity.NewTodayEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewProverbMashupSDK = core.NewProverbMashupSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewProverbMashupSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *ProverbMashupSDK  { return NewProverbMashupSDK(nil) }
func Test() *ProverbMashupSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
