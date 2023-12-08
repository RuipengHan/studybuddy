// TableView.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import '../style/react-table.css';
import SwitchModeButton from './Switchbutton'; // Adjust the import based on the actual file name

const TableView = () => {
  const [tasks, setTasks] = useState([]);
  const [noTasksMessage, setNoTasksMessage] = useState('');
  const [view, setView] = useState('table');

  useEffect(() => {
    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/task', {
              headers: {
                Authorization: `${localStorage.getItem('token')}`,
              },
            });
        console.log("response", response)
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

  return (
    <div className="table-container">
      <table className="react-table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} style={{ textAlign: 'center' }}>{column.render('Header')}</th>
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
    </div>
  );
};

export default TableView;
