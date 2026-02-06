// import { StrictMode, useMemo, useCallback } from 'react';
// import { createRoot } from 'react-dom/client';
// import {
//     Background,
//     BackgroundVariant,
//     MarkerType,
//     Position,
//     ReactFlow,
//     ReactFlowProvider,
//     type Node,
//     type NodeProps,
// } from '@xyflow/react';
// import '@xyflow/react/dist/style.css';
// import { addEdge, Connection, Edge } from "reactflow";


// type MetricStat = {
//     label: string;
//     value: string;
//     change: string;
//     changeColor: string;
// };

// type ProgressInfo = {
//     label: string;
//     summary: string;
//     percent: number;
//     trackColor: string;
//     fillColor: string;
// };

// type StatusInfo = {
//     text: string;
//     textColor: string;
//     background: string;
// };

// type MetricNodeData = {
//     title: string;
//     subtitle: string;
//     badgeLabel: string;
//     stats: MetricStat[];
//     status?: StatusInfo;
//     progress?: ProgressInfo;
//     detailsLabel?: string;
// };

// type TaskNodeData = {
//     title: string;
//     tool: string;
//     toolColor: string;
//     info: string;
//     detailsLabel: string;
//     status: StatusInfo;
//     progressPercent: number;
//     progressTrack: string;
//     progressFill: string;
// };

// type ScoreNodeData = {
//     value: string;
//     tone: 'positive' | 'negative';
// };

// const cardShadow = '0 24px 55px rgba(15, 23, 42, 0.16)';

// const statusPillStyle = (status: StatusInfo) => ({
//     background: status.background,
//     color: status.textColor,
//     borderRadius: 999,
//     padding: '4px 12px',
//     fontSize: 12,
//     fontWeight: 600,
//     letterSpacing: 0.2
// });

// const changeColorStyle = (color: string) => ({
//     color,
//     fontSize: 12,
//     fontWeight: 600
// });

// function MetricNode({ data }: { data: MetricNodeData }) {
//     return (
//         <div
//             style={{
//                 width: 280,
//                 background: '#FFFFFF',
//                 borderRadius: 18,
//                 boxShadow: cardShadow,
//                 border: '1px solid #E2E8F0',
//                 padding: '18px 22px',
//                 fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
//             }}
//         >
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
//                 <div>
//                     <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', lineHeight: 1.3 }}>{data.title}</div>
//                     <div style={{ fontSize: 12, color: '#475569', marginTop: 6 }}>{data.subtitle}</div>
//                 </div>
//                 {data.detailsLabel ? (
//                     <span style={{ fontSize: 12, color: '#3B82F6', fontWeight: 600 }}>{data.detailsLabel}</span>
//                 ) : data.status ? (
//                     <span style={statusPillStyle(data.status)}>{data.status.text}</span>
//                 ) : null}
//             </div>

//             <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, color: '#1E293B', fontSize: 13 }}>
//                 <span
//                     style={{
//                         width: 8,
//                         height: 8,
//                         borderRadius: '50%',
//                         background: '#2563EB',
//                         boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.15)'
//                     }}
//                 />
//                 <span style={{ fontWeight: 600 }}>{data.badgeLabel}</span>
//             </div>

//             <div
//                 style={{
//                     marginTop: 16,
//                     display: 'grid',
//                     gridTemplateColumns: `repeat(${Math.max(data.stats.length, 1)}, minmax(0, 1fr))`,
//                     gap: 16
//                 }}
//             >
//                 {data.stats.map((stat) => (
//                     <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
//                         <span style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.3 }}>{stat.label}</span>
//                         <span style={{ fontSize: 18, fontWeight: 700, color: '#0F172A' }}>{stat.value}</span>
//                         <span style={changeColorStyle(stat.changeColor)}>{stat.change}</span>
//                     </div>
//                 ))}
//             </div>

//             {data.progress ? (
//                 <div style={{ marginTop: 18 }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#475569', marginBottom: 8 }}>
//                         <span>{data.progress.label}</span>
//                         <span style={{ fontWeight: 600 }}>{data.progress.summary}</span>
//                     </div>
//                     <div
//                         style={{
//                             width: '100%',
//                             height: 8,
//                             borderRadius: 999,
//                             background: data.progress.trackColor,
//                             overflow: 'hidden'
//                         }}
//                     >
//                         <div
//                             style={{
//                                 width: `${data.progress.percent}%`,
//                                 height: '100%',
//                                 background: data.progress.fillColor
//                             }}
//                         />
//                     </div>
//                 </div>
//             ) : null}
//         </div>
//     );
// }

