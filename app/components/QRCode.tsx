'use client'
import { QRCode } from "react-qrcode-logo";

export default function QRCodeClient(props:any){
    return   <QRCode
    value={props.value}
    ecLevel="L"
    size={220}
    eyeRadius={50}
    eyeColor="#000"
    fgColor="#222"
  />
}