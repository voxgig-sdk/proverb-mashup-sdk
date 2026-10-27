# ProverbMashup SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

ProverbMashupUtility.registrar = ->(u) {
  u.clean = ProverbMashupUtilities::Clean
  u.clean_add = ProverbMashupUtilities::CleanAdd
  u.clean_explain = ProverbMashupUtilities::CleanExplain
  u.done = ProverbMashupUtilities::Done
  u.make_error = ProverbMashupUtilities::MakeError
  u.feature_add = ProverbMashupUtilities::FeatureAdd
  u.feature_hook = ProverbMashupUtilities::FeatureHook
  u.feature_init = ProverbMashupUtilities::FeatureInit
  u.fetcher = ProverbMashupUtilities::Fetcher
  u.make_fetch_def = ProverbMashupUtilities::MakeFetchDef
  u.make_context = ProverbMashupUtilities::MakeContext
  u.make_options = ProverbMashupUtilities::MakeOptions
  u.make_request = ProverbMashupUtilities::MakeRequest
  u.make_response = ProverbMashupUtilities::MakeResponse
  u.make_result = ProverbMashupUtilities::MakeResult
  u.make_point = ProverbMashupUtilities::MakePoint
  u.make_spec = ProverbMashupUtilities::MakeSpec
  u.make_url = ProverbMashupUtilities::MakeUrl
  u.param = ProverbMashupUtilities::Param
  u.prepare_auth = ProverbMashupUtilities::PrepareAuth
  u.prepare_body = ProverbMashupUtilities::PrepareBody
  u.prepare_headers = ProverbMashupUtilities::PrepareHeaders
  u.prepare_method = ProverbMashupUtilities::PrepareMethod
  u.prepare_params = ProverbMashupUtilities::PrepareParams
  u.prepare_path = ProverbMashupUtilities::PreparePath
  u.prepare_query = ProverbMashupUtilities::PrepareQuery
  u.graphql_body = ProverbMashupUtilities::GraphqlBody
  u.graphql_errors = ProverbMashupUtilities::GraphqlErrors
  u.result_basic = ProverbMashupUtilities::ResultBasic
  u.result_body = ProverbMashupUtilities::ResultBody
  u.result_headers = ProverbMashupUtilities::ResultHeaders
  u.transform_request = ProverbMashupUtilities::TransformRequest
  u.transform_response = ProverbMashupUtilities::TransformResponse
}
