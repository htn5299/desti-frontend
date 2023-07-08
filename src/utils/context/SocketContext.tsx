import { io, Socket } from 'socket.io-client'
import { createContext, useEffect, ReactNode, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../redux/features/authSlice'

interface SocketContextProps {
  children: ReactNode
}

interface SocketContextValue {
  socket: Socket | null
}

export const SocketContext = createContext<SocketContextValue>({
  socket: null
})

export const SocketProvider = ({ children }: SocketContextProps) => {
  const token = useSelector(selectCurrentToken)
  const [socket, setSocket] = useState<Socket | null>(null)
  useEffect(() => {
    if (token) {
      setSocket(
        io(`${process.env.REACT_APP_SOCKET_API}`, {
          withCredentials: true,
          extraHeaders: { Authorization: `Bearer ${token}` }
        })
      )
    }
    return () => {
      socket?.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>
}
