<?php
declare(strict_types=1);

// ProverbMashup SDK utility: result_headers

class ProverbMashupResultHeaders
{
    public static function call(ProverbMashupContext $ctx): ?ProverbMashupResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
