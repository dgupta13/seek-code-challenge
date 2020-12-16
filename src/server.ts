import express from "express";
import bodyParser from "body-parser";
import { Recruiter } from "./Recruiter";
import { PricingRules } from "./PricingRules";
import { CheckOut } from "./Checkout";

export const server = express();
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.get("/", (req, res) => {
  res.send("Hello");
});

server.post("/", (req, res) => {
  let items = req.body.items;
  let recruiter = Recruiter.load(req.body.customerName);
  let PricingRule = PricingRules.load(recruiter.rule);
  let checkout = new CheckOut(PricingRule);
  for (let item = 0; item < items.length; item++) {
    checkout.add(items[item]);
  }
  let totalCost = checkout.total();
  res.send({
    totalCost: "$" + totalCost,
  });
});
