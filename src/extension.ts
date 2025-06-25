

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
        prompt: 'Digite o caminho absoluto do projeto Front-end',
        value: path.resolve()
      });


      if (!frontendPath || !fs.existsSync(frontendPath)) {
        vscode.window.showErrorMessage('Caminho inválido para o projeto frontend.');
        return;
      }

      const buildCommand = await vscode.window.showInputBox({
        placeHolder: 'Informe o comando para build da biblioteca (ex: npm run build design-system)',
        prompt: 'Digite o comando que a biblioteca usa para ser buildada',
        validateInput: (input) => {
          // Validação simples para garantir que algo foi informado
          return input ? null : 'Comando não pode ser vazio!';
        },
      });

      const commandParts = buildCommand!.split(' ');

      const packageManager = await vscode.window.showQuickPick(['npm', 'yarn', 'pnpm'], {
        placeHolder: 'Escolha o package manager para instalar a lib no Front-end',
      });

      if (!packageManager) {return;}

      log('📦 Iniciando build da biblioteca...');
      await runCommandWithLogs(commandParts[0], commandParts.slice(1), rootPath, log);

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
      
      let installArgs: string[] = [];

      switch (packageManager) {
        case 'npm':
          installArgs = ['install', `${tgzName}`];
          break;
        case 'yarn':
          installArgs = ['add', `${tgzName}`];
          break;
        case 'pnpm':
          installArgs = ['add', `${tgzName}`];
          break;
      }

      await runCommandWithLogs(packageManager, installArgs, frontendPath, log);

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
      <img src="https://raw.githubusercontent.com/damtaipu/libDrop/refs/heads/main/assets/icon.png" width="80" />
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
