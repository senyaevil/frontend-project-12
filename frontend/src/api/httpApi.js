import axios from 'axios'

const noop = () => { }

const request = (
  {
    url,
    method = 'post',
    data = null,
    onSuccessCb = noop,
    onErrorCb = noop,
    onFinallyCb = noop,
  } = {},
) => axios.request({
  url,
  method,
  data,
  timeout: 5000,
})
  .then((resp) => {
    console.debug(resp)
    onSuccessCb(resp)
  })
  .catch((err) => {
    console.error(err)
    onErrorCb(err)
  })
  .finally(() => onFinallyCb())

const getData = config => request({ method: 'get', ...config })

const sendData = config => request({ method: 'post', ...config })

export { getData, sendData }
