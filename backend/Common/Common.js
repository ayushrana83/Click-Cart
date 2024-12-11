const passport = require("passport");
const nodemailer = require("nodemailer");

exports.isAuth = (req, res, done) => {
  // console.log("Ff" , req);
  return passport.authenticate("jwt");
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
  // var token = null;
//   console.log("req ==", req);
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Mzc2ZjEzYTIxODkyZDRlZTVkM2JjNyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczMzU1ODIwNCwiZXhwIjoxNzMzNTYxODA0fQ.asXf48dzr_KHdD-dM67kiQWsGgmBQOoK1w00OJnA7tQ";
  return token;
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.USER_GMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

exports.sendMail = async function ({ to, subject, text, html }) {
  const info = await transporter.sendMail({
    from: "Click Cart",
    to,
    subject,
    text,
    html,
  });
  return info;
};

exports.invoiceTemplate = (order) => {
  return `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />

		<title>A simple, clean, and responsive HTML invoice template</title>

		<!-- Favicon -->
		<link rel="icon" href="./images/favicon.png" type="image/x-icon" />

		<!-- Invoice styling -->
		<style>
			body {
				font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
				text-align: center;
				color: #777;
			}

			body h1 {
				font-weight: 300;
				margin-bottom: 0px;
				padding-bottom: 0px;
				color: #000;
			}

			body h3 {
				font-weight: 300;
				margin-top: 10px;
				margin-bottom: 20px;
				font-style: italic;
				color: #555;
			}

			body a {
				color: #06f;
			}

			.invoice-box {
				max-width: 800px;
				margin: auto;
				padding: 30px;
				border: 1px solid #eee;
				box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
				font-size: 16px;
				line-height: 24px;
				font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
				color: #555;
			}

			.invoice-box table {
				width: 100%;
				line-height: inherit;
				text-align: left;
				border-collapse: collapse;
			}

			.invoice-box table td {
				padding: 5px;
				vertical-align: top;
			}

			.invoice-box table tr td:nth-child(2) {
				text-align: right;
			}

			.invoice-box table tr.top table td {
				padding-bottom: 20px;
			}

			.invoice-box table tr.top table td.title {
				font-size: 45px;
				line-height: 45px;
				color: #333;
			}

			.invoice-box table tr.information table td {
				padding-bottom: 40px;
			}

			.invoice-box table tr.heading td {
				background: #eee;
				border-bottom: 1px solid #ddd;
				font-weight: bold;
			}

			.invoice-box table tr.details td {
				padding-bottom: 20px;
			}

			.invoice-box table tr.item td {
				border-bottom: 1px solid #eee;
			}

			.invoice-box table tr.item.last td {
				border-bottom: none;
			}

			.invoice-box table tr.total td:nth-child(2) {
				border-top: 2px solid #eee;
				font-weight: bold;
			}

			@media only screen and (max-width: 600px) {
				.invoice-box table tr.top table td {
					width: 100%;
					display: block;
					text-align: center;
				}

				.invoice-box table tr.information table td {
					width: 100%;
					display: block;
					text-align: center;
				}
			}
		</style>
	</head>

	<body>
		

		<div class="invoice-box">
			<table>
				<tr class="top">
					<td colspan="2">
						<table>
							<tr>
								<td class="title">
									<img src="../../frontend/src/logo.svg" alt="Company logo" style="width: 100%; max-width: 100px" />
								</td>

								<td>
									Invoice #: ${order._id}<br />
									${order.createdAt}<br />
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr class="information">
					<td colspan="2">
						<table>
							<tr>
								<td>
									${order.selectedAddress.name}<br />
									${order.selectedAddress.street}<br />
									${order.selectedAddress.pinCode}<br />
									${order.selectedAddress.phone}<br />
									${order.selectedAddress.city}<br />
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr class="">
					<td>Payment Method</td>
					<td></td>

					<td>${order.paymentMethod}</td>
				</tr>
                <tr>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                </tr>

				<tr class="heading">
					<td>Item</td>

					<td>Quantity</td>

					<td>Price</td>
				</tr>
				<tr>
					<td></td>
				</tr>
				${order.items.map((item) => 
					`<tr class="item">
          			<td>${item.product.title}</td>
		  			<td>${item.quantity}</td>
		  			<td>${item.product.price}</td>
		  			<td></td>
		  			</tr>`
        		)}
				<tr>
					<td></td>
				</tr>
				<tr class="total">
					<td>total items :$ ${order.totalItems}</td>
                    <td></td>
					<td>Total Amount : ${order.totalAmount}</td>
				</tr>
			</table>
		</div>
	</body>
</html>`;
};

exports.sendOrderInvoiceMail = ({orders , to}) => {
  try {
    console.log("invoice");
    
    const subject = "Order Placed Succesfully";
    const html = this.invoiceTemplate(orders);
    this.sendMail({to, subject, html});
  } catch (error) {
    console.log("error in sending invoice ", error);
  }
};
