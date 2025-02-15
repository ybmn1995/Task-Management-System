import React from 'react';
import Home from './components/Home';
import TaskTable from './components/TaskTable';
import CreateTaskForm from './components/CreateTaskForm';
import TaskManager from './components/TaskManager';

const App = () => {
    return (
        <div>
            <Home />
            {/* <CreateTaskForm /> */}
            {/* <TaskTable /> */}
            <TaskManager />

        </div>
    );
};

export default App;
