import { StoryObj, Meta } from '@storybook/react';
import { Form } from '.';
import { Button } from '../button';

type Story = StoryObj<typeof Form>;

const meta = {
  title: 'Components/Form',
  component: Form,
} satisfies Meta<typeof Form>;

const docs: Story = {
  render: () => (
    <Form>
      <Form.Field label="Owner">
        <Form.Input />
      </Form.Field>
      <Form.Field label="Repo">
        <Form.Input />
      </Form.Field>
      <Form.Buttons>
        <Button title="Save" />
      </Form.Buttons>
    </Form>
  ),
};

export default meta;
export { docs };
