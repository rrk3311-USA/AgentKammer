import { formatUsd, type CarryInput, type CarryResult } from "@/lib/monthly-carry";

export type CalculatorPdfFields = {
  price: string;
  downPercent: string;
  ratePercent: string;
  years: string;
  taxMonthly: string;
  commonMonthly: string;
};

const PAGE_W = 612;
const PAGE_H = 792;
const MARGIN = 40;
const LEFT = 72;
const RIGHT = 540;
const PAPER = "0.812 0.800 0.776";
const DEEP = "0.086 0.110 0.157";
const LABEL = "0.290 0.314 0.345";
const SEP = "0.086 0.110 0.157";
const CARD = "0.988 0.988 0.984";
const CARD_EDGE = "0.604 0.631 0.659";
const HAIR = "0.494 0.522 0.549";
const SILVER_IN = "0.604 0.631 0.659";
const SLUG = "interactive-tools/calculator";

function textWidth(text: string, size: number): number {
  let units = 0;
  for (const ch of text) {
    if (ch === " " || ch === "." || ch === ",") units += 250;
    else if (ch === "/") units += 278;
    else if (ch === "%") units += 833;
    else if (ch >= "0" && ch <= "9") units += 500;
    else if (ch === "$") units += 500;
    else units += 480;
  }
  return (units / 1000) * size;
}

