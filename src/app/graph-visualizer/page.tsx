"use client";
import { useEffect, useRef, useState } from "react";

type Node = {
  id: number;
  x: number;
  y: number;
};

type Edge = [number, number, number];

const Button = ({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 active:scale-95 transition ${className}`}
  >
    {children}
  </button>
);

export default function GraphPage(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<Node[]>([
    { id: 0, x: 425, y: 119 },
    { id: 1, x: 285, y: 251 },
    { id: 2, x: 434, y: 259 },
    { id: 3, x: 586, y: 256 },
  ]);

  const [edges, setEdges] = useState<Edge[]>([
    [0, 1, 192],
    [0, 3, 211],
    [1, 2, 149],
    [2, 3, 152],
  ]);

  const [selected, setSelected] = useState<number[]>([1, 3]);
  const [algo, setAlgo] = useState<"dfs" | "bfs" | "dijkstra">("dijkstra");
  const [path, setPath] = useState<number[]>([1, 0, 3]);

  const radius = 20;

  const addNode = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newNode: Node = {
      id: nodes.length,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setNodes((prev) => [...prev, newNode]);
  };

  const connectNodes = () => {
    if (selected.length === 2) {
      const [a, b] = selected;
      const nodeA = nodes.find((n) => n.id === a);
      const nodeB = nodes.find((n) => n.id === b);
      if (!nodeA || !nodeB) return;

      const dx = nodeA.x - nodeB.x;
      const dy = nodeA.y - nodeB.y;
      const w = Math.round(Math.hypot(dx, dy));

      setEdges((prev) => [...prev, [a, b, w]]);
      setSelected([]);
    }
  };

  const handleSelect = (id: number) => {
    setSelected((prev) => (prev.includes(id) ? prev : [...prev, id].slice(-2)));
  };

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    edges.forEach(([from, to, weight]) => {
      const a = nodes[from];
      const b = nodes[to];
      if (!a || !b) return;

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = "gray";
      ctx.stroke();

      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;
      ctx.fillStyle = "black";
      ctx.fillText(weight.toString(), mx, my);
    });

    for (let i = 0; i < path.length - 1; i++) {
      const a = nodes[path[i]];
      const b = nodes[path[i + 1]];
      if (!a || !b) continue;

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = "red";
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.lineWidth = 1;
    }

    nodes.forEach((node) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = selected.includes(node.id) ? "lightgreen" : "skyblue";
      ctx.fill();
      ctx.strokeStyle = "black";
      ctx.stroke();
      ctx.fillStyle = "black";
      ctx.fillText(node.id.toString(), node.x - 4, node.y + 4);
    });
  };

  useEffect(draw, [nodes, edges, selected, path]);

  const buildGraph = (): Record<number, Record<number, number>> => {
    const graph: Record<number, Record<number, number>> = {};
    nodes.forEach((n) => (graph[n.id] = {}));
    edges.forEach(([a, b, w]) => {
      graph[a][b] = w;
      graph[b][a] = w;
    });
    return graph;
  };

  const runAlgo = () => {
    console.log('runAlgo::: ');
    if (selected.length < 2) return;
    const [start, end] = selected;
    const graph = buildGraph();
    console.log('graph::: ', graph);

    const bfs = (): number[] => {
      const queue: number[][] = [[start]];
      const visited = new Set<number>();

      while (queue.length > 0) {
        const currentPath = queue.shift()!;
        const node = currentPath.at(-1)!;

        if (node === end) return currentPath;
        if (visited.has(node)) continue;
        visited.add(node);

        for (const neighbor in graph[node]) {
          const next = parseInt(neighbor);
          if (!visited.has(next)) {
            queue.push([...currentPath, next]);
          }
        }
      }
      return [];
    };

    const dfs = (): number[] => {
      const stack: number[][] = [[start]];
      const visited = new Set<number>();

      while (stack.length > 0) {
        const currentPath = stack.pop()!;
        const node = currentPath.at(-1)!;

        if (node === end) return currentPath;
        if (visited.has(node)) continue;
        visited.add(node);

        for (const neighbor in graph[node]) {
          const next = parseInt(neighbor);
          if (!visited.has(next)) {
            stack.push([...currentPath, next]);
          }
        }
      }
      return [];
    };

    const dijkstra = (): number[] => {
      const dist: Record<number, number> = {};
      const prev: Record<number, number | null> = {};
      const q = new Set<number>(nodes.map((n) => n.id));

      nodes.forEach((n) => {
        dist[n.id] = Infinity;
        prev[n.id] = null;
      });
      dist[start] = 0;

      while (q.size > 0) {
        const u = [...q].reduce((a, b) => (dist[a] < dist[b] ? a : b));
        q.delete(u);

        if (u === end) break;

        for (const neighbor in graph[u]) {
          const v = parseInt(neighbor);
          const alt = dist[u] + graph[u][v];
          if (alt < dist[v]) {
            dist[v] = alt;
            prev[v] = u;
          }
        }
      }

      const path: number[] = [];
      let u: number | null = end;
      while (u !== null) {
        path.unshift(u);
        u = prev[u];
      }
      return path[0] === start ? path : [];
    };

    const result = algo === "dfs" ? dfs() : algo === "bfs" ? bfs() : dijkstra();
    console.log('result::: ', result);
    setPath(result);
  };

  return (
    <main className="flex flex-col items-center p-6 space-y-4">
      <h1 className="text-2xl font-bold">Graph Visualizer</h1>
      <div className="flex justify-center w-full overflow-x-auto">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const clicked = nodes.find(
              (n) => Math.hypot(n.x - x, n.y - y) < radius
            );
            if (clicked) handleSelect(clicked.id);
            else addNode(e);
          }}
          className="border border-gray-400 rounded"
        />
      </div>
      <div className="flex gap-4 flex-wrap justify-center">
        <Button onClick={connectNodes}>Connect</Button>
        <Button onClick={runAlgo}>Run {algo.toUpperCase()}</Button>
        <select
          value={algo}
          onChange={(e) =>
            setAlgo(e.target.value as "dfs" | "bfs" | "dijkstra")
          }
          className="border rounded px-3 py-2"
        >
          <option value="bfs">BFS</option>
          <option value="dfs">DFS</option>
          <option value="dijkstra">Dijkstra</option>
        </select>
        <Button
          onClick={() => {
            setNodes([]);
            setEdges([]);
            setPath([]);
            setSelected([]);
          }}
        >
          Reset
        </Button>
      </div>
    </main>
  );
}
