import * as React from 'react';
import Image from 'next/image';

interface VerificationEmailProps {
  customerName: string;
  orderId: string;
  eventDate: string;
  eventLocation: string;
  qrCodeUrl: string;
}

export const VerificationEmail: React.FC<Readonly<VerificationEmailProps>> = ({
  customerName,
  orderId,
  eventDate,
  eventLocation,
  qrCodeUrl,
}) => (
  <div style={container}>
    <p style={paragraph}>Hi {customerName},</p>
    <p style={paragraph}>
      Your order <strong>{orderId}</strong> has been successfully verified!
    </p>
    <p style={paragraph}>
      We are excited to see you at CampFest 2025!
    </p>
    <p style={paragraph}>
      <strong>Event Details:</strong><br/>
      Date: {eventDate}<br/>
      Location: {eventLocation}
    </p>
    <p style={paragraph}>
      Please present the QR code below at the event entrance for scanning:
    </p>
    <div style={qrCodeContainer}>
      <Image src={qrCodeUrl} alt="QR Code" style={qrCodeImage} width={150} height={150} />
    </div>
    <p style={paragraph}>
      Thank you for joining CampFest 2025!
    </p>
    <p style={paragraph}>
      Best regards,<br/>
      The CampFest 2025 Team
    </p>
  </div>
);

const container = {
  fontFamily: 'Arial, sans-serif',
  lineHeight: '1.6',
  color: '#333',
  maxWidth: '600px',
  margin: '0 auto',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
};

const paragraph = {
  fontSize: '16px',
  marginBottom: '15px',
};

const qrCodeContainer = {
  textAlign: 'center' as const,
  margin: '20px 0',
};

const qrCodeImage = {
  maxWidth: '150px',
  height: 'auto',
  border: '1px solid #eee',
  borderRadius: '4px',
};
