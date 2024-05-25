"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const data = [
  {
    name: "Jan",
    number: 20,
  },
  {
    name: "Feb",
    number: 10,
  },
  {
    name: "Mar",
    number: 15,
  },
  {
    name: "Apr",
    number: 30,
  },
  {
    name: "May",
    number: 5,
  },
  {
    name: "Jun",
    number: 14,
  },
  {
    name: "Jul",
    number: 10,
  },
  {
    name: "Aug",
    number: 12,
  },
  {
    name: "Sep",
    number: 14,
  },
  {
    name: "Oct",
    number: 10,
  },
  {
    name: "Nov",
    number: 20,
  },
  {
    name: "Dec",
    number: 15,
  },
];

const CHART_STYLE =
  "rounded border-2 p-4 h-[400px] lg:w-[400px] xl:w-[500px] 2xl:w-[600px] max-w-full";

export default function OverallProgress() {
  return (
    <div>
      <h2>Monthly Progress</h2>
      <div className="flex flex-col lg:flex-row flex-between lg:space-x-5 space-y-5 lg:space-y-0 mt-5">
        <div className={CHART_STYLE}>
          <ResponsiveContainer className="responsive-container">
            <LineChart
              width={800}
              height={300}
              data={data}
              // data={lineChartData.slice(startIndex, endIndex)}
              margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
            >
              <XAxis dataKey="name" angle={0} minTickGap={10} />
              <Tooltip />

              {/* <Tooltip /> */}
              {/* <Legend
              onClick={({ dataKey }) => {
                // toggle line data key
                setAvailableDataKeys({
                  ...availableDataKeys,
                  [dataKey]: {
                    value: dataKey,
                    visible: !availableDataKeys[dataKey].visible,
                  },
                });
              }}
            /> */}
              {/* {Object.values(availableDataKeys).map(
              ({ value, visible }, index) => (
                <Line
                  key={value}
                  type="monotone"
                  dataKey={value}
                  stroke={LINE_STROKES[index]}
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                  dot={false}
                  hide={!visible}
                  label={<CustomLineChartLabel color={LINE_STROKES[index]} />}
                />
              )
            )} */}
              <Line
                type="monotone"
                dataKey="number"
                stroke="#8884d8"
                //   key={value}
                //   type="monotone"
                //   dataKey={value}
                //   stroke={LINE_STROKES[index]}
                //   strokeWidth={2}
                //   activeDot={{ r: 6 }}
                //   dot={false}
                //   hide={!visible}
                //   label={<CustomLineChartLabel color={LINE_STROKES[index]} />}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={CHART_STYLE}>
          <ResponsiveContainer className="responsive-container">
            <BarChart
              width={800}
              height={300}
              data={data}
              // data={lineChartData.slice(startIndex, endIndex)}
              margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
            >
              <XAxis dataKey="name" angle={0} minTickGap={10} />
              <Tooltip />

              <Bar type="monotone" dataKey="number" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
