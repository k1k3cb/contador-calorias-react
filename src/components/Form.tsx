import { Dispatch, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { categories } from '../data/categories';
import { ActivityActions } from '../reducers/activity-reducer';
import { Activity } from '../types';

interface FormProps {
  dispatch: Dispatch<ActivityActions>;
}

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  activityName: '',
  calories: 0
};

const Form = ({ dispatch }: FormProps) => {
  const [activity, setActivity] = useState<Activity>(initialState);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    //compruebo el campo para convertirlo en number
    const isNumberField = ['category', 'calories'].includes(e.target.id);

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value
    });
  };

  const isValid = () => {
    const { activityName, calories } = activity;
    return activityName.trim() !== '' && calories > 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({
      type: 'save-activity',
      payload: { newActivity: activity }
    });
    setActivity({
      ...initialState,
      id: uuidv4()
    });
  };

  return (
    <form
      className='space-y-5 bg-white shadow p-10 rounde-lg'
      onSubmit={handleSubmit}
    >
      <div className='grid grid-cols-1 gap-3'>
        <label htmlFor='category' className='font-bold'>
          Categorías:
        </label>
        <select
          name=''
          id='category'
          className='border border-slate-300 rounded-lg w-full bg-white'
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className='grid grid-cols-1 gap-3'>
        <label htmlFor='activityName' className='font-bold'>
          Actividad:
        </label>
        <input
          type='text'
          id='activityName'
          className='border border-slate-300 p-2 rounded-lg'
          placeholder='Ej. Comida, zumo de naranja, correr'
          value={activity.activityName}
          onChange={handleChange}
        />
      </div>
      <div className='grid grid-cols-1 gap-3'>
        <label htmlFor='calories' className='font-bold'>
          Calorías:
        </label>
        <input
          type='number'
          id='calories'
          className='border border-slate-300 p-2 rounded-lg'
          placeholder='Calorías, ej. 300'
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input
        type='submit'
        className={`bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white ${
          !isValid() ? 'disabled:opacity-10' : 'cursor-pointer'
        }`}
        value={`Guardar ${activity.category === 1 ? 'comida' : 'ejercicio'}`}
        disabled={!isValid()}
      />
    </form>
  );
};

export default Form;
