import express from "express";
import QRcode from "qrcode";

const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

router.get("/", (req, res) => {
	res.send("Server working well!");
});

app.post("/qr", async (req, res) => {
	console.log("body", req.body);
	const { eventId, venueId, userId, shootId, countId } = req.body;
	const payload = `evnetId: ${eventId} \n venueId: ${venueId} \n userId: ${userId} \n shootId: ${shootId} \n countId: ${countId}}`;

	//  ----------test----------  //
	// let small =
	// 	"This 1 is not small acutually. It will be so long than I expected";
	// for (let i = 0; i < 2; i++) {
	// 	small = small + small;
	// }
	// const burden = await small;
	//  ----------test----------  //

	//  ----------option2----------  //
	console.log("payload", payload);
	const result = await QRcode.toDataURL(payload, (err, url) => {
		console.log("middle", url);
		// res.status(200).json({ message: "kill", data: url });
	});
	console.log("result", result);

	// res.status(200).json({ message: "kill", data: result });
	//  ----------option2----------  //

	const testQR = await QRcode.toFileStream(
		res,
		payload
		// 	, {
		// 	type: "png",
		// 	width: 200,
		// 	errorCorrectionLevel: "H",
		// }
	);
	console.log("qr check", testQR);

	// res.json({ message: "QR sent!", data: testQR });
});

app.listen(4444, () => {
	console.log("Server is running on http://localhost:4444");
});
