const Fetcher = async (resource: string) => {
  const res = await fetch(resource);
  const data = await res.json();
  return data;
};

export { Fetcher };
