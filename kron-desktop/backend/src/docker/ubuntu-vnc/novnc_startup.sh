#!/bin/bash
echo "Starting noVNC..."

# Create log directory if it doesn't exist
mkdir -p /tmp/novnc_logs

# Kill any existing websockify processes
pkill -f websockify || true

# Start websockify with explicit settings and logging
websockify \
    --web /opt/noVNC \
    6080 \
    localhost:5900 \
    2>&1 | tee -a /tmp/novnc_logs/novnc.log > /tmp/novnc_logs/novnc_pipe &

# Wait for noVNC to start
timeout=30
while [ $timeout -gt 0 ]; do
    if netstat -tuln 2>/dev/null | grep -q ":6080 "; then
        echo "✓ noVNC started successfully on port 6080"
        exit 0
    fi
    echo "Waiting for noVNC to start... ($timeout seconds remaining)"
    sleep 1
    ((timeout--))
done

echo "✗ noVNC failed to start within timeout period" >&2
if [ -f /tmp/novnc_logs/novnc.log ]; then
    echo "noVNC log output:" >&2
    cat /tmp/novnc_logs/novnc.log >&2
fi
exit 1
