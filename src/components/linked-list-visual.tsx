"use client";

export function LinkedListVisual() {
  // Total animation cycle time: 7 seconds
  const TOTAL = "7s";

  return (
    <div className="w-full bg-background/20 rounded-xl border border-border/50 overflow-hidden shadow-inner mt-8">
      <svg viewBox="0 0 700 250" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" className="fill-muted-foreground" />
          </marker>
        </defs>

        {/* Node 1 */}
        <g transform="translate(50, 120)">
          <rect width="80" height="50" rx="8" className="fill-background stroke-border" strokeWidth="2" />
          <text x="40" y="30" textAnchor="middle" className="fill-foreground font-mono text-xs font-bold">Node 1</text>
        </g>

        {/* Node 2 */}
        <g transform="translate(180, 120)">
          <rect width="80" height="50" rx="8" className="fill-background stroke-border" strokeWidth="2" />
          <text x="40" y="30" textAnchor="middle" className="fill-foreground font-mono text-xs font-bold">Node 2</text>
        </g>

        {/* Arrow 1 -> 2 */}
        <path d="M 130 145 L 170 145" className="stroke-muted-foreground/50" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />

        {/* Node 3 (Moves Right) */}
        <g transform="translate(310, 120)">
          <rect width="80" height="50" rx="8" className="fill-background stroke-border" strokeWidth="2" />
          <text x="40" y="30" textAnchor="middle" className="fill-foreground font-mono text-xs font-bold">Node 3</text>
          <animateTransform 
            attributeName="transform" type="translate" 
            values="310, 120; 310, 120; 440, 120; 440, 120; 310, 120" 
            keyTimes="0; 0.4; 0.5; 0.9; 1"
            dur={TOTAL} repeatCount="indefinite" 
          />
        </g>

        {/* The Original Arrow (Stretches then disappears) */}
        <path d="M 260 145 L 300 145" className="stroke-muted-foreground/50" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)">
          <animate 
            attributeName="d" 
            values="M 260 145 L 300 145; M 260 145 L 300 145; M 260 145 L 430 145; M 260 145 L 430 145; M 260 145 L 300 145"
            keyTimes="0; 0.4; 0.5; 0.9; 1"
            dur={TOTAL} repeatCount="indefinite" 
          />
          <animate 
            attributeName="opacity" 
            values="1; 1; 1; 0; 0; 1" 
            keyTimes="0; 0.4; 0.65; 0.66; 0.9; 1"
            dur={TOTAL} repeatCount="indefinite" 
          />
        </path>

        {/* NEW NODE (Drops In) */}
        <g transform="translate(310, -100)">
          <rect width="80" height="50" rx="8" className="fill-primary/10 stroke-primary" strokeWidth="2" strokeDasharray="4" />
          <text x="40" y="30" textAnchor="middle" className="fill-primary font-mono text-xs font-bold">NEW</text>
          <animateTransform 
            attributeName="transform" type="translate" 
            values="310, -100; 310, -100; 310, 120; 310, 120; 310, -100" 
            keyTimes="0; 0.45; 0.55; 0.9; 1"
            dur={TOTAL} repeatCount="indefinite" 
          />
        </g>

        {/* New Pointer 1: Node 2 to New Node */}
        <path d="M 260 145 L 300 145" className="stroke-primary" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)">
          <animate 
            attributeName="opacity" 
            values="0; 0; 1; 1; 0" 
            keyTimes="0; 0.6; 0.65; 0.9; 1"
            dur={TOTAL} repeatCount="indefinite" 
          />
        </path>

        {/* New Pointer 2: New Node to Node 3 */}
        <path d="M 390 145 L 430 145" className="stroke-primary" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)">
          <animate 
            attributeName="opacity" 
            values="0; 0; 1; 1; 0" 
            keyTimes="0; 0.65; 0.7; 0.9; 1"
            dur={TOTAL} repeatCount="indefinite" 
          />
        </path>
      </svg>
    </div>
  );
}