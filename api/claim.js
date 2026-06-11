import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  try {
    console.log("Claim API hit");

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { memberId, offerId } = req.body;

    const { data, error } = await supabase
      .from("claims")
      .insert({
        member_id: memberId,
        offer_id: offerId
      });

    if (error) {
      console.error(error);
      return res.status(500).json({ error });
    }

    return res.status(200).json({ success: true, data });

  } catch (err) {
    console.error("CRASH:", err);
    return res.status(500).json({ error: err.message });
  }
}



