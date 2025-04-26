# libDrop - Automação de Build e Instalação Local de Bibliotecas Angular

# Como Usar a Extensão **libDrop**

1. **Abra o VSCode** e no seu projeto Angular, pressione `Ctrl+Shift+P` para abrir a paleta de comandos.
   
2. **Escolha o comando** `libDrop: Execute libDrop`.

3. **Informe o caminho absoluto do projeto frontend**:
   - Será solicitado o caminho completo para o diretório onde está o seu projeto frontend. Por exemplo: `C:/meu-projeto/frontend`.

4. **Informe a linha de comando para buildar sua biblioteca**:
   - Digite o comando que você utiliza para fazer o build da sua biblioteca, como:
     - `npm run build`
     - ou `yarn build`
   
5. **Escolha o gerenciador de pacotes (package manager)**:
   - Selecione o gerenciador de pacotes que você usa para instalar dependências no seu projeto frontend. As opções incluem:
     - `npm`
     - `yarn`
     - `pnpm`

6. **Aguarde enquanto o processo de build e instalação é realizado**:
   - A extensão vai gerar o pacote `.tgz` da sua biblioteca, copiá-lo para o diretório do seu projeto frontend e instalar as dependências automaticamente.


## Como Funciona:
O **libDrop** automatiza o processo de build, empacotamento e instalação de bibliotecas Angular no seu projeto frontend local. Com apenas um comando, você pode gerar o pacote da sua biblioteca Angular, copiá-lo para o seu projeto frontend e instalar automaticamente as dependências, facilitando o processo de testes e desenvolvimento.

## Problema que Resolve:
Desenvolvedores de bibliotecas internas geralmente enfrentam o desafio de integrar rapidamente essas bibliotecas com os projetos frontend. O **libDrop** elimina a necessidade de copiar e instalar pacotes manualmente, economizando tempo e evitando erros ao testar mudanças nas bibliotecas Angular em projetos locais.

## How It Works:
**libDrop** automates the process of building, packaging, and locally installing Angular libraries in your frontend project. With just one command, you can generate the package for your Angular library, copy it to your frontend project, and automatically install the dependencies, making the testing and development process easier.

## Problem It Solves:
Internal library developers often face the challenge of quickly integrating these libraries with frontend projects. **libDrop** eliminates the need to manually copy and install packages, saving time and preventing errors when testing changes in Angular libraries in local projects.

# Como Usar a Extensão **libDrop**

1. **Abra o VSCode** e no seu projeto Angular, pressione `Ctrl+Shift+P` para abrir a paleta de comandos.
   
2. **Escolha o comando** `libDrop: Execute libDrop`.

3. **Informe o caminho absoluto do projeto frontend**:
   - Será solicitado o caminho completo para o diretório onde está o seu projeto frontend. Por exemplo: `C:/meu-projeto/frontend`.

4. **Informe a linha de comando para buildar sua biblioteca**:
   - Digite o comando que você utiliza para fazer o build da sua biblioteca, como:
     - `npm run build`
     - ou `yarn build`
   
5. **Escolha o gerenciador de pacotes (package manager)**:
   - Selecione o gerenciador de pacotes que você usa para instalar dependências no seu projeto frontend. As opções incluem:
     - `npm`
     - `yarn`
     - `pnpm`

6. **Aguarde enquanto o processo de build e instalação é realizado**:
   - A extensão vai gerar o pacote `.tgz` da sua biblioteca, copiá-lo para o diretório do seu projeto frontend e instalar as dependências automaticamente.


Clonem e alterem à vontade!

### Repositório:

https://github.com/damtaipu/libDrop

### Link da extensão no Loja:

https://marketplace.visualstudio.com/items/?itemName=josDamTaipu.libdrop

### Contato

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

