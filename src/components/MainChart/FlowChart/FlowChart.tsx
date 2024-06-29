import React from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { Stack, SxProps } from '@mui/material';
import ReactFlow, {
  // prettier-ignore
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  StepEdge,
  MarkerType,
  useReactFlow,
  useStore,
  reconnectEdge, // NOTE: Use instead obsolette updateEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { TPropsWithClassName } from 'src/core/types';
import { useAppDataStore } from 'src/store/AppDataStore';
import { dragSequenceItemFormatId } from 'src/entities/Sequence/constants';
import { TSequenceItem } from 'src/entities/Sequence/types';

const initialNodes = [
  {
    id: 'initial-node',
    type: 'input',
    data: { label: 'Sequence Start' },
    position: {
      x: window.innerWidth > 636 ? window.innerWidth / 2 - 250 : window.innerWidth / 2 - 80,
      y: 80,
    },
  },
];

export const FlowChart: React.FC<TPropsWithClassName> = observer((props) => {
  const { className } = props;
  const appDataStore = useAppDataStore();
  const {
    sequenceData,
    // hasSequenceDataChanged,
  } = appDataStore;
  const hasData = !!sequenceData;
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = React.useState(null);
  const onDragOver = React.useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  const onDrop = React.useCallback((event: any) => {
    event.preventDefault();
    const dataJson = event.dataTransfer.getData(dragSequenceItemFormatId);
    const itemData = dataJson ? (JSON.parse(dataJson) as TSequenceItem) : undefined;

    console.log('[FlowChart:onDrop]', {
      itemData,
    });

    // Check if the dropped element is valid
    if (!itemData?.itemId) {
      return;
    }

    /* // TODO: Add new node to a chart
     * // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
     * // and you don't need to subtract the reactFlowBounds.left/top anymore
     * // details: https://reactflow.dev/whats-new/2023-11-10
     * // @ts-ignore
     * const position = reactFlowInstance.screenToFlowPosition({
     *   x: event.clientX,
     *   y: event.clientY,
     * });
     * const newNode = {
     *   id: getId(),
     *   type: data.type,
     *   position,
     *   data: {
     *     state: {
     *       task: data.name,
     *       transitions: {
     *         success: "end",
     *         fail: "end"
     *       }
     *     },
     *     campaignStatus: campaign.status,
     *     label: data.label,
     *   }
     * };
     * setNodes((nds) => { return nds.concat(newNode) });
     */
  }, []);

  const rootStyle: SxProps = {
    // border: '1px solid red', // DEBUG
  };
  const flowStyle: React.CSSProperties = {
    // ...
  };

  const nodeTypes = React.useMemo(
    () => ({
      // input: InputNode,
      // default: DefaultNode,
    }),
    [],
  );

  return (
    <ReactFlowProvider>
      <Stack
        // prettier-ignore
        className={classNames(className, 'FlowChart')}
        onDrop={onDrop}
        onDragOver={onDragOver}
        sx={rootStyle}
        flex={1}
        overflow="hidden"
      >
        <ReactFlow
          className={classNames('FlowChart_Flow')}
          nodes={nodes}
          edges={edges}
          // @ts-ignore
          edgeTypes={StepEdge}
          // onNodesChange={onNodesChange}
          // onEdgesChange={onEdgesChange}
          // onConnect={onConnect}
          // onConnectStart={onConnectStart}
          // onConnectEnd={onConnectEnd}
          nodeTypes={nodeTypes}
          nodesDraggable
          // @ts-ignore
          onInit={setReactFlowInstance}
          // connectionLineComponent={ConnectionLine}
          maxZoom={5}
          minZoom={0.2}
          onDrop={onDrop}
          onDragOver={onDragOver}
          style={flowStyle}
          flex={1}
        />
      </Stack>
    </ReactFlowProvider>
  );
});
