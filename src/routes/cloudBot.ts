const elizabot = require("../lib/elizabot");

elizabot.start(); // initializes eliza and returns a greeting message

// let reply = elizabot.reply("I am tired") // returns a eliza-like reply based on the message text passed into it

// const prompts = [
//   "How's it going?",
//   "How has your day been so far?",
//   "What does the sky look like right now?",
//   "Have you remembered to drink some water today?",
//   "Just what do you think you're doing Dave?"
// ];

export default (req, res) => {
  console.log(req.body);

  const userResponse = req.body["user response"] || "";

  // Escape the loop
  if (userResponse.toLowerCase() === "bye") {
    const payload = {
      messages: [
        {
          // text: prompts[Math.ceil(Math.random() * prompts.length - 1)]
          text: "Goodbye."
        }
      ]
    };

    res.json(payload);
    return;
  }

  let reply = elizabot.reply(userResponse);
  console.log(reply);

  const payload = {
    messages: [
      {
        // text: prompts[Math.ceil(Math.random() * prompts.length - 1)]
        text: reply
      }
    ],
    redirect_to_blocks: [req.body["Redirect block name"]]
  };

  res.json(payload);
};
