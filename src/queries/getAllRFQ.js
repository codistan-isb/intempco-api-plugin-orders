import ReactionError from "@reactioncommerce/reaction-error";

export default async function getAllRFQ(context, args) {
    const {
        collections: { RFQProduct, users },
    } = context;

    const { shopId, accountId, status, itemPerPage, PageNumber } = args;

    const filters = { shopId, accountId, status };

    // Remove undefined filters
    Object.keys(filters).forEach(key => filters[key] === undefined && delete filters[key]);

    // Set pagination parameters
    const itemsPerPage = itemPerPage ?? 10; // Default to 10 items per page if not provided
    const pageNumber = PageNumber ?? 1; // Default to page 1 if not provided
    const skipAmount = (pageNumber - 1) * itemsPerPage;

    // Get total count of matching documents
    const totalCount = await RFQProduct.countDocuments(filters);

    // Fetch the RFQ products with pagination
    const rfqProducts = await RFQProduct.find(filters)
        .skip(skipAmount)
        .limit(itemsPerPage)
        .toArray();

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

    return {
        totalCount,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalCount / itemsPerPage),
        RFQProducts: rfqProducts.map(rfq => ({
            ...rfq,
            user: userMap[rfq.userId] || null,
        }))
    };
}
