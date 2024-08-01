import { StoryFn } from '@storybook/react';
import CountTextField, { CountTextFieldProps } from './CountTextField';

export default {
  title: 'Components/CountTextField',
  component: CountTextField,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '텍스트 필드에 표시될 Label'
    },
    children: {
      control: 'text',
      description: '추가적인 텍스트를 children으로 전달'
    },
    maxLength: {
      control: 'number',
      description: '텍스트 필드에 입력할 수 있는 최대 문자 수'
    },
    placeholder: {
      control: 'text',
      description: '입력 필드에 표시될 placeholder 텍스트'
    }
  }
};

const Template: StoryFn<CountTextFieldProps> = (args) => <CountTextField {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: '이름',
  placeholder: '이름을 입력하세요',
  maxLength: 20
};
