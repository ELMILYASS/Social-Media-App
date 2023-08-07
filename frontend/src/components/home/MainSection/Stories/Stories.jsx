import React from "react";
import Story from "./Story";
function Stories() {
  return (
    <div className="w-full pb-3 stories overflow-auto flex  item-center gap-8">
      <Story />
      <Story />
      <Story />
      <Story />
      <Story />
      <Story />
    </div>
  );
}

export default Stories;
