export default (req, res) => {
  console.log(req.body);

  res.json({
    set_attributes: {
      "some attribute": "some value",
      "another attribute": "another value"
    },
    block_names: ["Block 1"],
    type: "show_block",
    title: "Go!"
  });
};
