"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

export function IrrigationEfficiencyChart() {
  const data = [
    { name: "Jan", traditional: 45, smart: 72 },
    { name: "Feb", traditional: 48, smart: 75 },
    { name: "Mar", traditional: 42, smart: 78 },
    { name: "Apr", traditional: 50, smart: 80 },
    { name: "May", traditional: 46, smart: 82 },
    { name: "Jun", traditional: 44, smart: 85 },
  ];

  return (
    <div className="w-full h-64">
      <h3 className="text-center text-sm font-semibold mb-2">Water Usage Efficiency Comparison (%)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <defs>
            <linearGradient id="colorTrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgb(239, 68, 68)" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="rgb(239, 68, 68)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorSmart" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgb(34, 197, 94)" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="rgb(34, 197, 94)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" fontSize={12} />
          <YAxis domain={[0, 100]} fontSize={12} />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Area
            type="monotone"
            dataKey="traditional"
            name="Traditional Irrigation"
            stroke="rgb(239, 68, 68)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorTrad)"
          />
          <Area
            type="monotone"
            dataKey="smart"
            name="Smart Irrigation System"
            stroke="rgb(34, 197, 94)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorSmart)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CostComparisonChart() {
  const data = [
    { name: "Manual Sorting", value: 300 },
    { name: "Automated System", value: 1800 },
  ];

  const colors = ["rgba(59, 130, 246, 0.8)", "rgba(34, 197, 94, 0.8)"];

  return (
    <div className="w-full h-64">
      <h3 className="text-center text-sm font-semibold mb-2">Waste Sorting Throughput Comparison</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" fontSize={12} />
          <YAxis fontSize={12} />
          <Tooltip />
          <Bar dataKey="value" name="Items per Hour">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
