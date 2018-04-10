# Paste at the end of .bashrc file
for file in ~/.{aliases,prompt}; do
  [ -r "$file" ] && [ -f "$file" ] && source "$file";
done;
