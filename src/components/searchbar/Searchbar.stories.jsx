import React from "react";
import SearchBar from './Searchbar.jsx';

export default {
  title: "Components/SearchBar",
  component: SearchBar,
  argTypes: {
    isDarkMode: {
      control: "boolean",
      description: "Toggle dark mode",
    },
    placeholder: {
      control: "text",
      description: "Placeholder for the search input",
      defaultValue: "Search here...",
    },
  },
};

const Template = (args) => <SearchBar {...args} />;

export const LightMode = Template.bind({});
LightMode.args = {
  isDarkMode: false,
  placeholder: "Search here...",
};

