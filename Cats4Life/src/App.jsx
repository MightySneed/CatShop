function App() {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    setCompletedCount(items.filter(item => item.completed).length);
  }, [items]);

  const addItem = () => {
    if (message.trim() !== "") {
      setItems((prevItems) => [...prevItems, { text: message, completed: false }]);
      setMessage("");
    }
  };

  const toggleComplete = (index) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index].completed = !newItems[index].completed;
      return newItems;
    });
  };

  const deleteItem = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const resetList = () => {
    setItems([]);
  };

  return (
    <div className='wrapper'>
      <div id='heading'>
        <h1>Get Things Done:</h1>
      </div>

      <div id="input">
        <div className='itemtext'>
        <input 
          type="text" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          placeholder="Enter a task" 
        />
        </div>
        <button onClick={addItem}>Add Task</button>
      </div>
      <div id="tasks">
        <ul>
          {items.map((item, index) => (
            <li key={index} className={item.completed ? 'completed' : ''}>
              <div className='itemtext'>{item.text}</div>
              <button onClick={() => toggleComplete(index)}>Done</button>
              <button onClick={() => deleteItem(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div id='counter'>
        <p>Tasks Started: {items.length}</p>
        <p>Tasks Completed: {completedCount}</p>
        <button onClick={resetList}>Reset</button>
      </div>
    </div>
  );
}

export default App;

