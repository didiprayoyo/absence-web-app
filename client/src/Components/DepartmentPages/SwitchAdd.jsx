import React, { useState } from "react";
import axios from "axios";

const SwitchAdd = (props) => {
  const [isDoing, setIsDoing] = useState(false);
  const [value, setValue] = useState("");

  const handleSwitch = () => {
    setIsDoing((prev) => !prev);
  };

  const handleAdd = (id) => {
    axios
      .post(`http://localhost:3000/department/${props.name}`, { value, id })
      .then((result) => {
        if (result.data.Status) {
          console.log(result.data.Result);
        } else {
          // TODO: refactor to toaster
          console.log(result.data.Error);
        }
      }) // TODO: refactor frontend error logs
      .catch((err) => console.log(err));
  };

  return (
    <>
      {!isDoing ? (
        <div key={props.index}>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => handleSwitch()}
          >
            Add
          </button>
        </div>
      ) : (
        <form onSubmit={() => handleAdd(props.id)}>
          <input
            type="text"
            name={props.name}
            placeholder={`Enter ${props.name}`}
            defaultValue={value}
            onChange={(e) => setValue(e.target.value)}
            className="form-control rounded-0"
          />
          <button type="submit" className="btn btn-primary btn-sm">
            Submit Add
          </button>
        </form>
      )}
    </>
  );
};

export default SwitchAdd;
