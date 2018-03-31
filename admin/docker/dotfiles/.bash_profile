#!/bin/bash

for file in ~/.{aliases,prompt}; do
	[ -r "$file" ] && [ -f "$file" ] && source "$file";
done;
