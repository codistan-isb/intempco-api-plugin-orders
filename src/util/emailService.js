import _ from "lodash";
import ReactionError from "@reactioncommerce/reaction-error";
import generateOTPForResetPassword from "./generateOTPForResetPassword.js";
import Twilio from "twilio";



var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new Twilio(accountSid, authToken);

/**
 * @method sendStatusEmail
 * @summary Send an email with a otp the user can use verify their email address.
 * @param {Object} context Startup context
 * @param {Object} input Input options
 * @param {String} input.userId - The id of the user to send email to.
 * @param {String} [input.bodyTemplate] Template name for rendering the email body
 * @returns {Job} - returns a sendEmail Job instance
 */

export default async function sendStatusEmail(
    context,
    email,
    { bodyTemplate = "accounts/otpEmail", temp }
) {
    const {
        collections: { Accounts, Shops, users },
    } = context;

    //get otp and expiration date
    const { otp, expirationTime } = await generateOTPForResetPassword();

    //object for user update otp and expiration date
    const options = { new: true };
    const updateOtp = { $set: { otp: otp, expirationTime: expirationTime } };

    const UserData = await users.findOne({ "emails.address": email });
    if (!UserData) {
        // The user document does not exist, throw an error or handle it as needed
        throw new ReactionError("not-found", "Account not found");
    }

    //Finding the account of user
    const account = await Accounts.findOne({ _id: UserData._id });
    if (!account) throw new ReactionError("not-found", "Account not found");

    //updating the user
    const updateUserResult = await users.updateOne(
        { "emails.address": email },
        updateOtp,
        options
    );

    // Account emails are always sent from the primary shop email and using primary shop
    // email templates.
    const shop = await Shops.findOne({ shopType: "primary" });
    if (!shop) throw new ReactionError("not-found", "Shop not found");

    const dataForEmail = {
        // Reaction Information
        contactEmail: "test@gmail.com",
        homepage: _.get(shop, "storefrontUrls.storefrontHomeUrl", null),
        copyrightDate: new Date().getFullYear(),
        legalName: _.get(shop, "addressBook[0].company"),
        physicalAddress: {
            address: `${_.get(shop, "addressBook[0].address1")} ${_.get(
                shop,
                "addressBook[0].address2"
            )}`,
            city: _.get(shop, "addressBook[0].city"),
            region: _.get(shop, "addressBook[0].region"),
            postal: _.get(shop, "addressBook[0].postal"),
        },
        shopName: shop.name,
        // confirmationUrl: REACTION_IDENTITY_PUBLIC_VERIFY_EMAIL_URL.replace("TOKEN", token),
        confirmationUrl: otp,
        userEmailAddress: "test@gmail.com",
    };
    const language =
        (account.profile && account.profile.language) || shop.language;

    return context.mutations.sendStatusEmail(context, {
        data: dataForEmail,
        fromShop: shop,
        templateName: bodyTemplate,
        language,
        to: email,
    });
}
















// import nodemailer from 'nodemailer';

// export default async function sendEmail(email, subject, html) {
//     try {
//         const transporter = nodemailer.createTransport({
//             host: 'smtp-relay.brevo.com',
//             port: 587,
//             secure: false,
//             auth: {
//                 user: "768472001@smtp-brevo.com",
//                 pass: "xsmtpsib-897260a3b700fd590af9d1a6343d21ebe43630fb5374a1dd5eabdcf84db932a1-A0YvjB2MWJ7Qs1NT",
//             },
//         });

//         const mailOptions = {
//             from: "768472001@smtp-brevo.com",
//             to: email,
//             subject: subject,
//             text: html.replace(/<[^>]+>/g, ''),
//             html: html,
//         };

//         const info = await transporter.sendMail(mailOptions);
//         console.log('Message sent: %s', info.messageId);
//         console.log("INFOE", info);
//         return true;
//     } catch (error) {
//         console.error('Failed to send email:', error.message);
//         return false;
//     }
// };
