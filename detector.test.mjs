import {test} from 'node:test';import assert from 'node:assert/strict';import {analyze} from './dist/detector.mjs';
test('support impersonation exposes secrets, pressure and link clues',()=>{assert.deepEqual(analyze('Send your OTP in 10 minutes at https://support.example').findings.map(f=>f.id),['secrets','pressure','link']);});
test('ordinary message is never labelled verified safe',()=>{assert.equal(analyze('Lunch at the café tomorrow?').level,'No obvious patterns found');});
test('unseen payment and access tactics trigger independently',()=>{assert.ok(analyze('Install an app for remote access').findings.some(f=>f.id==='remote'));assert.ok(analyze('Send gift cards').findings.some(f=>f.id==='payment'));});
test('repeated analyses do not leak regex state',()=>{assert.deepEqual(analyze('OTP URGENT'),analyze('OTP URGENT'));});
test('bare links and mixed case match',()=>{assert.ok(analyze('Go to support.example/verify').findings.some(f=>f.id==='link'));assert.ok(analyze('Share your PASSWORD').findings.some(f=>f.id==='secrets'));});
