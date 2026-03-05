const readers = require('urltomarkdown/url_to_markdown_readers.js');
const processor = require('urltomarkdown/url_to_markdown_processor.js');
const filters = require('urltomarkdown/url_to_markdown_common_filters.js');
const JSDOM = require('jsdom').JSDOM;
const { createMockRes } = require('./mock_res.js');

async function convertUrl(url, options = {}) {
	const reader = readers.reader_for_url(url);
	const { res, promise } = createMockRes();
	reader.read_url(url, res, options);
	const result = await promise;
	const title = result.headers['X-Title']
		? decodeURIComponent(result.headers['X-Title'])
		: null;
	return { markdown: result.body, title };
}

async function convertHtml(html, url, options = {}) {
	if (readers.ignore_post(url)) {
		return convertUrl(url, options);
	}
	html = filters.strip_style_and_script_blocks(html);
	const document = new JSDOM(html);
	const { res, promise } = createMockRes();
	const markdown = processor.process_dom(url, document, res, "", options);
	res.send(markdown);
	const result = await promise;
	const title = result.headers['X-Title']
		? decodeURIComponent(result.headers['X-Title'])
		: null;
	return { markdown: result.body, title };
}

module.exports = { convertUrl, convertHtml };
