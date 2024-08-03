import React, { useState } from 'react';
import { SlWrench } from "react-icons/sl";
import { SlTrash } from "react-icons/sl";
import { IoAddOutline } from "react-icons/io5";
import { RxUpdate } from "react-icons/rx";
function Todolist() {

    const [Task, setTask] = useState([]);
    const [date, setDate] = useState([]);
    const [Intask, setIntask] = useState('');
    const [InDate, setInDate] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);

    const inputchange = () => {
        if (Intask.trim()) {
            if (isEditing) {
                const updatedTasks = [...Task];
                updatedTasks[currentIndex] = Intask;
                setTask(updatedTasks);

                const updatedDates = [...date];
                updatedDates[currentIndex] = InDate;
                setDate(updatedDates);

                setIsEditing(false);
                setCurrentIndex(null);
            } else {
                setTask([...Task, Intask]);
                setDate([...date, InDate]);
            }
            setIntask('');
            setInDate('');
        }
    }

    const editTask = (index) => {
        setIntask(Task[index]);
        setInDate(date[index]);
        setIsEditing(true);
        setCurrentIndex(index);
    }

    return (
        <div className='Todolist'>
            <h1>To-Do List :</h1>
            <div className='Inp'>
                <input type='text' placeholder='Add a new task' value={Intask} onChange={e => setIntask(e.target.value)} /><br/>
                <input type='date' value={InDate} onChange={e => setInDate(e.target.value)} /><br/>
                <button onClick={inputchange}>{isEditing ? <RxUpdate /> : <IoAddOutline />}</button>
            </div>
        
            <div className='Tasks'>
                {Task.length === 0 && <h2>No Tasks to display.</h2>}
                {Task.map((item, index) => {
                    return (
                        <div key={index} className='TasksButt'> 
                            <div><h3><p style={{ fontSize: '15px', fontFamily:'sans-serif' }}>Check</p><input type='checkbox' /></h3></div>                      
                            <div><h3><p style={{ fontSize: '15px', fontFamily:'sans-serif'  }}>Task:</p>{item}</h3></div>
                            <div><h3><p style={{ fontSize: '15px', fontFamily:'sans-serif'  }}>Deadline:</p>{date[index]}</h3></div>
                            <div className='but'>
                                <button onClick={() => { setTask(Task.filter((_, i) => i !== index)); setDate(date.filter((_, i) => i !== index)) }}><SlTrash /></button>
                                <button onClick={() => editTask(index)}><SlWrench /></button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Todolist;

