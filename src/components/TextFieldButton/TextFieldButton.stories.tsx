import { StoryFn } from '@storybook/react';
import TextFieldButton, { TextFieldButtonProps } from './TextFieldButton';

export default {
  title: 'Components/TextFieldButton',
  component: TextFieldButton,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label'
    },
    value: {
      control: 'text',
      description: '입력 필드의 현재 값'
    },
    onChange: {
      action: 'changed',
      description: '입력 필드의 값이 변경될 때 호출되는 함수'
    },
    onClick: {
      action: 'clicked',
      description: '버튼이 클릭될 때 호출되는 함수'
    }
  }
};

const Template: StoryFn<TextFieldButtonProps> = (args) => <TextFieldButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Default Label',
  value: ''
};
