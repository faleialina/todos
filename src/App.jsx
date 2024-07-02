import { useEffect, useState } from 'react'
import style from './style.module.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios'

function App() {
  const [arr, setArr] = useState([])
  const [inpVal, setInpVal] = useState('')

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    request()
  }, [])


  const request = async () => {
    const response = await axios.get('https://dummyjson.com/todos')
    setArr(response.data.todos)
  }

  const addTask = async () => {
    const response = await axios.post('https://dummyjson.com/todos/add', {
      todo: inpVal,
      completed: false,
      userId: 5,
    })
    setArr([...arr, response.data])
    setInpVal('')
  }


  const deliteTask = async (el) => {
    const response = await axios.delete(`https://dummyjson.com/todos/${el.id}`)
    const newArr = arr.filter((elem) => elem.todo != response.data.todo)
    setArr(newArr)
  }

  return (
    <div className={style.contein}>
      <div className={style.conteinBtn}>
        <TextField value={inpVal} id="standard-basic" label="Name tast" variant="standard" onChange={(e) => setInpVal(e.target.value)} />
        <Button variant="contained" onClick={() => addTask()}>Add Task</Button>
      </div>
      <div className={style.wrapper}>
        {arr.map((el) =>
          <div className={style.wrapperTask}>
            <p>{el.todo} </p>
            <div> <CreateIcon onClick={handleOpen} /> <DeleteIcon onClick={() => deliteTask(el)} /></div>
          </div>)}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={style.styleBox}>
          <h1>Update Task</h1>
          <TextField id="standard-basic" label="Name tast" variant="standard" />
          <Button variant="contained" >Update Task</Button>
        </Box>
      </Modal>

    </div >
  )
}

export default App
