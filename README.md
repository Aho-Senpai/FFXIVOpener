# FFXIV Opener

[Website](https://aho-senpai.github.io/FFXIVOpener/)

# WHAT IS THIS?

This is a website for making FFXIV openers.

# How does this work ?

Start by selecting a job on the left, the abilities for said job will populate  
you can also hide that job selection by clicking on the FFXIV logo on the top left corner  
Clicking on a skill will add it to the timeline  
you can also add a buff (see [Issues](#known-issues-and-todo) about it however) by entering a name and picking a color, then clicking on `Add Buff`  
Removing said buff can be deleted by selecting it in the dropdown and clicking `Delete Buff` button bellow  
the `Clear` button will remove all the images and buffs in the rotation  
Selecting another job will also clear all the skills and buffs in the rotation, unless the `SSS` button is green  
Moving the Buff is done with the `-` and `+` buttons on the side of the buff selection dropdown (after selecting the buff you want to move)  

# Known Issues and TODO:

- use a better sortable for the rotation skills and buffs
- use a better resizable for buffs
- fix some clipping on some screen sizes (especially with the buttons div)
- unsure how to present the UI for large screens 
- ideally add a loading bar or something while fetching data
- better tooltip ? help welcome on this!  
- fix issue with scrolling to bottom of page when on larger screen
- buff bar isn't tied to the rotation if rotation overflow-x
