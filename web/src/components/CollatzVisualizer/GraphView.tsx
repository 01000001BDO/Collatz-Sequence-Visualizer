import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { VisualizerProps, ChartDataPoint } from '../../types';

const GraphView: React.FC<VisualizerProps> = ({ sequence, currentIndex }) => {
  const chartData: ChartDataPoint[] = useMemo(() => 
    sequence.map((value, index) => ({
      step: index,
      value: value
    }))
  , [sequence]);

  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData.slice(0, currentIndex + 1)}>
          <XAxis dataKey="step" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
            labelStyle={{ color: '#fff' }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#60A5FA" 
            dot={{ fill: '#2563EB' }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphView;