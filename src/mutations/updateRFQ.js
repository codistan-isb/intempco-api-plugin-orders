import { decodeProductOpaqueId } from "../xforms/id.js";
import ReactionError from "@reactioncommerce/reaction-error";


export default async function updateRFQProduct(context, input) {
    console.log("input:- ", input);
    const { collections, userId } = context;
    const { RFQProduct } = collections;

    let {
        _id,
        status
    } = input;

    const decodeId = decodeProductOpaqueId(_id);

    console.log("DECODE ID", decodeId);

    const currentProduct = await RFQProduct.findOne({ _id });

    console.log("Current Product", currentProduct);

    if (!currentProduct)
        throw new ReactionError("not-found", "Product not found");
    if (status) {
        currentProduct.status = status;
    }

    currentProduct.updatedAt = new Date();

    const updatedRFQResp = await RFQProduct.findOneAndUpdate(
        { _id: decodeProductOpaqueId(_id) },
        { $set: currentProduct },
        { $new: true }
    );

    console.log("UPDATE RESPONSE", updatedRFQResp.value);

    if (updatedRFQResp) {
        return {
            status: true,
            message: "RFQ updated successfully"
        };
    } else {
        return {
            status: false,
            message: "RFQ not updated",
            updatedRFQ: null,
        };
    }
}
