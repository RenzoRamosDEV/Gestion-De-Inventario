#!/bin/bash

# Script para ejecutar tests del backend
echo "🧪 Ejecutando tests del backend..."

cd entity-service

# Ejecutar tests
mvn clean test

if [ $? -eq 0 ]; then
    echo "✅ Tests del backend ejecutados exitosamente"
else
    echo "❌ Fallos en tests del backend"
    exit 1
fi