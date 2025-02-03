const ps = require('ps-node');  // Biblioteca para listar e matar processos
const { exec } = require('child_process'); // Para executar comandos no sistema

// Função para listar processos em execução
function listarProcessos() {
    ps.lookup({}, (err, resultList) => {
        if (err) {
            throw new Error(err);
        }

        // Filtra os processos que você deseja fechar
        resultList.forEach(process => {
            if (process.command.includes("chrome") || process.command.includes("skype")) {
                console.log(`Fechando o processo: ${process.command}`);
                ps.kill(process.pid, (err) => {
                    if (err) {
                        console.error(`Erro ao tentar matar o processo: ${process.command}`);
                    } else {
                        console.log(`Processo ${process.command} fechado com sucesso`);
                    }
                });
            }
        });
    });
}

// Exemplo de fechamento de aplicativos específicos
listarProcessos();
const programasImportantes = ["obs", "streamlabs", "streamelements"]; // Lista de programas a não fechar

// Função para listar processos em execução e fechar exceções
function listarProcessosEFechar() {
    ps.lookup({}, (err, resultList) => {
        if (err) {
            throw new Error(err);
        }

        resultList.forEach(process => {
            // Verificar se o processo está na lista de exceções
            if (!programasImportantes.some(app => process.command.includes(app))) {
                console.log(`Fechando o processo: ${process.command}`);
                ps.kill(process.pid, (err) => {
                    if (err) {
                        console.error(`Erro ao tentar matar o processo: ${process.command}`);
                    } else {
                        console.log(`Processo ${process.command} fechado com sucesso`);
                    }
                });
            }
        });
    });
}

// Chama a função
listarProcessosEFechar();
const { app, BrowserWindow } = require('electron');
const path = require('path');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('index.html'); // Seu arquivo HTML
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
