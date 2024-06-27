# FFXIV Opener

[Website](https://aho-senpai.github.io/FFXIVOpener/)

All Icons in `Database/Icon/` is from the [FFXIV Fan Kit](https://na.finalfantasyxiv.com/lodestone/special/fankit/icon/)  
All Icons in `resources/` are handmade by me (so far)  
`discord.svg` and `github.svg` come from `icons8.com`

Ability Template :
```json
{
    "ID": 0,
    "Name":"",
    "ImageName":"",
    "GlobalCoolDown":"",
    "Description":"",
    "Cast":0,
    "Recast":0,
    "Range":0,
    "Radius":0
}
```
```html
<span style=\"color:#00cc22;\">Combo Action:</span> <!--Back to start of line : combo bonus or duration ... -->
<span style=\"color:#ee7318;\">Riot Blade</span> <!-- Skill -->
<span style=\"color:#cccc52;\">Sword Oath</span> <!-- Buff -->
</br> <!-- Return/newline -->
```
```css
MEMO : Background Colors Roles
#425ABD //Tanks (Blue)
#397B18 // Healers (Green)
#843131 // DPS (Red)
#FFFFFF // Others (White) <- Should not happen
```