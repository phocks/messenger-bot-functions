const prompts = [
  "How's it going?",
  "How has your day been so far?",
  "What does the sky look like right now?",
  "Have you remembered to drink some water today?",
  "Just what do you think you're doing Dave?"
];

export default (req, res) => {
  console.log(req.body);

  const payload = {
    messages: [
      {
        text: prompts[Math.ceil(Math.random() * prompts.length - 1)]
      }
    ]
  };

  res.json(payload);
};
