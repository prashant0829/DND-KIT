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
import CustomSelect from "./components/CustomSelect";

function getInitialItems() {
  const storedItems = localStorage.getItem(Constants.LOCAL_STORAGE_KEY);
  return storedItems
    ? JSON.parse(storedItems)
    : {
        backlog: [
          { id: "1", taskValue: "Task 1", taskText: "Task 1 description" },
          { id: "2", taskValue: "Task 2", taskText: "Task 2 description" },
          { id: "3", taskValue: "Task 3", taskText: "Task 3 description" },
        ],
        inProgress: [
          { id: "4", taskValue: "Task 4", taskText: "Task 4 description" },
          { id: "5", taskValue: "Task 5", taskText: "Task 5 description" },
          { id: "6", taskValue: "Task 6", taskText: "Task 6 description" },
        ],
        completed: [
          { id: "7", taskValue: "Task 7", taskText: "Task 7 description" },
          { id: "8", taskValue: "Task 8", taskText: "Task 8 description" },
          { id: "9", taskValue: "Task 9", taskText: "Task 9 description" },
        ],
      };
}

export default function App() {
  const [items, setItems] = useState(getInitialItems);
  const [activeId, setActiveId] = useState(null);
  const [itemText, setItemText] = useState("");
  const [itemType, setItemType] = useState("backlog");

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

    return Object.keys(items).find((key) =>
      items[key].some((item) => item.id === id)
    );
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

      const activeIndex = activeItems.findIndex((item) => item.id === id);
      const overIndex = overItems.findIndex((item) => item.id === overId);

      let newIndex;
      if (overId in prev) {
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
        [activeContainer]: prev[activeContainer].filter(
          (item) => item.id !== active.id
        ),
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

    const activeIndex = items[activeContainer].findIndex(
      (item) => item.id === active.id
    );
    const overIndex = items[overContainer].findIndex(
      (item) => item.id === overId
    );

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

  const handleItemSave = () => {
    if (itemText.trim() === "") return; // Avoid adding empty items

    const newItemId = Date.now().toString(); // Unique ID for the new item

    setItems((prev) => {
      const newItem = {
        id: newItemId,
        taskValue: `Task ${newItemId}`,
        taskText: itemText,
      };

      const updatedItems = {
        ...prev,
        [itemType]: prev[itemType] ? [...prev[itemType], newItem] : [newItem],
      };

      return updatedItems;
    });

    setItemText(""); // Clear the input field
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter item value"
          value={itemText}
          onChange={(e) => {
            setItemText(e.target.value);
          }}
        />
        <CustomSelect itemType={itemType} setItemType={setItemType} />
        <button
          onClick={(e) => {
            handleItemSave();
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
      <div style={Constants.wrapperStyle}>
        <DndContext
          announcements={Constants.defaultAnnouncements}
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          {Object.keys(items).map((item) => (
            <Container
              key={item}
              id={item}
              items={items[item]}
              activeId={activeId}
            />
          ))}

          <DragOverlay>
            {activeId ? <Item id={activeId} isActive={true} /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
