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

    }
    else {
        res.status(405).json({error: "Method not allowed"});
    }
}