// function TaskNode({ data }: { data: TaskNodeData }) {
//     return (
//         <div
//             style={{
//                 width: 280,
//                 background: '#FFFFFF',
//                 borderRadius: 18,
//                 boxShadow: cardShadow,
//                 border: '1px solid #E2E8F0',
//                 padding: '18px 22px',
//                 fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
//             }}
//         >
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
//                 <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', lineHeight: 1.3 }}>{data.title}</div>
//                 <span style={{ fontSize: 12, color: '#3B82F6', fontWeight: 600 }}>{data.detailsLabel}</span>
//             </div>

//             <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, color: '#475569', fontSize: 13 }}>
//                 <span
//                     style={{
//                         width: 8,
//                         height: 8,
//                         borderRadius: '50%',
//                         background: data.toolColor,
//                         boxShadow: `0 0 0 3px ${data.toolColor}26`
//                     }}
//                 />
//                 <span style={{ fontWeight: 600 }}>{data.tool}</span>
//             </div>

//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
//                 <span style={{ fontSize: 12, color: '#64748B' }}>{data.info}</span>
//                 <span style={statusPillStyle(data.status)}>{data.status.text}</span>
//             </div>

//             <div
//                 style={{
//                     marginTop: 12,
//                     width: '100%',
//                     height: 8,
//                     borderRadius: 999,
//                     background: data.progressTrack,
//                     overflow: 'hidden'
//                 }}
//             >
//                 <div
//                     style={{
//                         width: `${data.progressPercent}%`,
//                         height: '100%',
//                         background: data.progressFill
//                     }}
//                 />
//             </div>
//         </div>
//     );
// }

// function ScoreNode({ data }: { data: ScoreNodeData }) {
//     const isPositive = data.tone === 'positive';
//     const color = isPositive ? '#16A34A' : '#DC2626';
//     const background = isPositive ? 'rgba(34, 197, 94, 0.12)' : 'rgba(248, 113, 113, 0.16)';

//     return (
//         <div
//             style={{
//                 width: 76,
//                 padding: '8px 0',
//                 textAlign: 'center',
//                 borderRadius: 999,
//                 background,
//                 color,
//                 fontWeight: 700,
//                 fontSize: 14,
//                 boxShadow: 'inset 0 0 0 1px rgba(148, 163, 184, 0.4)',
//                 fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
//             }}
//         >
//             {data.value}
//         </div>
//     );
// }

// function StrategyDiagram() {
//     const nodeTypes = useMemo(() => ({ metric: MetricNode, task: TaskNode, score: ScoreNode }), []);

