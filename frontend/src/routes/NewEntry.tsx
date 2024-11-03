import { ChangeEvent, MouseEvent, useContext, useState } from "react";
import { Entry, EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

export default function NewEntry() {
  const emptyEntry: Entry = { title: "", description: "", created_at: new Date() };
  const { saveEntry } = useContext(EntryContext) as EntryContextType;
  const [newEntry, setNewEntry] = useState<Entry>(emptyEntry);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewEntry({
      ...newEntry,
      [event.target.name]: event.target.value,
    });
  };
  const handleSend = (e: MouseEvent<HTMLButtonElement>) => {
    saveEntry(newEntry);
    setNewEntry(emptyEntry);
  };
  return (
    <section className="flex justify-center flex-col w-fit mx-auto mt-10 gap-5 bg-gray-300 dark:bg-gray-700 p-8 rounded-md shadow-md dark:shadow-gray-900">
      <input
        className="p-3 rounded-md bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200 border border-gray-400 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
        type="text"
        placeholder="Title"
        name="title"
        value={newEntry.title}
        onChange={handleInputChange}
      />
      <textarea
        className="p-3 rounded-md bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200 border border-gray-400 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
        placeholder="Description"
        name="description"
        value={newEntry.description}
        onChange={handleInputChange}
      />
      <input
        className="p-3 rounded-md bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200 border border-gray-400 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
        type="date"
        name="created_at"
        value={new Date(newEntry.created_at).toISOString().split("T")[0]}
        onChange={handleInputChange}
      />
      <button
        onClick={(e) => {
          handleSend(e);
        }}
        className="bg-blue-400 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-700 font-semibold text-white p-3 rounded-md transition-colors duration-300"
      >
        Create
      </button>
    </section>
  );
}
