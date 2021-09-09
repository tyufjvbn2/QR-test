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

app.post("/qr", (req, res) => {
	console.log("body", req.body);
	const result = QRcode.toDataURL(req.body);
	res.json({ message: "QR sent!", data: result });
});

app.listen(4444, () => {
	console.log("Server is running on http://localhost:4444");
});
