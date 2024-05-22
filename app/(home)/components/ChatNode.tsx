import Image from "next/image";
import { Handle, Position } from "reactflow";
import { BiMessageRoundedDetail } from "react-icons/bi";
import WhatsAppIcon from "../assets/Whatsapp.svg";

export const ChatNode = ({ data, selected }: any) => {
    return (

        <div className="w-[12rem]">
            <Handle type="target" position={Position.Left} id="target"/>

            <div className={`shadow-xl bg-white rounded-xl ${selected ? "border border-blue-600" : ""}`}>
                <div className="bg-[#b0f1e3] rounded-t-xl flex items-center justify-between px-2 py-1">
                    <div className="flex items-center gap-1">
                        <BiMessageRoundedDetail className="text-[10px]" />
                        <div className="text-xs font-semibold">Send message</div>
                    </div>
                    <div>
                        <Image src={WhatsAppIcon} alt="WhatsApp-Icon" width={12} height={12} />
                        {/* iconfinder.com */}
                    </div>
                </div>
                <div className="px-3 py-2">
                    <div className="text-xs">{data?.label}</div>
                </div>
            </div>


            <Handle type="source" position={Position.Right} id="source"/>
        </div>
    )
}