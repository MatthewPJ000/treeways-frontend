import {
  applyNodeChanges,
  applyEdgeChanges,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
  type OnNodesChange,
  type OnEdgesChange,
  type XYPosition,
} from '@xyflow/react';
import { create } from 'zustand';
import { nanoid } from 'nanoid/non-secure';

export type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  addChildNode: (parentNode: Node, position: XYPosition) => void;
  updateNodeLabel: (nodeId: string, label: string) => void;
};

const useStore = create<RFState>((set, get) => ({
  nodes: [
    {
      id: 'root',
      type: 'mindmap',
      data: { label: 'Which Contractor to Use' },
      position: { x: -100, y: 100 },
      style: { backgroundColor: '#ff0072', color: 'white' },
    },
    {
      id: '1',
      type: 'mindmap',
      data: { label: 'Low Bidder but Risky'},
      position: { x: 0, y: 200 },
      parentId: 'root',
      style: { backgroundColor: '#ff0072', color: 'white' },
    },
    {
      id: '1-1',
      type: 'mindmap',
      data: { label: 'On-time Completion'},
      position: { x: -60, y: 80 },
      parentId: '1',
      style: { backgroundColor: '#ff0072', color: 'white' },
    },
    {
      id: '1-1-1',
      type: 'mindmap',
      data: { label: '-200,000' },
      position: { x: -60, y: 160 },
      parentId: '1',
      style: { backgroundColor: '#ff0072', color: 'white' },
    },
    {
      id: '1-2',
      type: 'mindmap',
      data: { label: 'Three Months Late' },
      position: { x: 140, y: 80 },
      parentId: '1',
    },
    {
      id: '1-2-1',
      type: 'mindmap',
      data: { label: '-110,000' },
      position: { x: 140, y: 160 },
      parentId: '1',
    },
    {
      id: '2',
      type: 'mindmap',
      data: { label: 'Reliable High Bidder' },
      position: { x: 240, y: 200 },
      parentId: 'root',
    },
    {
      id: '2-1',
      type: 'mindmap',
      data: { label: 'One Month Late' },
      position: { x: 80, y: 80 },
      parentId: '2',
    },
    {
      id: '2-1-1',
      type: 'mindmap',
      data: { label: '-170,000' },
      position: { x: 80, y: 160 },
      parentId: '2',
    },
    {
      id: '2-2',
      type: 'mindmap',
      data: { label: 'On-Time Completion' },
      position: { x: 260, y: 80 },
      parentId: '2',
    },
    {
      id: '2-2-1',
      type: 'mindmap',
      data: { label: '-140,000' },
      position: { x: 260, y: 160 },
      parentId: '2',
    },
    
  ],
  edges: [
    {
      id: 'r-1',
      source: 'root',
      target: '1',
      animated: true
    },
    {
      id: '1-1',
      source: '1',
      target: '1-1',
      animated: true
    },
    {
      id: '1-1-1',
      source: '1-1',
      target: '1-1-1',
      animated: true
    },
    {
      id: '1-2',
      source: '1',
      target: '1-2',
    },
    {
      id: '1-2-1',
      source: '1-2',
      target: '1-2-1',
    },
    {
      id: 'r-2',
      source: 'root',
      target: '2',
    },
    {
      id: '2-1',
      source: '2',
      target: '2-1',
    },
    {
      id: '2-1-1',
      source: '2-1',
      target: '2-1-1',
    },
    {
      id: '2-2',
      source: '2',
      target: '2-2',
    },
    {
      id: '2-2-1',
      source: '2-2',
      target: '2-2-1',
    },
    
   
  ],
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  addChildNode: (parentNode: Node, position: XYPosition) => {
    const newNode = {
      id: nanoid(),
      type: 'mindmap',
      data: { label: 'New Node' },
      position,
      parentNode: parentNode.id,
    };

    const newEdge = {
      id: nanoid(),
      source: parentNode.id,
      target: newNode.id,
    };

    set({
      nodes: [...get().nodes, newNode],
      edges: [...get().edges, newEdge],
    });
  },
  updateNodeLabel: (nodeId: string, label: string) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          // it's important to create a new object here, to inform React Flow about the changes
          node.data = { ...node.data, label };
        }

        return node;
      }),
    });
  },
}));

export default useStore;
