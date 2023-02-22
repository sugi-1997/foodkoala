import useSWR from 'swr';

const fetcher = (resource: string, init: any) =>
  fetch(resource, init).then((res) => res.json());

export default function Users() {
  const { data, error } = useSWR(
    'http://localhost:8000/users',
    fetcher
  );

  if (error) return <div>Failed to load...</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <ul>
        {data.map((user: any) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
}
