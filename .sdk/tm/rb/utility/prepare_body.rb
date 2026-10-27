# ProverbMashup SDK utility: prepare_body
require_relative 'media'
module ProverbMashupUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return ProverbMashupUtilities.raw_body(ctx.reqdata) if ProverbMashupUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
