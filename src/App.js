import { useEffect, useRef, useState } from "react";


function App() {
  const dataInput = localStorage.getItem('workList') || []
  // console.log(JSON.parse(dataInput))
  const [state, setState] = useState(JSON.parse(dataInput))
  const [work, setWork] = useState('')
  const itemRef = useRef([])
  const inputRef = useRef()
  const handleChange = (e) => {
    setWork(e.target.value)
  }
  const handleAdd = (e,work) => {
    e.preventDefault();
    work = work.trim('')
    let data = [...state, work]
    localStorage.setItem('workList', JSON.stringify(data.filter(item => !!item === true)))
    setState(data)
    setWork('')
    inputRef.current.focus()
  }
  const handleClick = (id) => {
    itemRef.current[id].classList.toggle('completed')
  }
  const deleteItem = (e, index) => {
    e.stopPropagation();
    const data = state.map((item, i) => {
      if (i != index) {
        return item
      }
    })
    itemRef.current.splice(index, 1)
    localStorage.setItem('workList', JSON.stringify(data.filter(item => !!item === true)))
    setState(data)
  }

  return (
    <div className="container">
      <form className="form" >
        <input type="text" placeholder="Enter your todo" ref={inputRef} value={work} onChange={e => handleChange(e)} />
        <button type="submit" onClick={(e) => handleAdd(e,work)}>Add</button>
      </form>
      <ul className="todos">
        {state.map((item, index) => {
          return !!item && <li className='' ref={item => itemRef.current[index] = item} key={index} onClick={() => handleClick(index)}>
            <span>{item}</span>
            <i className="fas fa-trash" onClick={(e) => deleteItem(e, index)}></i>
          </li>
        })}
      </ul>
    </div>
  );
}

export default App;
