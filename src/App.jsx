
import { useEffect, useState } from "react";

const url = "https://run.mocky.io/v3/17d21aac-bb1e-4908-9cb9-93c845fa6f58";
export default function App() {
  const [userData, setUserData] = useState([]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState([]);
  const fetchData = async () => {
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      setUserData(data["data"]);
    } else {
      console.log("network error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handelChange = (e) => {
    setInput(e.target.value);

    const temp = userData.filter((e) => {
      if (e["employee_name"].toLowerCase().includes(input.toLowerCase())) {
        return e;
      }
    });
    setSearch(temp);
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search User"
        onChange={handelChange}
        value={input}
      />
      <button
        onClick={() => {
          setInput("");
          setSearch([]);
        }}
      >
        Reset
      </button>
      <ul>
        {search.length > 0
          ? search.map((e) => <li id={e["id"]}>{e["employee_name"]}</li>)
          : null}
      </ul>
    </div>
  );
}
