import { Transformation } from "./linot";
let testData =
{
    fname: 't',
    lname: 'f'
}

const transformation = new Transformation()
transformation.appendHandler(capitalizer, "1.2.1")
transformation.appendAsyncHandler(changePropNames, "1.2.3")


try {
    transformation.transformAsync(testData).then((data) => {
        console.log(JSON.stringify(data, null, '\t'))
    })


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
    return new Promise((resolve) => {
        const newData = Object.assign({}, data)
        newData.firstName = data.fname
        newData.lastName = data.lname
        delete newData.fname
        delete newData.lname
        resolve(newData)
    })
}


