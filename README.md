# urltomarkdown MCP Server

An MCP (Model Context Protocol) server that exposes [urltomarkdown](https://github.com/nickreynolds/urltomarkdown) as tools for Claude and other MCP clients.

## Tools

### `convert_url_to_markdown`

Fetches a URL and converts the web page to clean Markdown.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `url` | string (URL) | yes | - | URL to fetch and convert |
| `inline_title` | boolean | no | true | Prepend page title as H1 |
| `ignore_links` | boolean | no | false | Strip hyperlinks |
| `readability` | boolean | no | true | Use Readability for cleaner output |

### `convert_html_to_markdown`

Converts raw HTML to clean Markdown (no network request needed).

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `html` | string | yes | - | Raw HTML to convert |
| `url` | string (URL) | no | - | Source URL for relative links & domain filters |
| `inline_title` | boolean | no | true | Prepend page title as H1 |
| `ignore_links` | boolean | no | false | Strip hyperlinks |
| `readability` | boolean | no | true | Use Readability for cleaner output |

## Setup

```bash
npm install
```

## Usage with Claude Code

Add to your MCP config (`~/.claude/claude_desktop_config.json` or project `.mcp.json`):

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

## Testing

```bash
npm test
```
