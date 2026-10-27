# ProverbMashup SDK utility: make_context

from proverbmashup_sdk.core.context import ProverbMashupContext


def make_context_util(ctxmap, basectx):
    return ProverbMashupContext(ctxmap, basectx)
