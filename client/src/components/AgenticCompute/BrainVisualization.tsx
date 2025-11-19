import { useEffect, useState } from "react";
import circuitBrainImage from "@assets/IMG_1561_1763511583557.jpeg";

interface CodeSnippet {
  text: string;
  yPos: number;
  speed: number;
  opacity: number;
  isGolden: boolean;
}

export function BrainVisualization() {
  const [codeSnippets, setCodeSnippets] = useState<CodeSnippet[]>([]);

  useEffect(() => {
    const snippets = [
      "JavaScript", "Python", "Java", "Docker", "React", "TypeScript",
      "Node.js", "SQL", "MongoDB", "Redis", "GraphQL", "REST",
      "const data = {}", "function()", "async/await", "import {}", 
      "class Agent", "API.call()", "db.query()", "fetch()",
      "map()", "filter()", "reduce()", "Promise.all()",
      "124567", "892341", "567234", "981234", "345678"
    ];

    const initWaterfall = () => {
      const items: CodeSnippet[] = [];
      for (let i = 0; i < 30; i++) {
        items.push({
          text: snippets[Math.floor(Math.random() * snippets.length)],
          yPos: Math.random() * -200,
          speed: Math.random() * 0.5 + 0.3,
          opacity: Math.random() * 0.5 + 0.3,
          isGolden: Math.random() < 0.15
        });
      }
      setCodeSnippets(items);
    };

    initWaterfall();

    const animateInterval = setInterval(() => {
      setCodeSnippets(prev => 
        prev.map(snippet => {
          let newYPos = snippet.yPos + snippet.speed;
          if (newYPos > 100) {
            newYPos = -20;
            return {
              text: snippets[Math.floor(Math.random() * snippets.length)],
              yPos: newYPos,
              speed: Math.random() * 0.5 + 0.3,
              opacity: Math.random() * 0.5 + 0.3,
              isGolden: Math.random() < 0.15
            };
          }
          return { ...snippet, yPos: newYPos };
        })
      );
    }, 50);

    return () => clearInterval(animateInterval);
  }, []);

  return (
    <div className="relative h-[180px] overflow-hidden rounded-lg border border-[#d4af37]/20 mb-8">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${circuitBrainImage})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover'
        }}
      />
      
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(0,0,0,0.7) 100%)'
        }}
      />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {codeSnippets.map((snippet, idx) => (
          <div
            key={idx}
            className="absolute left-0 right-0 text-center font-mono text-xs"
            style={{
              top: `${snippet.yPos}%`,
              opacity: snippet.isGolden ? Math.min(snippet.opacity + 0.3, 1) : snippet.opacity,
              color: snippet.isGolden ? '#d4af37' : '#ffffff',
              textShadow: snippet.isGolden 
                ? '0 0 20px rgba(212, 175, 55, 1), 0 0 30px rgba(212, 175, 55, 0.8)' 
                : '0 0 10px rgba(212, 175, 55, 0.5)',
              fontWeight: snippet.isGolden ? '600' : '400'
            }}
          >
            {snippet.text}
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-black/90 border-t border-[#d4af37]/20 py-2 px-4">
        <p className="text-center text-xs font-semibold tracking-wide text-[#d4af37]">
          AI-Powered Multi-Market Property Intelligence
        </p>
      </div>
    </div>
  );
}
