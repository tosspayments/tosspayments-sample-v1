import { useRouter } from "next/router";

export default function FailPage() {
  const { query } = useRouter();

  return (
    <main
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>결제 실패</h1>
      <p>이유: {query.message ?? "알 수 없음"}</p>
    </main>
  );
}
