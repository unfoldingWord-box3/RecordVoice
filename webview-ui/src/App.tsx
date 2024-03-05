import { vscode } from "./utilities/vscode";
import { useState } from 'react'
import { VSCodeButton, VSCodeTextField } from "@vscode/webview-ui-toolkit/react";
import "./App.css";

function App() {
  const [recording, setRecording] = useState<boolean>(false)
  const [value, setValue] = useState('');

  function handleRecordClick() {
    setRecording(true)
    console.log(`handleRecordClick() - ${value}`)
    vscode.postMessage({
      command: "extension.startRecording",
      text: "Recording Now! 🤠",
    });
  }

  function handleTextChange(text:string) {
    setValue(text)
    console.log(`handleTextChange() - ${text}`)
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
          <VSCodeButton onClick={handleStopClick}>Stop</VSCodeButton>
          <h1>Recording!</h1>
        </main>
        :
        <main>
          <h1>Speak Now!</h1>
          <VSCodeTextField value={value} onInput={e => handleTextChange(e.target?.value || '')} />
          <VSCodeButton onClick={handleRecordClick}>Record</VSCodeButton>
        </main>
  )
}

export default App;
