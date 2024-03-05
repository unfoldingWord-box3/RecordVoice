import { commands, window, ExtensionContext } from "vscode";
import { RecordingPanel } from "./panels/RecordingPanel";

export function activate(context: ExtensionContext) {
  // Create the show hello world command
  const showHelloWorldCommand = commands.registerCommand("record-voice.recordVoicePrompt", () => {
    RecordingPanel.render(context.extensionUri);
  });

  // Add command to the extension context
  context.subscriptions.push(showHelloWorldCommand);
}
