import { useState } from "react";
import server from "./server";

const serverUrl = "http://localhost:1225";

function CheckList() {
  const [nameCheck, setNameCheck] = useState("");
  const [check, setCheck] = useState("Waiting for input...");
  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function checkList(evt) {
    evt.preventDefault();
    if (nameCheck != "") {
      const { data: check } = await server.post(`${serverUrl}/gift`, {
        nameCheck,
      });
      //
      setCheck(check);
    } else {
      setCheck("Waiting for input...");
    }
  }

  return (
    <form className="container" onSubmit={checkList}>
      <h1>Check for name</h1>

      <label>
        Name
        <input
          placeholder="Type your name here..."
          value={nameCheck}
          onChange={setValue(setNameCheck)}
        ></input>
      </label>

      <div>Result: {check} </div>

      <input type="submit" className="button" value="Check" />
    </form>
  );
}

export default CheckList;