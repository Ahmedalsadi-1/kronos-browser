#!/bin/bash
set -e # Exit immediately if a command exits with a non-zero status

# Kronos OS Launch Script
# This script starts the Kronos ecosystem services.

GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}======================================${NC}"
echo -e "${BLUE}       KRONOS OS LAUNCHER            ${NC}"
echo -e "${BLUE}======================================${NC}"

# Check for Docker
if ! docker info > /dev/null 2>&1; then
  echo -e "${RED}Error: Docker is not running. Please start Docker Desktop to run Kronos Agent.${NC}"
  exit 1 # Exit if Docker is not running
fi

echo -e "${GREEN}Starting Kronos Agent (Kronbot) via Docker...${NC}"
echo "This includes the AI Agent, Virtual Desktop, and UI."
(cd kronbot && npm install --prefix packages/shared && npm install --prefix packages/bytebot-ui && docker-compose -f docker/docker-compose.yml up -d --build)
echo -e "${GREEN}Kronos Agent started! UI available at http://localhost:9992${NC}"

# Function to open a new Terminal tab/window and run a command
open_terminal_tab() {
  local DIR="$PWD/$1" # Full path
  local CMD="$2"
  local TITLE="$3"
  local TEMP_SCRIPT="/tmp/kronos_launch_$(date +%s%N).sh"

  # Create a temporary script file
  echo "#!/bin/bash" > "$TEMP_SCRIPT"
  echo "cd \"$DIR\" || exit 1" >> "$TEMP_SCRIPT" # cd to dir, exit if fails
  echo "echo -e \"\\033[0;34mStarting $TITLE...\\033[0m\"" >> "$TEMP_SCRIPT"
  echo "$CMD" >> "$TEMP_SCRIPT"
  echo "rm \"$TEMP_SCRIPT\"" >> "$TEMP_SCRIPT" # Self-destruct after execution
  chmod +x "$TEMP_SCRIPT" # Make it executable

  osascript <<EOF
    tell application "Terminal"
      activate
      do script "exec \"$TEMP_SCRIPT\"" in front window
      set custom title of selected tab to "$TITLE"
    end tell
EOF
}

echo -e "${BLUE}Launching Kronos Desktop Backend...${NC}"
open_terminal_tab "kron-desktop/backend" "npm install && npm start" "Kronos Desktop Backend"

echo -e "${BLUE}Launching Kronos Desktop Frontend...${NC}"
open_terminal_tab "kron-desktop/frontend" "npm install && npm run dev" "Kronos Desktop Frontend"

echo -e "${BLUE}Launching BrowserOS Agent...${NC}"
if command -v bun &> /dev/null; then
    open_terminal_tab "BrowserOS-agent" "bun install && bun run start:server" "BrowserOS Agent"
else
    echo -e "${RED}Error: 'bun' not found. Please install Bun to run BrowserOS Agent.${NC}"
    exit 1 # Exit if Bun is not found
fi

echo -e "${BLUE}======================================${NC}"
echo -e "${GREEN}       SYSTEM STATUS                  ${NC}"
echo -e "${BLUE}======================================${NC}"
echo -e "1. ${GREEN}Kronos Agent (Kronbot)${NC}   : http://localhost:9992 (Running in Docker)"
echo -e "2. ${GREEN}Kronos Desktop${NC}           : http://localhost:5173 (Frontend) | http://localhost:3001 (Backend)"
echo -e "3. ${GREEN}BrowserOS Agent${NC}          : http://localhost:9100 (MCP Server)"
echo -e "4. ${GREEN}Kronos Browser${NC}           : Native App (See Dock/Finder)"
echo -e "5. ${RED}Kronos Editor (Void)${NC}     : Build Failed (Network Error)"
echo -e "${BLUE}======================================${NC}"
echo "Run './launch_kronos.sh' again if services fail to start. Check individual Terminal tabs for errors."