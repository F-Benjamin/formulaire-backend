require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(formidable());

const api_key = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });

app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur mon serveur" });
});

app.post("/", (req, res) => {
  const data = {
    from: "Promo Phoenix20 <me@samples.mailgun.org>",
    to: process.env.MAIL_PRO,
    subject: "Inscription TripAdvisor",
    text: req.fields.description,
  };

  mailgun.messages().send(data, (error, body) => {
    // console.log(body);
    // console.log(error);

    if (error === undefined) {
      res.json({ message: "Données reçues. Un mail a été envoyé" });
    } else {
      res.json({ message: "An error occurred" });
    }
  });
});

app.all("*", (req, res) => {
  res.json({ message: "Wrong way" });
});

app.listen(process.env.PORT, () => {
  console.log("started :))");
});
