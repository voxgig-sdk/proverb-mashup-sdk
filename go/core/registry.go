package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewMashupEntityFunc func(client *ProverbMashupSDK, entopts map[string]any) ProverbMashupEntity

var NewProverbEntityFunc func(client *ProverbMashupSDK, entopts map[string]any) ProverbMashupEntity

var NewRandomEntityFunc func(client *ProverbMashupSDK, entopts map[string]any) ProverbMashupEntity

var NewTodayEntityFunc func(client *ProverbMashupSDK, entopts map[string]any) ProverbMashupEntity

