import { useState } from "react";

export function useFormFields(initialState) {
  const [fields, setValues] = useState(initialState);
  let ret =  [
    fields,
    function(event) {
      let value = (event.target.type == 'checkbox')?event.target.checked:event.target.value;
     setValues({
        ...fields,
        [event.target.id]: value
      });
    }
  ];

  return ret;
}