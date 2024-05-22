import { DragEvent } from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { IoMdArrowBack } from "react-icons/io";

export const SideBar = ({ selectedNode, nodeName, setNodeName, setSelectedElements }: any) => {

    const handleInputChange = (event: { target: { value: any; }; }) => {
        setNodeName(event.target.value);
    };

    // Function to handle dragging of messages
    const draggingMessage = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType)
        event.dataTransfer.effectAllowed = 'move'
    }

    return (
        <div className="bg-white border-[1px] border-[#dddddd] h-full">
            {selectedNode ? (
                <div>
                    <div className="relative text-center p-3 border-b-[1px] border-b-[#dddddd]">
                        <IoMdArrowBack onClick={() => setSelectedElements([])} className="absolute left-2 top-3 text-base cursor-pointer" />
                        <div className="text-base font-medium">Message</div>
                    </div>
                    <div className="pt-6 pb-4 px-3 border-b-[1px] border-b-[#dddddd]">
                        <p className="block mb-2 text-sm font-medium text-blue-900">
                            Text:
                        </p>
                        <textarea
                            className="w-full border px-3 pt-2 text-sm border-[#dddddd] rounded-xl bg-white focus:outline-none focus:border-[#908f8f]"
                            value={nodeName}
                            rows={4}
                            onChange={handleInputChange}
                        />
                    </div>

                </div>
            ) : (
                <div className="p-4">
                    <div draggable onDragStart={(event) => draggingMessage(event, 'input')} className="border-[1px] w-36 border-[#281eb2] rounded-lg flex flex-col gap-3 cursor-grab items-center py-2 px-3">
                        <BiMessageRoundedDetail className="text-[1.7rem] text-[#281eb2]" />
                        <div className="text-base font-semibold text-[#281eb2]">Message</div>
                    </div>
                </div>

            )
            }
        </div>
    );
}