import React from "react";

export default function Page({ params: { id } }: { params: { id: string } }) {
  console.log(id, "id");
  return <div>workout {id}</div>;
}
