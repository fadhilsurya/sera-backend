import amqp from 'amqplib';

// Create a connection to RabbitMQ
const openConnection = async (email: string, name: string): Promise<void> => {
    try {
        const connection = await amqp.connect('amqp://local:local@localhost');
        const channel = await connection.createChannel();

        const queueName = 'userCreateSMTPQue';

        await channel.assertQueue(queueName, { durable: true });

        const userData = {
            email,
            name,
        };
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(userData)), {
            persistent: true,
        });

        console.log('User created. Message sent to the queue.');
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Error:', error);
    }
};

export { openConnection };
