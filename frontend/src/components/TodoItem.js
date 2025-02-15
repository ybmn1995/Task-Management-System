import { motion } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { IoCheckmarkDoneSharp, IoClose } from "react-icons/io5";

const TodoItem = (props) => {
  const { item, onUpdate, onRemove } = props;

  const titleRef = useRef(true); // Ref for the title input
  const descriptionRef = useRef(true); // Ref for the description input

  const [task, setTask] = useState(item); // Manage task locally

  useEffect(() => {
    setTask(item); // Update local state when props change
  }, [item]);

  const changeFocus = (field) => {
    // Enable the input for title or description based on the field passed
    if (field === "title") {
      titleRef.current.disabled = false;
      titleRef.current.focus();
    } else if (field === "description") {
      descriptionRef.current.disabled = false;
      descriptionRef.current.focus();
    }
  };

  const update = (field, id, value, e) => {
    if (e.which === 13) {
      const updatedTask = { ...item, [field]: value };
      setTask(updatedTask);
      onUpdate(updatedTask); // Pass updated task to the onUpdate handler
      if (field === "title") {
        titleRef.current.disabled = true;
      } else if (field === "description") {
        descriptionRef.current.disabled = true;
      }
    }
  };

  const toggleComplete = () => {
    console.log("Button clicked!");

    const updatedTask = {
      ...item,
      completed: !item.completed, // Toggle the boolean value
    };
    setTask(updatedTask);
    onUpdate(updatedTask); // Pass the updated task to onUpdate
  };
  return (
    <motion.li
      initial={{ x: "150vw", transition: { type: "spring", duration: 2 } }}
      animate={{ x: 0, transition: { type: "spring", duration: 2 } }}
      whileHover={{
        scale: 0.9,
        transition: { type: "spring", duration: 0.1 },
      }}
      exit={{
        x: "-60vw",
        scale: [1, 0],
        transition: { duration: 0.5 },
        backgroundColor: "rgba(255,0,0,1)",
      }}
      key={item.id}
      className="card"
    >
      <div className="todo-item">
        {/* Title Input */}
        <textarea
          ref={titleRef}
          disabled={!titleRef.current} // Disable when not in edit mode
          value={task.title} // Bind to local task state
          onChange={(e) => setTask({ ...task, title: e.target.value })} // Update title in local state
          onKeyPress={(e) =>
            update("title", item.id, titleRef.current.value, e)
          }
        />
        {/* Description Input */}
        <textarea
          ref={descriptionRef}
          disabled={!descriptionRef.current} // Disable when not in edit mode
          value={task.description} // Bind to local task state
          onChange={(e) => setTask({ ...task, description: e.target.value })} // Update description in local state
          onKeyPress={(e) =>
            update("description", item.id, descriptionRef.current.value, e)
          }
        />
      </div>
      <div className="btns">
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => changeFocus("title")}
        >
          <AiFillEdit />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          style={{ color: "green" }}
          hidden={task.completed}
          onClick={toggleComplete} // Toggle completion status
        >
          <IoCheckmarkDoneSharp />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          style={{ color: "red" }}
          onClick={() => onRemove(task.id)} // Remove task
        >
          <IoClose />
        </motion.button>
      </div>
    </motion.li>
  );
};

export default TodoItem;
