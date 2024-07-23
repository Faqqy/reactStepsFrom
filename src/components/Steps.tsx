// import { useCallback, useState } from "react";

import React, { MouseEventHandler, useState } from "react";

interface formDataType {
  formData: string,
  formPassed: number
}

export default function Steps() {

  const [form, setForm] = useState<formDataType>({
    formData: '',
    formPassed: 0,
  });

  const [history, setHistory] = useState<formDataType[]>([]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setHistory([...history, form]);
    if (form.formData && form.formPassed) {
      if (history.findIndex((el) => el.formData === form.formData) > -1) {
        const arr = history.map((el) => {
          return (
            (el.formData === form.formData) ? 
            {
              formData: el.formData, 
              formPassed: (+el.formPassed) + (+form.formPassed)
            } : 
            {
              formData: el.formData, 
              formPassed: el.formPassed
            }
        )})
        setHistory(arr);
      } else {
          let insertAfter = history.findIndex((el) => el.formData < form.formData);
          insertAfter = insertAfter === -1 ? history.length : insertAfter;
          const arr = [...history.slice(0, insertAfter), form, ...history.slice(insertAfter)];

        setHistory(arr);
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm(prevForm => ({...prevForm, [name]: value}))
  } 

  const onClickRemove = (index: number) => {
    setHistory(history.filter((_, i) => i != index));
  }

  const onClickEdit: MouseEventHandler<HTMLDivElement> = (el) => {
    setForm(history.filter((step) => step.formData === el.currentTarget.id)[0]);
  }
  

  return(
      <>
        <form onSubmit={handleSubmit}>
          <label>
            Дата (ДД.ММ.ГГ)
            <input type="date" name="formData" value={form.formData} onInput={handleChange}/>
          </label>
          <label>
            Пройдено км
            <input type="number" name="formPassed" value={form.formPassed} onInput={handleChange}/>
          </label>
          <button type="submit">OK</button>
        </form>
        <div>
          <ul className="d-flex">
            <li>
              <span className="col">Дата (ДД.ММ.ГГ)</span>
              <span className="col">Пройдено км</span> 
              <span className="col">Действия</span>
            </li>
          </ul>
          {history.map((el, i) => (
            <li>
              <div className="d-flex" key={i}>
                <div>
                  {el.formData.split('-').reverse().join('.')}
                </div>
                <div>
                  {el.formPassed}
                </div>
                <div>
                  <button onClick={() => onClickEdit}>EDIT</button>
                  <button onClick={() => onClickRemove(i)}>X</button>
                </div>
              </div>
            </li>
          ))}
        </div>
      </>
  )
}