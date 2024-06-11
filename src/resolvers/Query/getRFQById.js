export default async function getRFQById(parent, args, context, info) {
    // console.log("input", args);

    let getRFQByIdResponse = await context.queries.getRFQById(context, args);
    return getRFQByIdResponse;
}
