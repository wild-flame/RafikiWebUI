/*
from https://gist.github.com/jpgorman/f49501076a13cecfaa17d30e8d569be0
and tpai's https://codesandbox.io/s/2zzjljmnzn
and https://decembersoft.com/posts/file-upload-progress-with-redux-saga/
*/

import { eventChannel, END } from "redux-saga";
//axios to send ajax request
import axios from 'axios'
import HTTPconfig from "../HTTPconfig"


export const uploadAPI = (formData) => {
  return eventChannel(emitter => {
    const onUploadProgress = progressEvent => {
      const percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
      console.log("From EventEmiiter, file Uploaded: ", percentCompleted)
      // Send the event to our saga
      emitter({ percentCompleted })
    }

    axios.post(
      `${HTTPconfig.gateway}api/upload-csv`,
      formData,
      {
        headers: HTTPconfig.UPLOAD_FILE,
        onUploadProgress
      }
    ).then(response => {
      console.log("axios responded")
      // Send the event to our saga
      emitter({ result: response.data.result })
      emitter(END) // Special construct to end the channel
    }).catch(err => {
      emitter(new Error(err.message))
      emitter(END)
    })
    // Return an unsubscribe method
    const unsubscribe = () => {} // Perform any cleanup you need here
    return unsubscribe
  })
}
