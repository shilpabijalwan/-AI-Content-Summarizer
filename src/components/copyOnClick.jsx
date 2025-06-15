import React, { useState } from "react"
import { UncontrolledTooltip } from 'reactstrap';

function stripMarkdown(md) {
  // Remove code blocks
  let output = md.replace(/```[\s\S]*?```/g, "")
  // Remove inline code
  output = output.replace(/`([^`]+)`/g, "$1")
  // Remove images
  output = output.replace(/!\[[^\]]*\]\([^\)]*\)/g, "")
  // Remove links but keep text
  output = output.replace(/\[([^\]]*)\]\([^\)]*\)/g, "$1")
  // Remove headings
  output = output.replace(/^#+\s/gm, "")
  // Remove emphasis
  output = output.replace(/\*\*([^*]+)\*\*/g, "$1")
  output = output.replace(/\*([^*]+)\*/g, "$1")
  output = output.replace(/_([^_]+)_/g, "$1")
  // Remove blockquotes
  output = output.replace(/^>\s?/gm, "")
  // Remove unordered list markers
  output = output.replace(/^\s*[-*+]\s+/gm, "")
  // Remove ordered list markers
  output = output.replace(/^\s*\d+\.\s+/gm, "")
  // Remove extra newlines
  output = output.replace(/\n{2,}/g, "\n")
  return output.trim()
}

function CopyOnClick({ text ,id }) {
  const [copied, setCopied] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  const handleCopy = async () => {
    if (!text) return
    try {
      const plain = stripMarkdown(text)
      await navigator.clipboard.writeText(plain)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      setCopied(false)
    }
  }

  return (
    <>
      <button
        id={id}
        onClick={handleCopy}
        className="ml-2 p-1 rounded transition"
        style={{ lineHeight: 0 }}
      >
        <img
          src="/svgs/Copy.svg"
          alt="copy"
          className={`transition duration-200 ${copied ? "drop-shadow-[0_0_4px_#22d3ee] scale-110" : "opacity-80 hover:opacity-100"}`}
          height={20}
          width={20}
        />
        <span className="sr-only">Copy</span>
      </button>
      <UncontrolledTooltip
        placement="top"
        target="copy-summary-btn"
        className="bg-transparent text-white text-sm "
        style={{ backgroundColor: 'transparent', boxShadow: 'none', padding: 0, border: 'none', color: '#fff' }}
      >
        {copied ? "Copied!" : "Copy"}
      </UncontrolledTooltip>
    </>
  );
}

export default CopyOnClick