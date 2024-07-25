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
  return storedItems ? JSON.parse(storedItems) : {};
}

export default function App() {
  const [items, setItems] = useState(getInitialItems);
  const [activeId, setActiveId] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [itemText, setItemText] = useState("");
  const [itemType, setItemType] = useState("backlog");
  const [newContainerName, setNewContainerName] = useState("");

  useEffect(() => {
    localStorage.setItem(Constants.LOCAL_STORAGE_KEY, JSON.stringify(items));
    console.log(items);
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
    for (const key in items) {
      if (items[key].some((item) => item.id === id)) {
        return key;
      }
    }
    return null;
  }

  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;

    setActiveId(id);
    const container = findContainer(id);
    if (container) {
      const item = items[container].find((item) => item.id === id);
      setActiveItem(item);
    }
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
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item.id !== active.id),
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

    if (!over) {
      setActiveId(null);
      setActiveItem(null);
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
      setActiveItem(null);
      return;
    }

    const activeIndex = items[activeContainer].findIndex(
      (item) => item.id === active.id
    );
    const overIndex = items[overContainer].findIndex(
      (item) => item.id === overId
    );

    if (activeIndex !== overIndex) {
      setItems((items) => {
        const updatedItems = {
          ...items,
          [overContainer]: arrayMove(
            items[overContainer],
            activeIndex,
            overIndex
          ),
        };

        // Update position for each item in the container
        updatedItems[overContainer] = updatedItems[overContainer].map(
          (item, index) => ({
            ...item,
            position: index,
          })
        );

        return updatedItems;
      });
    }

    setActiveId(null);
    setActiveItem(null);
  }

  const handleItemSave = () => {
    if (itemText.trim() === "" || itemType.trim() === "") return; // Avoid adding empty items or invalid container

    const newItemId = Date.now().toString(); // Unique ID for the new item

    setItems((prev) => {
      const updatedItems = {
        ...prev,
        [itemType]: prev[itemType]
          ? [
              ...prev[itemType],
              {
                id: newItemId,
                content: itemText,
                position: prev[itemType].length,
              },
            ]
          : [{ id: newItemId, content: itemText, position: 0 }],
      };

      return updatedItems;
    });

    setItemText(""); // Clear the input field
  };

  const handleAddContainer = () => {
    if (newContainerName.trim() === "") return; // Avoid adding empty container names

    setItems((prev) => ({
      ...prev,
      [newContainerName]: [],
    }));

    setNewContainerName(""); // Clear the input field
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
          onClick={handleItemSave}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="New container name"
          value={newContainerName}
          onChange={(e) => {
            setNewContainerName(e.target.value);
          }}
        />
        <button
          onClick={handleAddContainer}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Add Container
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
            {activeId ? (
              <Item id={activeId} isActive={true} text={activeItem.content} />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
