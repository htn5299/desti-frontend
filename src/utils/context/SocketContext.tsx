import { io, Socket } from 'socket.io-client'
import { createContext, useEffect, ReactNode } from 'react'
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
  let socket: Socket | null = null
  useEffect(() => {
    if (token) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      socket = io('http://localhost:3001/', {
        withCredentials: true,
        extraHeaders: { Authorization: `Bearer ${token}` }
      })
    } else {
      socket?.disconnect()
      socket = null
    }
    return () => {
      socket?.disconnect()
    }
  }, [token])
  const socketValue: SocketContextValue = {
    socket: token ? socket : null
  }
  return <SocketContext.Provider value={socketValue}>{children}</SocketContext.Provider>
}
