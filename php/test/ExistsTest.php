<?php
declare(strict_types=1);

// ProverbMashup SDK exists test

require_once __DIR__ . '/../proverbmashup_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = ProverbMashupSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
