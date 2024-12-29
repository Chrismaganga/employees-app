import { createFileRoute } from '@tanstack/react-router'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addQuestion } from '../features/questionSlice';

export const Route = createFileRoute('/newPoll')({
  component: RouteComponent,
})

function RouteComponent() {
  const dispatch = useDispatch();
  const [optionOneText, setOptionOneText] = useState('');
  const [optionTwoText, setOptionTwoText] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addQuestion({
      optionOne: { votes: [], text: optionOneText },
      optionTwo: { votes: [], text: optionTwoText },
      id: ''
    }));
    setOptionOneText('');
    setOptionTwoText('');
    setAuthor('');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h4 className="text-2xl font-bold mb-4 ">Create New Poll</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">
              Option One:
              <input
                type="text"
                value={optionOneText}
                onChange={(e) => setOptionOneText(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Option Two:
              <input
                type="text"
                value={optionTwoText}
                onChange={(e) => setOptionTwoText(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Author:
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </label>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Create Poll
          </button>
        </form>
      </div>
    </div>
  );
}
