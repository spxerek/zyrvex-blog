// Minimal markdown renderer — no dependency needed.
// Supports: # ## ### headers, **bold**, *italic*, `inline code`,
// ```code blocks``` (with optional language label), [links](url),
// ![images](url), > blockquotes, - / * unordered lists, 1. ordered lists.

export function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inline(text) {
  let t = escapeHtml(text);
  t = t.replace(/`([^`]+)`/g, "<code>$1</code>");
  t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  t = t.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  t = t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" />');
  t = t.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  return t;
}

export function markdownToHtml(md) {
  if (!md) return "";
  const lines = md.replace(/\r\n/g, "\n").split("\n");

  let html = "";
  let inCodeBlock = false;
  let codeBuffer = [];
  let codeLang = "";
  let listBuffer = [];
  let listType = null; // 'ul' | 'ol'

  const flushList = () => {
    if (listBuffer.length) {
      html +=
        `<${listType}>` +
        listBuffer.map((li) => `<li>${inline(li)}</li>`).join("") +
        `</${listType}>`;
      listBuffer = [];
      listType = null;
    }
  };

  for (const raw of lines) {
    const line = raw;

    if (line.trim().startsWith("```")) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeLang = line.trim().slice(3).trim();
        codeBuffer = [];
      } else {
        inCodeBlock = false;
        const langAttr = codeLang ? ` data-lang="${escapeHtml(codeLang)}"` : "";
        html += `<pre class="wu-code"${langAttr}><code>${escapeHtml(
          codeBuffer.join("\n")
        )}</code></pre>`;
      }
      continue;
    }
    if (inCodeBlock) {
      codeBuffer.push(raw);
      continue;
    }

    if (/^#{1,3}\s+/.test(line)) {
      flushList();
      const level = line.match(/^#+/)[0].length + 2; // offset so it nests under page <h1>
      const text = line.replace(/^#{1,3}\s+/, "");
      html += `<h${level}>${inline(text)}</h${level}>`;
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      if (listType !== "ul") {
        flushList();
        listType = "ul";
      }
      listBuffer.push(line.replace(/^\s*[-*]\s+/, ""));
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      if (listType !== "ol") {
        flushList();
        listType = "ol";
      }
      listBuffer.push(line.replace(/^\s*\d+\.\s+/, ""));
      continue;
    }

    if (/^>\s?/.test(line)) {
      flushList();
      html += `<blockquote>${inline(line.replace(/^>\s?/, ""))}</blockquote>`;
      continue;
    }

    if (line.trim() === "") {
      flushList();
      continue;
    }

    flushList();
    html += `<p>${inline(line)}</p>`;
  }

  flushList();
  if (inCodeBlock && codeBuffer.length) {
    html += `<pre class="wu-code"><code>${escapeHtml(
      codeBuffer.join("\n")
    )}</code></pre>`;
  }

  return html;
}