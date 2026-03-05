#!/usr/bin/env node

const { McpServer } = require("@modelcontextprotocol/sdk/server/mcp.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");
const { z } = require("zod");
const { convertUrl, convertHtml } = require("./converter.js");

const server = new McpServer({
	name: "urltomarkdown",
	version: "1.0.0",
});

server.tool(
	"convert_url_to_markdown",
	"Fetch a URL and convert its web page content to clean Markdown",
	{
		url: z.string().url().describe("URL to fetch and convert"),
		inline_title: z.boolean().default(true).describe("Prepend page title as H1 heading"),
		ignore_links: z.boolean().default(false).describe("Strip hyperlinks from output"),
		readability: z.boolean().default(true).describe("Use Readability for cleaner output"),
	},
	async ({ url, inline_title, ignore_links, readability }) => {
		try {
			const options = {
				inline_title,
				ignore_links,
				improve_readability: readability,
			};
			const { markdown } = await convertUrl(url, options);
			return { content: [{ type: "text", text: markdown }] };
		} catch (err) {
			return {
				content: [{ type: "text", text: err.body || String(err) }],
				isError: true,
			};
		}
	}
);

server.tool(
	"convert_html_to_markdown",
	"Convert raw HTML to clean Markdown",
	{
		html: z.string().describe("Raw HTML to convert"),
		url: z.string().url().optional().describe("Source URL for resolving relative links and domain-specific filters"),
		inline_title: z.boolean().default(true).describe("Prepend page title as H1 heading"),
		ignore_links: z.boolean().default(false).describe("Strip hyperlinks from output"),
		readability: z.boolean().default(true).describe("Use Readability for cleaner output"),
	},
	async ({ html, url, inline_title, ignore_links, readability }) => {
		try {
			const options = {
				inline_title,
				ignore_links,
				improve_readability: readability,
			};
			const { markdown } = await convertHtml(html, url, options);
			return { content: [{ type: "text", text: markdown }] };
		} catch (err) {
			return {
				content: [{ type: "text", text: err.body || String(err) }],
				isError: true,
			};
		}
	}
);

async function main() {
	const transport = new StdioServerTransport();
	await server.connect(transport);
}

main().catch((err) => {
	console.error("Fatal error:", err);
	process.exit(1);
});
