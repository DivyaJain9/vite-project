import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "firebase/compat/auth";
import { onSnapshot, collection } from "firebase/firestore";

import { auth, firestore } from "./utils/firebase/firebase.config";

import { RoomT } from "./types/room.types";
import { UserT } from "./types/user.types";
import Layout from "./components/Layout";
import Room from "./pages/Room";
import Rooms from "./pages/Rooms";
import NotFound from "./components/NotFound";

const App = () => {
  const [currentUser, setCurrentUser] = useState<UserT | null>(null);
  const [rooms, setRooms] = useState<RoomT[]>([]);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setCurrentUser(user as UserT | null);
    });

    const unsubscribeRooms = onSnapshot(
      collection(firestore, "rooms"),
      (snapshot) => {
        const fetchedRooms: RoomT[] = snapshot.docs.map((doc) => {
          const data = doc.data() as Omit<RoomT, "id">; // Cast the data to the expected type, omitting 'id'
          return {
            id: doc.id,
            ...data,
          };
        });
        setRooms(fetchedRooms);
      }
    );
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout currentUser={currentUser} setRooms={setRooms} />}
        >
          <Route index element={<Rooms rooms={rooms} />} />
          <Route
            path="room/:roomId"
            element={<Room currentUser={currentUser} />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
