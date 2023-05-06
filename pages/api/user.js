import {createServerSupabaseClient} from "@supabase/auth-helpers-nextjs";

export default function handler(req, res) {
    if(req.method === "GET") {
        async function getData() {
            const { query } = req;
            const { id } = query;
            const supabase = createServerSupabaseClient({req, res});

            const { data } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', id);
            res.status(200).json(data);
        }

        getData();
    }
    else if (req.method === "PUT") {
        async function updateData() {
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
            const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
            const { query } = req;
            const { id } = query;

            const supabase = createServerSupabaseClient({req, res}, {supabaseUrl, supabaseKey});
            const { error } = await supabase
                .from('profiles')
                .update({
                    ...req.body,
                    updated_at: new Date(),
                })
                .eq('id', id);

            res.status(200).send("Successfully updated");
        }

        updateData().catch(error => {res.status(400).json({error: error})});
    }
    else {
        res.status(405).json({error: "Method not allowed"});
    }
}