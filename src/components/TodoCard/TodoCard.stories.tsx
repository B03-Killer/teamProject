import { StoryFn } from '@storybook/react';
import TodoCard, { TodoCardProps } from './TodoCard';

export default {
  title: 'Components/TodoCard',
  component: TodoCard,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Todo 카드의 제목'
    },
    subtitle: {
      control: 'text',
      description: 'Todo 카드의 부제목'
    },
    tag: {
      control: {
        type: 'select',
        options: ['high', 'medium', 'low']
      },
      description: 'Todo 카드의 우선순위를 나타내는 태그'
    },
    onClick: {
      action: 'clicked',
      description: '카드가 클릭될 때 호출되는 함수'
    },
    className: {
      control: 'text',
      description: '추가적인 CSS 클래스를 지정할 수 있음'
    }
  }
};

const Template: StoryFn<TodoCardProps> = (args) => <TodoCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Title',
  subtitle: '시간 | 장소',
  tag: 'high',
  onClick: () => alert('clicked')
};
