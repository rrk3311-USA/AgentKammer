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
const MARGIN = 54;
const NAVY = "0.165 0.204 0.278";

function textWidth(text: string, size: number): number {
  let units = 0;
  for (const ch of text) {
    if (ch === " " || ch === "." || ch === ",") units += 280;
    else if (ch === "/") units += 278;
    else if (ch === "%") units += 889;
    else if (ch >= "0" && ch <= "9") units += 556;
    else if (ch === "$") units += 556;
    else units += 520;
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

function drawText(commands: string[], text: string, x: number, baseline: number, size: number, bold = false) {
  commands.push("BT");
  commands.push(`/${bold ? "F2" : "F1"} ${size} Tf`);
  commands.push(`${NAVY} rg`);
  commands.push(`1 0 0 1 ${x.toFixed(2)} ${baseline.toFixed(2)} Tm`);
  commands.push(`${pdfString(text)} Tj`);
  commands.push("ET");
}

function drawLines(commands: string[], lines: string[], x: number, top: number, size: number, leading: number) {
  lines.forEach((line, index) => {
    const baseline = PAGE_H - (top + index * leading + size);
    drawText(commands, line, x, baseline, size);
  });
  return top + lines.length * leading;
}

type Row = { label: string; value: string; emphasis?: boolean };

function drawBox(commands: string[], rows: Row[], top: number): number {
  const x = MARGIN;
  const width = PAGE_W - MARGIN * 2;
  const rowH = 36;
  const height = rows.length * rowH;
  const bottom = PAGE_H - (top + height);
  commands.push(`${NAVY} RG`);
  commands.push("1.25 w");
  commands.push(`${x} ${bottom.toFixed(2)} ${width} ${height} re`);
  commands.push("S");
  commands.push("0.5 w");
  rows.forEach((row, index) => {
    const rowTop = top + index * rowH;
    const size = row.emphasis ? 16 : 14;
    const baseline = PAGE_H - (rowTop + rowH / 2 + size * 0.32);
    drawText(commands, row.label, x + 16, baseline, size, row.emphasis);
    const valueWidth = textWidth(row.value, size);
    drawText(commands, row.value, x + width - 16 - valueWidth, baseline, size, row.emphasis);
    if (index < rows.length - 1) {
      const rule = PAGE_H - (rowTop + rowH);
      commands.push(`${NAVY} RG`);
      commands.push("0.4 w");
      commands.push(`${x} ${rule.toFixed(2)} m`);
      commands.push(`${(x + width).toFixed(2)} ${rule.toFixed(2)} l`);
      commands.push("S");
    }
  });
  return top + height;
}

export function calculatorPdfLayout(fields: CalculatorPdfFields, input: CarryInput, result: CarryResult) {
  const commands: string[] = [];
  const inner = PAGE_W - MARGIN * 2;
  let top = MARGIN;

  drawText(commands, "CALCULATOR", MARGIN, PAGE_H - (top + 13), 13, true);
  top += 28;

  drawText(commands, formatUsd(result.monthly), MARGIN, PAGE_H - (top + 32), 32, true);
  top += 48;

  top = drawLines(
    commands,
    wrap("What does this home cost each month?", 16, inner),
    MARGIN,
    top,
    16,
    22,
  );
  top += 10;

  const cash = `On a ${formatUsd(input.price)} purchase with ${input.downPercent}% down. Cash to close begins near ${formatUsd(result.down)}, before closing costs.`;
  top = drawLines(commands, wrap(cash, 12, inner), MARGIN, top, 12, 17);
  top += 6;
  top = drawLines(
    commands,
    wrap("Carry first. Listings later. Mortgage, tax, and common charges. Educational, not a pre-approval.", 12, inner),
    MARGIN,
    top,
    12,
    17,
  );
  top += 16;

  drawText(commands, "The inputs", MARGIN, PAGE_H - (top + 14), 14, true);
  top += 24;
  top = drawBox(commands, [
    { label: "Purchase price", value: fields.price },
    { label: "Down payment", value: `${fields.downPercent}%` },
    { label: "Rate", value: `${fields.ratePercent}%` },
    { label: "Term", value: `${fields.years} years` },
    { label: "Property tax", value: `${fields.taxMonthly} / mo` },
    { label: "Common charges", value: `${fields.commonMonthly} / mo` },
  ], top);
  top += 16;

  drawText(commands, "The month", MARGIN, PAGE_H - (top + 14), 14, true);
  top += 24;
  top = drawBox(commands, [
    { label: "Mortgage", value: formatUsd(result.mortgage) },
    { label: "Property tax", value: formatUsd(result.tax) },
    { label: "Common charges", value: formatUsd(result.common) },
    { label: "Monthly carry", value: formatUsd(result.monthly), emphasis: true },
  ], top);
  top += 14;
  top = drawLines(
    commands,
    wrap(
      "Educational only. Insurance, assessments, and closing costs sit outside this page. Judgment still comes after the number.",
      12,
      inner,
    ),
    MARGIN,
    top,
    12,
    17,
  );

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
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>",
    `<< /Length ${pdfBytes(stream).length} >>\nstream\n${stream}endstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
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
