function createMockRes() {
	let headers = {};
	let resolve, reject;

	const promise = new Promise((res, rej) => {
		resolve = res;
		reject = rej;
	});

	const res = {
		header(name, value) {
			headers[name] = value;
			return res;
		},
		send(body) {
			resolve({ body, headers });
		},
		status(code) {
			return {
				send(body) {
					reject({ code, body });
				}
			};
		}
	};

	return { res, promise };
}

module.exports = { createMockRes };
