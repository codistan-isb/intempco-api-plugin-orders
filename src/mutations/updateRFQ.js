import sendStatusEmail from "../util/emailService.js";
import { decodeProductOpaqueId, encodeCartOpaqueId } from "../xforms/id.js";
import ReactionError from "@reactioncommerce/reaction-error";
import rejectRequest from "../templates/rejectRequest.js";
import approvedRequest from "../templates/approvedRequest.js";

export default async function updateRFQProduct(context, input) {
    console.log("input:- ", input);
    const { collections } = context;
    const { RFQProduct, users } = collections;

    let { _id, status, reason = null } = input;

    const decodeId = decodeProductOpaqueId(_id);

    const currentProduct = await RFQProduct.findOne({ _id: decodeId });

    console.log("currentProduct", currentProduct);
    if (!currentProduct) throw new ReactionError("not-found", "Product not found");

    if (status) {
        currentProduct.status = status;
        currentProduct.reason = reason;
    }

    currentProduct.updatedAt = new Date();

    let cartInfo;
    if (status === "approved") {
        const items = [{
            price: currentProduct?.price,
            productConfiguration: {
                productId: currentProduct?.prodId,
                productVariantId: currentProduct?.variantId,
            },
            quantity: 1
        }];
        cartInfo = await context.mutations.createCart(context, {
            items,
            shopId: currentProduct?.shopId,
            createRfq: true,
            rfqId: currentProduct?._id,
            userId: currentProduct?.userId
        });
        console.log("cartInfo", cartInfo);

        currentProduct['cartId'] = cartInfo?.cart?._id;
    }

    const updatedRFQResp = await RFQProduct.findOneAndUpdate(
        { _id: decodeId },
        { $set: currentProduct },
        { returnDocument: "after" }
    );

    if (updatedRFQResp) {
        const user = await users.findOne({ _id: currentProduct.userId });
        if (status === "rejected") {
            try {

                if (user && user.emails && user.emails[0] && user.emails[0].address) {
                    const userEmail = user.emails[0].address;
                    const templateContext = {
                        emailLogo: 'logo-url',
                        isRejected: true,
                        reason: reason || 'No reason provided'
                    };
                    await sendStatusEmail(userEmail, "RFQ Updated Rejection Notice", rejectRequest, templateContext);
                } else {
                    throw new ReactionError("user-email-not-found", "User email not found.");
                }
            } catch (error) {
                throw new ReactionError("email-sending-failed", `Failed to send rejection email: ${error.message}`);
            }
        } else if (status === "approved") {
            try {

                if (user && user.emails && user.emails[0] && user.emails[0].address) {
                    const userEmail = user.emails[0].address;
                    
                    // Determine the URL to use
                    const cartBaseUrl =  process.env.CART_URL;
                    console.log("BASE URL ", cartBaseUrl)
                    const cartUrl = `${cartBaseUrl}/${encodeCartOpaqueId(cartInfo?.cart?._id)}`;
                    
                    const templateContext = {
                        cartUrl
                    };
                    await sendStatusEmail(userEmail, "RFQ Updated Approval Notice", approvedRequest, templateContext);
                } else {
                    throw new ReactionError("user-email-not-found", "User email not found.");
                }
            } catch (error) {
                throw new ReactionError("email-sending-failed", `Failed to send rejection email: ${error.message}`);
            }

        }

        return {
            status: true,
            message: "RFQ updated successfully"
        };
    } else {
        return {
            status: false,
            message: "RFQ not updated",
            updatedRFQ: null
        };
    }
}
