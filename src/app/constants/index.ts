export const allRoutes = [
    {
        title:"Graph Visualizer",
        description:`Graph Visualizer: An interactive React component that allows users to dynamically create and visualize 
            graphs by adding nodes and connecting them with weighted edges. It supports drawing custom graph structures through 
            a canvas interface and enables users to run various traversal and pathfinding algorithms like BFS, DFS, and Dijkstra. 
            The component efficiently highlights the computed paths and offers an intuitive way to explore graph theory concepts 
            in real-time.`,
        routeTo:"/graph-visualizer",
    },
    {
        title:"Parent child Checkbox",
        description:`Checkbox Tree Selector: A hierarchical checkbox component 
        where selecting the parent auto-selects all children, and deselecting any child auto-unchecks the parent. 
        Uses a recursive approach to check/uncheck all child nodes efficiently.`,
        routeTo:"/parent-child-checkbox",
    },
    {
        title:"Comment Thread Viewer",
        description:`Nested Comment Viewer: A recursive React component that displays hierarchical comment threads, 
            where each comment can have nested replies. It uses a recursive structure to efficiently render multiple levels 
            of replies and supports toggling visibility for each comment's children to keep deep threads manageable.`,
        routeTo:"/comment-thread-viewer",
    },
    {
        title:"Folder Explorer",
        description:`Checkbox Tree Selector: A hierarchical checkbox component 
        where selecting the parent auto-selects all children, and deselecting any child auto-unchecks the parent. 
        Uses a recursive approach to check/uncheck all child nodes efficiently.`,
        routeTo:"/folder-explorer",
    },
];