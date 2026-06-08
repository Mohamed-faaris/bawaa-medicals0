#!/bin/bash

# Kill existing processes
pkill -9 -f "vite" 2>/dev/null
pkill -9 -f "tsx" 2>/dev/null
sleep 2

echo "Starting servers..."

# Start server
cd /home/faaris/projects/freelance/bavaa-medicals/apps/server && bun run dev &
sleep 2

# Start all vite apps in parallel
cd /home/faaris/projects/freelance/bavaa-medicals/apps/customer-mobile && bun run dev &
cd /home/faaris/projects/freelance/bavaa-medicals/apps/admin-mobile && bun run dev &
cd /home/faaris/projects/freelance/bavaa-medicals/apps/delivery-mobile && bun run dev &
cd /home/faaris/projects/freelance/bavaa-medicals/apps/admin-panel && bun run dev &

sleep 5

echo ""
echo "=== Servers Running ==="
echo "Server:   http://localhost:3000"
echo "Customer: http://localhost:4001"
echo "Admin:    http://localhost:4002"
echo "Delivery: http://localhost:4003"
echo "Panel:    http://localhost:4004"
echo ""
