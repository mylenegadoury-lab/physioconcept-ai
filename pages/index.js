import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Rediriger vers le nouveau système d'évaluation
    router.push("/assessment");
  }, [router]);

  return null;
}
