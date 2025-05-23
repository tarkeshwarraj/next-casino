// utils/qrCode.js
import {QRCodeSVG} from 'qrcode.react'; // ✅ Correct: QRCode is the default export

function QRCodeDisplay({ qrValue }) {
  if (!qrValue) return null;
  return (
    <QRCodeSVG
      value={qrValue}
      size={200}
      bgColor="#fff"
      fgColor="#000"
      level="H"
      includeMargin={true}
    />
  );
}

export default QRCodeDisplay;
