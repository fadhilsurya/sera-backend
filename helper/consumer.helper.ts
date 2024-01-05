
// const amqp = require('amqplib');
// const { SendEmail } = require('./smptp.helper')

// const consumeMessages = async () => {
//     try {
//         const connection = await amqp.connect('amqp://local:local@localhost');
//         const channel = await connection.createChannel();

//         const queueName = 'userCreateSMTPQue';

//         await channel.assertQueue(queueName, { durable: true });

//         channel.consume(queueName, (msg) => {
//             const userData = JSON.parse(msg.content.toString());
//             console.log('Received user data:', userData);

//             SendEmail(userData.email, userData.name)

//             channel.ack(msg);
//         });
//     } catch (error) {
//         console.error('Error:', error);
//     }
// };

// module.exports = {
//     consumeMessages
// }
import amqp from 'amqplib';
import { SendEmail } from './smptp.helper';

const consumeMessages = async (): Promise<void> => {
    try {
        const connection = await amqp.connect('amqp://local:local@localhost');
        const channel = await connection.createChannel();

        const queueName = 'userCreateSMTPQue';

        await channel.assertQueue(queueName, { durable: true });

        channel.consume(queueName, (msg) => {
            if (msg) {
                const userData = JSON.parse(msg.content.toString());
                console.log('Received user data:', userData);

                SendEmail(userData.email, userData.name);

                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

export { consumeMessages };
