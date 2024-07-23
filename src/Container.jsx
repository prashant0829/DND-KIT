import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

export default function Container({ id, items, activeId }) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <div
        ref={setNodeRef}
        className="bg-gray-200 p-4 m-4 flex-1 rounded-md shadow-md"
      >
        {items.map((itemId) => (
          <SortableItem
            key={itemId}
            id={itemId}
            isActive={itemId === activeId}
          />
        ))}
      </div>
    </SortableContext>
  );
}
