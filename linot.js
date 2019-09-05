import { normalizeVersion, compareVersions } from "./versions";
const INDEX_NOT_FOUND = -1
export function Transformation() {

    this.transformationHandlers = []
    this.transform = (data) => transform(this.transformationHandlers, data)
    this.transformAsync = async (data) => transformAsync(this.transformationHandlers, data)

    this.appendHandler = (handler, version) => {
        this.transformationHandlers.push(new TransformationHandler(handler, normalizeVersion(version)))
        return this
    }

    this.appendAsyncHandler = (asyncHandler, version) => {
        this.transformationHandlers.push(new TransformationHandler(asyncHandler, normalizeVersion(version), true))
        return this
    }

    this.hasAsyncTransformation = () => hasAsyncTransformation(this.transformationHandlers)
}

function hasAsyncTransformation(handlers) {
    return handlers.findIndex(t => t.isAsync === true) > INDEX_NOT_FOUND
}

function transform(transformations, data) {

    if (transformations.length === 0) {
        throw new Error("No defined transformations")
    }

    if (hasAsyncTransformation(transformations)) {
        throw new Error("Can't perform mixed sync and async transformations")
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

async function transformAsync(transformations, data) {
    if (transformations.length === 0) {
        throw new Error("No defined transformations")
    }

    transformations.sort((t1, t2) => compareVersions(t1.version, t2.version))

    let transformCount = transformations.length
    let transformedData = data
    for (let idx = 0; idx < transformCount; idx++) {
        let transformation = transformations[idx]
        try {
            if (transformation.isAsync) {
                transformedData = (await transformation.handler(transformedData))

            }
            else {
                transformedData = transformation.handler(transformedData)
            }
        }
        catch (error) {
            throw new Error(`Transformation version:${transformations[idx].version.toString()} had an error: ${error}`)
        }
    }

    return transformedData
}

function TransformationHandler(handler, version, isAsync) {
    this.handler = handler
    this.version = version
    this.isAsync = isAsync
}