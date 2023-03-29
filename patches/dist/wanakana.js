export function typeOf(object) {
    return null === object
        ? "null"
        : object !== Object(object)
            ? typeof object
            : {}.toString.call(object).slice(8, -1).toLowerCase();
}
