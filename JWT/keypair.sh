#!/bin/bash

set -euo pipefail

# Generar llave privada
openssl genrsa -out private.pem 2048

# Extraer llave pública
openssl rsa -in private.pem -pubout -out public.pem

echo "Llaves generadas exitosamente: private.pem y public.pem"