//     const nodes = useMemo<Node[]>(
//         () => [
//             {
//                 id: 'new-marketing',
//                 type: 'task',
//                 position: { x: 0, y: -160 },
//                 sourcePosition: Position.Right,
//                 data: {
//                     title: 'New marketing campaign',
//                     tool: 'Asana (Project)',
//                     toolColor: '#FBBF24',
//                     info: '4 issues · 67% done',
//                     detailsLabel: 'Details',
//                     status: { text: 'In review', textColor: '#B45309', background: '#FEF3C7' },
//                     progressPercent: 67,
//                     progressTrack: '#F1F5F9',
//                     progressFill: '#FACC15'
//                 },
//                 draggable: false,
//                 selectable: false
//             },
//             {
//                 id: 'social-notifications',
//                 type: 'task',
//                 position: { x: 0, y: 0 },
//                 sourcePosition: Position.Right,
//                 data: {
//                     title: 'Social notifications',
//                     tool: 'Jira (Epic)',
//                     toolColor: '#2563EB',
//                     info: '4 issues · 50% done',
//                     detailsLabel: 'Details',
//                     status: { text: 'To do', textColor: '#B45309', background: '#FEF3C7' },
//                     progressPercent: 50,
//                     progressTrack: '#F1F5F9',
//                     progressFill: '#FACC15'
//                 },
//                 draggable: false,
//                 selectable: false
//             },
//             {
//                 id: 'time-based',
//                 type: 'task',
//                 position: { x: 0, y: 150 },
//                 sourcePosition: Position.Right,
//                 data: {
//                     title: 'Time-based notifications',
//                     tool: 'Jira (Epic)',
//                     toolColor: '#2563EB',
//                     info: '1 issue · 100% done',
//                     detailsLabel: 'Details',
//                     status: { text: 'Done', textColor: '#0369A1', background: '#DBEAFE' },
//                     progressPercent: 100,
//                     progressTrack: '#F1F5F9',
//                     progressFill: '#60A5FA'
//                 },
//                 draggable: false,
//                 selectable: false
//             },
//             {
//                 id: 'ai-model',
//                 type: 'task',
//                 position: { x: 0, y: 300 },
//                 sourcePosition: Position.Right,
//                 data: {
//                     title: 'AI model for song recommendations',
//                     tool: 'Jira (Epic)',
//                     toolColor: '#2563EB',
//                     info: '4 issues · 25% done',
//                     detailsLabel: 'Details',
//                     status: { text: 'In progress', textColor: '#047857', background: '#DCFCE7' },
//                     progressPercent: 25,
//                     progressTrack: '#F1F5F9',
//                     progressFill: '#10B981'
//                 },
//                 draggable: false,
//                 selectable: false
//             },
//             {
//                 id: 'sharing-prompts',
//                 type: 'task',
//                 position: { x: 0, y: 450 },
//                 sourcePosition: Position.Right,
//                 data: {
//                     title: 'More prominent sharing prompts',
//                     tool: 'Jira (Epic)',
//                     toolColor: '#2563EB',
//                     info: '4 issues · 100% done',
//                     detailsLabel: 'Details',
//                     status: { text: 'Done', textColor: '#0369A1', background: '#DBEAFE' },
//                     progressPercent: 100,
//                     progressTrack: '#F1F5F9',
//                     progressFill: '#60A5FA'
//                 },
//                 draggable: false,
//                 selectable: false
//             },
//             {
//                 id: 'premium-trial',
//                 type: 'metric',
//                 position: { x: 320, y: -120 },
//                 targetPosition: Position.Left,
//                 sourcePosition: Position.Right,
//                 data: {
//                     title: 'Premium trial users',
//                     subtitle: 'Metric (Input) · Sum',
//                     badgeLabel: 'Metric (Input)',
//                     detailsLabel: 'Metric',
//                     stats: [
//                         { label: 'Past 7 days', value: '4,570', change: '+0.87%', changeColor: '#16A34A' },
//                         { label: 'Past 6 weeks', value: '26,958', change: '+2.71%', changeColor: '#16A34A' },
//                         { label: 'Past 12 months', value: '210,135', change: '+38.26%', changeColor: '#16A34A' }
//                     ]
//                 },
//                 draggable: false,
//                 selectable: false
//             },
//             {
//                 id: 'avg-sessions',
//                 type: 'metric',
//                 position: { x: 320, y: 40 },
//                 targetPosition: Position.Left,
//                 sourcePosition: Position.Right,
//                 data: {
//                     title: 'Avg. sessions per week',
//                     subtitle: 'Metric (Input) · Average',
//                     badgeLabel: 'Metric (Input)',
//                     detailsLabel: 'Metric',
//                     stats: [
//                         { label: 'Past 7 days', value: '641.45', change: '+1.04%', changeColor: '#16A34A' },
//                         { label: 'Past 6 weeks', value: '633.3', change: '+1.44%', changeColor: '#16A34A' },
//                         { label: 'Past 12 months', value: '570.13', change: '+39.7%', changeColor: '#16A34A' }
//                     ]
//                 },
//                 draggable: false,
//                 selectable: false
//             },
//             {
//                 id: 'avg-duration',
//                 type: 'metric',
//                 position: { x: 320, y: 200 },
//                 targetPosition: Position.Left,
//                 sourcePosition: Position.Right,
//                 data: {
//                     title: 'Average session duration',
//                     subtitle: 'Metric (Input) · Sum',
//                     badgeLabel: 'Metric (Input)',
//                     detailsLabel: 'Metric',
//                     stats: [
//                         { label: 'Past 7 days', value: '0 mins', change: '-100%', changeColor: '#DC2626' },
//                         { label: 'Past 6 weeks', value: '0 mins', change: '-100%', changeColor: '#DC2626' },
//                         { label: 'Past 12 months', value: '17,085.74 mins', change: '-56.99%', changeColor: '#DC2626' }
//                     ],
//                     progress: { label: 'Goal · 50,000 for 2023', summary: '34% complete', percent: 34, trackColor: '#F1F5F9', fillColor: '#FACC15' }
//                 },
//                 draggable: false,
//                 selectable: false
//             },
//             {
//                 id: 'avg-shares',
//                 type: 'metric',
//                 position: { x: 320, y: 360 },
//                 targetPosition: Position.Left,
//                 sourcePosition: Position.Right,
//                 data: {
//                     title: 'Avg. shares per session',
//                     subtitle: 'Metric (Input) · Average',
//                     badgeLabel: 'Metric (Input)',
//                     detailsLabel: 'Metric',
//                     stats: [
//                         { label: 'Past 7 days', value: '653.37', change: '+0.51%', changeColor: '#16A34A' },
//                         { label: 'Past 6 weeks', value: '658.83', change: '+2.38%', changeColor: '#16A34A' },
//                         { label: 'Past 12 months', value: '593.1', change: '+33.18%', changeColor: '#16A34A' }
//                     ]
//                 },
//                 draggable: false,
//                 selectable: false
//             },
//             {
//                 id: 'score-premium',
//                 type: 'score',
//                 position: { x: 540, y: -50 },
//                 targetPosition: Position.Left,
//                 sourcePosition: Position.Right,
//                 data: { value: '0.998', tone: 'positive' },
//                 draggable: false,
//                 selectable: false
//             },
//             {
//                 id: 'score-sessions',
//                 type: 'score',
//                 position: { x: 540, y: 110 },
//                 targetPosition: Position.Left,
//                 sourcePosition: Position.Right,
//                 data: { value: '0.998', tone: 'positive' },
//                 draggable: false,
//                 selectable: false
//             },
//             {
//                 id: 'score-duration',
//                 type: 'score',
//                 position: { x: 540, y: 230 },
//                 targetPosition: Position.Left,
//                 sourcePosition: Position.Right,
//                 data: { value: '-0.644', tone: 'negative' },
//                 draggable: false,
//                 selectable: false
//             },
//             {
//                 id: 'score-shares',
//                 type: 'score',
//                 position: { x: 540, y: 360 },
//                 targetPosition: Position.Left,
//                 sourcePosition: Position.Right,
//                 data: { value: '0.999', tone: 'positive' },
//                 draggable: false,
//                 selectable: false
//             },
//             {
//                 id: 'time-spent',
//                 type: 'metric',
//                 position: { x: 700, y: 160 },
//                 targetPosition: Position.Left,
//                 sourcePosition: Position.Right,
//                 data: {
//                     title: 'Time spent listening to music by subscribers',
//                     subtitle: 'Metric (North Star) · Sum',
//                     badgeLabel: 'Core Metric',
//                     stats: [
//                         { label: 'Past 7 days', value: '4.41k mins', change: '+0.43%', changeColor: '#16A34A' },
//                         { label: 'Past 6 weeks', value: '26.15k mins', change: '+2.57%', changeColor: '#16A34A' },
//                         { label: 'Past 12 months', value: '198.31k mins', change: '+38.59%', changeColor: '#16A34A' }
//                     ]
//                 },
//                 draggable: false,
//                 selectable: false
//             },
//             {
//                 id: 'score-right-top',
//                 type: 'score',
//                 position: { x: 900, y: 60 },
//                 targetPosition: Position.Left,
//                 sourcePosition: Position.Right,
//                 data: { value: '0.388', tone: 'positive' },
//                 draggable: false,
//                 selectable: false
//             },
//             {
//                 id: 'score-right-mid',
//                 type: 'score',
//                 position: { x: 900, y: 180 },
//                 targetPosition: Position.Left,
//                 sourcePosition: Position.Right,
//                 data: { value: '0.999', tone: 'positive' },
//                 draggable: false,
//                 selectable: false
//             },
//             {
//                 id: 'score-right-bottom',
//                 type: 'score',
//                 position: { x: 900, y: 300 },
//                 targetPosition: Position.Left,
//                 sourcePosition: Position.Right,
//                 data: { value: '0.998', tone: 'positive' },
//                 draggable: false,
//                 selectable: false
//             },
//             {
//                 id: 'arr',
//                 type: 'metric',
//                 position: { x: 1040, y: -20 },
//                 targetPosition: Position.Left,
//                 data: {
//                     title: 'ARR',
//                     subtitle: 'Metric (KPI) · Amount increased',
//                     badgeLabel: 'ARR',
//                     detailsLabel: 'Metric',
//                     stats: [
//                         { label: 'Past 7 days', value: '$0', change: '+100%', changeColor: '#16A34A' },
//                         { label: 'Past 6 weeks', value: '$-60', change: '-100.17%', changeColor: '#DC2626' },
//                         { label: 'Past 12 months', value: '$56,760', change: '+1,676.67%', changeColor: '#16A34A' }
//                     ]
//                 },
//                 draggable: false,
//                 selectable: false
//             },
//             {
//                 id: 'monthly-retention',
//                 type: 'metric',
//                 position: { x: 1040, y: 150 },
//                 targetPosition: Position.Left,
//                 data: {
//                     title: 'Monthly retention',
//                     subtitle: 'Metric (KPI) · Average',
//                     badgeLabel: 'Retention',
//                     detailsLabel: 'Metric',
//                     stats: [
//                         { label: 'Past 7 days', value: '72,315.8%', change: '+0.59%', changeColor: '#16A34A' },
//                         { label: 'Past 6 weeks', value: '71,521.9%', change: '+3.32%', changeColor: '#16A34A' },
//                         { label: 'Past 12 months', value: '63,825.8%', change: '+37.7%', changeColor: '#16A34A' }
//                     ]
//                 },
//                 draggable: false,
//                 selectable: false
//             },
//             {
//                 id: 'monthly-premium',
//                 type: 'metric',
//                 position: { x: 1040, y: 320 },
//                 targetPosition: Position.Left,
//                 data: {
//                     title: 'Monthly premium subscriptions',
//                     subtitle: 'Metric (KPI) · Sum',
//                     badgeLabel: 'Premium',
//                     detailsLabel: 'Metric',
//                     stats: [
//                         { label: 'Past 7 days', value: '$5,417.23', change: '+0.59%', changeColor: '#16A34A' },
//                         { label: 'Past 6 weeks', value: '$32,032.44', change: '+3.14%', changeColor: '#16A34A' },
//                         { label: 'Past 12 months', value: '$246,597.93', change: '+35.85%', changeColor: '#16A34A' }
//                     ]
//                 },
//                 draggable: false,
//                 selectable: false
//             }
//         ],
//         []
//     );

