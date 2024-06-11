import Random from "@reactioncommerce/random";
import ReactionError from "@reactioncommerce/reaction-error";
import { decodeProductOpaqueId } from "../xforms/id.js";


export default async function createRFQProduct(context, input) {
    console.log("input ", input);
    const { collections, userId } = context;
    if (!userId) {
        throw new ReactionError("access-denied", "Please login first");
    }

    const { RFQProduct } = collections;
    const { status, variantId, prodId, customization, modelNumber } = input;
    const decodeProdId = decodeProductOpaqueId(prodId);

    const newRFQ = {
        _id: Random.id(),
        userId,
        // prodId,
        prodId: decodeProdId,
        variantId,
        customization,
        status,
        modelNumber,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    //   console.log("newFaq", newFaq);
    let newFaqResponse = await RFQProduct.insertOne(newRFQ);
    if (newFaqResponse?.ops.length > 0) {
        return newFaqResponse?.ops[0];
    }
}

