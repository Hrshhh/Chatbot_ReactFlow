import { SetStateAction, useCallback, useMemo, useRef } from "react";
import ReactFlow, { Background, Controls, Edge, MiniMap, addEdge } from "reactflow";
import { ChatNode } from "./ChatNode";

let uniqueId = 1;
export const MessageFlow = ({ nodes, edges,onNodeClick, handleConnect, onNodesChange, onEdgesChange, setNodes, setSelectedElements, reactFlowInstance, setReactFlowInstance }: any) => {
    const reactFlowWrapper = useRef<HTMLDivElement | null>(null);

    const nodeTypes = useMemo(
        () => ({
            chatNode: ChatNode,
        }),
        []
    );

    // Handling the drag over event
    const onDragOver = useCallback((event: {
        dataTransfer: any; preventDefault: () => void;
    }) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = 'move'
    }, [])

    // Handling the drop event
    const handleDropEvent = useCallback(
        (event: { preventDefault: () => void; dataTransfer: { getData: (arg0: string) => any; }; clientX: number; clientY: number; }) => {
            event.preventDefault()
            const flowWrapper = reactFlowWrapper.current;
            const nodeType = event.dataTransfer.getData('application/reactflow')

            if (!nodeType || !flowWrapper) {
                return
            }

            const flowBounds = flowWrapper.getBoundingClientRect()
            const position = reactFlowInstance?.project({
                x: event.clientX - flowBounds.left,
                y: event.clientY - flowBounds.top,
            })

            // Create a new node
            const newNode = {
                id: `node_${uniqueId++}`,
                type: 'chatNode',
                position,
                data: { heading: 'Send message', label: `Chat Node ${uniqueId}` },
            }

            setNodes((prevNodes: any) => [...prevNodes, newNode])
        },
        [reactFlowInstance, setNodes]
    )
    return (
        <div className="h-[calc(100vh-3.8rem)]" ref={reactFlowWrapper}>
            <ReactFlow
                nodes={nodes}
                nodeTypes={nodeTypes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={handleConnect}
                onInit={setReactFlowInstance}
                onDrop={handleDropEvent}
                onDragOver={onDragOver}
                onNodeClick={onNodeClick}
                onPaneClick={() => {
                    setSelectedElements([]);
                    setNodes((nodes: any[]) =>
                        nodes.map((node) => ({
                            ...node,
                            selected: false,
                        }))
                    );
                }}
                fitView
            >
                <Background gap={12} size={1} />
                <Controls />
                <MiniMap zoomable pannable />
            </ReactFlow>
        </div>
    );
}