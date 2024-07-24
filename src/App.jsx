import { useState, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Constants from "./utils/utils";
import Container from "./Container";
import { Item } from "./SortableItem";

function getInitialItems() {
  const storedItems = localStorage.getItem(Constants.LOCAL_STORAGE_KEY);
  return storedItems
    ? JSON.parse(storedItems)
    : {
        root: ["1", "2", "3"],
        container1: ["4", "5", "6"],
        container2: ["7", "8", "9"],
        container3: [],
      };
}

export default function App() {
  const [items, setItems] = useState(getInitialItems);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    localStorage.setItem(Constants.LOCAL_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function findContainer(id) {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => items[key].includes(id));
  }

  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;

    setActiveId(id);
  }

  function handleDragOver(event) {
    const { active, over, draggingRect } = event;
    const { id } = active;
    const { id: overId } = over;

    // Find the containers
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.indexOf(id);
      const overIndex = overItems.indexOf(overId);

      let newIndex;
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 &&
          draggingRect &&
          draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item !== active.id),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex),
        ],
      };
    });
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    const { id } = active;

    // Check if over is null
    if (!over) {
      setActiveId(null);
      return;
    }

    const { id: overId } = over;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      setActiveId(null);
      return;
    }

    const activeIndex = items[activeContainer].indexOf(active.id);
    const overIndex = items[overContainer].indexOf(overId);

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }

    setActiveId(null);
  }

  return (
    <div style={Constants.wrapperStyle}>
      <DndContext
        announcements={Constants.defaultAnnouncements}
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Container id="root" items={items.root} activeId={activeId} />

        <Container
          id="container1"
          items={items.container1}
          activeId={activeId}
        />

        <Container
          id="container2"
          items={items.container2}
          activeId={activeId}
        />

        <Container
          id="container3"
          items={items.container3}
          activeId={activeId}
        />

        <DragOverlay>
          {activeId ? <Item id={activeId} isActive={true} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
