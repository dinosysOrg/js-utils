# js-utils
## Generate properties from Excel
An excel file containing key -> value 1, value 2... pairs can be used to generate the properties files.

Format of the excel file:

| key           | messages_en.properties | messages_de.properties |
| ------------- |:---------------------- |:-----------------------|
| msg.greetings | Hello                  | Hallo                  |
| msg.yes       | Yes                    | Ja                     |
| msg.no        | No                     | Nein                   |

Usage:
```
npm install xlsx
```
```
node convert_xlsx_properties.js messages.xlsx
```
