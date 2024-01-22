import Header from "./header";
import Content from "./content";
import Footer from "./footer";
import { useEffect, useState } from "react";
import AddItem from "./AddItem";




function App() {
  const [items,setItems]=useState(JSON.parse(localStorage.getItem('shoppinglist'))||[]);

  const [newItem,setNewItem]=useState('');

  useEffect(()=>{
    localStorage.setItem('shoppinglist',JSON.stringify(items));

  },[items])

  

  const addItem =(item)=>{
    const id = items.length ? items[items.length-1].id+1 :1;
    const myNewItem={id, checked:false, item};
    const listItems=[...items,myNewItem];
    setItems(listItems);
  }

  const handleCheck =(id)=>{
    const listItems=items.map((item)=>item.id===id ?{...item,
      checked : !item.checked } :item);
     setItems(listItems);
      
  };

  const handleDelete = (id)=>{
    const listItems= items.filter((item)=>item.id!==id)
   setItems(listItems);
    
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('')
    
  }

  return (
   <div className="App">
    <Header/>
    <AddItem
      
      newItem={newItem}
      setNewItem={setNewItem}
      handleSubmit={handleSubmit}

    
    />
   <Content 
   items={items}
   
   handleCheck={handleCheck}
   handleDelete={handleDelete}
   
   />
   <Footer length={items.length}/>
   </div>
   
  );
}

export default App;
