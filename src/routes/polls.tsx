import { createFileRoute } from '@tanstack/react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { _getUsers, _getQuestions } from '../utils/data';
import { receiveQuestions, receiveUsers } from '../features/pollSlice.';
import { Question, User } from '../types';

export const Route = createFileRoute('/polls')({});

function RouteComponent() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.poll.user);
  const questions = useSelector((state: any) => state.poll.questions);

  useEffect(() => {
    async function fetchData() {
      const user = await _getUsers() as { [key: string]: User };
      const questions = await _getQuestions() as { [key: string]: Question };
      dispatch(receiveUsers(user));
      dispatch(receiveQuestions(questions));
    }
    fetchData();
  }, [dispatch]);

  return (
    <div>
      <h1>Polls</h1>
      <div>
        <h2>Users</h2>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
      <div>
        <h2>Questions</h2>
        <pre>{JSON.stringify(questions, null, 2)}</pre>
        console.log(polls)
      </div>
    </div>
  );
}

export default RouteComponent;