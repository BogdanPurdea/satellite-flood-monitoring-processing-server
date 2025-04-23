const twilio = require('twilio');
const config = require('../config');

// Create Twilio client
const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

async function sendFloodAlert(coordinates, waterCoverageChange) {
    const message = `
🚨 *Flood Risk Alert*

Water coverage change: ${waterCoverageChange.toFixed(2)}%
Location: ${JSON.stringify(coordinates)}

Please check monitoring system for details.`;

    try {
        await client.messages.create({
            body: message,
            to: `whatsapp:${process.env.ALERT_PHONE_NUMBER}`,
            from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`
        });
        console.log('📱 WhatsApp alert sent successfully');
        return true;
    } catch (error) {
        console.error('Failed to send WhatsApp alert:', error);
        return false;
    }
}

module.exports = { sendFloodAlert };