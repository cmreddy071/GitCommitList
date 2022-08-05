import "./App.css";
import "antd/dist/antd.css";
import PATScreen from "./PATScreen";
import Commits from "./Commits";
import { useEffect, useState } from "react";

function App() {
  const [patData, setpatData] = useState(null);
  useEffect(() => {
    const data = localStorage.getItem("PATDetails");
    if (data) {
      setpatData(JSON.parse(data));
    }
  }, []);

  const onConfirm = (data) => {
    setpatData(data);
  };
  return (
    <div className="App">
      {!patData ? (
        <PATScreen onConfirm={onConfirm} />
      ) : (
        <Commits patData={patData} />
      )}
    </div>
  );
}

export default App;
