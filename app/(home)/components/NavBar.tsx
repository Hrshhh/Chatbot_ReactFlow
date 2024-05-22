export const NavBar = ({onSave}: any) => {
    return ( 
        <div className="px-3 py-2 relative">
            <button onClick={onSave} className="border-[#5d5b96] w-[9rem] h-[2.8rem] whitespace-nowrap border rounded-xl absolute right-3 focus:border-blue-500 focus:border-2">
                Save Changes
            </button>
        </div>
    );
}