import Prompt from "@models/Prompt";
import {
    connectToDB
} from "@utils/database";

export const GET = async (req, res) => {
    const content = req.nextUrl.searchParams.get('content')
    try {
        await connectToDB();

        let prompts = await Prompt.find({}).populate('creator')
        prompts = prompts.filter(prompt => {
            return content ? prompt.creator.username.toLowerCase().includes(content.toLowerCase()) || prompt.tag.toLowerCase().includes(content.toLowerCase()) || prompt.prompt.toLowerCase().includes(content.toLowerCase()) : true
        })

        return new Response(JSON.stringify(prompts), {
            status: 200
        })
    } catch (error) {
        console.log(error)
        return new Response("Failed to get prompts", {
            status: 500
        })
    }
}