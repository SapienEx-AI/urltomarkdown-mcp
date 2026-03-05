const { convertHtml } = require('../src/converter.js');

const test_html =
	"<html><head><title>test page</title></head>" +
	"<body><p>first paragraph</p>" +
	"<h2>heading 2</h2><p>second paragraph</p>" +
	"<h3>heading 3</h3><p>third paragraph</p>" +
	"<p><em>italics</em> <strong>bold</strong></p>" +
	"<p><a href='http://some.url/link'>link</a></p>" +
	"<p><img alt='photo' src='http://some.url/img'></img></p>" +
	"</body></html>";

const expected_markdown =
	"# test page\nfirst paragraph\n\nheading 2\n---------\n\nsecond paragraph\n\n" +
	"### heading 3\n\nthird paragraph\n\n_italics_ **bold**\n\n" +
	"[link](http://some.url/link)\n\n![photo](http://some.url/img)";

test('convertHtml produces expected markdown', async () => {
	const options = {
		inline_title: true,
		ignore_links: false,
		improve_readability: true,
	};
	const { markdown, title } = await convertHtml(test_html, "http://some.url", options);
	expect(markdown).toBe(expected_markdown);
	expect(title).toBe("test page");
});

test('convertHtml without inline_title omits H1', async () => {
	const options = {
		inline_title: false,
		ignore_links: false,
		improve_readability: true,
	};
	const { markdown } = await convertHtml(test_html, "http://some.url", options);
	expect(markdown).not.toMatch(/^# test page/);
});
