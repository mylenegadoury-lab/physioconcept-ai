import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Rediriger automatiquement vers le dashboard
    router.push("/dashboard");
  }, [router]);

  return null;
}
