import { Transformation } from "./linot";
let testData = { fname: 't', lname: 'f'}
const transformation = (new Transformation(capitalizer, "1.2.1")).appendHandler(changePropNames, "1.2.3")

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


