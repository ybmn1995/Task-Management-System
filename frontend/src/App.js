import React from 'react';
import Home from './components/Home';
import TaskTable from './components/TaskTable';
import CreateTaskForm from './components/CreateTaskForm';

const App = () => {
    return (
        <div>
            <Home />
            <CreateTaskForm />
            <TaskTable />
        </div>
    );
};

export default App;
