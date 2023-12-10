// CalendarView.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import TableView from './TableView';
import SwitchModeButton from './Switchbutton'; // Adjust the import based on the actual file name

const localizer = momentLocalizer(moment);
const setting = require('../config/config');

const CalendarView = ({ startDate, endDate }) => {
  const [tasks, setTasks] = useState([]);
  const [noTasksMessage, setNoTasksMessage] = useState('');
  const [view, setView] = useState('calendar');
  const navigate = useNavigate();
  const handleSelectEvent = (event) => {
    // Navigate to the task's detailed view page
    navigate(`/task/${event.id}`);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${setting.base_url}/api/task`, {
          headers: {
            Authorization: `${localStorage.getItem('token')}`,
          },
        });
        if (response.data.tasks.length === 0) {
          setNoTasksMessage('No tasks found for the selected dates.');
        } else {
          setTasks(
            response.data.tasks.map((task) => ({
              ...task,
              start: new Date(task.creationDate),
              end: new Date(task.creationDate),
              title: task.title,
              id: task._id
            }))
          );
          setNoTasksMessage('');
        }
      } catch (error) {
        console.error('Error fetching tasks', error);
      }
    };
  
    fetchTasks();
  }, [startDate, endDate]);

  const handleViewChange = () => {
    setView((prevView) => (prevView === 'calendar' ? 'table' : 'calendar'));
  };

  return (
    <div className="calendar-view-container">
      {noTasksMessage && <div className="alert alert-warning">{noTasksMessage}</div>}
      <div className="view-switcher">
        <SwitchModeButton onClick={handleViewChange} active={view === 'calendar'} />
      </div>
      <div className="content-container">
        {view === 'calendar' ? (
          <Calendar localizer={localizer} events={tasks} startAccessor="start" endAccessor="end" style={{ height: 500 }} onSelectEvent={handleSelectEvent}/>
        ) : (
          <TableView data={tasks} />
        )}
      </div>
    </div>
  );
};

export default CalendarView;
