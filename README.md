# urltomarkdown-mcp

An [MCP](https://modelcontextprotocol.io) server that converts URLs and raw HTML to clean Markdown. Built on top of [urltomarkdown](https://github.com/macsplit/urltomarkdown).

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

## Testing

```bash
npm test
```

## How it works

This server wraps the [urltomarkdown](https://github.com/macsplit/urltomarkdown) library, which uses [Turndown](https://github.com/mixmark-io/turndown) for HTML-to-Markdown conversion and Mozilla's [Readability](https://github.com/mozilla/readability) for content extraction. It exposes the conversion functionality over the [Model Context Protocol](https://modelcontextprotocol.io) via stdio transport.

## License

MIT
