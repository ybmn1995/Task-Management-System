import { motion } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { IoCheckmarkDoneSharp, IoClose } from "react-icons/io5";

const TodoItem = (props) => {
  const { item, onUpdate, onRemove } = props;

  const titleRef = useRef(null); // Ref for the title input
  const descriptionRef = useRef(null); // Ref for the description input

  const [task, setTask] = useState(item); // Manage task locally

  useEffect(() => {
    setTask(item); // Update local state when props change
  }, [item]);

  const updateBothFields = () => {
    const updatedTask = {
      ...task,
      title: titleRef.current.value,
      description: descriptionRef.current.value,
    };

    setTask(updatedTask); // Update local state
    onUpdate(updatedTask); // Send updated task to the parent component

    // Disable inputs after updating
    titleRef.current.disabled = true;
    descriptionRef.current.disabled = true;
  };

  const toggleComplete = () => {
    console.log("Button clicked!");

    const updatedTask = {
      ...task,
      completed: !task.completed, // Toggle completion status
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
      key={task.id}
      className="card"
    >
      <div className="todo-item">
        {/* Title Input */}
        <textarea
          ref={titleRef}
          value={task.title} // Bind to local task state
          onChange={(e) => setTask({ ...task, title: e.target.value })} // Update title in local state
        />
        {/* Description Input */}
        <textarea
          ref={descriptionRef}
          value={task.description} // Bind to local task state
          onChange={(e) => setTask({ ...task, description: e.target.value })} // Update description in local state
        />
      </div>
      <div className="btns">
        {/* Update Button - Updates title & description */}
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          onClick={updateBothFields}
        >
          <AiFillEdit />
        </motion.button>

        {/* Toggle Completion Button */}
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          style={{ color: "green" }}
          hidden={task.completed}
          onClick={toggleComplete } // Toggle completion status
          
        >
          <IoCheckmarkDoneSharp />
        </motion.button>

        {/* Remove Task Button */}
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
