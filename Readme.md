# Scoring: File Manager

## For reviewers

If you suddenly have problems getting the correct username, please change the script for launching the program to the following:

```
"start": "node src/index.js"
```

My system normally accepts launching with the parameter:

```
npm run start -- --username=your_username
```

Only if the launch script is like this:

```
"start": "node src/index.js --username=%npm_config_username%"
```

For file commands that expect a single argument (e.g. cd, hash, cat, add, rm), you should not wrap pathnames with spaces in quotes. Like:

```
cat path with spaces/file name with spaces.txt
```

But for commands that expect 2 arguments (e.g. compress, decompress, rn, cp, mv), you need to wrap the arguments in quotes. Like:

```
cp "path with spaces/file to copy with spaces.txt" "destination folder"
```

If there are no spaces, then you don't need to use quotation marks in either case.
At least in powershell and git bash, which I checked, everything is processed correctly.

## Basic Scope

- General
  - **+6** Application accepts username and prints proper message
  - **+10** Application exits if user pressed `ctrl+c` or sent `.exit` command and proper message is printed
- Operations fail
  - **+20** Attempts to perform an operation on a non-existent file or work on a non-existent path result in the operation fail
  - **+10** Operation fail doesn't crash application
- Navigation & working directory operations implemented properly
  - **+10** Go upper from current directory
  - **+10** Go to dedicated folder from current directory
  - **+20** List all files and folders in current directory
- Basic operations with files implemented properly
  - **+10** Read file and print it's content in console
  - **+10** Create empty file
  - **+10** Rename file
  - **+10** Copy file
  - **+10** Move file
  - **+10** Delete file
- Operating system info (prints following information in console) implemented properly
  - **+6** Get EOL (default system End-Of-Line)
  - **+10** Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them)
  - **+6** Get home directory
  - **+6** Get current _system user name_ (Do not confuse with the username that is set when the application starts)
  - **+6** Get CPU architecture for which Node.js binary has compiled
- Hash calculation implemented properly
  - **+20** Calculate hash for file
- Compress and decompress operations
  - **+20** Compress file (using Brotli algorithm)
  - **+20** Decompress file (using Brotli algorithm)

## Advanced Scope

- **+30** All operations marked as to be implemented using certain streams should be performed using Streams API
- **+20** No synchronous Node.js API with asynchronous analogues is used (e.g. not used `readFileSync` instead of `readFile`)
- **+20** Codebase is written in ESM modules instead of CommonJS
- **+20** Codebase is separated (at least 7 modules)

## Forfeits

- **-95% of total task score** Any external tools/libraries are used
- **-30% of total task score** Commits after deadline (except commits that affect only `Readme.md`, `.gitignore`, etc.)
