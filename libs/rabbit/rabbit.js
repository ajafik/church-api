var amqp = require('amqplib/callback_api');

const URI  = process.env.RABBIT_URI || 'guest:guest@localhost:5672';

function rabbit_send(queue_name, message, timeout, call) {

    amqp.connect('amqp://' + URI, function (err, conn) {

        conn.createChannel(function (err, channel) {
            if (err) {
                bail(err);
            }
            var queue = queue_name;
            channel.assertQueue(queue, {
                durable: true
            });
            // Note: on Node 6 Buffer.from(msg) should be used
            var _response = channel.sendToQueue(queue, new Buffer(message), {
                persistent: true
            });
            console.log(" [x] Sent");
            if (_response) {
                conn.close();
                return call(_response);
            }

        });

        //If the Producer should timeout
        // if (timeout) {
        //     setTimeout(function () {
        //         conn.close();
        //         process.exit(0)
        //     }, 500);
        // }

    });

}

function rabbit_receive(queue_name, call) {

    amqp.connect('amqp://' + URI, function (err, conn) {
        conn.createChannel(function (err, channel) {
            if (err) {
                bail(err);
            }
            var queue = queue_name;

            channel.assertQueue(queue, {
                durable: true
            });
            channel.prefetch(1);

            // Note: on Node 6 Buffer.from(msg) should be used
            // channel.sendToQueue(queue, new Buffer(message));
            // console.log(" [x] Sent");

            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
            channel.consume(queue, function (msg) {
                var _isdone = false;
                console.log(" [x] Received %s", msg.content.toString());
                _isdone = true;

                if (_isdone) {
                    console.log(" [x] Done");
                    channel.ack(msg);
                    call(msg.content.toString());
                }

            }, {
                noAck: false
            });

        });

    });

}


function bail(err) {
    console.error(err);
    process.exit(1);
}


/**
 * New Implementation of RabbitMQ
 */

var open = require('amqplib').connect('amqp://localhost');

async function send(queue, message) {

    return new Promise((resolve, reject) => {

        try {
            // Publisher
            open.then(function (conn) {
                return conn.createChannel();
            }).then(function (ch) {
                return ch.assertQueue(queue, {
                    durable: true
                }).then(function (ok) {
                   let result  =  ch.sendToQueue(queue, Buffer.from(message));
                   return resolve(result);
                });
            }).catch(error => {
                return reject(false);
            });
    
        } catch (error) {
            return reject(false);
        }

    });

}


async function receive(queue){
    return new Promise((resolve, reject) => {
        try {

            // Consumer
            open.then(function (conn) {
                return conn.createChannel();
            }).then(function (ch) {
                ch.prefetch(1);
                return ch.assertQueue(queue).then(function (ok) {
                    
                    let a  =  ch.consume(queue, function (msg) {
                        if (msg !== null) {
                            //console.log(msg.content.toString())
                            ch.ack(msg);
                            resolve(msg.content.toString());
                        }
                    }, {
                        noAck: false
                    });
                    console.log('aaaaaa', a)
                });
        }).catch(error => {
            reject(error);
        });
            
        } catch (error) {
            reject(error);
        }
    });
}


module.exports = {
    rabbit_send,
    rabbit_receive,
    send,
    receive
}