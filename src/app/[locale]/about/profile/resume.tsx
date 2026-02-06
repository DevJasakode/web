import { Fragment } from "react"



export function ResumeDialog(props: 
    { 
        show: Readonly<boolean>,
        onClose: () => void; 
    }) {
    return (
        <Fragment>
            {
                props.show ?
                    <div className="fixed z-[999] top-0 left-0 right-0 bottom-0 overflow-auto flex justify-center backdrop-blur-lg pt-16"
                        onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            props.onClose();
                        }}
                    >
                        <div className="bg-white shadow-2xl max-h-min max-w-[450px] px-3 py-3">
                            Resume
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam minus quos at reprehenderit voluptates nisi laboriosam, ad accusamus praesentium numquam!
                        </div>
                    </div> : null
            }
        </Fragment>

    )
}