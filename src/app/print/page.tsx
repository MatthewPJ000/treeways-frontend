"use client";
import React from 'react';
import {
  ReactFlow,
  Controls,
  Panel,
  ReactFlowProvider,
  ConnectionLineType,
  type NodeOrigin,
} from '@xyflow/react';
import useStore from './store';
import MindMapNode from '../../components/MindMapNode';
import MindMapEdge from '../../components/MindMapEdge';

import '@xyflow/react/dist/style.css';

const nodeTypes = {
  mindmap: MindMapNode,
};

const edgeTypes = {
  mindmap: MindMapEdge,
};

const nodeOrigin: NodeOrigin = [0.5, 0.5];
const connectionLineStyle = { stroke: '#F6AD55', strokeWidth: 3 };
const defaultEdgeOptions = { style: connectionLineStyle, type: 'mindmap' };

function PrintFlow() {
  const { nodes, edges, onNodesChange, onEdgesChange } = useStore();

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      connectionLineStyle={connectionLineStyle}
      defaultEdgeOptions={defaultEdgeOptions}
      connectionLineType={ConnectionLineType.Straight}
      nodeOrigin={nodeOrigin}
      fitView
    >
      <Controls showInteractive={false} />
      <Panel position="top-left" className="text-xl font-bold bg-gray-100 p-2 rounded shadow">
        Print Page Mind Map
      </Panel>
    </ReactFlow>
  );
}

export default function PrintPage() {
  return (
    <ReactFlowProvider>
      <div className="w-full h-screen bg-white">
        <PrintFlow />
      </div>
    </ReactFlowProvider>
  );
}