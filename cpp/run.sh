#!/bin/bash
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' 
START_NUM=27
print_usage() {
    echo -e "${YELLOW}Usage: $0 [options]${NC}"
    echo "Options:"
    echo "  -n <number>    Starting number for sequence (default: 27)"
    echo "  -c            Clean build directory"
    echo "  -h            Show this help message"
}

while getopts "n:ch" opt; do
    case $opt in
        n)
            START_NUM=$OPTARG
            ;;
        c)
            echo -e "${YELLOW}Cleaning build directory...${NC}"
            rm -rf build
            ;;
        h)
            print_usage
            exit 0
            ;;
        \?)
            echo -e "${RED}Invalid option: -$OPTARG${NC}" >&2
            print_usage
            exit 1
            ;;
    esac
done
echo -e "${YELLOW}Setting up build directory...${NC}"
mkdir -p build
cd build
echo -e "${YELLOW}Configuring with CMake...${NC}"
if ! cmake .. > cmake_log.txt 2>&1; then
    echo -e "${RED}CMake configuration failed! Check cmake_log.txt for details${NC}"
    exit 1
fi
echo -e "${YELLOW}Building project...${NC}"
if ! make > make_log.txt 2>&1; then
    echo -e "${RED}Build failed! Check make_log.txt for details${NC}"
    exit 1
fi
echo -e "${GREEN}Build successful! Running visualization with starting number: $START_NUM${NC}"
./SyracuseSequence $START_NUM