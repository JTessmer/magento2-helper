# magento2-helper

## What is this?
The Magento 2 Helper (aka "**m2**") is a command-line utility meant to simplify and streamine the Magento 2 development process.

It does this by:
* Combining commands which are typically used together
* Reducing the keystrokes needed to enter frequently used commands

In addition to providing a number of shortcuts out of the box, **m2** is extensible, allowing users to add further commands with relative ease.

Will this tool revolutionize your world? Not likely. But it _should_ help take a bit of the pain out of your workflow so that you can focus less on entering repetitive terminal commands, and more on writing some awesome code.

## Installation & Usage

To install:
```bash
npm i -g magento2-Helper
```

To use:
```bash
m2 [command] <arguments>

# For a list of commands
m2 --help
# For usage information
m2 --help [command]
```

## Examples


### Setting up and running Grunt
A typical Grunt workflow involves generating symlinks, compiling the symlinked Less into CSS, and finally watching for further changes.

#### Default Magento 2:
```bash
grunt exec:mytheme
grunt less:mytheme
grunt watch:mytheme
```

By default, this requires waiting for each command to complete before manually entering the next command.

#### With magento2-helper:
```bash
m2 e -lw
```

Not only does **m2** automatically run the above sequentially, it remembers your default theme on a per-project basis so that typing it repeatedly is unnecessary.


### Refreshing Magento after switching git branches

Development often requires hopping between several branches throughout the day. Oftentimes different branches will have different Composer modules, Less files, other differences. Clearing these out in order to continue development requires entering a number of commands.

#### Default Magento 2:
```bash
php bin/magento cache:flush
php bin/magento setup:upgrade
# Deploy mode occasionally changes after setup:upgrade
# and has to be set back to 'developer'
php bin/magento deploy:mode:set developer
grunt exec:mytheme
grunt less:mytheme
```

Depending on the project, running all of these commands can be a rather lengthy process which requires the developer's constant attention in order to enter the next command in the sequence.

#### With magento2-helper:
```bash
m2 r
```
In classic infomercial fashion, **m2** lets you "set it and forget it", running the above commands on its own and letting you focus on other matters while it runs.



## Further Use

For a full list of all commands and their available options, run **m2** with the `--help` flag.
