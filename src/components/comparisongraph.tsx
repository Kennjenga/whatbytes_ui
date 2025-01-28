import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Label,
} from "recharts";

const ComparisonGraph = ({ percentile = 30 }) => {
  const chartData = [
    { percentile: 0, "total count": 1 },
    { percentile: 10, "total count": 2 },
    { percentile: 20, "total count": 4 },
    { percentile: 30, "total count": 5 },
    { percentile: 40, "total count": 8 },
    { percentile: 50, "total count": 12 },
    { percentile: 60, "total count": 5 },
    { percentile: 70, "total count": 3 },
    { percentile: 80, "total count": 2 },
    { percentile: 90, "total count": 3 },
    { percentile: 100, "total count": 1 },
  ];

  const AVERAGE_PERCENTILE = 72;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Comparison Graph</h2>
          <p className="text-sm text-gray-500 max-w-[80%]">
            <span className="font-bold text-gray-800">
              You scored {percentile}% percentile
            </span>{" "}
            which is {percentile > AVERAGE_PERCENTILE ? "higher" : "lower"} than
            the average {AVERAGE_PERCENTILE}% of all the engineers who took this
            assessment
          </p>
        </div>
        <div className="h-8 w-8 p-5 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-2xl">
          📈
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 12,
              left: 12,
              bottom: 20,
            }}
          >
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis
              dataKey="percentile"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                padding: "8px",
              }}
              formatter={(value) => [value, "Students"]}
              labelFormatter={(label) => `Percentile: ${label}`}
            />
            <ReferenceLine
              x={Math.round(percentile / 10) * 10}
              stroke="#94a3b8"
              strokeDasharray="8 5"
              label={
                <Label
                  value="Your Percentile"
                  position="top"
                  className="font-medium text-sm"
                />
              }
            />
            <Line
              type="natural"
              dataKey="total count"
              stroke="rgb(67 56 202)"
              strokeWidth={1}
              dot={(props) => {
                const { cx, cy, index } = props;
                return (
                  <circle
                    key={`dot-${index}`}
                    cx={cx}
                    cy={cy}
                    r={4}
                    stroke="rgb(67 56 202)"
                    fill="white"
                  />
                );
              }}
              activeDot={{
                r: 8,
                stroke: "white",
                strokeWidth: 2,
                fill: "rgb(67 56 202)",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ComparisonGraph;
