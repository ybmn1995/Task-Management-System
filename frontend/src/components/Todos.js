import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodo } from "../redux/reducer";
import { GoPlus } from "react-icons/go";
import { motion } from "framer-motion";

const mapStateToProps = (state) => {
  return {
    todos: state.todos.todos, // Access todos from Redux state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodo(obj)), // Dispatch the addTodo action
  };
};

const Todos = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const add = () => {
    if (title === "" || description === "") {
      alert("Title or description is empty");
    } else {
      props.addTodo({
        title: title, // Send the title to API
        description: description, // Send the description to API
      });
      setTitle(""); // Clear input after adding
      setDescription(""); // Clear description
    }
  };

  return (
    <div className="addTodos">
      <input
        type="text"
        placeholder="Task Title"
        onChange={handleTitleChange}
        className="todo-input"
        value={title}
      />

      <input
        type="text"
        placeholder="Task Description"
        onChange={handleDescriptionChange}
        className="todo-input"
        value={description}
      />

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="add-btn"
        onClick={add}
      >
        <GoPlus />
      </motion.button>
      <br />
    </div>
  );
};

//we can use connect method to connect this component with redux store
export default connect(mapStateToProps, mapDispatchToProps)(Todos);
