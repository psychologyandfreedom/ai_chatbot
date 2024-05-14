import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).json({ message: "User not registered OR token malfunctioned." });
        // retrieve chats of the user
        const chats = user.chats.map(({ role, content }) => ({ role, content }));
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });
        // send chats to openai api -- initializing openai
        const config = configureOpenAI();
        // creating a chat completion 
        const chatResponse = await config.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        // get latest response
        user.chats.push(chatResponse.choices[0].message);
        await user.save();
        return res.status(200).json({ chats: user.chats });
        //   user.chats.push(chatResponse.data.choices[0].message);
        // const openai = new OpenAI(config);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong." });
    }
};
// 3:47:13 ->
//OPEN AI CONFIG SECTION IN VIDEO -- USING NEW V.4 CODE WHILE VIDEO IS USING V.3 -- BE ADVISED
// ChatCompletionRequestMessage is Deprecated -- Use ChatCompletionMessageParam Instead.
//# sourceMappingURL=chat-controllers.js.map