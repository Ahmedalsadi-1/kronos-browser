#!/bin/bash
echo "starting vnc"

# Create log directory if it doesn't exist
mkdir -p /tmp/x11vnc_logs

# Start x11vnc with logging
(x11vnc -display $DISPLAY \
    -forever \
    -shared \
    -wait 50 \
    -rfbport 5900 \
    -nopw \
    2>&1 | tee -a /tmp/x11vnc_logs/x11vnc.log > /tmp/x11vnc_logs/x11vnc_pipe) &

x11vnc_pid=$!

# Wait for x11vnc to start
timeout=30
while [ $timeout -gt 0 ]; do
    if netstat -tuln 2>/dev/null | grep -q ":5900 "; then
        echo "x11vnc started successfully on port 5900"
        break
    fi
    sleep 1
    ((timeout--))
done

if [ $timeout -eq 0 ]; then
    echo "x11vnc failed to start within timeout period" >&2
    if [ -f /tmp/x11vnc_logs/x11vnc.log ]; then
        echo "x11vnc log output:" >&2
        cat /tmp/x11vnc_logs/x11vnc.log >&2
    fi
    exit 1
fi

# Monitor x11vnc process and logs in the background
(
    while true; do
        if ! kill -0 $x11vnc_pid 2>/dev/null; then
            echo "x11vnc process crashed, restarting..." >&2
            if [ -f /tmp/x11vnc_logs/x11vnc.log ]; then
                echo "x11vnc log output:" >&2
                cat /tmp/x11vnc_logs/x11vnc.log >&2
            fi
            exec "$0"
        fi
        sleep 5
    done
) &
