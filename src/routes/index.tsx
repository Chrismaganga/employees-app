import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react';
import { _getUsers } from '../utils/data';

interface User {
  id: string;
  name: string;
  avatarURL: string;
}

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [users, setUsers] = useState<{ [key: string]: User }>({});

  useEffect(() => {
    _getUsers().then((users) => setUsers(users as { [key: string]: User }));
  }, []);

  return (
    <div className="flex flex-wrap -mx-4 mt-50">
      {Object.values(users).map((user) => (
      <div key={user.id} className="w-full sm:w-1/3 md:w-2/3 lg:w-1/3 px-4 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
        <img className="w-24 h-24 object-cover rounded-lg" src={user.avatarURL} alt={user.name} />
        </div>
    
    </div>
      ))}
    </div>
  );
}