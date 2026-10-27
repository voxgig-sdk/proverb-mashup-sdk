# ProverbMashup SDK utility: make_context
require_relative '../core/context'
module ProverbMashupUtilities
  MakeContext = ->(ctxmap, basectx) {
    ProverbMashupContext.new(ctxmap, basectx)
  }
end
