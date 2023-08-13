

const styles = {
    input: {
        text: "text-black px-1 py-2 border border-fgrey-300 rounded"
    },
    button:{
        primary: (state: boolean)=>`${!state ? "bg-fblue text-white": "bg-fgrey-300 text-slate-600 pointer-events-none"} p-2 border border-gray-300 rounded-lg mb-4  focus:outline-none`
    },
    link:{
        default: "text-forange underline"
    },
    text: {
        h1: "text-3xl"
    },
    form:{
        default: "flex flex-col border p-2 gap-2 bg-grey-200 min-w-full sm:min-w-[500px]"
    },
    section: {
        default: "flex flex-col items-center justify-center py-2 gap-2 bg-fgrey-100 border border-fgrey-300 mt-1"
    }
}

export default styles