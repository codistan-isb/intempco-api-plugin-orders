export default `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://fonts.googleapis.com/css?family=Inter:100,200,300,regular,500,600,700,800,900"
      rel="stylesheet"
    />
    <title>RFQ Approval Notice</title>
    <style>
      .table-wrapper {
        font-family: "Inter", sans-serif;
        max-width: 1440px;
        width: 100%;
        margin: 0 auto;
      }
      table {
        border-collapse: collapse;
      }
      img[alt="logo"] {
        width: 15%;
      }
      .inner-table {
        width: 60%;
      }
      .inner-table tr:nth-child(1) td {
        padding: 32px 40px 0;
      }
      .inner-table tr:nth-child(2) td {
        padding: 0px 40px 0;
      }
      .inner-table tr:nth-child(3) td {
        padding: 0 40px 0;
      }
      .inner-table tr:nth-child(5) td {
        padding: 0px 40px 0px;
      }
      .inner-table tr:nth-child(6) td {
        padding: 20px 40px 32px;
      }
      img[alt="bottom-logo"] {
        width: 25%;
      }
      @media only screen and (min-width: 481px) and (max-width: 768px) {
        .inner-table {
          width: 100%;
        }
      }
      @media only screen and (max-width: 480px) {
        body .main-table tr:nth-child(1) td {
          padding: 25px 0 !important;
        }
        img[alt="logo"] {
          width: 35%;
        }
        body .main-table tr:nth-child(2) .main-cell {
          padding: 50px 10px !important;
        }
        .inner-table {
          width: 100%;
        }
        .inner-table tr:nth-child(1) td {
          padding: 32px 20px 0;
        }
        .inner-table tr:nth-child(2) td {
          padding: 0px 20px 0;
        }
        .inner-table tr:nth-child(3) td {
          padding: 0 20px 0;
        }
        .inner-table tr:nth-child(5) td {
          padding: 0px 20px 0px;
        }
        .inner-table tr:nth-child(6) td {
          padding: 20px 20px 32px;
        }
        img[alt="bottom-logo"] {
          width: 35%;
        }
      }
    </style>
  </head>
  <body>
    <div class="table-wrapper">
      <table align="center" style="width: 100%" class="main-table">
        <tr style="background-color: #061d39">
          <td align="center" style="padding: 50px 0">
            <img
              src="https://res.cloudinary.com/dukg2vtjk/image/upload/v1698384922/logo_xcwhng.png"
              alt="logo"
            />
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 120px 10px" class="main-cell">
            <table
              class="inner-table"
              style="
                text-align: center;
                border-radius: 6px;
                background-color: #fff;
                box-shadow: 0px 8px 24px 0px rgba(6, 29, 57, 0.2);
              "
            >
              <tr>
                <td>
                  <p style="margin: 10px 0; font-size: 24px; font-weight: 500">
                    RFQ Approval Notice
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>
                    Your RFQ has been approved. You can view your cart using the link below:
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p style="background-color: #f36f21; padding: 15px 0; color: #fff; letter-spacing: 1px; font-size: 18px; border-radius: 10px;">
                    <a href="{{cartUrl}}" style="color: #fff; text-decoration: none;">View Cart</a>
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>
                    If you have any questions, contact us at
                    <a
                      href="mailto:info@intempco.com"
                      style="color: #23638c; text-decoration: none"
                      >info@intempco.com</a
                    >. We're here to help.
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p style="font-weight: 500">
                    Thank you for being a customer.
                    <span style="color: #f36f21">Cheers!</span>
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <img
                    src="https://res.cloudinary.com/dukg2vtjk/image/upload/v1698384922/logo_xcwhng.png"
                    alt="bottom-logo"
                  />
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>
`;
