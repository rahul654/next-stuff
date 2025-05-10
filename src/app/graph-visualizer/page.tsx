"use client";
import { useEffect, useRef, useState } from "react";
import { SearchableDropdown } from "../components/inputs/SearchableDropdown/SearchableDropdown";

type Node = {
  id: any;
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
  console.log("nodes::: ", nodes);

  const [edges, setEdges] = useState<Edge[]>([
    [0, 1, 192],
    [0, 3, 211],
    [1, 2, 149],
    [2, 3, 152],
    [1, 2, 149],
    [2, 0, 140],
  ]);
  console.log("edges::: ", edges);

  const [selected, setSelected] = useState<number[]>([0, 2]);
  console.log('selected::: ', selected);
  const [algo, setAlgo] = useState<"dfs" | "bfs" | "dijkstra">("dijkstra");
  const [path, setPath] = useState<number[]>([0, 2]);
  console.log("path::: ", path);

  const radius = 20;

  const addNode = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newNode: Node = {
      id:
        (e.clientX - rect.left).toString() + (e.clientY - rect.top).toString(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setNodes((prev) => [...prev, newNode]);
  };

  const connectNodes = () => {
    if (selected.length === 2) {
      const [a, b] = selected;
      const nodeA = nodes.find((n) => n.id == a);
      console.log("nodeA::: ", nodeA);
      const nodeB = nodes.find((n) => n.id == b);
      console.log("nodeB::: ", nodeB);
      if (!nodeA || !nodeB) return;

      const dx = nodeA.x - nodeB.x;
      const dy = nodeA.y - nodeB.y;
      const w = Math.round(Math.hypot(dx, dy));

      setEdges((prev) => [...prev, [a, b, w]]);
      setSelected([]);
    }
  };
  const deleteNodes = () => {
    setNodes((prev) => {
      return prev.filter((x) => !selected.includes(x.id));
    });
    setEdges((prev) => {
      return prev.filter((x) => !x.some((val) => selected.includes(val)));
    });
    setPath((prev) => {
      return prev.filter((x) => !selected.includes(x));
    });
  };

  const handleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x != id) : [...prev, id].slice(-2)
    );
  };

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    edges.forEach(([from, to, weight]) => {
      const a = nodes.find((n) => n.id == from);
      const b = nodes.find((n) => n.id == to);
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
      const a = nodes.find((item) => item.id === path[i]);
      const b = nodes.find((item) => item.id === path[i + 1]);
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
      // ctx.fillText(node.id.toString(), node.x - 4, node.y + 4);
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
    console.log("runAlgo::: ");
    if (selected.length < 2) return;
    const [start, end] = selected;
    const graph = buildGraph();
    console.log("graph::: ", graph);

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

    class MinHeapPriorityQueue {
      private heap: { nodeId: number; priority: number }[] = [];

      private swap(i: number, j: number) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
      }

      private bubbleUp(index: number) {
        while (index > 0) {
          const parent = Math.floor((index - 1) / 2);
          if (this.heap[index].priority >= this.heap[parent].priority) break;
          this.swap(index, parent);
          index = parent;
        }
      }

      private bubbleDown(index: number) {
        const length = this.heap.length;
        while (true) {
          const left = 2 * index + 1;
          const right = 2 * index + 2;
          let smallest = index;

          if (
            left < length &&
            this.heap[left].priority < this.heap[smallest].priority
          ) {
            smallest = left;
          }
          if (
            right < length &&
            this.heap[right].priority < this.heap[smallest].priority
          ) {
            smallest = right;
          }
          if (smallest === index) break;
          this.swap(index, smallest);
          index = smallest;
        }
      }

      enqueue(nodeId: number, priority: number) {
        this.heap.push({ nodeId, priority });
        this.bubbleUp(this.heap.length - 1);
      }

      dequeue(): number | null {
        if (this.heap.length === 0) return null;
        const top = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0 && end) {
          this.heap[0] = end;
          this.bubbleDown(0);
        }
        return top.nodeId;
      }

      isEmpty(): boolean {
        return this.heap.length === 0;
      }
    }

    const dijkstra = (): number[] => {
      const distances: Record<number, number> = {};
      const previousNodes: Record<number, number | null> = {};
      const visited = new Set<number>();
      const pq = new MinHeapPriorityQueue();

      // Initialize distances and previous nodes
      nodes.forEach((node) => {
        distances[node.id] = Infinity;
        previousNodes[node.id] = null;
      });
      distances[start] = 0;
      pq.enqueue(start, 0);

      while (!pq.isEmpty()) {
        const currentNode = pq.dequeue();
        if (currentNode === null || visited.has(currentNode)) continue;
        visited.add(currentNode);

        if (currentNode === end) break;

        for (const neighborId in graph[currentNode]) {
          const neighbor = parseInt(neighborId);
          const newDistance =
            distances[currentNode] + graph[currentNode][neighbor];
          if (newDistance < distances[neighbor]) {
            distances[neighbor] = newDistance;
            previousNodes[neighbor] = currentNode;
            pq.enqueue(neighbor, newDistance); // Add/update priority
          }
        }
      }

      // Reconstruct the shortest path from end to start
      const shortestPath: number[] = [];
      let currentNode: number | null = end;
      while (currentNode !== null) {
        shortestPath.unshift(currentNode);
        currentNode = previousNodes[currentNode];
      }

      return shortestPath[0] === start ? shortestPath : [];
    };

    const result = algo === "dfs" ? dfs() : algo === "bfs" ? bfs() : dijkstra();
    console.log("result::: ", result);
    setPath(result);
  };

  return (
    <main className="flex flex-col items-center p-6 space-y-4">
      <h1 className="text-2xl font-bold">Graph Visualizer</h1>
      <div className="flex w-full 800:justify-center overflow-x-auto">
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
        <Button onClick={deleteNodes}>Delete</Button>
        <Button onClick={runAlgo}>Run {algo.toUpperCase()}</Button>
        <SearchableDropdown
          searchEnable={false}
          options={["dfs", "bfs", "dijkstra"]}
          value={algo}
          onSelect={(val) => {
            setAlgo(val as "dfs" | "bfs" | "dijkstra");
          }}
        />
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
