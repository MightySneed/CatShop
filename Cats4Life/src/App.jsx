

import './App.css';
import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';

function App() {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const [completedCount, setCompletedCount] = useState(0);

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
  }
  useEffect(()=>{
    fetchCat() 
  },[])

  // //Faker introduced here
  // const CatBreed = faker.animal.cat() // Generate Cat breed
  // const CatPrice = faker.commerce.price({min: 100, max: 1200}) // Generate Cat Breed
  // const CatSex = faker.person.sex(); // Generate Cat Sex
  // const CatName = faker.person.firstName(CatSex); // Generate Human First name for the cat
  // //const CatQuirk = 
  // console.log(CatName)
  // console.log(CatSex)
  // console.log(CatBreed)
  // console.log(CatPrice)
  
  //Faker variables -end

  // class Cat {
  //   constructor(name, price, sex, breed) {
  //     this.name = CatName
  //     this.price = CatPrice
  //     this.sex = CatSex
  //     this.breed = CatBreed
  //   }
  // }
  // //Cat Constructor

  //Constructor End

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

