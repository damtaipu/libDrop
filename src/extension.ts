

import * as vscode from 'vscode';
import * as path from 'path';
import * as cp from 'child_process';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('angular-lib-sync.buildAndInstallLibrary', async () => {
    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (!workspaceFolders || workspaceFolders.length === 0) {
      vscode.window.showErrorMessage('Nenhum workspace aberto.');
      return;
    }

    const rootPath = workspaceFolders[0].uri.fsPath;
    const panel = showLogPanel();
    const log = (msg: string) => panel.webview.postMessage({ type: 'log', message: msg });

    try {
      const frontendPath = await vscode.window.showInputBox({
        prompt: 'Digite o caminho absoluto do projeto frontend',
        value: path.resolve(rootPath)
      });

      if (!frontendPath || !fs.existsSync(frontendPath)) {
        vscode.window.showErrorMessage('Caminho inválido para o projeto frontend.');
        return;
      }

      const packageManager = await vscode.window.showQuickPick(['npm', 'yarn', 'pnpm'], {
        placeHolder: 'Escolha o gerenciador de pacotes para instalar o pacote no frontend',
      });

      if (!packageManager) {return;}

      log('📦 Iniciando build da biblioteca...');
      await runCommandWithLogs('npm', ['run', 'build', 'design-system'], rootPath, log);

      const distFolder = fs.readdirSync(path.join(rootPath, 'dist'))[0];
      const distPath = path.join(rootPath, 'dist', distFolder);

      log(`📦 Rodando npm pack em: ${distPath}`);
      const tgzName = await runPackAndGetFile(distPath, log);
      const tgzPath = path.join(distPath, tgzName);

      const destinationPath = path.join(frontendPath, tgzName);
      fs.copyFileSync(tgzPath, destinationPath);
      log(`📁 Arquivo copiado para: ${destinationPath}`);

      // Executa o gerenciador de pacotes
      log(`🔧 Instalando dependências com ${packageManager}...`);
      await runCommandWithLogs(packageManager, ['install', `${tgzName}`], frontendPath, log);

      log('✅ Tudo pronto! Lib instalada no frontend com sucesso!');
    } catch (err: any) {
      log(`❌ Erro: ${err.message}`);
      vscode.window.showErrorMessage(`Erro: ${err.message}`);
    }
  });

  context.subscriptions.push(disposable);
}

function runCommandWithLogs(command: string, args: string[], cwd: string, log: (msg: string) => void): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = cp.spawn(command, args, { cwd, shell: true });

    proc.stdout.on('data', (data) => log(data.toString()));
    proc.stderr.on('data', (data) => log(`⚠️ ${data.toString()}`));

    proc.on('close', (code) => {
      code === 0 ? resolve() : reject(new Error(`Código de saída: ${code}`));
    });
  });
}

function runPackAndGetFile(cwd: string, log: (msg: string) => void): Promise<string> {
  return new Promise((resolve, reject) => {
    const proc = cp.spawn('npm', ['pack'], { cwd, shell: true });

    let output = '';
    proc.stdout.on('data', (data) => {
      const text = data.toString().trim();
      log(text);
      output += text;
    });

    proc.stderr.on('data', (data) => log(`⚠️ ${data.toString()}`));

    proc.on('close', (code) => {
      if (code === 0) {
        resolve(output.split('\n').pop() || '');
      } else {
        reject(new Error(`Erro ao empacotar: Código de saída ${code}`));
      }
    });
  });
}

function showLogPanel(): vscode.WebviewPanel {
  const panel = vscode.window.createWebviewPanel(
    'angularLibProgress',
    'libCrop',
    vscode.ViewColumn.One,
    { enableScripts: true }
  );

  panel.webview.html = getLogWebviewHtml();

  return panel;
}

function getLogWebviewHtml(): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <body style="font-family: monospace; padding: 1rem; background: #fff;">
      <img src="https://angular.io/assets/images/logos/angular/angular.svg" width="80" />
      <h2>Status da Sincronização</h2>
      <pre id="log" style="white-space: pre-wrap; color: #0317fc; background: #f5f5f5; padding: 1rem; border-radius: 8px; max-height: 70vh; overflow-y: auto;"></pre>

      <script>
        const logEl = document.getElementById('log');
        window.addEventListener('message', (event) => {
          const msg = event.data;
          if (msg.type === 'log') {
            logEl.textContent += '\\n' + msg.message;
            logEl.scrollTop = logEl.scrollHeight;
          }
        });
      </script>
    </body>
    </html>
  `;
}