//     const edges = useMemo<Edge[]>(
//         () => [
//             {
//                 id: 'edge-marketing-premium',
//                 source: 'new-marketing',
//                 target: 'premium-trial',
//                 type: 'smoothstep',
//                 style: { stroke: '#CBD5F5', strokeWidth: 2, strokeDasharray: '4 6' },
//                 markerEnd: { type: MarkerType.ArrowClosed, color: '#CBD5F5', width: 14, height: 14 }
//             },
//             {
//                 id: 'edge-social-sessions',
//                 source: 'social-notifications',
//                 target: 'avg-sessions',
//                 type: 'smoothstep',
//                 style: { stroke: '#CBD5F5', strokeWidth: 2, strokeDasharray: '4 6' },
//                 markerEnd: { type: MarkerType.ArrowClosed, color: '#CBD5F5', width: 14, height: 14 }
//             },
//             {
//                 id: 'edge-time-duration',
//                 source: 'time-based',
//                 target: 'avg-duration',
//                 type: 'smoothstep',
//                 style: { stroke: '#CBD5F5', strokeWidth: 2, strokeDasharray: '4 6' },
//                 markerEnd: { type: MarkerType.ArrowClosed, color: '#CBD5F5', width: 14, height: 14 }
//             },
//             {
//                 id: 'edge-ai-duration',
//                 source: 'ai-model',
//                 target: 'avg-duration',
//                 type: 'smoothstep',
//                 style: { stroke: '#CBD5F5', strokeWidth: 2, strokeDasharray: '4 6' },
//                 markerEnd: { type: MarkerType.ArrowClosed, color: '#CBD5F5', width: 14, height: 14 }
//             },
//             {
//                 id: 'edge-sharing-shares',
//                 source: 'sharing-prompts',
//                 target: 'avg-shares',
//                 type: 'smoothstep',
//                 style: { stroke: '#CBD5F5', strokeWidth: 2, strokeDasharray: '4 6' },
//                 markerEnd: { type: MarkerType.ArrowClosed, color: '#CBD5F5', width: 14, height: 14 }
//             },
//             {
//                 id: 'edge-premium-score',
//                 source: 'premium-trial',
//                 target: 'score-premium',
//                 type: 'smoothstep',
//                 style: { stroke: '#86EFAC', strokeWidth: 3, strokeDasharray: '2 4' },
//                 markerEnd: { type: MarkerType.ArrowClosed, color: '#16A34A', width: 16, height: 16 }
//             },
//             {
//                 id: 'edge-score-premium-root',
//                 source: 'score-premium',
//                 target: 'time-spent',
//                 type: 'smoothstep',
//                 style: { stroke: '#16A34A', strokeWidth: 3, strokeDasharray: '6 6' },
//                 markerEnd: { type: MarkerType.ArrowClosed, color: '#16A34A', width: 18, height: 18 }
//             },
//             {
//                 id: 'edge-sessions-score',
//                 source: 'avg-sessions',
//                 target: 'score-sessions',
//                 type: 'smoothstep',
//                 style: { stroke: '#86EFAC', strokeWidth: 3, strokeDasharray: '2 4' },
//                 markerEnd: { type: MarkerType.ArrowClosed, color: '#16A34A', width: 16, height: 16 }
//             },
//             {
//                 id: 'edge-score-sessions-root',
//                 source: 'score-sessions',
//                 target: 'time-spent',
//                 type: 'smoothstep',
//                 style: { stroke: '#16A34A', strokeWidth: 3, strokeDasharray: '6 6' },
//                 markerEnd: { type: MarkerType.ArrowClosed, color: '#16A34A', width: 18, height: 18 }
//             },
//             {
//                 id: 'edge-duration-score',
//                 source: 'avg-duration',
//                 target: 'score-duration',
//                 type: 'smoothstep',
//                 style: { stroke: '#FCA5A5', strokeWidth: 3, strokeDasharray: '4 6' },
//                 markerEnd: { type: MarkerType.ArrowClosed, color: '#DC2626', width: 16, height: 16 }
//             },
//             {
//                 id: 'edge-score-duration-root',
//                 source: 'score-duration',
//                 target: 'time-spent',
//                 type: 'smoothstep',
//                 style: { stroke: '#DC2626', strokeWidth: 3, strokeDasharray: '6 6' },
//                 markerEnd: { type: MarkerType.ArrowClosed, color: '#DC2626', width: 18, height: 18 }
//             },
//             {
//                 id: 'edge-shares-score',
//                 source: 'avg-shares',
//                 target: 'score-shares',
//                 type: 'smoothstep',
//                 style: { stroke: '#86EFAC', strokeWidth: 3, strokeDasharray: '2 4' },
//                 markerEnd: { type: MarkerType.ArrowClosed, color: '#16A34A', width: 16, height: 16 }
//             },
//             {
//                 id: 'edge-score-shares-root',
//                 source: 'score-shares',
//                 target: 'time-spent',
//                 type: 'smoothstep',
//                 style: { stroke: '#16A34A', strokeWidth: 3, strokeDasharray: '6 6' },
//                 markerEnd: { type: MarkerType.ArrowClosed, color: '#16A34A', width: 18, height: 18 }
//             },
//             {
//                 id: 'edge-root-score-top',
//                 source: 'time-spent',
//                 target: 'score-right-top',
//                 type: 'smoothstep',
//                 style: { stroke: '#16A34A', strokeWidth: 3, strokeDasharray: '6 6' },
//                 markerEnd: { type: MarkerType.ArrowClosed, color: '#16A34A', width: 18, height: 18 }
//             },
//             {
//                 id: 'edge-root-score-mid',
//                 source: 'time-spent',
//                 target: 'score-right-mid',
//                 type: 'smoothstep',
//                 style: { stroke: '#16A34A', strokeWidth: 3, strokeDasharray: '6 6' },
//                 markerEnd: { type: MarkerType.ArrowClosed, color: '#16A34A', width: 18, height: 18 }
//             },
//             {
//                 id: 'edge-root-score-bottom',
//                 source: 'time-spent',
//                 target: 'score-right-bottom',
//                 type: 'smoothstep',
//                 style: { stroke: '#16A34A', strokeWidth: 3, strokeDasharray: '6 6' },
//                 markerEnd: { type: MarkerType.ArrowClosed, color: '#16A34A', width: 18, height: 18 }
//             },
//             {
//                 id: 'edge-score-top-arr',
//                 source: 'score-right-top',
//                 target: 'arr',
//                 type: 'smoothstep',
//                 style: { stroke: '#86EFAC', strokeWidth: 3, strokeDasharray: '2 4' },
//                 markerEnd: { type: MarkerType.ArrowClosed, color: '#16A34A', width: 16, height: 16 }
//             },
//             {
//                 id: 'edge-score-mid-retention',
//                 source: 'score-right-mid',
//                 target: 'monthly-retention',
//                 type: 'smoothstep',
//                 style: { stroke: '#86EFAC', strokeWidth: 3, strokeDasharray: '2 4' },
//                 markerEnd: { type: MarkerType.ArrowClosed, color: '#16A34A', width: 16, height: 16 }
//             },
//             {
//                 id: 'edge-score-bottom-premium',
//                 source: 'score-right-bottom',
//                 target: 'monthly-premium',
//                 type: 'smoothstep',
//                 style: { stroke: '#86EFAC', strokeWidth: 3, strokeDasharray: '2 4' },
//                 markerEnd: { type: MarkerType.ArrowClosed, color: '#16A34A', width: 16, height: 16 }
//             }
//         ],
//         []
//     );

