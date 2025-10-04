import { inngest } from '../client';

export const exampleFunction = inngest.createFunction(
  { id: 'example-function' },
  { event: 'app/example' },
  async ({ event, step }) => {
    await step.run('process-example', async () => {
      console.log('Processing example event:', event.data);
      return { success: true };
    });
  }
);
