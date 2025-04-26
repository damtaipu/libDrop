# libDrop

**libDrop** é uma extensão para o VSCode/Windsurf que automatiza o processo de build, empacotamento e instalação local de bibliotecas Angular em projetos front-end.

Ideal para desenvolvedores que mantêm bibliotecas internas e querem integrá-las rapidamente com apps frontend locais.

**libDrop** is an extension for VSCode/Windsurf that automates the process of building, packaging, and locally installing Angular libraries into front-end projects.

Ideal for developers who maintain internal libraries and want to quickly integrate them with local frontend apps.

Clonem e alterem à vontade!

Repositório:
https://github.com/damtaipu/libDrop

Link da extensão no Loja:
(https://marketplace.visualstudio.com/items/?itemName=josDamTaipu.libdrop)[https://marketplace.visualstudio.com/items/?itemName=josDamTaipu.libdrop]

Sugestõe por email:
damiaotaipiu@gmail.com

---

## ✨ Funcionalidades

- 🛠 Build automático da biblioteca Angular.
- 📦 Geração do pacote `.tgz` via `npm pack`.
- 📁 Cópia automática para o projeto front-end.
- 📌 Atualização do `package.json` do front-end com o novo pacote local.
- ⚙️ Execução de `npm install`, `yarn install` ou `pnpm install`.
- 🧾 Logs exibidos em tempo real no painel "Output" do VSCode.

---

## 🚀 Como usar

1. **Abra o projeto da biblioteca Angular** no VSCode/WindSurf.
2. Pressione `Ctrl+Shift+P` e escolha a opção: libDrop:
3. Informe o diretório absoluto projeto front-end (raiz do front-end).
4. Escolha o gerenciador de pacotes (npm, yarn ou pnpm).
5. Acompanhe os logs em tempo real durante o processo.

---


# Para usar e abusar
## 📦 Como gerar o pacote `.vsix` da extensão

Você pode empacotar a extensão para distribuir ou instalar manualmente com os seguintes passos:

### 1. Instale o `vsce` (caso ainda não tenha):
```bash
npm install -g @vscode/vsce
vsce package
```

Um arquivo .vsix será gerado, por exemplo:
```bash
lib-drop-0.0.1.vsix
```

### 📥 Como instalar o .vsix no VSCode
No VSCode, pressione Ctrl+Shift+P.

Digite: Install from VSIX....

Selecione o arquivo .vsix gerado.

