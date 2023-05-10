import {createServerSupabaseClient} from "@supabase/auth-helpers-nextjs";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { query } = req;
        const { id } = query;
        const supabase = createServerSupabaseClient({req, res});
        try {
            const { data } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', id);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: "An error occurred while retrieving data" });
        }
    } else if (req.method === "PUT") {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
        const { query } = req;
        const { id } = query;
        const supabase = createServerSupabaseClient({req, res}, {supabaseUrl, supabaseKey});
        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    ...req.body,
                    updated_at: new Date(),
                })
                .eq('id', id);
            if (error) {
                res.status(500).json({ error: "An error occurred while updating data" });
            } else {
                res.status(200).send("Successfully updated");
            }
        } catch (error) {
            res.status(500).json({ error: "An error occurred while updating data" });
        }
    } else {
        res.status(405).json({error: "Method not allowed"});
    }
}