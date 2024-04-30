import React, { useEffect, useState } from 'react'

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './Todo.css'
const Todo = () => {
 const[text,setText]= useState("");
 const[list,setList]=useState(()=>{
  const stoList=localStorage.getItem('mylist');
  return stoList?JSON.parse(stoList):[]
 });
 const[editIndex,setEditIndex]=useState(-1);

 const addItem=()=>{
    if(text.trim().length>0)
    {
      const newItem={text:text,completed:false}
      setList([...list,newItem])
      setText("")
    }
 }
 const deleteItem=(index)=>{
  const deletelist=list.filter((data,idx)=>{
     return index!=idx;
  })
  setList(deletelist)
 }
  const handleEdit=(index)=>{
    setEditIndex(index)
    setText(list[index].text)
  }

  const updateItem=()=>{
    const updatedList=[...list];
    updatedList[editIndex].text=text;
    setList(updatedList)
    setEditIndex(-1);
    setText('')
  }
  const handleToggle=(index)=>{
    const newlist=[...list];
    newlist[index].completed=!newlist[index].completed
    setList(newlist)
  }
  useEffect(()=>{
    localStorage.setItem('mylist',JSON.stringify(list))
  },[list])

  const deleteAll=()=>{
    setList([]);
  }
  return (
    <div className='X'>
      <h1>Todo App</h1>
      <div className="y">
        <input type="text"
        value={text}
        onChange={(e)=>setText(e.target.value)}
         />
        <button onClick={editIndex==-1?addItem:updateItem}>{editIndex==-1?'Add':'update'}</button>
        {
          list.map((data,idx)=>{
             return(
              <ul key={idx}>
                <li style={{textDecoration:data.completed?"line-through":"none"}}>{data.text}
                <input type="checkbox" 
                 checked={data.completed}
                 onChange={()=>handleToggle(idx)}
                />
                <EditIcon onClick={()=>handleEdit(idx)}/>
                <DeleteIcon onClick={()=>deleteItem(idx)}/>
                </li>
              </ul>
             )
          })
        }
        <button onClick={deleteAll}>DeleteAll</button>
      </div>
    </div>
  )
}

export default Todo;