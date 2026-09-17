import { mkdirSync, writeFileSync } from "fs";
import path from "path";
import { PROCESS_STEPS } from "../shared/get-qualified";

function escapePdf(text: string) {
  return text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function textOp(x: number, y: number, size: number, font: "F1" | "F2", rgb: string, value: string) {
  return `BT /${font} ${size} Tf ${rgb} rg ${x.toFixed(1)} ${y.toFixed(1)} Td (${escapePdf(value)}) Tj ET`;
}

function buildPdf() {
  const ops: string[] = [];
  // Ivory page
  ops.push("0.961 0.949 0.922 rg 0 0 612 792 re f");
  // Navy header bar
  ops.push("0.165 0.204 0.278 rg 0 720 612 72 re f");
  // Brass rule
  ops.push("0.690 0.553 0.341 rg 0 718 612 2.2 re f");

  ops.push(textOp(48, 758, 9, "F2", "0.961 0.886 0.796", "AGENT KAMMER"));
  ops.push(textOp(48, 736, 20, "F1", "0.961 0.949 0.922", "How the process works"));

  ops.push(textOp(48, 688, 11, "F1", "0.165 0.204 0.278", "A calm path. Not a sales funnel."));
  ops.push(
    textOp(
      48,
      668,
      10,
      "F2",
      "0.184 0.192 0.220",
      "Six public steps. Get Qualified is only a briefing on the way to a live session.",
    ),
  );

  PROCESS_STEPS.forEach((step, index) => {
    const top = 620 - index * 72;
    ops.push(`0.918 0.898 0.863 rg 48 ${top - 18} 516 56 re f`);
    ops.push(`0.690 0.553 0.341 RG 1 w 48 ${top - 18} 516 56 re S`);
    ops.push(textOp(64, top + 16, 9, "F2", "0.545 0.420 0.290", String(step.n).padStart(2, "0")));
    ops.push(textOp(64, top - 4, 16, "F1", "0.165 0.204 0.278", step.title));
  });

  ops.push("0.690 0.553 0.341 rg 48 86 516 0.8 re f");
  ops.push(textOp(48, 64, 9, "F2", "0.184 0.192 0.220", "You may already be mid-path. Get Qualified only unlocks"));
  ops.push(textOp(48, 50, 9, "F2", "0.184 0.192 0.220", "the live session when that is the right next move."));
  ops.push(textOp(48, 28, 8, "F2", "0.545 0.420 0.290", "agentkammer.com/qualify"));

  const stream = ops.join("\n") + "\n";
  const objects: string[] = [];
  objects.push("1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj");
  objects.push("2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj");
  objects.push(
    "3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >> endobj",
  );
  objects.push(`4 0 obj << /Length ${Buffer.byteLength(stream)} >> stream\n${stream}endstream endobj`);
  objects.push("5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Times-Roman >> endobj");
  objects.push("6 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Times-Italic >> endobj");

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (const obj of objects) {
    offsets.push(Buffer.byteLength(pdf));
    pdf += obj + "\n";
  }
  const xref = Buffer.byteLength(pdf);
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let i = 1; i < offsets.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.from(pdf, "utf8");
}

const outDir = path.resolve(process.cwd(), "client/public/process");
mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, "agent-kammer-how-the-process-works.pdf");
writeFileSync(outFile, buildPdf());
console.log(`Wrote ${outFile}`);
