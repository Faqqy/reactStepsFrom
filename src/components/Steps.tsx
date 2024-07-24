// import { useCallback, useState } from "react";

import React, { useState } from "react";

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

  const maxDate = new Date().toISOString().split('T')[0];

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

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

  return( 
      <div className="container">
        <form className="wrap" onSubmit={handleSubmit}>
          <div className="col">
            <label>
              Дата (ДД.ММ.ГГ)
            </label>
            <input type="date" max={maxDate} name="formData" value={form.formData} onInput={handleChange}/>
          </div>
          <div className="col">
            <label >
              Пройдено км
            </label>
            <input type="number" name="formPassed" value={form.formPassed} onInput={handleChange}/> 
          </div>
          <div className="col">
            <button type="submit">OK</button> 
          </div>
        </form>
        <div className="wrap">
            <div className="col">
              <span>Дата (ДД.ММ.ГГ)</span>
            </div>
            <div className="col">
              <span>Пройдено км</span>
            </div> 
            <div className="col">
              <span>Действия</span>
            </div>
        </div>
          {history.map((el, i) => ( 
            <div key={i} className="wrap">
              <div className="col">
                {el.formData.split('-').reverse().join('.')}
              </div>
              <div className="col">
                {el.formPassed}
              </div>
              <div className="col">
                <button onClick={() => onClickRemove(i)}>X</button>
              </div>
            </div>
          ))}
      </div>
  )
}