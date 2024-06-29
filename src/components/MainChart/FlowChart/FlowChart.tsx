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
  // useReactFlow,
  // useStore,
  // updateEdge,
  reconnectEdge, // NOTE: Use instead of deprecated updateEdge,
  ReactFlowInstance,
  Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { TPropsWithClassName } from 'src/core/types';
import { useAppDataStore } from 'src/store/AppDataStore';
import { dragSequenceItemFormatId } from 'src/entities/Sequence/constants';
import { TSequenceItem } from 'src/entities/Sequence/types';

import { DefaultNode, InputNode } from './nodes';
import { ConnectionLine } from './edges';

import styles from './FlowChart.module.scss';

const initialNodes = [
  {
    id: 'initial-node',
    type: 'input',
    data: { label: 'Sequence Start' },
    position: {
      x: window.innerWidth / 2 - 250,
      y: 80,
    },
  },
];

const nodeTypes = {
  input: InputNode,
  default: DefaultNode,
};

export const FlowChart: React.FC<TPropsWithClassName> = observer((props) => {
  const { className } = props;
  const appDataStore = useAppDataStore();
  const {
    sequenceData,
    connectSource,
    // hasSequenceDataChanged,
  } = appDataStore;
  const sequenceName = sequenceData?.name || 'Default sequence';
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const uniqueCounterRef = React.useRef<number>(0);
  const getUniqueNodeId = React.useCallback(() => {
    return ['dndnode', ++uniqueCounterRef.current].join('-');
  }, [uniqueCounterRef]);
  const [reactFlowInstance, setReactFlowInstance] = React.useState<ReactFlowInstance | undefined>();
  // const [connectSource, setConnectSource] = React.useState<string | undefined>();
  const onConnectStart = React.useCallback(
    (_event: any, params: any) => {
      const { nodeId } = params;
      /* console.log('[onConnectStart]', {
       *   nodeId,
       *   _event,
       *   params,
       * });
       */
      appDataStore.setConnectSource(nodeId);
    },
    [appDataStore],
  );
  const onConnectEnd = React.useCallback(
    (_event: any) => {
      /* console.log('[onConnectEnd]', {
       *   _event,
       * });
       */
      appDataStore.setConnectSource(undefined);
    },
    [appDataStore],
  );
  // DEBUG
  React.useEffect(() => {
    /* console.log('[FlowChart:connectSource]', {
     *   connectSource,
     * });
     */
  }, [connectSource]);

  const onConnect = React.useCallback(
    (params: any) => {
      /* console.log('[onConnect]', {
       *   params,
       * });
       */
      const sourceNum = Number(params.source.slice(8));
      const targetNum = Number(params.target.slice(8));
      if (sourceNum > targetNum) {
        return;
      }

      let existedEdge = edges.find(
        (edge) => edge.source === params.source && edge.sourceHandle === params.sourceHandle,
      );

      if (existedEdge) {
        setEdges((eds) => {
          return reconnectEdge(existedEdge as Edge, params, eds);
        });
        return;
      }

      const edgeColor =
        params.sourceHandle === 'black'
          ? 'green'
          : params.sourceHandle === 'blue'
            ? '#0B66C2'
            : params.sourceHandle;

      const _params = {
        ...params,
        type: 'smoothstep',
        markerEnd: {
          type: MarkerType.Arrow,
          color: edgeColor,
        },
        style: {
          stroke: edgeColor,
        },
      };

      setEdges((eds) => addEdge(_params, eds));
    },
    [edges, setEdges],
  );

  const onDragOver = React.useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  const onDrop = React.useCallback(
    (event: any) => {
      event.preventDefault();
      const dataJson = event.dataTransfer.getData(dragSequenceItemFormatId);
      const itemData = dataJson ? (JSON.parse(dataJson) as TSequenceItem) : undefined;

      // Check if the dropped element is valid
      if (!itemData?.itemId || !reactFlowInstance) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const uniqueId = getUniqueNodeId();

      /* console.log('[FlowChart:onDrop]', {
       *   uniqueId,
       *   itemData,
       *   position,
       * });
       */

      // TODO: Add new node to a chart
      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const newNode = {
        id: uniqueId,
        type: 'default',
        position,
        data: {
          state: {
            task: sequenceName,
            transitions: {
              success: 'end',
              fail: 'end',
            },
          },
          campaignStatus: 'draft', // campaign.status,
          label: itemData.text,
        },
      };
      setNodes((nds) => {
        return nds.concat(newNode);
      });
    },
    [getUniqueNodeId, reactFlowInstance, setNodes, sequenceName],
  );

  const rootStyle: SxProps = {
    // border: '1px solid red', // DEBUG
  };
  const flowStyle: React.CSSProperties = {
    // ...
  };

  return (
    <ReactFlowProvider>
      <Stack
        // prettier-ignore
        className={classNames(className, styles.Root)}
        sx={rootStyle}
        flex={1}
        overflow="hidden"
      >
        <ReactFlow
          className={classNames(styles.Flow)}
          nodes={nodes}
          edges={edges}
          // @ts-ignore
          edgeTypes={StepEdge}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          nodeTypes={nodeTypes}
          nodesDraggable
          // @ts-ignore
          onInit={setReactFlowInstance}
          connectionLineComponent={ConnectionLine}
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
