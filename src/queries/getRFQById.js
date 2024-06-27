import { decodeProductOpaqueId } from "../xforms/id.js";

export default async function getRFQById(context, args) {
    let { _id } = args;

    const {
        collections: { RFQProduct, Products },
    } = context;

    let responseRFQ = await RFQProduct.findOne({
        _id: decodeProductOpaqueId(_id),
    });

    if (responseRFQ) {
        const product = await Products.findOne({
            _id: responseRFQ.prodId
        });

        console.log("Product", product);
        console.log("responseRFQ", responseRFQ);

        return {
            status: true,
            message: "RFQ GetById successfully",
            getRFQById: {
                ...responseRFQ,
                product: product || null
            },
            reason: responseRFQ?.reason
        };
    } else {
        return {
            status: false,
            message: "RFQ not found",
            getRFQById: null,
        };
    }
}
