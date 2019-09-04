import { Transformation } from "./linot";
let testData = { fname: 't', lname: 'f' ,bark:()=>console.log('woof')}
const transformation = (new Transformation(capitalizer, 1)).appendHandler(changePropNames, 2)
const data = transformation.transform(testData)
console.log(JSON.stringify(data, null, '\t'))
data.bark()


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


