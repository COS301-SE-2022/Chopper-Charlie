import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectSasUrl } from '../../store/user/user.selector'
import { listFiles } from '../../utils/azure/azure.utils'
import { setFiles } from '../../store/files/files.action'

const Media = () => {
  const dispatch = useDispatch();
  const sasURL = useSelector(selectSasUrl)
  useEffect(() => {
    const loadMedia = async () => {
      const response = await listFiles(sasURL)
      dispatch(setFiles(response))
      console.log(response)
    }
    loadMedia()
  }, [])
  
  return (
    <div>Media</div>
  )
}

export default Media