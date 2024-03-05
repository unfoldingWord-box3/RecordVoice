import { vscode } from "./utilities/vscode";
import { useState } from 'react'
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import "./App.css";

function App() {
  const [recording, setRecording] = useState<boolean>(false)

  function handleRecordClick() {
    setRecording(true)
    console.log("handleRecordClick() - Recording Now! 🤠")
    vscode.postMessage({
      command: "extension.startRecording",
      text: "Recording Now! 🤠",
    });
  }

  function handleStopClick() {
    if (recording) {
      setRecording(false)
      console.log("handleStopClick() - Recording Stopped! 🤠")
      vscode.postMessage({
        command: "extension.stopRecording",
        text: "Stopped Recording! 🤠",
      });
    }
  }

  return (
      recording ?
          <main>
            <h1>Speak Now!</h1>
            <VSCodeButton onClick={handleStopClick}>Stop</VSCodeButton>
          </main>
      :
          <main>
            <h1>Recording!</h1>
            <VSCodeButton onClick={handleRecordClick}>Record</VSCodeButton>
          </main>
  )
}

export default App;
