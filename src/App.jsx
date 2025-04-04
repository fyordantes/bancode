import Scan from "./Scan";
import Source from "./Source";
import { SourceProvider } from "./SourceContext";
import "./index.css";

function App() {
  return (
    <SourceProvider>
      <div className="max-w-lg mt-2 gap-4 p-4 justify-center h-full min-h-screen flex flex-col mx-auto">
        <h1 className="logo">BANCODE</h1>
        <Source />
        <Scan />
      </div>
    </SourceProvider>
  );
}

export default App;
