import { commands, window, ExtensionContext } from "vscode";
import { recorder } from 'node-record-lpcm16'
import { createWriteStream } from 'fs'
import { tmpdir } from 'os'
import { HelloWorldPanel } from "./panels/HelloWorldPanel";

export function activate(context: ExtensionContext) {
  // Create the show hello world command
  const showHelloWorldCommand = commands.registerCommand("hello-world.showHelloWorld", () => {
    HelloWorldPanel.render(context.extensionUri);
  });

  // Add command to the extension context
  context.subscriptions.push(showHelloWorldCommand);

  let disposable = commands.registerCommand('extension.startRecording', function () {
    const filePath = `${tmpdir()}/recording.wav`;
    const fileStream = createWriteStream(filePath, { encoding: 'binary' });

    window.showInformationMessage('Started recording voice.');

    recorder.record({
        sampleRate: 16000,
        threshold: 0.5
    })
    .stream()
    .pipe(fileStream);

    context.subscriptions.push(commands.registerCommand('extension.stopRecording', function () {
        recorder.stop();
        window.showInformationMessage(`Stopped recording voice. File saved to ${filePath}`);
    }));

    context.subscriptions.push(disposable);
});

