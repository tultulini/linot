# linot
Linear Object Transformation - shift object up versions by giving it subsequent transformations

## use case
Say you have various versions of protocol running on various versions of your app reporting to a back end that needs to save your data in the format of your latest version
e.g. some apps send objects from version 1.0.0 that look like:
```
oldData = 
{
    fname: 't',
    lname: 'f'
}
```
and some send them as they should from version 1.2.1:
```
newerData = 
{
    firstName: 't',
    lastName: 'f'
}
```

then you could set up a transormation that would look something like (assuming they exist for the example):
```
import { Transformation } from "./linot";
const transformation = new Transformation(changePropNames, "1.2.1")


function changePropNames(data) {
    const newData = Object.assign({}, data)
    newData.firstName = data.fname
    newData.lastName = data.lname
    delete newData.fname
    delete newData.lname
    return newData
}
```

So now running:
```
transformation.transform(oldData)
```
should return the appropriate newerData

## multiple transformation handlers

you can append several handlers so for:

```
import { Transformation } from "./linot";
let testData =
{
    fname: 't',
    lname: 'f'
}

const transformation = (new Transformation(capitalizer, "1.2.1"))
transformation.appendHandler(changePropNames, "1.2.3")


try {
    const data = transformation.transform(testData)
    console.log(JSON.stringify(data, null, '\t'))

} catch (error) {
    console.error(error)
}


function capitalizer(data) {
    const capt = Object.assign({}, data)
    capt.fname = capt.fname.toUpperCase()
    capt.lname = capt.lname.toUpperCase()
    return capt
}

function changePropNames(data) {
    const newData = Object.assign({}, data)
    newData.firstName = data.fname
    newData.lastName = data.lname
    delete newData.fname
    delete newData.lname
    return newData
}
```
this will order the handlers by their versions regardless to the order you appended them 
and then you'll get:

```
{
	"firstName": "T",
	"lastName": "F"
}
```
