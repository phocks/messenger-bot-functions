const prompts = [
  "How's it going?",
  "How has your day been so far?",
  "What does the sky look like right now?",
  "have you remembered to drink some water today?"
];

export default (req, res) => {
  console.log(req.body);

  const payload = {
    messages: [
      {
        text: prompts[Math.ceil(Math.random() * prompts.length)]
      }
    ]
  };

  res.json(payload);
};
