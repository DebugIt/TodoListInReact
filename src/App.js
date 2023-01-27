import { useState , useEffect} from 'react';
import './App.css';
import './CSS/nav.css';
import { Navbar } from './Components/Navbar';

const localData = () => {
  const lists0 = localStorage.getItem("todoList");
  if(lists0){
    return JSON.parse(lists0);
  }
  else{
    return [];
  }
}


function App() {
  const [Input, setInput] = useState("");
  const [item, setItem] = useState(localData());

  const addItem = () => {
    if(!Input){
      alert("Field is empty!");
    }
    else{
      const newItemId = {
        id: new Date().getTime().toString(),
        name: Input,

      }
      setItem([...item, newItemId]);
      setInput("");
    }
  };
// delete a item
  const deleItem = (id) => {
    const updated = item.filter((current) => {
      return current.id !== id;
      
    });
    setItem(updated);
  };

  // clear all 
    const removeAll = () => {
      setItem([]);
    };

    // Local storage
    useEffect(() => {
      localStorage.setItem("todoList", JSON.stringify(item));
    }, [item]);
  

  return (
    <>
    <Navbar />

    <div className="mainFrame" style={{marginLeft: '2rem'}}>
      <div id="wlcm-mess">
        <p id='top'>Add your Todo's here</p>
      </div>
      {/* text area and taking inputs */}
      <div id="textarea">
        <input id='ioField' placeholder='Enter your todo here...' type="text" value={Input} onChange={(e) => setInput(e.target.value)}/>
        <button id='addBtn' onClick={addItem}>+</button>
      </div>
      {/* map function to populate multiple cards */}
      <div className="listContent" style={{display: 'inline-block'}}>
        {item.map((current) => {
          return (
            <>
            
            <div className="individualItem" key={current.id}>
              <h3>{current.name}</h3>
              <div className="button">
                <button id='dltBtn' onClick={() => deleItem(current.id)}>
                <span class="material-symbols-outlined">
                  delete
                </span>
                </button>
              </div>
            </div>

            </>
          )
        })}
      </div>

      <br/>
      <br />
      <br />
      <br />
      <br />

      <div className="deleteBtn">
        <button onClick={removeAll}>Clear Todo's</button>
      </div>
    </div>

    </>
  );
}

export default App;
