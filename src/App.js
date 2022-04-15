import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./database/firebase-config";
import { createUser, deleteUser } from "./services/index";

function App() {
  const [updateList, setUpdateList] = useState(false);
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
  }, [updateList]);

  const handleSubmit = async e => {
    e.preventDefault();
    await createUser(newName, newAge);
    setUpdateList(!updateList);
    setNewName("");
    setNewAge("");
  };

  const handleDelete = id => {
    deleteUser(id);
    setUpdateList(!updateList);
  };

  return (
    <div className="bg-[#038c73] m-3 p-4 max-w-md mx-auto rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <form onSubmit={e => handleSubmit(e)}>
        <input
          value={newName}
          placeholder="Name..."
          onChange={e => setNewName(e.target.value)}
        />
        <input
          value={newAge}
          type="number"
          placeholder="Age..."
          onChange={e => setNewAge(e.target.value)}
        />

        <button type="submit"> Create User</button>
      </form>
      <div class="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead
            class="text-xs text-[#f27405] uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400"
            s
          >
            <tr>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Age
              </th>
              <th scope="col" class="px-6 py-3 text-right">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {user.name}
                </td>
                <td class="px-6 py-4">{user.age}</td>
                <td class="px-6 py-4 text-right">
                  <button
                    className="text-[#038c73]"
                    onClick={() => updateUser(user.id, user.age)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button className="text-red-500" onClick={() => handleDelete(user.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