//     // const onConnect = useCallback(
//     //     (params: Connection | Edge) => setEdges((eds: any) => addEdge(params, eds)),
//     //     []
//     // );

//     const onConnect = useCallback(() => {}, []);
//     return (
//         <div
//             style={{
//                 width: '100%',
//                 minHeight: '840px',
//                 background: '#EEF3F8',
//                 padding: '32px',
//                 boxSizing: 'border-box'
//             }}
//         >
//             <div
//                 style={{
//                     height: '760px',
//                     borderRadius: 24,
//                     overflow: 'hidden',
//                     border: '1px solid #CBD5F5',
//                     boxShadow: '0 30px 60px rgba(15, 23, 42, 0.10)'
//                 }}
//             >
//                 <ReactFlowProvider>
//                     <ReactFlow
//                         nodes={nodes}
//                         edges={edges}
//                         nodeTypes={nodeTypes}
//                         fitView
//                         onConnect={onConnect}
//                         minZoom={0.5}
//                         maxZoom={1.25}
//                         nodesDraggable={false}
//                         nodesConnectable={false}
//                         elementsSelectable={false}
//                         panOnScroll
//                         proOptions={{ hideAttribution: true }}
//                     // style={{ background: 'transparent' }}
//                     />
//                     {/* <Background color="#CBD5F5" variant={BackgroundVariant.Dots} gap={28} size={1.2} /> */}
//                     {/* </ReactFlow> */}
//                 </ReactFlowProvider>
//             </div>
//         </div>
//     );
// }

