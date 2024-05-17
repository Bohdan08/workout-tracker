import { Alert, Card } from "flowbite-react";
import React from "react";
import {
  Bar,
  Tooltip,
  BarChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
} from "recharts";

export default function CustomBarChart({
  title,
  data,
}: {
  title: string;
  data: any[];
}) {
  return (
    <Card className="p-4 h-[400px] lg:w-[400px] xl:w-[500px] 2xl:w-[600px] max-w-full">
      <h2 className="text-lg sm:text-lg md:text-2xl font-medium mb-5">{title}</h2>
      {data?.length ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={800}
            height={300}
            data={data}
            margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
            {...{
              overflow: "visible",
            }}
          >
            <XAxis
              dataKey="name"
              angle={15}
              tickMargin={10}
              tick={{ fontSize: 10 }}
            />

            <Tooltip />
            <Bar dataKey="number" fill="#8884d8" barSize={40}>
              <LabelList dataKey="number" position="top" fontSize={12} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <Alert
          color="info"
          className="text-center flex flex-col justify-center items-center mb-5"
        >
          <p className="font-semibold text-xl">Not enough info</p>
          <div className="text-lg mt-3">
            <p> You haven&apos;t created any workouts yet.</p>
          </div>
        </Alert>
      )}
    </Card>
  );
}
