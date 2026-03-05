# urltomarkdown-mcp

[![npm version](https://img.shields.io/npm/v/urltomarkdown-mcp)](https://www.npmjs.com/package/urltomarkdown-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

An [MCP](https://modelcontextprotocol.io) server that converts URLs and raw HTML to clean Markdown. Built on top of [urltomarkdown](https://github.com/macsplit/urltomarkdown).

Give any MCP-compatible AI assistant the ability to read web pages — just point it at a URL and get structured Markdown back, ready for summarization, analysis, or ingestion into your workflow.

## Tools

### `convert_url_to_markdown`

Fetches a URL and converts the web page to clean Markdown.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `url` | string (URL) | yes | - | URL to fetch and convert |
| `inline_title` | boolean | no | `true` | Prepend page title as H1 |
| `ignore_links` | boolean | no | `false` | Strip hyperlinks |
| `readability` | boolean | no | `true` | Use Readability for cleaner output |

### `convert_html_to_markdown`

Converts raw HTML to clean Markdown (no network request needed).

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `html` | string | yes | - | Raw HTML to convert |
| `url` | string (URL) | no | - | Source URL for relative links and domain filters |
| `inline_title` | boolean | no | `true` | Prepend page title as H1 |
| `ignore_links` | boolean | no | `false` | Strip hyperlinks |
| `readability` | boolean | no | `true` | Use Readability for cleaner output |

## Use cases

- **Research** — Have your AI assistant read and summarize articles, documentation, or blog posts
- **Data extraction** — Pull structured content from web pages for analysis
- **Documentation ingestion** — Convert API docs or reference pages into Markdown for context
- **Content migration** — Bulk convert web content to Markdown format
- **RAG pipelines** — Feed clean web content into retrieval-augmented generation systems

## Installation

### Using npx (no install needed)

```json
{
  "mcpServers": {
    "urltomarkdown": {
      "command": "npx",
      "args": ["-y", "urltomarkdown-mcp"]
    }
  }
}
```

### Global install

```bash
npm install -g urltomarkdown-mcp
```

Then add to your MCP config:

```json
{
  "mcpServers": {
    "urltomarkdown": {
      "command": "urltomarkdown-mcp"
    }
  }
}
```

### From source

```bash
git clone https://github.com/SapienEx-AI/urltomarkdown-mcp.git
cd urltomarkdown-mcp
npm install
```

```json
{
  "mcpServers": {
    "urltomarkdown": {
      "command": "node",
      "args": ["/path/to/urltomarkdown-mcp/src/index.js"]
    }
  }
}
```

### Where to put the config

| Client | Config file |
|--------|-------------|
| Claude Desktop | `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows) |
| Claude Code | `~/.claude/settings.local.json` or project `.mcp.json` |
| Cursor | `.cursor/mcp.json` in your project root |
| Windsurf | `~/.codeium/windsurf/mcp_config.json` |

## How it works

This server wraps the [urltomarkdown](https://github.com/macsplit/urltomarkdown) library and exposes it over the [Model Context Protocol](https://modelcontextprotocol.io) via stdio transport. Under the hood it uses:

- [Turndown](https://github.com/mixmark-io/turndown) for HTML-to-Markdown conversion
- Mozilla's [Readability](https://github.com/mozilla/readability) for content extraction and noise removal
- [JSDOM](https://github.com/jsdom/jsdom) for DOM parsing

The Readability pass strips navigation, sidebars, ads, and other non-content elements before conversion, producing clean output suitable for LLM consumption.

## Testing

```bash
npm test
```

## License

MIT

---

[SapienEx](https://sapienex.com) — AI strategy and consulting
