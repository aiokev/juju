@echo off

echo Compiling...
call npx tsc
call cls
echo Starting...
call node dist/bot.js