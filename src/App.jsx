import { useState,useEffect } from 'react'
import './App.css'
// import  {Cross} from './components/cross'
import {FaTimes} from 'react-icons/fa'
import {FaTrash} from 'react-icons/fa'
import {FaMoon} from 'react-icons/fa'
import {FaSun} from 'react-icons/fa'
import {FaCheck} from 'react-icons/fa'

function App() {
  // const [count, setCount] = useState(0)
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all')
  const [newTodo, setNewTodo] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [activeCount, setActiveCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const active = todos.filter((todo) => !todo.completed);
    const completed = todos.filter((todo) => todo.completed);

    setActiveCount(active.length);
    setCompletedCount(completed.length);
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, {text:newTodo, completed: false}]);
      setNewTodo('');
    }
  };

  const toggleTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos)
  };

  const clearCompleted = () => {
    const updatedTodos = todos.filter((todo) => !todo.completed);
    setTodos(updatedTodos);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }



  return (
    <>
      <div className= {`background-section ${darkMode ? 'dark-mode' : ''}`}>
        <div className='main'>
          <div className='header-div'>
            <h1 className='header-text'>TODO</h1>
              <div className='theme-icons'>
                {darkMode ? (
                  <FaSun onClick={toggleDarkMode}/>
                ) : (
                  <FaMoon onClick={toggleDarkMode}/>
                )}
              </div>
            
          </div> 
         
          <div className='input'>
            <input placeholder='Create a new ToDo item' value={newTodo} onChange={(e) => setNewTodo(e.target.value)}/> 
            
            <button className='btn' onClick={addTodo}>Add</button>
          </div>

          <div className='todo-list'>
              <div className='status'>
                <div className={`active-list ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}><a>All</a></div>

                <div className={`active-list ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('active')}><p>Active</p></div>

                <div className={`active-list ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('completed')}><p>Completed</p></div>
              </div>

              <div className='todo-items'>
                <ul className='item-list'>
                {todos.filter((todo) => {
                  if (filter === 'all') return true;
                  if (filter === 'active') return !todo.completed;
                  if (filter === 'completed') return todo.completed;
                  return true;
                })
                .map ((todo, index) => (
                  <li key={index}className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                 
                  <div onClick={() => toggleTodo(index)} className='icons'>{todo.completed ? <FaCheck/>: <FaTimes/>}</div>

                  <div className='user-item'>{todo.text}</div>

                  <div className='delete'  onClick={() => deleteTodo(index)}><FaTrash/></div>
              </li>
                ))}

                 
                 
                </ul>
              </div>
              <div className='bottom-status'>
              {filter === 'all' && <div><p>{todos.length} items</p></div>}
              {filter === 'active' && <div><p>{activeCount} items</p></div>}
              {filter === 'completed' && <div><p>{completedCount} items</p></div>}






                <div onClick={clearCompleted} className='clear'><p>Clear Completed</p></div>
              </div>
          </div>
        </div>
      </div>
       
    </>
  )
}

export default App
