import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarView = ({ startDate, endDate }) => {
  const [tasks, setTasks] = useState([]);
  const [noTasksMessage, setNoTasksMessage] = useState('');
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/task/within_dates', {
          params: { startDate, endDate },
          headers: {
            Authorization: `${localStorage.getItem('token')}`, // Assuming you store your token in localStorage
          },
        });
        if (response.data.length === 0) {
            // Set a message if no tasks are found
            setNoTasksMessage('No tasks found for the selected dates.');
        } else {
            setTasks(response.data.map(task => ({
                ...task,
                start: new Date(task.creationDate),
                end: new Date(task.creationDate),
                title: task.title, // Assuming your task has a 'name' field
              })));
              setNoTasksMessage('');
        }
      } catch (error) {
        console.error('Error fetching tasks', error);
      }
    };

    fetchTasks();
  }, [startDate, endDate]);

  return (
    <div>
        {noTasksMessage && <div className="alert alert-warning">{noTasksMessage}</div>}
        <Calendar
            localizer={localizer}
            events={tasks}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
        />
    </div>
  );
};

export default CalendarView;
