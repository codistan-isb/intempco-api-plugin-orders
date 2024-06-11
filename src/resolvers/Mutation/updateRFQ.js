export default async function updateRFQProduct(parent, { input }, context, info) {
    // console.log("input", input);
    let newUpdateProduct = await context.mutations.updateRFQProduct(context, input);

    // console.log("newUpdateProduct", newUpdateProduct);

    return newUpdateProduct;
}
