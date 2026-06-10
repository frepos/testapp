const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(express.json());

require("dotenv").config();


const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);


app.post("/claim", async (req, res) => {

  const { memberId, offerId } = req.body;

  const result = await supabase
    .from("claims")
    .insert({
      member_id: memberId,
      offer_id: offerId
    });

  res.json(result);
});

app.listen(3000);