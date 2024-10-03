

import './App.css';
import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';

function App() {
    const [cat, setCats] = useState([]); //catslist init


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

  return (

    <div className='wrapper'>
          <div className='top' id="catcard">
            <h1>Purrrrveyor of fine Cats</h1>
            <div><button>Main</button>
            <button>Checkout</button>
            </div>
            </div>
      <div id="catcard">
      {cat.map((cat, index) => (
        <div  key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
          <img src={cat.url} alt={cat.CatName} style={{ width: '200px', height: '200px' }} />
          <h3>{cat.CatName}</h3>
          <div id="catcard">
          <div>
          <p>Breed: {cat.CatBreed}</p>
          <p>Sex: {cat.CatSex}</p>
          <p>Price: ${cat.CatPrice}</p>
          </div>
          <button onClick={console.log("chaching!")}>Add to cart!</button>
          </div>

        </div>
      ))}
      </div>
    </div>
  );
}

export default App;

