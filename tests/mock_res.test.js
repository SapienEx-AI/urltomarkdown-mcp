const { createMockRes } = require('../src/mock_res.js');

test('send resolves promise with body and headers', async () => {
	const { res, promise } = createMockRes();
	res.header('X-Title', 'Test%20Title');
	res.send('# Hello');
	const result = await promise;
	expect(result.body).toBe('# Hello');
	expect(result.headers['X-Title']).toBe('Test%20Title');
});

test('status().send() rejects promise with code and body', async () => {
	const { res, promise } = createMockRes();
	res.status(504).send('Gateway timeout');
	await expect(promise).rejects.toEqual({ code: 504, body: 'Gateway timeout' });
});

test('header returns res for chaining', () => {
	const { res } = createMockRes();
	const result = res.header('Content-Type', 'text/plain');
	expect(result).toBe(res);
});
