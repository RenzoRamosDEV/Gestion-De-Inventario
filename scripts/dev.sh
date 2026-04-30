#!/bin/bash

# Script para desarrollo local
echo "🚀 Iniciando entorno de desarrollo..."

# Verificar dependencias
command -v docker >/dev/null 2>&1 || { echo "❌ Docker no está instalado"; exit 1; }
command -v node >/dev/null 2>&1 || { echo "❌ Node.js no está instalado"; exit 1; }
command -v mvn >/dev/null 2>&1 || { echo "❌ Maven no está instalado"; exit 1; }

# Levantar base de datos
echo "🗄️  Levantando base de datos..."
cd entity-service
docker-compose up -d mysql
if [ $? -ne 0 ]; then
    echo "❌ Error levantando base de datos"
    exit 1
fi

echo "⏳ Esperando que la base de datos esté lista..."
sleep 15

# Levantar backend
echo "⚙️  Levantando backend..."
mvn spring-boot:run &
BACKEND_PID=$!

cd ../frontend

# Instalar dependencias del frontend si es necesario
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias del frontend..."
    npm ci
fi

# Levantar frontend
echo "🎨 Levantando frontend..."
npm run dev &
FRONTEND_PID=$!

echo "✅ Entorno de desarrollo iniciado"
echo "🌐 Frontend: http://localhost:5173"
echo "🔧 Backend: http://localhost:8080/api/v1"
echo "📚 Swagger: http://localhost:8080/api/v1/swagger-ui.html"
echo ""
echo "Presiona Ctrl+C para detener todos los servicios"

# Función para limpiar procesos al salir
cleanup() {
    echo ""
    echo "🛑 Deteniendo servicios..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    cd entity-service
    docker-compose down
    echo "✅ Servicios detenidos"
    exit 0
}

# Capturar Ctrl+C
trap cleanup SIGINT

# Esperar indefinidamente
wait