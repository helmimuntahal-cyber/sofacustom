import Link from "next/link";
import { Fragment } from "react";
import type { Block, Inline } from "@/lib/markdown";

function renderInline(nodes: Inline[]) {
  return nodes.map((n, i) => {
    switch (n.type) {
      case "text":
        return <Fragment key={i}>{n.text}</Fragment>;
      case "strong":
        return <strong key={i}>{renderInline(n.children)}</strong>;
      case "em":
        return <em key={i}>{renderInline(n.children)}</em>;
      case "code":
        return <code key={i}>{n.text}</code>;
      case "link":
        return n.href.startsWith("/") ? (
          <Link key={i} href={n.href}>
            {renderInline(n.children)}
          </Link>
        ) : (
          <a key={i} href={n.href} target="_blank" rel="noopener noreferrer">
            {renderInline(n.children)}
          </a>
        );
    }
  });
}

/** Menampilkan isi artikel hasil parseMarkdown(). Gaya ada di `.article-body` (globals.css). */
export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="article-body">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "heading":
            return b.level === 2 ? (
              <h2 key={i} id={b.id}>
                {renderInline(b.children)}
              </h2>
            ) : (
              <h3 key={i} id={b.id}>
                {renderInline(b.children)}
              </h3>
            );
          case "paragraph":
            return <p key={i}>{renderInline(b.children)}</p>;
          case "list": {
            const Tag = b.ordered ? "ol" : "ul";
            return (
              <Tag key={i}>
                {b.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </Tag>
            );
          }
          case "table":
            return (
              <div key={i} className="table-wrap" role="region" tabIndex={0} aria-label="Tabel (dapat digeser ke samping)">
                <table>
                  <thead>
                    <tr>
                      {b.header.map((cell, j) => (
                        <th key={j} scope="col">
                          {renderInline(cell)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, j) => (
                      <tr key={j}>
                        {row.map((cell, k) => (
                          <td key={k}>{renderInline(cell)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "callout":
            return (
              <aside key={i} className="callout">
                {renderInline(b.children)}
              </aside>
            );
          case "image":
            return (
              <figure key={i}>
                <img src={b.src} alt={b.alt} loading="lazy" decoding="async" />
              </figure>
            );
        }
      })}
    </div>
  );
}
