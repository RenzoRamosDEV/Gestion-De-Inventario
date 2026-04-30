#!/bin/bash

# Script para ejecutar tests del frontend
echo "🧪 Ejecutando tests del frontend..."

cd frontend

# Instalar dependencias si es necesario
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm ci
fi

# Ejecutar tests
npm test

if [ $? -eq 0 ]; then
    echo "✅ Tests del frontend ejecutados exitosamente"
else
    echo "❌ Fallos en tests del frontend"
    exit 1
fi