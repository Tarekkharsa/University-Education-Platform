// import { useNotification } from '~/Services/Providers'

const useSetNotification = () => {
  // const { setNotification } = useNotification();

  const notifications = (message, severity = 'error') => {
    console.log('message', message)
  }
  return {notifications}
}

export default useSetNotification
