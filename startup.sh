#!/bin/bash

# # Navigate to the directory where this script is located
# cd "$(dirname "${BASH_SOURCE[0]}")"

# # Change to the development branch
# git checkout dev

# # Pull latest changes
# git pull origin dev

# # Make the script executable (in case it's not)
# chmod +x startup.sh

# # Start the local server (Python 3.12)
python3.12 -m http.server 8080