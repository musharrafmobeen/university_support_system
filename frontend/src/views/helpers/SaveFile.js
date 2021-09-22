import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import BonafideCertificate from './BonafideCertificate';

ReactPDF.render(<BonafideCertificate />, `../../files/example.pdf`);