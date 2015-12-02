import range from '../src/range.simple';
import assert from 'assert';

describe('exports a default function', function () {
    it('has typeof function', function () {
        assert.equal(typeof range, 'string');
    })
})
