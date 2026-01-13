#!/bin/bash
# This script is executed within a new Terminal tab.

DIR="$1"
CMD="$2"
TITLE="$3"

echo -e "\033[0;34mStarting $TITLE...\033[0m"
cd "$DIR" || { echo "Failed to change directory to $DIR"; exit 1; }
exec $CMD # Use exec to replace the current shell with the command