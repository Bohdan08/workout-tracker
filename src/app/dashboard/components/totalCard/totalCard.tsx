import { Card } from "flowbite-react";
import React from "react";

interface TotalCardProps {
  title: string;
  total: number;
}

export default function TotalCard({ title, total }: TotalCardProps) {
  return (
    <Card className="w-full sm:w-40 bg-[#f4f4f5]">
      <div className="text-center">
        <p className="text-lg font-medium text-nowrap">{title}</p>
        <p className="text-3xl font-medium">{total}</p>
      </div>
    </Card>
  );
}
