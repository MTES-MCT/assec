# Paste at the end of .bashrc file
for file in ~/.{prompt}; do
  [ -r "$file" ] && [ -f "$file" ] && source "$file";
done;
