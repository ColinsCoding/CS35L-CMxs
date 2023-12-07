#!/bin/bash

# Check if a directory argument is provided
if [ -z "$1" ]; then
    echo "Usage: $0 [directory]"
    exit 1
fi

DIR=$1

# Change to the specified directory
cd "$DIR" || exit

# Output .js files contents
for file in *.js; do
    if [ -f "$file" ]; then
        echo "File: $file"
        cat "$file"
        echo
    fi
done | pbcopy
