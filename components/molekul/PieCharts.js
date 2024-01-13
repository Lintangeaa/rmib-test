import React from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

const COLORS = [
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#0088FE',
  '#FF6565',
  '#4CAF50',
  '#FFD700',
];

const PieCharts = ({ data }) => {
  const filteredData = data.filter((entry) => entry.value !== 0);

  return (
    <PieChart id="rmib" width={400} height={400}>
      <Legend />
      <Pie
        dataKey="value"
        data={filteredData}
        cx={200}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        label
      >
        {filteredData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default PieCharts;
