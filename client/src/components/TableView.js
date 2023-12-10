import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import '../style/react-table.css';
import '../style/delete.css';
import { useNavigate } from 'react-router-dom';
const setting = require('../config/config');

const TableView = () => {
  const [tasks, setTasks] = useState([]);
  const [noTasksMessage, setNoTasksMessage] = useState('');
  const [view, setView] = useState('table');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();
  const handleRowClick = (row) => {
    // Assuming each task has a unique '_id' field
    navigate(`/task/${row.original._id}`);
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
          setNoTasksMessage('No tasks found.');
        } else {
          setTasks(response.data.tasks);
          setNoTasksMessage('');
        }
      } catch (error) {
        console.error('Error fetching tasks', error);
      }
    };

    fetchTasks();
  }, []); // Empty dependency array to fetch tasks once on component mount

  const columns = React.useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
        Cell: ({ row }) => (
          <div
            onClick={() => handleRowClick(row)}
            style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}
          >
            {row.original.title}
          </div>
        ),
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Attachments',
        accessor: 'attachments',
        Cell: ({ value }) => (value ? value.join(', ') : 'N/A'),
      },
      {
        Header: 'Creation Date',
        accessor: 'creationDate',
        Cell: ({ value }) => (value ? new Date(value).toLocaleDateString() : 'N/A'),
      },
      {
        Header: 'Due Date',
        accessor: 'dueDate',
        Cell: ({ value }) => (value ? new Date(value).toLocaleDateString() : 'N/A'),
      },
      {
        Header: 'Tags',
        accessor: 'tags',
        Cell: ({ value }) => (value ? value.join(', ') : 'N/A'),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: tasks,
  });

  const handleViewChange = () => {
    setView((prevView) => (prevView === 'table' ? 'calendar' : 'table'));
  };

  // const handleRowClick = (row) => {
  //   setSelectedRow(row);
  //   setShowDeleteConfirmation(true);
  // };

  const handleDeleteConfirmation = async (confirmed) => {
    setShowDeleteConfirmation(false);
    // console.log(confirmed, selectedRow);
    if (confirmed && selectedRow) {
      try {
        const response = await axios.delete(`${setting.base_url}/api/task/${selectedRow.original._id}`, {
          headers: {
            Authorization: `${localStorage.getItem('token')}`,
          },
        });
        // console.log('response', response.status);
        if (response.status === 200) {
          setTasks((prevTasks) => prevTasks.filter((task) => task.title !== selectedRow.original.title));
        }
      } catch (error) {
        console.error('Error deleting task', error);
      }
    }
  };

  return (
    <div className="table-container">
      <table className="react-table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} style={{ textAlign: 'center' }}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {showDeleteConfirmation && (
      <div className="delete-confirmation-modal" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', border: '1px solid #ccc', zIndex: '1000' }}>
        <p>Are you sure you want to delete this task?</p>
          <button onClick={() => handleDeleteConfirmation(true)}>Yes</button>
          <button onClick={() => handleDeleteConfirmation(false)}>No</button>
        </div>
      )}
    </div>
  );
};

export default TableView;
