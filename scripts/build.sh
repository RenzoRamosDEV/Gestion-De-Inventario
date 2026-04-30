#!/bin/bash

# Script para construir todo el proyecto
echo "🏗️  Construyendo proyecto completo..."

# Backend
echo "📦 Construyendo backend..."
cd entity-service
mvn clean package -DskipTests
if [ $? -ne 0 ]; then
    echo "❌ Error construyendo backend"
    exit 1
fi
cd ..

# Frontend
echo "📦 Construyendo frontend..."
cd frontend
npm ci
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Error construyendo frontend"
    exit 1
fi
cd ..

echo "✅ Proyecto construido exitosamente"