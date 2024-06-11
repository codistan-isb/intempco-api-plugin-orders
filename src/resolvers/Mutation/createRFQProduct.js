export default async function createRFQProduct(parent, { input }, context, info) {
    // console.log("input", input);
    // console.log("CONTEXT", context);
    let newSavedProduct = await context.mutations.createRFQProduct(context, input);
    return newSavedProduct;
}
