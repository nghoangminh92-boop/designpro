import Hero from "./Hero";
import ProductDemo from "./Demos";

export default function App() {
  const demo = new URLSearchParams(window.location.search).get("demo");

  if (demo === "novaforge") return <ProductDemo id="novaforge" />;
  if (demo === "kora") return <ProductDemo id="kora" />;
  if (demo === "sora") return <ProductDemo id="sora" />;

  return <Hero />;
}
