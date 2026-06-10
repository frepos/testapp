const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = async (req, res) => {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const { memberId, offerId } = req.body;

  const { data, error } = await supabase
    .from("claims")
    .insert([
      {
        member_id: memberId,
        offer_id: offerId
      }
    ]);

  if (error) {
    return res.status(500).json({ error });
  }

  return res.status(200).json({ success: true, data });
};