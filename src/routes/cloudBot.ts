export default (req, res) => {
  console.log(req.body);

  res.json({
    messages: [
      { text: "Welcome to the Chatfuel Rockets!" },
      { text: "What are you up to?" }
    ]
  });
};
