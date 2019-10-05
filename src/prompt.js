import React from "react";
import { Color, Box } from "ink";

const Prompt = ({ prompt }) => (
  <Box marginRight={1}>
    <Color greenBright>{prompt}:</Color>
  </Box>
);

export default Prompt;
