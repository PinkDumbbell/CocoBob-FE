import { ComponentStory, ComponentMeta } from '@storybook/react';
import 'tailwindcss/tailwind.css';
import { Button } from './index';

export default {
  title: 'CoCobob/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: 'first',
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  primary: 'second',
  label: 'Button',
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  primary: 'third',
  label: 'Button',
};

export const Quaternary = Template.bind({});
Quaternary.args = {
  primary: 'fourth',
  label: 'Button',
};

export const Sub = Template.bind({});
Sub.args = {
  primary: 'etc',
  label: 'Button',
};
