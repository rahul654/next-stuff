"use client";
import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, Folder, File } from "lucide-react";

interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
}


const FolderTree = ({ node }: { node: FileNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    if (node.type === "folder") {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="ml-4">
      <div
        className="flex items-center space-x-1 cursor-pointer hover:bg-gray-100 px-1 py-0.5 rounded"
        onClick={toggle}
      >
        {node.type === "folder" ? (
          <div className="flex">
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            <Folder className="text-yellow-500" size={16} />
          </div>
        ) : (
          <File className="text-gray-600" size={16} />
        )}
        <div>{node.name}</div>
      </div>

      {isOpen && node.children?.map((child, i) => (
        <FolderTree node={child} key={i} />
      ))}
    </div>
  );
}


export default function Home() {
  const [fileTree] = useState<FileNode>({
    name: "root",
    type: "folder",
    children: [
      {
        name: "src1",
        type: "folder",
        children: [
          {
            name: "src2",
            type: "folder",
            children: [
              { name: "index.tsx", type: "file" },
              { name: "App.tsx", type: "file" },
              {
                name: "src3",
                type: "folder",
                children: [
                  { name: "index.tsx", type: "file" },
                  { name: "App.tsx", type: "file" },
                  {
                    name: "src4",
                    type: "folder",
                    children: [
                      { name: "index.tsx", type: "file" },
                      { name: "App.tsx", type: "file" },
                      {
                        name: "src5",
                        type: "folder",
                        children: [
                          { name: "index.tsx", type: "file" },
                          { name: "App.tsx", type: "file" },
                          {
                            name: "src6",
                            type: "folder",
                            children: [
                              { name: "index.tsx", type: "file" },
                              { name: "App.tsx", type: "file" },
                              {
                                name: "src7",
                                type: "folder",
                                children: [
                                  { name: "index.tsx", type: "file" },
                                  { name: "App.tsx", type: "file" },
                                  {
                                    name: "src8",
                                    type: "folder",
                                    children: [
                                      { name: "index.tsx", type: "file" },
                                      { name: "App.tsx", type: "file" },
                                      {
                                        name: "src9",
                                        type: "folder",
                                        children: [
                                          { name: "index.tsx", type: "file" },
                                          { name: "App.tsx", type: "file" },
                                          {
                                            name: "src10",
                                            type: "folder",
                                            children: [
                                              { name: "index.tsx", type: "file" },
                                              { name: "App.tsx", type: "file" },
                                              {
                                                name: "src11",
                                                type: "folder",
                                                children: [
                                                  { name: "index.tsx", type: "file" },
                                                  { name: "App.tsx", type: "file" },
                                                  {
                                                    name: "src12",
                                                    type: "folder",
                                                    children: [
                                                      { name: "index.tsx", type: "file" },
                                                      { name: "App.tsx", type: "file" },
                                                      {
                                                        name: "src13",
                                                        type: "folder",
                                                        children: [
                                                          { name: "index.tsx", type: "file" },
                                                          { name: "App.tsx", type: "file" },
                                                          {
                                                            name: "src14",
                                                            type: "folder",
                                                            children: [
                                                              { name: "index.tsx", type: "file" },
                                                              { name: "App.tsx", type: "file" },
                                                              {
                                                                name: "src15",
                                                                type: "folder",
                                                                children: [
                                                                  { name: "index.tsx", type: "file" },
                                                                  { name: "App.tsx", type: "file" },
                                                                  {
                                                                    name: "src16",
                                                                    type: "folder",
                                                                    children: [
                                                                      { name: "index.tsx", type: "file" },
                                                                      { name: "App.tsx", type: "file" },
                                                                      {
                                                                        name: "src17",
                                                                        type: "folder",
                                                                        children: [
                                                                          { name: "index.tsx", type: "file" },
                                                                          { name: "App.tsx", type: "file" },
                                                                          {
                                                                            name: "src18",
                                                                            type: "folder",
                                                                            children: [
                                                                              { name: "index.tsx", type: "file" },
                                                                              { name: "App.tsx", type: "file" },
                                                                              {
                                                                                name: "src19",
                                                                                type: "folder",
                                                                                children: [
                                                                                  { name: "index.tsx", type: "file" },
                                                                                  { name: "App.tsx", type: "file" },
                                                                                ],
                                                                              },
                                                                            ],
                                                                          },
                                                                        ],
                                                                      },
                                                                    ],
                                                                  },
                                                                ],
                                                              },
                                                            ],
                                                          },
                                                        ],
                                                      },
                                                    ],
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          { name: "index.tsx", type: "file" },
          { name: "App.tsx", type: "file" },
        ],
      },
      {
        name: "package.json",
        type: "file",
      },
    ],
  });

  const mergeChildren = (children: FileNode[]): FileNode[] => {
    const folders: FileNode[] = [];
    const files: FileNode[] = [];

    children.forEach(val => {
      if(val.type == "folder"){
        folders.push(val);
        if(val.children && val.children.length > 0){
          val.children = mergeChildren(val.children);
        }
      }else{
        files.push(val);
      }
    });

    return [...folders, ...files];
  }

  const moveFolderToTop = (fileOrFolder: FileNode) => {
    if(fileOrFolder.type == "folder" && fileOrFolder?.children?.length && fileOrFolder?.children?.length > 0){
      fileOrFolder.children = mergeChildren(fileOrFolder.children)
    }
  }

  useEffect(() => {
    moveFolderToTop(fileTree);
  }, [fileTree])

  return (
    <main className="p-6 w-full overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">File Explorer</h1>
      <FolderTree node={fileTree} />
    </main>
  );
}
