import { useEffect, useMemo, useReducer } from 'react';
import ActivityList from './components/ActivityList';
import CalorieTracker from './components/CalorieTracker';
import Form from './components/Form';
import { activityReducer, initialState } from './reducers/activity-reducer';

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities));
  }, [state.activities]);

  const CanRestartApp = () =>
    useMemo(() => state.activities.length, [state.activities]);

  return (
    <>
      <header className='bg-lime-600 py-3'>
        <div className='max-w-4xl mx-auto flex justify-between items-center'>
          <h1 className='text-center text-lg font-bold text-white uppercase'>
            Contador de calorías
          </h1>
          <button
            className='bg-gray-800 hover:bg-gray-900 text-white font-bold p-2 cursor-pointer  rounded-lg text-sm uppercase disabled:opacity-10'
            disabled={!CanRestartApp()}
            onClick={() =>
              dispatch({
                type: 'restart-app'
              })
            }
          >
            Reinciar App
          </button>
        </div>
      </header>
      <section className='bg-lime-500 py-20 px-5'>
        <div className='max-w-4xl mx-auto'>
          <Form dispatch={dispatch} state={state} />
        </div>
      </section>

      <section className='bg-lime-800 py-10 '>
        <div className='max-w-4xl mx-auto'>
          <CalorieTracker activities={state.activities} />
        </div>
      </section>
      <section className='p-10 mx-auto max-w-4xl'>
        <ActivityList activities={state.activities} dispatch={dispatch} />
      </section>
    </>
  );
}

export default App;
