import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { useAuthContext } from "./AuthContext";

interface SocketContextType {
  socket: Socket | undefined;
}

const SocketContext = createContext<SocketContextType>({
  socket: undefined,
});

export const SocketContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [socket, setSocket] = useState<Socket | undefined>();
  const { currentUser } = useAuthContext();

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
  }, []);

  useEffect(() => {
    currentUser && socket?.emit("newUser", currentUser.id);
  }, [currentUser, socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = (): SocketContextType => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocketContext used outside the provider.");
  }

  return context;
};
