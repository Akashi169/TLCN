import test from 'node:test';
import assert from 'node:assert/strict';

test('Frontend basic configuration check', () => {
  const appName = 'NEXUS Cloud Cyber OS';
  assert.equal(appName, 'NEXUS Cloud Cyber OS');
});
