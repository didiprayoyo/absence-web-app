import React, { useState } from "react";
import axios from "axios";

const SwitchEdit = (props) => {
  const [isDoing, setIsDoing] = useState(false);
  const [value, setValue] = useState(
    props.object.job ? props.object.job : props.object.department
  );

  const handleSwitch = () => {
    setIsDoing((prev) => !prev);
  };

  const handleEdit = (id) => {
    axios
      .put(`http://localhost:3000/department/${props.name}/${id}`, { value })
      .then((result) => {
        if (result.data.Status) {
          console.log(result.data.Result);
        } else {
          // TODO: refactor to toaster
          console.log(result.data.Error);
        }
      }) // TODO: refactor frontend error logs
      .catch((err) => console.log(err));
    // handleSwitch();
  };

  return (
    <>
      {!isDoing ? (
        <div>
          {/* <label>{props.object}</label> */}
          <button
            className="btn btn-primary btn-sm"
            onClick={() => handleSwitch()}
          >
            Edit
          </button>
        </div>
      ) : (
        <form onSubmit={() => handleEdit(props.object.id)}>
          <input
            type="text"
            name={props.name}
            placeholder={`Enter ${props.name}`}
            defaultValue={value}
            onChange={(e) => setValue(e.target.value)}
            className="form-control rounded-0"
          />
          <button type="submit" className="btn btn-primary btn-sm">
            Submit Edit
          </button>
        </form>
      )}
    </>
  );
};

export default SwitchEdit;
