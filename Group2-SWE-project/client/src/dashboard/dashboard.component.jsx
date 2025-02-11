import React, { useState } from 'react';
import './dashboard.component.css';

function Dashboard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState('');
  const [task, setTask] = useState('');

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  const getCurrentDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
  };

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };
  const toggleTaskDialog = () =>{
    setIsTaskDialogOpen(!isTaskDialogOpen);
  };
  
  const handleHabitClick =(habit) => {
    setSelectedHabit(habit);
    setIsTaskDialogOpen(false);
    setIsTaskDialogOpen(true);
  }

  const handleTaskSubmit = async () => {
    const newTask = {
      habit: selectedHabit,  
      task: task
    };
  
    try {
      // Send the data to the backend
      const response = await fetch("http://localhost:5050/record/add-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  
        },
        body: JSON.stringify(newTask),  
      });
  
      if (response.ok) {
        console.log(`Task for ${selectedHabit}: ${task} added successfully!!!`);
        setTask("");  // Clear input
      } else {
        console.error("Task adding failue");
      }
    } catch (error) {
      console.error("Error!!! :", error); 
      alert(`Error: ${error.message}`);
    }
  
    setIsTaskDialogOpen(false);  //Close pop-up
  
  };

  return (
    <div>
      <div className="header">
        {getGreeting()}, Alexa       
      </div>
      <p className='text'>Today is {getCurrentDate()}</p>
      <div>
        <img src="https://cdn-icons-png.flaticon.com/512/561/561135.png" alt="Settings Icon" className="settings-icon" />
        </div>
        <div><img src="https://static-00.iconduck.com/assets.00/profile-icon-512x512-w0uaq4yr.png" alt="Profile Icon" className="profile-icon"/></div>
      <div className="dashboard-container">
        {/* Boxes with tasks */}
        <div className="box" style={{ backgroundColor: '#DBCDF0' }}>
          <div className="box-title">High Priority</div>
          <div className="box-content">
            <div>
              <p className='task-text'><input type="checkbox" /> Uncompleted Task</p>
              <p className='task-text'><input type="checkbox" /> Uncompleted Task</p>
              <p className='task-text'><input type="checkbox" defaultChecked /> Completed Task</p>
              <p className='task-text'><input type="checkbox" defaultChecked /> Completed Task</p>
            </div>
          </div>
        </div>
        <div className="box" style={{ backgroundColor: '#F7D9C4' }}>
          <div className="box-title">Academics</div>
          <div className="box-content">
            <div>
              <p className='task-text'><input type="checkbox" /> Uncompleted Task</p>
              <p className='task-text'><input type="checkbox" /> Uncompleted Task</p>
              <p className='task-text'><input type="checkbox" defaultChecked /> Completed Task</p>
            </div>
          </div>
        </div>
        <div className="box" style={{ backgroundColor: '#FAEDCB' }}>
          <div className="box-title">Gym</div>
          <div className="box-content">
            <div>
              <p className='task-text'><input type="checkbox" /> Uncompleted Task</p>
              <p className='task-text'><input type="checkbox" defaultChecked /> Completed Task</p>
            </div>
          </div>
        </div>
        <div className="box" style={{ backgroundColor: '#F2C6DE' }}>
          <div className="box-title">Home</div>
          <div className="box-content">
            <div>
              <p className='task-text'><input type="checkbox" /> Uncompleted Task</p>
              <p className='task-text'><input type="checkbox" defaultChecked /> Completed Task</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Habit Button */}
      <button className="add-habit-button" onClick={toggleDialog}>
        Add Habit
      </button>

      {/* Dialog */}
      {isDialogOpen && (
        <div className="dialog">
            <div className="dialog-content">
                <h2>Choose New Habit</h2>
                <button className="add-habit" style={{ backgroundColor: '#DBCDF0' }} onClick={() => handleHabitClick('Finance')}>
                    <div className="habit-title">Finance</div>
                </button>
                <button className="add-habit" style={{ backgroundColor: '#F7D9C4' }} onClick={() => handleHabitClick('Academics')}>
                    <div className="habit-title">Academics</div>
                </button>
                <button className="add-habit" style={{ backgroundColor: '#FAEDCB' }} onClick={() => handleHabitClick('Gym')}>
                    <div className="habit-title">Gym</div>
                </button>
                <button className="add-habit" style={{ backgroundColor: '#F2C6DE' }} onClick={() => handleHabitClick('Home')} >
                    <div className="habit-title">Home</div>
                </button>
                <button className="done-button" onClick={toggleDialog}>Done</button>
            </div>
        </div>
      )}

      {/*Task Making Dialog*/}
      {isTaskDialogOpen && (
        <div className="adding-task-pop-up"> 
          <div className="adding-task">
            <h2>{selectedHabit} -  Add a Task</h2>
            <input 
              placeholder={`Enter your ${selectedHabit} task`} 
              type="text" 
              value={task} 
              onChange={(e) => setTask(e.target.value)} 
            />
            <button className="submit-task-button" onClick={handleTaskSubmit}>Submit</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Dashboard;