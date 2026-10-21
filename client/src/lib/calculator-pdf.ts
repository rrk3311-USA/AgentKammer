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
const MARGIN = 48;
const LEFT = 68;
const RIGHT = 544;
const PAPER = "0.910 0.888 0.843";
const INK = "0.145 0.145 0.137";
const RULE = "0.38 0.36 0.33";
const SILVER = "0.68 0.70 0.73";

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
  color = INK,
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

function hairline(commands: string[], top: number, color = RULE, width = 0.45, from = LEFT, to = RIGHT) {
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

export function calculatorPdfLayout(fields: CalculatorPdfFields, input: CarryInput, result: CarryResult) {
  const commands: string[] = [];
  commands.push(`${PAPER} rg`);
  commands.push(`0 0 ${PAGE_W} ${PAGE_H} re`);
  commands.push("f");
  commands.push(`${SILVER} RG`);
  commands.push("0.7 w");
  commands.push("32 32 548 728 re");
  commands.push("S");
  hiddenKey(commands);

  let top = 58;
  drawText(commands, "AK", 306 - textWidth("AK", 18) / 2, PAGE_H - (top + 18), 18, "F4");
  top += 28;
  hairline(commands, top, SILVER, 0.6, 306 - 36, 306 + 36);
  top += 16;
  drawTrackedCenter(commands, "CALCULATOR", 306, PAGE_H - (top + 8), 8, 1.6);
  top += 36;

  drawText(commands, "THE MONTH", LEFT, PAGE_H - (top + 8), 8, "F1");
  top += 18;
  drawText(commands, formatUsd(result.monthly), LEFT, PAGE_H - (top + 40), 40, "F4");
  top += 52;
  top = drawLines(
    commands,
    wrap("What does this home cost each month?", 14, RIGHT - LEFT),
    LEFT,
    top,
    14,
    18,
    "F5",
  );
  top += 8;
  const cash = `On a ${formatUsd(input.price)} purchase with ${input.downPercent}% down. Cash to close begins near ${formatUsd(result.down)}, before closing costs.`;
  top = drawLines(commands, wrap(cash, 11, RIGHT - LEFT), LEFT, top, 11, 15);
  top += 14;
  hairline(commands, top);
  top += 22;

  drawText(commands, "THE INPUTS", LEFT, PAGE_H - (top + 8), 8, "F1");
  top += 18;
  top = drawRow(commands, "Purchase price", fields.price, top);
  top = drawRow(commands, "Down payment", `${fields.downPercent}%`, top);
  top = drawRow(commands, "Rate", `${fields.ratePercent}%`, top);
  top = drawRow(commands, "Term", `${fields.years} years`, top);
  top = drawRow(commands, "Property tax", `${fields.taxMonthly} / mo`, top);
  top = drawRow(commands, "Common charges", `${fields.commonMonthly} / mo`, top);
  top += 16;

  drawText(commands, "THE BREAKDOWN", LEFT, PAGE_H - (top + 8), 8, "F1");
  top += 18;
  top = drawRow(commands, "Mortgage", formatUsd(result.mortgage), top);
  top = drawRow(commands, "Property tax", formatUsd(result.tax), top);
  top = drawRow(commands, "Common charges", formatUsd(result.common), top);
  top = drawRow(commands, "Monthly carry", formatUsd(result.monthly), top, 16, "F4");
  top += 28;

  drawTrackedCenter(commands, paperDate(), 306, PAGE_H - (top + 8), 7, 0.9);
  top += 16;
  drawTrackedCenter(commands, "AGENTKAMMER.COM", 306, PAGE_H - (top + 8), 8, 1.2);
  top += 18;
  const note =
    "Educational only. Insurance, assessments, and closing costs sit outside this page. Judgment still comes after the number.";
  const noteLines = wrap(note, 9, 360);
  noteLines.forEach((line, index) => {
    drawText(
      commands,
      line,
      306 - textWidth(line, 9) / 2,
      PAGE_H - (top + index * 12 + 9),
      9,
      "F5",
    );
  });
  top += noteLines.length * 12;

  return { commands: commands.join("\n"), bottom: top };
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
