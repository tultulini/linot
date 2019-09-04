import { normalizeVersion, compareVersions } from "./versions";

export function Transformation(handler, version) {

    this.transformations = []
    this.version = normalizeVersion(version)
    this.transform = (data) => transform(this.transformations, data)

    this.appendHandler = (handler, version) => {
        this.transformations.push(new TransformationHandler(handler, normalizeVersion(version)))
        return this
    }

    this.appendHandler(handler, version)
}

function transform(transformations, data) {

    if (transformations.length === 0) {
        throw new Error("No defined transformations")
    }

    transformations.sort((t1, t2) => compareVersions(t1.version, t2.version))
    let transformCount = transformations.length
    let transformedData = data
    for (let idx = 0; idx < transformCount; idx++) {

        try {
            transformedData = transformations[idx].handler(transformedData)
        }
        catch (error) {
            throw new Error(`Transformation version:${transformations[idx].version.toString()} had an error: ${error}`)
        }
    }

    return transformedData
}

function TransformationHandler(handler, version) {
    this.handler = handler
    this.version = version
}