function wrap(text: string, size: number, maxWidth: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (line && textWidth(next, size) > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function pdfString(value: string): string {
  return `(${value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)")})`;
}

function drawText(
  commands: string[],
  text: string,
  x: number,
  baseline: number,
  size: number,
  font = "F3",
  color = DEEP,
) {
  commands.push("BT");
  commands.push(`/${font} ${size} Tf`);
  commands.push(`${color} rg`);
  commands.push(`1 0 0 1 ${x.toFixed(2)} ${baseline.toFixed(2)} Tm`);
  commands.push(`${pdfString(text)} Tj`);
  commands.push("ET");
}

function drawTracked(
  commands: string[],
  text: string,
  x: number,
  baseline: number,
  size: number,
  tracking: number,
  font = "F1",
) {
  let cursor = x;
  for (const ch of text) {
    drawText(commands, ch, cursor, baseline, size, font);
    cursor += textWidth(ch, size) + tracking;
  }
}

function drawTrackedCenter(
  commands: string[],
  text: string,
  centerX: number,
  baseline: number,
  size: number,
  tracking: number,
  font = "F1",
) {
  const chars = [...text];
  const total =
    chars.reduce((sum, ch) => sum + textWidth(ch, size), 0) + tracking * Math.max(0, chars.length - 1);
  drawTracked(commands, text, centerX - total / 2, baseline, size, tracking, font);
}

function hairline(commands: string[], top: number, color = SEP, width = 0.45, from = LEFT, to = RIGHT) {
  const y = PAGE_H - top;
  commands.push(`${color} RG`);
  commands.push(`${width} w`);
  commands.push(`${from.toFixed(2)} ${y.toFixed(2)} m`);
  commands.push(`${to.toFixed(2)} ${y.toFixed(2)} l`);
  commands.push("S");
}

function drawLines(
  commands: string[],
  lines: string[],
  x: number,
  top: number,
  size: number,
  leading: number,
  font = "F3",
) {
  lines.forEach((line, index) => {
    drawText(commands, line, x, PAGE_H - (top + index * leading + size), size, font);
  });
  return top + lines.length * leading;
}

function drawRow(commands: string[], label: string, value: string, top: number, size = 13, font = "F3") {
  const baseline = PAGE_H - (top + 18);
  drawText(commands, label, LEFT, baseline, size, font);
  drawText(commands, value, RIGHT - textWidth(value, size), baseline, size, font);
  hairline(commands, top + 28);
  return top + 28;
}

function paperDate(date = new Date()) {
  const weekdays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  return `${weekdays[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function hiddenKey(commands: string[]) {
  commands.push("0.50 0.52 0.55 RG");
  commands.push("0.7 w");
  commands.push("498 62 6 0 360 arc");
  commands.push("S");
  commands.push("504 62 m 534 62 l S");
  commands.push("522 62 m 522 55 l S");
  commands.push("529 62 m 529 54 l S");
}

function drawSectionHead(commands: string[], num: string, label: string, top: number, x = LEFT) {
  drawText(commands, num, x, PAGE_H - (top + 16), 16, "F3", DEEP);
  drawTracked(commands, label, x + 28, PAGE_H - (top + 12), 7, 1.4, "F1");
  return top + 22;
}

export function calculatorPdfLayout(fields: CalculatorPdfFields, input: CarryInput, result: CarryResult) {
  const commands: string[] = [];
  commands.push(`${PAPER} rg`);
  commands.push(`0 0 ${PAGE_W} ${PAGE_H} re`);
  commands.push("f");
  commands.push(`${HAIR} RG`);
  commands.push("0.6 w");
  commands.push("28 28 556 736 re");
  commands.push("S");
  commands.push(`${SILVER_IN} RG`);
  commands.push("0.35 w");
  commands.push("34 34 544 724 re");
  commands.push("S");
  hiddenKey(commands);

  let top = 48;
  drawText(commands, "AK", 306 - textWidth("AK", 14) / 2, PAGE_H - (top + 14), 14, "F3", DEEP);
  top += 22;
  hairline(commands, top, CARD_EDGE, 0.8, 306 - 26, 306 + 26);
  top += 14;
  drawTrackedCenter(commands, "CALCULATOR", 306, PAGE_H - (top + 7), 7, 1.8);
  top += 16;
  drawTrackedCenter(commands, paperDate(), 306, PAGE_H - (top + 7), 6.5, 1.1);
  top += 22;

  top = drawSectionHead(commands, "01", "THE MONTH", top);
  drawText(commands, formatUsd(result.monthly), LEFT, PAGE_H - (top + 46), 46, "F3", DEEP);
  top += 54;
  top = drawLines(
    commands,
    wrap("What does this home cost each month?", 13, RIGHT - LEFT),
    LEFT,
    top,
    13,
    16,
    "F5",
  );
  top += 4;
  const cash = `On a ${formatUsd(input.price)} purchase with ${input.downPercent}% down. Cash to close begins near ${formatUsd(result.down)}, before closing costs.`;
  top = drawLines(commands, wrap(cash, 10, RIGHT - LEFT), LEFT, top, 10, 13, "F1");
  top += 12;

  const inlayTop = top;
  const inlayHeight = 196;
  commands.push(`${CARD} rg`);
  commands.push(`${LEFT - 10} ${PAGE_H - (inlayTop + inlayHeight)} 476 ${inlayHeight} re`);
  commands.push("f");
  commands.push(`${CARD_EDGE} RG`);
  commands.push("1.4 w");
  commands.push(`${LEFT - 10} ${PAGE_H - (inlayTop + inlayHeight)} 476 ${inlayHeight} re`);
  commands.push("S");

  const colGap = 28;
  const colW = (RIGHT - LEFT - colGap) / 2;
  const leftCol = LEFT;
  const rightCol = LEFT + colW + colGap;
  let leftTop = inlayTop + 14;
  let rightTop = inlayTop + 14;
  leftTop = drawSectionHead(commands, "02", "THE INPUTS", leftTop, leftCol);
  const inputRows: [string, string][] = [
    ["Purchase price", fields.price],
    ["Down payment", `${fields.downPercent}%`],
    ["Rate", `${fields.ratePercent}%`],
    ["Term", `${fields.years} years`],
    ["Property tax", `${fields.taxMonthly} / mo`],
    ["Common charges", `${fields.commonMonthly} / mo`],
  ];
  for (const [label, value] of inputRows) {
    const baseline = PAGE_H - (leftTop + 12);
    drawText(commands, label, leftCol, baseline, 9, "F1", DEEP);
    drawText(commands, value, leftCol + colW - textWidth(value, 11), baseline, 11, "F3", DEEP);
    hairline(commands, leftTop + 16, SEP, 0.3, leftCol, leftCol + colW);
    leftTop += 22;
  }

  rightTop = drawSectionHead(commands, "03", "THE BREAKDOWN", rightTop, rightCol);
  const resultRows: [string, string][] = [
    ["Mortgage", formatUsd(result.mortgage)],
    ["Property tax", formatUsd(result.tax)],
    ["Common charges", formatUsd(result.common)],
    ["Monthly carry", formatUsd(result.monthly)],
  ];
  for (const [label, value] of resultRows) {
    const baseline = PAGE_H - (rightTop + 12);
    drawText(commands, label, rightCol, baseline, 9, "F1", DEEP);
    drawText(commands, value, rightCol + colW - textWidth(value, 11), baseline, 11, "F3", DEEP);
    hairline(commands, rightTop + 16, SEP, 0.3, rightCol, rightCol + colW);
    rightTop += 22;
  }

  top = inlayTop + inlayHeight + 12;
  const note =
    "Educational only. Insurance, assessments, and closing costs sit outside this page. Judgment still comes after the number.";
  top = drawLines(commands, wrap(note, 8, RIGHT - LEFT), LEFT, top, 8, 11, "F1");
  top += 10;

  const footTop = PAGE_H - 46;
  const notesBottom = footTop - 10;
  const notesHeight = Math.max(48, notesBottom - top);
  commands.push("0.894 0.886 0.875 rg");
  commands.push(`${LEFT - 6} ${PAGE_H - notesBottom} ${RIGHT - LEFT + 12} ${notesHeight} re`);
  commands.push("f");
  commands.push(`${HAIR} RG`);
  commands.push("0.4 w");
  commands.push(`${LEFT - 6} ${PAGE_H - notesBottom} ${RIGHT - LEFT + 12} ${notesHeight} re`);
  commands.push("S");
  drawText(commands, "NOTES", LEFT, PAGE_H - (top + 10), 6.5, "F1", LABEL);
  let ruleY = top + 18;
  while (ruleY < notesBottom - 4) {
    hairline(commands, ruleY, "0.78 0.78 0.79", 0.25, LEFT, RIGHT);
    ruleY += 14;
  }
  top = notesBottom;

  drawText(commands, SLUG, LEFT, 40, 6, "F1", LABEL);
  hairline(commands, PAGE_H - 42, LABEL, 0.4, 214, 248);
  drawText(commands, "AGENTKAMMER.COM", 306 - textWidth("AGENTKAMMER.COM", 7) / 2, 40, 7, "F1", LABEL);
  hairline(commands, PAGE_H - 42, LABEL, 0.4, 364, 398);

  return { commands: commands.join("\n"), bottom: notesBottom };
}

function pdfBytes(source: string): Uint8Array {
  return new TextEncoder().encode(source);
}

export function buildCalculatorPdf(fields: CalculatorPdfFields, input: CarryInput, result: CarryResult): Uint8Array {
  const { commands, bottom } = calculatorPdfLayout(fields, input, result);
  if (bottom > PAGE_H - MARGIN) {
    throw new Error("Calculator PDF ran past the page margin.");
  }
  const stream = `${commands}\n`;
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Count 1 /Kids [3 0 R] >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R /F3 7 0 R /F4 8 0 R /F5 9 0 R >> >> >>",
    `<< /Length ${pdfBytes(stream).length} >>\nstream\n${stream}endstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Times-Roman /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Times-Bold /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Times-Italic /Encoding /WinAnsiEncoding >>",
  ];

  let file = "%PDF-1.4\n";
  const offsets: number[] = [0];
  objects.forEach((object, index) => {
    offsets.push(pdfBytes(file).length);
    file += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const startxref = pdfBytes(file).length;
  file += `xref\n0 ${objects.length + 1}\n`;
  file += "0000000000 65535 f \n";
  for (let index = 1; index < offsets.length; index += 1) {
    file += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  }
  file += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${startxref}\n%%EOF\n`;
  return pdfBytes(file);
}

export function downloadCalculatorPdf(fields: CalculatorPdfFields, input: CarryInput, result: CarryResult) {
  const bytes = buildCalculatorPdf(fields, input, result);
  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "agent-kammer-calculator.pdf";
  link.click();
  URL.revokeObjectURL(url);
}
