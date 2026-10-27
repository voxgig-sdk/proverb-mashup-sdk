# ProverbMashup SDK exists test

import pytest
from proverbmashup_sdk import ProverbMashupSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = ProverbMashupSDK.test(None, None)
        assert testsdk is not None
