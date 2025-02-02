import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function Item({ id, isActive }) {
  return (
    <div
      className={`${
        isActive ? "bg-blue-100 border-blue-300" : "bg-white border-gray-200"
      } border rounded-md shadow p-4 flex items-center justify-between my-2`}
    >
      <button>{id}</button>
    </div>
  );
}

export default function SortableItem({ id, isActive }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => {
        console.log(id);
      }}
    >
      <Item id={id} isActive={isActive} />
    </div>
  );
}
