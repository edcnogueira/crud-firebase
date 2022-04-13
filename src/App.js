import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import "./App.css";
import { db } from "./database/firebase-config";
import { createUser, deleteUser } from "./services/index";

function App() {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const usersCollectionRef = collection(db, "users");

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  useEffect(() => {
    const getusers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    getusers();
  }, []);

  return (
    <div className="App">
      <input placeholder="Name..." onChange={e => setNewName(e.target.value)} />
      <input
        type="number"
        placeholder="Age..."
        onChange={e => setNewAge(e.target.value)}
      />

      <button onClick={() => createUser(newName, newAge)}> Create User</button>
      {users.map(user => (
        <div key={user.id}>
          <h1>{user.name}</h1>
          <h1>{user.age}</h1>
          <button onClick={() => updateUser(user.id, user.age)}>Increase Age</button>
          <button onClick={() => deleteUser(user.id)}>Delete User</button>
        </div>
      ))}
    </div>
  );
}

export default App;
