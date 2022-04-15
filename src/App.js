import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./database/firebase-config";
import { createUser, deleteUser, updateUser } from "./services/index";

function App() {
  const [updateList, setUpdateList] = useState(false);
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [idUpdate, setIdUpdate] = useState("");
  const [botaoUpdate, setBotaoUpdate] = useState(false);
  const usersCollectionRef = collection(db, "users");

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

  const handleClickUpdate = (id, name, age) => {
    setIdUpdate(id);
    setNewName(name);
    setNewAge(age);
    setBotaoUpdate(true);
  };

  const handleUpdate = async () => {
    await updateUser(idUpdate, newName, newAge);
    setNewName("");
    setNewAge("");
    setUpdateList(!updateList);
    setBotaoUpdate(false);
  };

  const handleDelete = id => {
    deleteUser(id);
    setUpdateList(!updateList);
  };

  return (
    <div className="bg-[#038c73] m-3 p-4 max-w-md mx-auto rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div>
        <form onSubmit={e => handleSubmit(e)}>
          <input
            className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={newName}
            placeholder="Name"
            onChange={e => setNewName(e.target.value)}
          />
          <input
            className="mt-3 block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={newAge}
            type="number"
            placeholder="Age"
            onChange={e => setNewAge(e.target.value)}
          />
          <div className="flex aling-center justify-end">
            {botaoUpdate === true ? (
              <button
                className="mt-3 text-[#f0f2f2] bg-[#f27405] hover:bg-[#f27405]-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                onClick={() => handleUpdate()}
              >
                Update User
              </button>
            ) : (
              <button
                className="mt-3 text-[#f0f2f2] bg-[#f27405] hover:bg-[#f27405]-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="submit"
              >
                Create User
              </button>
            )}
          </div>
        </form>
      </div>
      <div className="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead
            className="text-xs text-[#f27405] uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400"
            s
          >
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Age
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {user.name}
                </td>
                <td className="px-6 py-4">{user.age}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    className="text-[#038c73]"
                    onClick={() => handleClickUpdate(user.id, user.name, user.age)}
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
