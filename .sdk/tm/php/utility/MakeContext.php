<?php
declare(strict_types=1);

// ProverbMashup SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class ProverbMashupMakeContext
{
    public static function call(array $ctxmap, ?ProverbMashupContext $basectx): ProverbMashupContext
    {
        return new ProverbMashupContext($ctxmap, $basectx);
    }
}