// async function app() {
//     createRoot(document.getElementById('app')!).render(
//         <StrictMode>
//             <StrategyDiagram />
//         </StrictMode>
//     );
// }

// document.addEventListener('DOMContentLoaded', app);

"use client";

import { useMemo, useCallback } from "react";
import {
    ReactFlow,
    ReactFlowProvider,
    Background,
    BackgroundVariant,
    MarkerType,
    Position,
    type Node,
    type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

/* ======================
   Types
====================== */

type MetricStat = {
    label: string;
    value: string;
    change: string;
    changeColor: string;
};

type ProgressInfo = {
    label: string;
    summary: string;
    percent: number;
    trackColor: string;
    fillColor: string;
};

type StatusInfo = {
    text: string;
    textColor: string;
    background: string;
};

type MetricNodeData = {
    title: string;
    subtitle: string;
    badgeLabel: string;
    stats: MetricStat[];
    status?: StatusInfo;
    progress?: ProgressInfo;
    detailsLabel?: string;
};

type TaskNodeData = {
    title: string;
    tool: string;
    toolColor: string;
    info: string;
    detailsLabel: string;
    status: StatusInfo;
    progressPercent: number;
    progressTrack: string;
    progressFill: string;
};

type ScoreNodeData = {
    value: string;
    tone: "positive" | "negative";
};

/* ======================
   Helpers (Dummy Data)
====================== */

const pct = (v: number) => `${v.toFixed(2)}%`;
const num = (v: number) => v.toLocaleString();

const stat = (label: string, value: number, change: number): MetricStat => ({
    label,
    value: num(value),
    change: `${change >= 0 ? "+" : ""}${pct(change)}`,
    changeColor: change >= 0 ? "#16A34A" : "#DC2626",
});

/* ======================
   Styles
====================== */

const cardShadow = "0 24px 55px rgba(15,23,42,.16)";

const pill = (s: StatusInfo) => ({
    background: s.background,
    color: s.textColor,
    padding: "4px 12px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
});

/* ======================
   Nodes
====================== */

function MetricNode({ data }: { data: MetricNodeData }) {
    return (
        <div style={{
            width: 280,
            background: "#fff",
            borderRadius: 18,
            padding: "18px 22px",
            boxShadow: cardShadow,
            border: "1px solid #E2E8F0",
            fontFamily: "Inter, system-ui"
        }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <div style={{ fontWeight: 700 }}>{data.title}</div>
                    <div style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>
                        {data.subtitle}
                    </div>
                </div>
                {data.detailsLabel && (
                    <span style={{ fontSize: 12, color: "#3B82F6", fontWeight: 600 }}>
                        {data.detailsLabel}
                    </span>
                )}
            </div>

            <div style={{ marginTop: 14, fontSize: 13, fontWeight: 600 }}>
                {data.badgeLabel}
            </div>

            <div style={{
                display: "grid",
                gridTemplateColumns: `repeat(${data.stats.length},1fr)`,
                gap: 14,
                marginTop: 14
            }}>
                {data.stats.map(s => (
                    <div key={s.label}>
                        <div style={{ fontSize: 11, color: "#64748B" }}>{s.label}</div>
                        <div style={{ fontSize: 18, fontWeight: 700 }}>{s.value}</div>
                        <div style={{ fontSize: 12, color: s.changeColor }}>{s.change}</div>
                    </div>
                ))}
            </div>

            {data.progress && (
                <div style={{ marginTop: 16 }}>
                    <div style={{ fontSize: 12, marginBottom: 6 }}>
                        {data.progress.label} · <b>{data.progress.summary}</b>
                    </div>
                    <div style={{
                        height: 8,
                        background: data.progress.trackColor,
                        borderRadius: 999
                    }}>
                        <div style={{
                            height: "100%",
                            width: `${data.progress.percent}%`,
                            background: data.progress.fillColor,
                            borderRadius: 999
                        }} />
                    </div>
                </div>
            )}
        </div>
    );
}

function TaskNode({ data }: { data: TaskNodeData }) {
    return (
        <div style={{
            width: 280,
            background: "#fff",
            borderRadius: 18,
            padding: "18px 22px",
            boxShadow: cardShadow,
            border: "1px solid #E2E8F0",
            fontFamily: "Inter, system-ui"
        }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <b>{data.title}</b>
                <span style={{ fontSize: 12, color: "#3B82F6", fontWeight: 600 }}>
                    {data.detailsLabel}
                </span>
            </div>

            <div style={{ marginTop: 10, fontSize: 13 }}>
                <span style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: data.toolColor, display: "inline-block", marginRight: 8
                }} />
                {data.tool}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14 }}>
                <span style={{ fontSize: 12, color: "#64748B" }}>{data.info}</span>
                <span style={pill(data.status)}>{data.status.text}</span>
            </div>

            <div style={{
                marginTop: 10,
                height: 8,
                background: data.progressTrack,
                borderRadius: 999
            }}>
                <div style={{
                    width: `${data.progressPercent}%`,
                    height: "100%",
                    background: data.progressFill,
                    borderRadius: 999
                }} />
            </div>
        </div>
    );
}

