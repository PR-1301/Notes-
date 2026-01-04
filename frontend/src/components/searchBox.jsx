import { useState } from "react";
import './searchBox.css'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function SearchBox({ setNotes }) {
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    let url = "";
    const input = searchText.trim().toUpperCase();

    if (!isNaN(input)) {
      url = `https://classroom-4pkw.onrender.com/notes/year/${input}`;
    } 
    else if (
      ["CSE", "ECE", "EEE", "MECH", "CIVIL", "IT", "BME", "AIDS", "AIML"].includes(input)
    ) {
      url = `https://classroom-4pkw.onrender.com/notes/department/${input}`;
    } 
    else {
      url = `https://classroom-4pkw.onrender.com/notes/subject/${searchText}`;
    }

    try {
      setError("");
      const res = await fetch(url);
      const data = await res.json();


      setNotes(data.notes || data);
    } catch (err) {
      setError("Failed to fetch notes");
    }
  };

  return (
    <div className="flex gap-2 w-full">
      <Input
        type="text"
        placeholder="Search by year, department, subject"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="flex-1"
      />
      <Button onClick={handleSearch}>Search</Button>
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
  </div>
  );
}

export default SearchBox;
