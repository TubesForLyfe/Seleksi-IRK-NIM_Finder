export const RegexByNIM = (string) => {
    const regex = new RegExp('^[0-9]{3,8}$');
    return regex.test(string);
}

export const RegexByJurusanFakultasAngkatan = (string) => {
    const regex = new RegExp('^[a-zA-Z][a-zA-Z]* [0-9]{2}$')
    return regex.test(string);
}

export const RegexByName = (string) => {
    const regex = new RegExp('^[a-zA-Z ]*$');
    return regex.test(string);
}

export const RegexByAll = (string) => {
    let regex = new RegExp('^[0-9]{3,8} [a-zA-Z][a-zA-Z]* [0-9]{2}$');
    if (regex.test(string)) {
        return ["nim", "angkatan"];
    }

    regex = new RegExp('^[0-9]{3,8} [a-zA-Z][a-zA-Z]*$');
    if (regex.test(string)) {
        return ["nim", "nama"];
    }

    regex = new RegExp('^[a-zA-Z][a-zA-Z]* [0-9]{2} [0-9]{3,8}$');
    if (regex.test(string)) {
        return ["angkatan", "nim"];
    }

    regex = new RegExp('^[a-zA-Z][a-zA-Z]* [0-9]{2} [a-zA-Z][a-zA-Z]*$');
    if (regex.test(string)) {
        return ["angkatan", "nama"];
    }

    regex = new RegExp('^[a-zA-Z][a-zA-Z]* [0-9]{3,8}$');
    if (regex.test(string)) {
        return ["nama", "nim"];
    }

    regex = new RegExp('^[a-zA-Z][a-zA-Z]* [a-zA-Z][a-zA-Z]* [0-9]{2}$');
    if (regex.test(string)) {
        return ["nama", "angkatan"];
    }

    regex = new RegExp('^[0-9]{3,8} [a-zA-Z][a-zA-Z]* [0-9]{2} [a-zA-Z][a-zA-Z]*$');
    if (regex.test(string)) {
        return ["nim", "angkatan", "nama"];
    }

    regex = new RegExp('^[0-9]{3,8} [a-zA-Z][a-zA-Z]* [a-zA-Z][a-zA-Z]* [0-9]{2}$');
    if (regex.test(string)) {
        return ["nim", "nama", "angkatan"];
    }

    regex = new RegExp('^[a-zA-Z][a-zA-Z]* [0-9]{2} [0-9]{3,8} [a-zA-Z][a-zA-Z]*$');
    if (regex.test(string)) {
        return ["angkatan", "nim", "nama"];
    }

    regex = new RegExp('^[a-zA-Z][a-zA-Z]* [0-9]{2} [a-zA-Z][a-zA-Z]* [0-9]{3,8}$');
    if (regex.test(string)) {
        return ["angkatan", "nama", "nim"];
    }

    regex = new RegExp('^[a-zA-Z][a-zA-Z]* [0-9]{3,8} [a-zA-Z][a-zA-Z]* [0-9]{2}$');
    if (regex.test(string)) {
        return ["nama", "nim", "angkatan"];
    }

    regex = new RegExp('^[a-zA-Z][a-zA-Z]* [a-zA-Z][a-zA-Z]* [0-9]{2} [0-9]{3,8}$');
    if (regex.test(string)) {
        return ["nama", "angkatan", "nim"];
    }

    return []
}

export const RegexSearch = (string1, string2) => {
    const regex = new RegExp('.*' + string1 + '.*');
    return regex.test(string2);
}