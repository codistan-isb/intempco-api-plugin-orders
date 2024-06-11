import ReactionError from "@reactioncommerce/reaction-error";

export default async function getAllRFQ(context, args) {
    console.log("here args", args);
    const {
        collections: { RFQProduct, users },
    } = context;

    const { shopId, accountId, status } = args;
    const filters = { shopId, accountId, status };

    // Remove undefined filters
    Object.keys(filters).forEach(key => filters[key] === undefined && delete filters[key]);

    const rfqProducts = await RFQProduct.find(filters).toArray();

    if (rfqProducts.length === 0) {
        throw new ReactionError("not-found", "Data not available");
    }

    // Get unique userIds from the rfqProducts
    const userIds = [...new Set(rfqProducts.map(rfq => rfq.userId))];
    const usersList = await users.find({ _id: { $in: userIds } }).toArray();

    const userMap = usersList.reduce((acc, user) => {
        acc[user._id] = user;
        return acc;
    }, {});

    return rfqProducts.map(rfq => ({
        ...rfq,
        user: userMap[rfq.userId] || null,
    }));
}
