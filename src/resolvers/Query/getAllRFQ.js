export default async function getAllRFQ(parent, args, context, info) {
    // console.log("input", args);

    let getAllRFQResponse = await context.queries.getAllRFQ(context, args);
    return getAllRFQResponse;
}
