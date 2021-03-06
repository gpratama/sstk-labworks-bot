import { useContext, useEffect } from 'react'
import Router from 'next/router'
import store from '../store'
import axios from 'axios'
import useInterval from '../hooks/useInterval'
import DeadlineTable from '../components/DeadlineTable'
import DeadlineAddModal from '../components/DeadlineAddModal'
import DeadlineAddButton from '../components/DeadlineAddButton'
import DeadlineEditModal from '../components/DeadlineEditModal'
import DeadlineDeleteModal from '../components/DeadlineDeleteModal'

const Deadline = () => {
  const { state, dispatch } = useContext(store)
  const { token, deadline } = state
  if (!token) Router.push('/')

  const fetchDeadline = async () => {
    const res = await axios.get('/api/deadline', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    dispatch({
      type: 'SET_DEADLINE',
      payload: res.data
    })
  }

  useEffect(() => {
    fetchDeadline()
  }, [deadline.updated])

  useInterval(() => {
    fetchDeadline()
  }, 30 * 1000)

  return (
    <div>
      <DeadlineAddButton />
      {deadline.list.length > 0 ? (
        <DeadlineTable />
      ) : (
        <div className="has-text-centered">
          Belum ada deadline yang telah diatur
        </div>
      )}
      {(deadline.modal.open || false) && <DeadlineAddModal />}
      {(deadline.edit.kode_praktikum || false) && <DeadlineEditModal />}
      {(deadline.delete.kode_praktikum || false) && <DeadlineDeleteModal />}
    </div>
  )
}

export default Deadline
