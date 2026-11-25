@echo off
title SenaiHUB - Inicializador
cls
echo ========================================================
echo         INICIANDO SISTEMA SENAIHUB COM MONGODB
echo ========================================================
echo.
echo Limpando processos antigos...
taskkill /F /IM node.exe >nul 2>&1

echo.
echo [1/2] Iniciando o servidor Node.js (Back-end)...
start "SenaiHUB API" cmd /k "cd /d "%~dp0backend" && npm start"

echo [2/2] Aguardando conexao com o MongoDB...
timeout /t 3 /nobreak >nul

echo.
echo Abrindo o site no seu navegador...
start "" "%~dp0frontend\PaginaInicial.html"

echo.
echo ========================================================
echo  TUDO PRONTO!
echo  - O servidor esta rodando na janela preta aberta.
echo  - O site abriu no seu navegador.
echo  (Nao feche a janela preta da API enquanto estiver usando)
echo ========================================================
pause
