"use client"
import { SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Edge, addEdge, useEdgesState, useNodesState } from "reactflow";
import { NavBar, SideBar, MessageFlow } from "../components";
import { toast } from "react-toastify";
import 'reactflow/dist/style.css';

type SelectedElement = {
  id?: string;
  type?: string;
  data?: { label: any };
  position?: { x: number, y: number }

};

export default function Home() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any | null>(null);
  const [selectedElements, setSelectedElements] = useState<SelectedElement[]>([]);
  const [nodeName, setNodeName] = useState("");

  // Initial node data
  const initialNode = [
    {
      id: "1",
      type: "chatNode",
      data: { label: "Chat Node" },
      position: { x: 250, y: 5 },
    },
  ];

  // Use state hook for nodes
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNode);

  // Effect hook to update node name when selected elements change
  useEffect(() => {
    if (selectedElements.length > 0) {
      setNodes((prevNodes: any[]) =>
        prevNodes.map((node) =>
          node.id === selectedElements[0]?.id
            ? { ...node, data: { ...node.data, label: nodeName } }
            : node
        )
      );
    } else {
      setNodeName("");
    }
  }, [nodeName, selectedElements, setNodes]);

  // Function to handle node click events
  const handleNodeClick = (event: any, node: { data: { label: SetStateAction<string>; }; id: string; }) => {
    setSelectedElements([node]);
    setNodeName(node.data.label);
    setNodes((prevNodes: any[]) =>
      prevNodes.map((currentNodes) => ({
        ...currentNodes,
        selected: currentNodes.id === node.id,
      }))
    );
  };

  // Function to count disconnected edges
  const countDisconnectedEdges = () => {
    return edges.reduce((count, edge) => (!edge.targetHandle ? count + 1 : count), 0);
  };

  // Callback function to handle edge connection
  const handleEdgeConnection = useCallback(
    (params: any) => {
      setEdges((existingEdges: Edge[]) => addEdge(params, existingEdges));
    },
    [setEdges]
  )

  // Callback function to check if there are disconnected nodes
  const hasDisconnectedNodes = useCallback(() => {
    return nodes.some(
      (node) =>
        !edges.some((edge) => edge.source === node.id || edge.target === node.id)
    );
  }, [nodes, edges]);

  // Function to save the flow
  const saveFlow = () => {
    if (reactFlowInstance) {
      const emptyTargetHandles = countDisconnectedEdges();

      if (nodes.length > 1 && (emptyTargetHandles > 1 || hasDisconnectedNodes())) {
        toast.error(
          "Please connect all the nodes."
        );
      } else {
        toast.success("Saved successfully!");
      }
    }
  }

  return (
    <main>
      <div className="h-[3.8rem] bg-[#f3f3f3] ">
        <NavBar onSave={saveFlow} />
      </div>
      <div className="h-full w-full flex">
        <div className="w-[80%]">
          <MessageFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            setSelectedElements={setSelectedElements}
            setNodes={setNodes}
            onNodeClick={handleNodeClick}
            reactFlowInstance={reactFlowInstance}
            setReactFlowInstance={setReactFlowInstance}
            handleConnect={handleEdgeConnection}
          />
        </div>
        <div className="w-[20%]">
          <SideBar
            nodeName={nodeName}
            setNodeName={setNodeName}
            selectedNode={selectedElements[0]}
            setSelectedElements={setSelectedElements}
          />
        </div>
      </div>
    </main>
  );
}
