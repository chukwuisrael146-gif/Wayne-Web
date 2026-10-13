import { afterEach, test } from 'node:test';
import assert from 'node:assert/strict';
import { ApiError, fetchProjects, submitEnquiry } from './api.js';

const originalFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = originalFetch; });

test('contact sends JSON and returns the server acknowledgement', async () => {
  const enquiry = { name: 'Visitor', message: 'A project enquiry', submission_id: 'test-id' };
  globalThis.fetch = async (url, options) => {
    assert.equal(url, '/api/contact/');
    assert.equal(options.method, 'POST');
    assert.deepEqual(JSON.parse(options.body), enquiry);
    return new Response(JSON.stringify({ message: 'Received' }), { status: 201 });
  };
  assert.equal((await submitEnquiry(enquiry)).message, 'Received');
});

test('field validation errors reach the form', async () => {
  globalThis.fetch = async () => new Response(JSON.stringify({ email: ['Invalid email.'] }), { status: 400 });
  await assert.rejects(submitEnquiry({}), (error) => error instanceof ApiError && error.fields.email[0] === 'Invalid email.');
});

test('rate limiting has a useful retry message', async () => {
  globalThis.fetch = async () => new Response('{}', { status: 429 });
  await assert.rejects(submitEnquiry({}), /Too many attempts/);
});

test('network failure does not claim a message was sent', async () => {
  globalThis.fetch = async () => { throw new TypeError('offline'); };
  await assert.rejects(submitEnquiry({}), /Unable to confirm delivery/);
});

test('unexpected HTML response does not claim success', async () => {
  globalThis.fetch = async () => new Response('<html>wrong endpoint</html>');
  await assert.rejects(submitEnquiry({}), /Unexpected response/);
});

test('project fetch preserves signed screenshot URLs and disables caching', async () => {
  const signed = 'https://bucket.example/project.png?X-Amz-Signature=abc&X-Amz-Expires=3600';
  globalThis.fetch = async (url, options) => {
    assert.equal(url, '/api/projects/');
    assert.equal(options.cache, 'no-store');
    return new Response(JSON.stringify([{ id: 1, image: signed }]));
  };
  assert.equal((await fetchProjects())[0].image, signed);
});
