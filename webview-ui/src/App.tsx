import { vscode } from "./utilities/vscode";
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import "./App.css";

function App() {
  function handleHowdyClick() {
    vscode.postMessage({
      command: "hello",
      text: "Hey there partner! 🤠",
    });
  }

  return (
    <main>
      <h1>Speak Now!</h1>
      <VSCodeButton onClick={handleHowdyClick}>Record</VSCodeButton>
    </main>
  );
}

export default App;
