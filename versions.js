const MAX_PART_COUNT = 3

const MAJOR_IDX = 0
const MINOR_IDX = 1
const EDITORIAL_IDX = 2

export function isValidVersion(version) {
    if (typeof version === 'number') {
        return true
    }

    const versionParts = version.split('.')
    if (versionParts.length > MAX_PART_COUNT) {
        return false
    }

    const valid = versionParts.findIndex(p => isNaN(parseInt(p))) == -1
    return valid
}

export function normalizeVersion(version) {
    if (!isValidVersion(version)) {
        throw new Error("Version not valid")
    }

    const versionString = (typeof version === "number") ? version.toString() : version

    const versionParts = versionString.split('.')
    const partCount = versionParts.length
    if (partCount < MAX_PART_COUNT) {
        let counter
        for (counter = partCount; counter < MAX_PART_COUNT; counter++) {
            versionParts.push("0")
        }
    }

    return new Version(versionParts[MAJOR_IDX], versionParts[MINOR_IDX], versionParts[EDITORIAL_IDX])
}

export function Version(major, minor, editorial) {
    this.major = parseInt(major)
    this.minor = parseInt(minor)
    this.editorial = parseInt(editorial)
    this.toString = () => `${this.major}.${this.minor}.${this.editorial}`
    this.toArray = () => [major, minor, editorial]
}

export function compareVersions(v1, v2) {
    const v1Arr = v1.toArray()
    const v2Arr = v2.toArray()
    let idx

    for (idx = 0; idx < MAX_PART_COUNT; id++) {
        if (v1Arr[idx] > v2Arr[idx]) {
            return 1
        }

        if (v1Arr[idx] < v2Arr[idx]) {
            return -1
        }
    }

    return 0
}