function ScoreNode({ data }: { data: ScoreNodeData }) {
    const good = data.tone === "positive";
    return (
        <div style={{
            width: 80,
            padding: "10px 0",
            textAlign: "center",
            borderRadius: 999,
            fontWeight: 700,
            fontSize: 15,
            color: good ? "#16A34A" : "#DC2626",
            background: good ? "rgba(34,197,94,.15)" : "rgba(248,113,113,.18)",
            boxShadow: "inset 0 0 0 1px rgba(148,163,184,.4),0 8px 20px rgba(15,23,42,.12)"
        }}>
            {data.value}
        </div>
    );
}

/* ======================
   Main Diagram
====================== */

export default function StrategyDiagram() {
    const nodeTypes = useMemo(() => ({
        metric: MetricNode,
        task: TaskNode,
        score: ScoreNode
    }), []);

    const nodes = useMemo<Node[]>(() => [
        {
            id: "task-marketing",
            type: "task",
            position: { x: 0, y: 0 },
            sourcePosition: Position.Right,
            data: {
                title: "New marketing campaign",
                tool: "Asana",
                toolColor: "#FBBF24",
                info: "4 issues · 67% done",
                detailsLabel: "Details",
                status: { text: "In review", textColor: "#92400E", background: "#FEF3C7" },
                progressPercent: 67,
                progressTrack: "#E5E7EB",
                progressFill: "#FACC15"
            }
        },
        {
            id: "metric-premium",
            type: "metric",
            position: { x: 320, y: -40 },
            targetPosition: Position.Left,
            sourcePosition: Position.Right,
            data: {
                title: "Premium trial users",
                subtitle: "Metric · Input",
                badgeLabel: "Input Metric",
                detailsLabel: "Metric",
                stats: [
                    stat("7 days", 4570, 0.87),
                    stat("6 weeks", 26958, 2.71),
                    stat("12 months", 210135, 38.26),
                ]
            }
        },
        {
            id: "score-premium",
            type: "score",
            position: { x: 560, y: -20 },
            targetPosition: Position.Left,
            sourcePosition: Position.Right,
            data: { value: "0.998", tone: "positive" }
        },
        {
            id: "metric-north-star",
            type: "metric",
            position: { x: 720, y: -40 },
            targetPosition: Position.Left,
            data: {
                title: "Time spent listening",
                subtitle: "North Star · Sum",
                badgeLabel: "North Star",
                stats: [
                    stat("7 days", 4410, 0.43),
                    stat("6 weeks", 26150, 2.57),
                    stat("12 months", 198310, 38.59),
                ]
            }
        }
    ], []);

    const edges = useMemo<Edge[]>(() => [
        {
            id: "e1",
            source: "task-marketing",
            target: "metric-premium",
            type: "smoothstep",
            style: { stroke: "#CBD5F5", strokeWidth: 2, strokeDasharray: "4 6" },
            markerEnd: { type: MarkerType.ArrowClosed, color: "#CBD5F5" }
        },
        {
            id: "e2",
            source: "metric-premium",
            target: "score-premium",
            type: "smoothstep",
            animated: true,
            style: { stroke: "#16A34A", strokeWidth: 3 },
            markerEnd: { type: MarkerType.ArrowClosed, color: "#16A34A" }
        },
        {
            id: "e3",
            source: "score-premium",
            target: "metric-north-star",
            type: "smoothstep",
            animated: true,
            style: { stroke: "#16A34A", strokeWidth: 3 },
            markerEnd: { type: MarkerType.ArrowClosed, color: "#16A34A" }
        }
    ], []);

    const onConnect = useCallback(() => { }, []);

    return (
        <div style={{
            width: "100%",
            height: "800px",
            background: "#EEF3F8",
            padding: 24
        }}>
            <div style={{
                height: "100%",
                borderRadius: 24,
                overflow: "hidden",
                border: "1px solid #CBD5F5",
                boxShadow: "0 30px 60px rgba(15,23,42,.1)"
            }}>
                <ReactFlowProvider>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        fitView
                        fitViewOptions={{ padding: 0.25 }}
                        minZoom={0.6}
                        maxZoom={1.2}
                        panOnScroll
                        zoomOnScroll={false}
                        nodesDraggable={false}
                        nodesConnectable={false}
                        elementsSelectable={false}
                        onConnect={onConnect}
                        proOptions={{ hideAttribution: true }}
                    >
                        <Background
                            variant={BackgroundVariant.Dots}
                            gap={32}
                            size={1}
                            color="#CBD5F5"
                        />
                    </ReactFlow>
                </ReactFlowProvider>
            </div>
        </div>
    );
};