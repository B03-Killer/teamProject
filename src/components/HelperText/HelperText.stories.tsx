import { StoryFn } from '@storybook/react';
import HelperText, { HelperTextProps } from './HelperText';

export default {
  title: 'Components/HelperText',
  component: HelperText,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
      description: '도움 텍스트로 표시할 메시지입니다.'
    },
    isError: {
      control: 'boolean',
      description: '오류 메시지를 표시할지 여부입니다.'
    },
    isSuccess: {
      control: 'boolean',
      description: '성공 메시지를 표시할지 여부입니다.'
    }
  }
};

const Template: StoryFn<HelperTextProps> = (args) => <HelperText {...args} />;

export const Default = Template.bind({});
Default.args = {
  message: '이것은 기본 메시지입니다.'
};

export const Success = Template.bind({});
Success.args = {
  message: '성공적으로 완료되었습니다!',
  isSuccess: true
};

export const Error = Template.bind({});
Error.args = {
  message: '오류가 발생했습니다.',
  isError: true
};

export const NoMessage = Template.bind({});
NoMessage.args = {
  message: ''
};
