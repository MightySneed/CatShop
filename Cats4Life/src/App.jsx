

import './App.css';
import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';

function App() {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const [completedCount, setCompletedCount] = useState(0);
  const CatList = () => {
    const [cat, setCats] = useState([]); //catslist init
  }

  useEffect(() => {
    setCompletedCount(items.filter(item => item.completed).length);
  }, [items]);

  // Fetching Data (Cat)
  async function fetchCat() {
    const res = await fetch('https://api.thecatapi.com/v1/images/search?limit=10')
    const CatData = await res.json()
    console.log(CatData)
    const UpCat = CatData.map((Cat)=>{
      return {
        ...Cat,
        CatBreed: faker.animal.cat(),
        CatPrice: faker.commerce.price({min: 100, max: 1200}),
        CatSex: faker.person.sex(), 
        CatName: faker.person.firstName(),
      }
    })
    console.log(UpCat)
    setCats(UpCat);
  }
  useEffect(()=>{
    fetchCat() 
  },[])

  // Cat object constructed above




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
      {/* { <div>
      {UpCat.map((cat, index) => (
        <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
          <img src={cat.url} alt={cat.CatName} style={{ width: '200px', height: '200px' }} />
          <h3>{cat.CatName}</h3>
          <p>Breed: {cat.CatBreed}</p>
          <p>Sex: {cat.CatSex}</p>
          <p>Price: ${cat.CatPrice}</p>
        </div>
      ))}
    </div>} */}
    </div>
  );
}

export default App;

