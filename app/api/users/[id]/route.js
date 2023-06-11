import User from "@models/User";
import {
    connectToDB
} from "@utils/database";

export const GET = async (req, {
    params
}) => {
    try {
        await connectToDB();

        const user = await User.findById(params.id)

        return new Response(JSON.stringify(user), {
            status: 200
        })
    } catch (error) {
        return new Response("Failed to get user", {
            status: 500
        })
    }
}