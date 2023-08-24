import { useRouter } from "next/router";

export default function Home() {
  const { query } = useRouter();

  return (
        <h1>Page {query.url}</h1>
  );
}